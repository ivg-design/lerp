import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🎓 Introduction',
    },
    {
      type: 'category',
      label: '📘 Part 1: Getting Started',
      collapsed: false,
      items: [
        'getting-started/welcome',
        'getting-started/why-luau',
      ],
    },
    {
      type: 'category',
      label: '📗 Part 2: Luau Fundamentals',
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
      label: '📙 Part 3: Type System',
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
      label: '📕 Part 4: OOP Deep Dive',
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
      label: '📓 Part 5: Rive Integration',
      items: [
        'rive/environment',
        'rive/protocols',
        'rive/inputs',
        'rive/node-protocol',
        'rive/util-protocol',
        'rive/other-protocols',
      ],
    },
    {
      type: 'category',
      label: '📔 Part 6: Advanced Techniques',
      items: [
        'advanced/core-types',
        'advanced/drawing-api',
        'advanced/viewmodels',
        'advanced/game-logic',
        'advanced/instantiation',
        'advanced/procedural',
      ],
    },
    {
      type: 'category',
      label: '📒 Part 7: Best Practices',
      items: [
        'best-practices/architecture',
        'best-practices/performance',
        'best-practices/debugging',
        'best-practices/resources',
      ],
    },
    {
      type: 'doc',
      id: 'api-reference',
      label: '📚 API Reference',
    },
    {
      type: 'doc',
      id: 'quick-reference',
      label: '⚡ Quick Reference',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: '📖 Glossary',
    },
  ],
};

export default sidebars;
