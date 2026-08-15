#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const staticDir = path.join(root, 'static');
const wellKnownDir = path.join(staticDir, '.well-known');
const canonicalBase = 'https://forge.mograph.life/apps/lerp';

function resolveGeneratedAt() {
  const sourceDateEpoch = process.env.SOURCE_DATE_EPOCH;
  if (sourceDateEpoch !== undefined) {
    if (!/^\d+$/.test(sourceDateEpoch)) {
      throw new Error('SOURCE_DATE_EPOCH must be a non-negative integer number of seconds.');
    }

    const seconds = Number(sourceDateEpoch);
    const timestamp = new Date(seconds * 1000);
    if (!Number.isSafeInteger(seconds) || Number.isNaN(timestamp.getTime())) {
      throw new Error('SOURCE_DATE_EPOCH is outside the supported JavaScript date range.');
    }
    return timestamp.toISOString();
  }

  const changelog = fs.readFileSync(path.join(docsDir, 'changelog.mdx'), 'utf8');
  const releaseDateMatch = changelog.match(
    /^## \[[^\]]+\]\s+(?:—|-)\s+(\d{4}-\d{2}-\d{2})\s*$/m,
  );
  if (!releaseDateMatch) {
    throw new Error(
      'Unable to derive a stable artifact timestamp from docs/changelog.mdx; set SOURCE_DATE_EPOCH.',
    );
  }

  const releaseDate = releaseDateMatch[1];
  const timestamp = new Date(`${releaseDate}T00:00:00.000Z`);
  if (Number.isNaN(timestamp.getTime()) || timestamp.toISOString().slice(0, 10) !== releaseDate) {
    throw new Error(`Invalid release date in docs/changelog.mdx: ${releaseDate}`);
  }
  return timestamp.toISOString();
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function walkDocs(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDocs(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function walkCategoryFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkCategoryFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === '_category_.json') {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { title: '', description: '', keywords: [] };

  const frontmatter = match[1];
  const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
  const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const keywordsMatch = frontmatter.match(/^keywords:\s*\n((?:\s*-\s*.+\n?)*)/m);

  const title = titleMatch?.[1]?.trim()?.replace(/^['"]|['"]$/g, '') ?? '';
  const description = descriptionMatch?.[1]?.trim()?.replace(/^['"]|['"]$/g, '') ?? '';
  const keywords = keywordsMatch?.[1]
    ? keywordsMatch[1]
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('-'))
        .map((line) => line.replace(/^-+\s*/, '').trim())
        .filter(Boolean)
    : [];

  return { title, description, keywords };
}

function inferTitle(content, relPath) {
  const heading = content.match(/^#\s+(.+)$/m);
  if (heading?.[1]) return heading[1].trim();
  const fileName = relPath.replace(/\.mdx$/, '').split('/').pop() || relPath;
  return fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function routeFromPath(relPath) {
  const clean = relPath.replace(/\\/g, '/').replace(/\.mdx$/, '');
  if (clean === 'intro') return '/';
  return `/${clean}`;
}

function normalizeRoute(route) {
  if (!route) return '/';
  if (route === '/') return '/';
  return route.startsWith('/') ? route : `/${route}`;
}

function routeToCanonical(route) {
  const normalized = normalizeRoute(route);
  return `${canonicalBase}${normalized === '/' ? '/' : normalized}`;
}

function buildGeneratedIndexDocuments() {
  const categoryFiles = walkCategoryFiles(docsDir)
    .map((categoryPath) => path.relative(docsDir, categoryPath).replace(/\\/g, '/'))
    .sort();

  const docs = [];
  for (const relPath of categoryFiles) {
    const fullPath = path.join(docsDir, relPath);
    const raw = fs.readFileSync(fullPath, 'utf8');
    let json;
    try {
      json = JSON.parse(raw);
    } catch {
      continue;
    }

    if (json?.link?.type !== 'generated-index') {
      continue;
    }

    const link = json.link || {};
    const title = link.title || json.label || 'Generated Index';
    const description = link.description || '';
    const route = normalizeRoute(link.slug || `/category/${slugify(title)}`);
    const canonicalUrl = routeToCanonical(route);

    docs.push({
      id: `generated-index-${relPath.replace(/[\\/]/g, '-')}`,
      title,
      description,
      url: canonicalUrl,
      canonicalUrl,
      group: relPath.includes('/') ? relPath.split('/')[0] : 'root',
      tags: ['generated-index', 'navigation'],
      sourcePath: `docs/${relPath}`,
      contentType: 'generated-index',
      language: 'en',
    });
  }

  return docs;
}

function buildDocuments() {
  const files = walkDocs(docsDir)
    .map((docPath) => path.relative(docsDir, docPath).replace(/\\/g, '/'))
    .sort();

  const docs = files.map((relPath) => {
    const content = fs.readFileSync(path.join(docsDir, relPath), 'utf8');
    const { title, description, keywords } = parseFrontmatter(content);
    const route = routeFromPath(relPath);
    const canonicalUrl = routeToCanonical(route);
    return {
      id: relPath.replace(/\.mdx$/, '').replace(/[\\/]/g, '-'),
      title: title || inferTitle(content, relPath),
      description,
      url: canonicalUrl,
      canonicalUrl,
      group: relPath.includes('/') ? relPath.split('/')[0] : 'root',
      tags: [...new Set(keywords)],
      sourcePath: `docs/${relPath}`,
      contentType: 'documentation',
      language: 'en',
    };
  });

  // Include generated category index pages so llms-full/ai-feed coverage matches sitemap routes.
  const generatedIndexDocs = buildGeneratedIndexDocuments();
  const byUrl = new Map();
  for (const doc of [...docs, ...generatedIndexDocs]) {
    byUrl.set(doc.url, doc);
  }
  return Array.from(byUrl.values());
}

function writeLlmsFull(documents, generatedAt) {
  const lines = [];
  lines.push('# LERP Full Knowledge Surface (llms-full)');
  lines.push(`Generated: ${generatedAt}`);
  lines.push(`Canonical: ${canonicalBase}/`);
  lines.push('Scope: Complete documentation route inventory with page metadata for AI retrieval and citation.');
  lines.push('');
  lines.push('## Site Entities');
  lines.push('- Site: LERP (Luau Education for Rive Professionals)');
  lines.push('- Provider: IVG Design');
  lines.push('- Primary domain: https://forge.mograph.life');
  lines.push(`- Canonical docs base: ${canonicalBase}/`);
  lines.push('');
  lines.push('## Complete URL Inventory');
  lines.push('| Title | URL | Source | Description |');
  lines.push('|---|---|---|---|');
  for (const doc of documents) {
    const safeTitle = doc.title.replaceAll('|', '\\|');
    const safeDescription = (doc.description || '').replaceAll('|', '\\|');
    lines.push(`| ${safeTitle} | ${doc.url} | ${doc.sourcePath} | ${safeDescription} |`);
  }
  lines.push('');
  lines.push('## Citation Guidance');
  lines.push(`- Prefer canonical URLs under ${canonicalBase}/`);
  lines.push('- Cite page-specific URLs for protocol/API claims rather than section homepages');
  lines.push('- Prioritize docs in `rive/protocols/*` and `api/*` for implementation details');
  lines.push('');
  lines.push('## Freshness');
  lines.push(`- For crawl discovery, also read: ${canonicalBase}/sitemap.xml`);
  lines.push(`- For summary map, also read: ${canonicalBase}/llms.txt`);
  lines.push('');

  fs.writeFileSync(path.join(staticDir, 'llms-full.txt'), lines.join('\n'));
  fs.writeFileSync(path.join(wellKnownDir, 'llms-full.txt'), `See: ${canonicalBase}/llms-full.txt\n`);
}

function writeAiFeed(documents, generatedAt) {
  const feed = {
    version: '1.0',
    generatedAt,
    canonical: `${canonicalBase}/`,
    site: {
      name: 'LERP',
      fullName: 'Luau Education for Rive Professionals',
      publisher: 'IVG Design',
      description: 'Interactive documentation and course content for Rive Luau scripting.',
      language: 'en',
    },
    entities: [
      { id: 'entity.rive', name: 'Rive', type: 'Technology' },
      { id: 'entity.luau', name: 'Luau', type: 'Language' },
      { id: 'entity.rive-protocols', name: 'Rive Script Protocols', type: 'DocumentationTopic' },
      { id: 'entity.rive-api', name: 'Rive Scripting API', type: 'DocumentationTopic' },
    ],
    documents,
  };

  const output = `${JSON.stringify(feed, null, 2)}\n`;
  fs.writeFileSync(path.join(staticDir, 'ai-feed.json'), output);
  fs.writeFileSync(path.join(wellKnownDir, 'ai-feed.json'), output);
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function writeCourseSitemap(documents) {
  const courseGroups = new Set([
    'home',
    'advanced',
    'api',
    'best-practices',
    'category',
    'examples',
    'fundamentals',
    'getting-started',
    'glossary',
    'oop',
    'projects',
    'quick-reference',
    'rive',
    'tips-tricks',
    'types',
  ]);
  const courseRootUrls = new Set([
    `${canonicalBase}/glossary`,
    `${canonicalBase}/quick-reference`,
    `${canonicalBase}/release-workflow`,
    `${canonicalBase}/tips-tricks`,
  ]);

  const urls = documents
    .filter((doc) => {
      const groupKey = doc.url === `${canonicalBase}/` ? 'home' : doc.group || 'root';
      return courseGroups.has(groupKey) || courseRootUrls.has(doc.url);
    })
    .sort((a, b) => a.url.localeCompare(b.url));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((doc) => {
      const lines = [
        '  <url>',
        `    <loc>${escapeXml(doc.url)}</loc>`,
      ];
      lines.push('    <changefreq>weekly</changefreq>');
      lines.push('    <priority>0.8</priority>');
      lines.push('  </url>');
      return lines.join('\n');
    }),
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(staticDir, 'sitemap-course.xml'), xml);
}

function humanizeGroup(group) {
  if (!group || group === 'root') return 'Core Pages';
  return group
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function writeHtmlSiteMap(documents) {
  const siteMapDocPath = path.join(docsDir, 'site-map.mdx');
  const filteredDocuments = documents.filter((doc) => doc.url !== `${canonicalBase}/site-map`);
  const groupedDocuments = new Map();

  for (const doc of filteredDocuments) {
    const groupKey = doc.url === `${canonicalBase}/` ? 'home' : doc.group || 'root';
    if (!groupedDocuments.has(groupKey)) {
      groupedDocuments.set(groupKey, []);
    }
    groupedDocuments.get(groupKey).push(doc);
  }

  const orderedGroupKeys = [
    ...['home', 'root'].filter((key) => groupedDocuments.has(key)),
    ...Array.from(groupedDocuments.keys())
      .filter((key) => key !== 'home' && key !== 'root')
      .sort((a, b) => a.localeCompare(b)),
  ];

  const lines = [
    '---',
    'title: Site Map',
    'description: Crawl-friendly index of every canonical LERP page.',
    'slug: /site-map',
    'pagination_prev: null',
    'pagination_next: null',
    '---',
    '',
    'This page is a crawl-friendly HTML index of the canonical LERP surface.',
    '',
    `Primary XML sitemap: [sitemap.xml](${canonicalBase}/sitemap.xml)`,
    '',
  ];

  for (const groupKey of orderedGroupKeys) {
    const docs = groupedDocuments.get(groupKey) || [];
    const heading = groupKey === 'home' ? 'Home' : humanizeGroup(groupKey);
    lines.push(`## ${heading}`);
    lines.push('');
    for (const doc of docs.sort((a, b) => a.title.localeCompare(b.title))) {
      const suffix = doc.description ? ` - ${doc.description}` : '';
      lines.push(`- [${doc.title}](${doc.url})${suffix}`);
    }
    lines.push('');
  }

  while (lines[lines.length - 1] === '') {
    lines.pop();
  }
  fs.writeFileSync(siteMapDocPath, `${lines.join('\n')}\n`);
}

if (!fs.existsSync(docsDir)) {
  console.error(`Missing docs directory: ${docsDir}`);
  process.exit(1);
}

fs.mkdirSync(wellKnownDir, { recursive: true });
const documents = buildDocuments().sort((a, b) => a.url.localeCompare(b.url));
const generatedAt = resolveGeneratedAt();
writeLlmsFull(documents, generatedAt);
writeAiFeed(documents, generatedAt);
writeCourseSitemap(documents);
writeHtmlSiteMap(documents);

console.log(`Generated ai artifacts for ${documents.length} docs pages.`);
