#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const staticDir = path.join(root, 'static');
const wellKnownDir = path.join(staticDir, '.well-known');
const canonicalBase = 'https://forge.mograph.life/apps/lerp';

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

function buildDocuments() {
  const files = walkDocs(docsDir)
    .map((docPath) => path.relative(docsDir, docPath).replace(/\\/g, '/'))
    .sort();

  return files.map((relPath) => {
    const content = fs.readFileSync(path.join(docsDir, relPath), 'utf8');
    const { title, description, keywords } = parseFrontmatter(content);
    const route = routeFromPath(relPath);
    const canonicalUrl = `${canonicalBase}${route === '/' ? '/' : route}`;
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
}

function writeLlmsFull(documents) {
  const lines = [];
  lines.push('# LERP Full Knowledge Surface (llms-full)');
  lines.push(`Generated: ${new Date().toISOString()}`);
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

function writeAiFeed(documents) {
  const feed = {
    version: '1.0',
    generatedAt: new Date().toISOString(),
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

if (!fs.existsSync(docsDir)) {
  console.error(`Missing docs directory: ${docsDir}`);
  process.exit(1);
}

fs.mkdirSync(wellKnownDir, { recursive: true });
const documents = buildDocuments().sort((a, b) => a.url.localeCompare(b.url));
writeLlmsFull(documents);
writeAiFeed(documents);

console.log(`Generated ai artifacts for ${documents.length} docs pages.`);
