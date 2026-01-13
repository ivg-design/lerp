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
  'vector': '/api-reference#vector',
  'vec2d': '/api-reference#vector',
  'color': '/api-reference#color',
  'mat2d': '/api-reference#mat2d',

  // Drawing API
  'path': '/api-reference#path',
  'paint': '/api-reference#paint',
  'renderer': '/api-reference#renderer',
  'gradient': '/api-reference#gradient',

  // Rive Concepts
  'artboard': '/api-reference#artboard',
  'node': '/api-reference#node-object',
  'input': '/api-reference#input',
  'viewmodel': '/api-reference#viewmodel',

  // Luau Concepts
  'metatable': '/oop/metatables',
  'metamethod': '/oop/metatables#metamethods',
  '__index': '/oop/metatables#__index',
  'strict mode': '/types/strict-mode',
  'type annotation': '/types/annotations',
  'generic': '/types/generics',
  'late()': '/types/late-initializer',

  // Protocols
  'node protocol': '/rive/node-protocol',
  'util protocol': '/rive/util-protocol',
  'converter protocol': '/rive/converter-protocol',
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
