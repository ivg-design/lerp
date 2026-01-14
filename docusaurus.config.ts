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
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
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
          editUrl: 'https://github.com/ivg-design/forge/tree/main/apps/lerp-docs/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/lerp-social.png',
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
