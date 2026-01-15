import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Term.module.css';

interface TermProps {
  children: React.ReactNode;
  to?: string;
  tooltip?: string;
}

// Mapping of common terms to their documentation pages
const termMappings: Record<string, string> = {
  // Core Types
  'vector': '/api/core-types#vector',
  'vec2d': '/api/core-types#vector',
  'color': '/api/core-types#color',
  'mat2d': '/api/core-types#mat2d',

  // Drawing API
  'path': '/api/drawing#path',
  'paint': '/api/drawing#paint',
  'renderer': '/api/drawing#renderer',
  'gradient': '/api/drawing#gradient',

  // Scene Objects
  'artboard': '/api/scene#artboard',
  'node': '/api/scene#node-object',
  'animation': '/api/scene#animation',

  // Data & Input
  'input': '/api/data-input#input',
  'property': '/api/data-input#property',
  'viewmodel': '/api/data-input#viewmodel',
  'context': '/api/data-input#context',

  // Events
  'pointerevent': '/api/events#pointerevent',
  'trigger': '/api/events#trigger',

  // Luau Concepts
  'metatable': '/oop/metatables',
  'metamethod': '/oop/metatables#metamethods',
  '__index': '/oop/metatables#__index',
  'strict mode': '/types/strict-mode',
  'type annotation': '/types/annotations',
  'generic': '/types/generics',
  'late()': '/types/late-initializer',

  // Protocols
  'node protocol': '/rive/protocols/node-protocol',
  'util protocol': '/rive/protocols/util-protocol',
  'converter protocol': '/rive/protocols/converter-protocol',

  // Glossary fallbacks
  'state machine': '/glossary#state-machine',
  'listener': '/glossary#listener',
  'lerp': '/glossary#lerp',
  'callback': '/glossary#callback',
  'closure': '/glossary#closure',
  'upvalue': '/glossary#upvalue',
  'array': '/glossary#array',
  'dictionary': '/glossary#dictionary',
  'table': '/glossary#table',
  'module': '/glossary#module',
  'scope': '/glossary#scope',
  'keyframe': '/glossary#keyframe',
  'layer': '/glossary#layer',
  'easing': '/glossary#easing',
  'nested artboard': '/glossary#nested-artboard',
  'type guard': '/glossary#type-guard',
  'type narrowing': '/glossary#type-narrowing',
  'string interpolation': '/glossary#string-interpolation',
  'truthiness': '/glossary#truthiness',
  'truthy': '/glossary#truthiness',
  'falsy': '/glossary#truthiness',
  'data binding': '/glossary#data-binding',
  'lifecycle': '/glossary#lifecycle',
  'factory function': '/glossary#factory-function',
  'delta time': '/glossary#delta-time',
};

export default function Term({ children, to, tooltip }: TermProps) {
  const text = typeof children === 'string' ? children : '';
  const href = to || termMappings[text.toLowerCase()] || `/glossary#${text.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Link
      to={href}
      className={styles.term}
      title={tooltip || `Learn more about ${text}`}
    >
      {children}
    </Link>
  );
}
