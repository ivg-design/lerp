import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'progress',
      label: 'My Progress',
    },
    {
      type: 'category',
      label: 'Part 1: Getting Started',
      collapsed: false,
      items: [
        'getting-started/welcome',
        'getting-started/why-luau',
        'getting-started/your-first-script',
        'getting-started/how-rive-scripts-work',
      ],
    },
    {
      type: 'category',
      label: 'Part 2: Luau Fundamentals',
      items: [
        'fundamentals/variables',
        'fundamentals/data-types',
        'fundamentals/operators',
        'fundamentals/control-flow',
        'fundamentals/functions',
        'fundamentals/tables',
        'fundamentals/iteration',
      ],
    },
    {
      type: 'category',
      label: 'Part 3: Type System',
      items: [
        'types/intro',
        'types/annotations',
        'types/strict-mode',
        'types/custom-types',
        'types/advanced-types',
        'types/generics',
        'types/late-initializer',
      ],
    },
    {
      type: 'category',
      label: 'Part 4: OOP Deep Dive',
      items: [
        'oop/prototype-based',
        'oop/metatables',
        'oop/index-metamethod',
        'oop/classes',
        'oop/self-and-methods',
        'oop/inheritance',
        'oop/encapsulation',
        'oop/patterns',
      ],
    },
    {
      type: 'category',
      label: 'Part 5: Rive Integration',
      items: [
        'rive/environment',
        'rive/script-types',
        'rive/script-capability-matrix',
        'rive/inputs',
        'rive/ai-agent',
        {
          type: 'category',
          label: 'Script Protocols',
          items: [
            'rive/protocols/node-protocol',
            'rive/protocols/node-lifecycle',
            'rive/protocols/layout-protocol',
            'rive/protocols/converter-protocol',
            'rive/protocols/path-effect-protocol',
            'rive/protocols/listener-action-protocol',
            'rive/protocols/transition-condition-protocol',
            'rive/protocols/util-protocol',
            'rive/protocols/test-protocol',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Part 6: Advanced Rive Scripting',
      items: [
        'advanced/core-types',
        'advanced/drawing-api',
        'advanced/viewmodels',
        'rive/protocols/listener-protocol',
        'advanced/game-logic',
        'advanced/instantiation',
        'advanced/procedural',
      ],
    },
    {
      type: 'category',
      label: 'Part 7: Best Practices',
      items: [
        'best-practices/architecture',
        'best-practices/performance',
        'best-practices/debugging',
        'best-practices/resources',
      ],
    },
    {
      type: 'category',
      label: 'Part 8: Projects',
      items: [
        'projects/interactive-button',
        'projects/data-visualization',
        'projects/catch-the-stars',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
        title: 'API Reference',
        description: 'Complete Rive Luau API documentation.',
      },
      items: [
        'api/core-types',
        'api/drawing',
        'api/scene',
        'api/data-input',
        'api/events',
        'api/assets',
        'api/path-effects',
        'api/data-values',
        'api/styling',
        'api/hierarchy',
        'api/system',
      ],
    },
    {
      type: 'doc',
      id: 'quick-reference',
      label: 'Quick Reference',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
  ],
};

export default sidebars;
