import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LERP',
  tagline: 'Luau Education for Rive Professionals',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://forge.mograph.life',
  baseUrl: '/apps/lerp/',

  organizationName: 'ivg-design',
  projectName: 'lerp',

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LERP',
        alternateName: 'Learn Rive Luau',
        url: 'https://forge.mograph.life/apps/lerp/',
        description: 'Luau Education for Rive Professionals',
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          name: 'IVG Design',
          url: 'https://forge.mograph.life',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'LERP: Luau Education for Rive Professionals',
        description:
          'Interactive course for mastering Rive Luau scripting, protocols, API usage, and production patterns.',
        inLanguage: 'en',
        provider: {
          '@type': 'Organization',
          name: 'IVG Design',
          sameAs: 'https://forge.mograph.life',
        },
        educationalLevel: 'Beginner to Advanced',
        url: 'https://forge.mograph.life/apps/lerp/',
      }),
    },
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Docs at root
          editUrl: 'https://github.com/ivg-design/forge/tree/main/apps/lerp/',
          exclude: ['**/CLAUDE.md', '**/AGENTS.md', '**/*.draft.mdx'],
        },
        blog: false, // Disable blog
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          filename: 'sitemap.xml',
          ignorePatterns: ['/tags/**', '/search', '/404.html'],
          lastmod: null,
          createSitemapItems: async (params) => {
            const items = await params.defaultCreateSitemapItems(params);
            return items.filter((item) => !item.url.endsWith('/search'));
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/lerp-banner-with-bg.png',
    metadata: [
      {
        name: 'robots',
        content:
          'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content:
          'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'LERP',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'LERP',
      logo: {
        alt: 'LERP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'courseSidebar',
          position: 'left',
          label: 'Course',
        },
        {
          to: '/api/core-types',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: '/quick-reference',
          label: 'Quick Ref',
          position: 'left',
        },
        {
          href: 'https://forge.mograph.life',
          label: 'Forge',
          position: 'right',
        },
        {
          href: 'https://github.com/ivg-design/lerp',
          label: ' ',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            { label: 'Introduction', to: '/' },
            { label: 'Fundamentals', to: '/fundamentals/variables' },
            { label: 'Type System', to: '/types/intro' },
            { label: 'OOP', to: '/oop/metatables' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { label: 'API Reference', to: '/api/core-types' },
            { label: 'Quick Reference', to: '/quick-reference' },
            { label: 'Glossary', to: '/glossary' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Rive', href: 'https://rive.app' },
            { label: 'Luau', href: 'https://luau-lang.org' },
            { label: 'IVG Design', href: 'https://mograph.life' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} IVG Design. Built with Docusaurus.`,
    },
    mermaid: {
      theme: {
        dark: 'dark',
        light: 'default',
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
