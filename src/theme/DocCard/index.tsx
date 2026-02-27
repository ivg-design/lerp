/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

function CardContainer({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer, className)}>
      {children}
    </Link>
  );
}

function CardLayout({
  className,
  href,
  icon,
  title,
  description,
}: {
  className?: string;
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <CardContainer href={href} className={className}>
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {icon}
        <span>{title}</span>
      </Heading>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function SvgIcon({children}: {children: ReactNode}): ReactNode {
  return (
    <svg
      className={styles.cardIcon}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {children}
    </svg>
  );
}

function FolderIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </SvgIcon>
  );
}

function DocumentIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </SvgIcon>
  );
}

function ExternalLinkIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
      <path d="M17 14v5H4V6h5" />
    </SvgIcon>
  );
}

function CoreTypesIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M6 16 11 8l7 8Z" />
      <circle cx="6" cy="16" r="1" />
      <circle cx="11" cy="8" r="1" />
      <circle cx="18" cy="16" r="1" />
      <path d="M4 20h16" />
    </SvgIcon>
  );
}

function DrawingIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M3 18c2-5 5-7 8-7s6 2 10 7" />
      <path d="M7 9h10" />
      <path d="M12 5v8" />
      <path d="M6 20h12" />
    </SvgIcon>
  );
}

function SceneIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="m12 4 9 5-9 5-9-5z" />
      <path d="m3 14 9 5 9-5" />
    </SvgIcon>
  );
}

function DataInputIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="11" cy="18" r="2" />
    </SvgIcon>
  );
}

function EventsIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M5 3v14l4-4 3 7 2-5 5-2z" />
    </SvgIcon>
  );
}

function AssetsIcon(): ReactNode {
  return (
    <SvgIcon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="1.5" />
      <path d="m21 16-5-5-4 4-2-2-5 5" />
    </SvgIcon>
  );
}

function PathEffectsIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M3 17c3-6 6-6 9 0s6 6 9 0" />
      <path d="m7 7 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </SvgIcon>
  );
}

function DataValuesIcon(): ReactNode {
  return (
    <SvgIcon>
      <rect x="8" y="4" width="10" height="16" rx="2" />
      <path d="M8 9h10" />
      <path d="M8 13h10" />
      <path d="M8 17h10" />
      <path d="M4 7c1 0 2-1 2-2v14c0-1-1-2-2-2" />
    </SvgIcon>
  );
}

function StylingIcon(): ReactNode {
  return (
    <SvgIcon>
      <path d="M12 4a8 8 0 1 0 8 8 2.5 2.5 0 0 1-2.5 2.5H14a2 2 0 0 0 0 4h1" />
      <circle cx="8" cy="11" r="1" />
      <circle cx="11" cy="8" r="1" />
      <circle cx="15" cy="9" r="1" />
    </SvgIcon>
  );
}

function HierarchyIcon(): ReactNode {
  return (
    <SvgIcon>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M12 7v6" />
      <path d="m12 13-6 4" />
      <path d="m12 13 6 4" />
    </SvgIcon>
  );
}

function SystemIcon(): ReactNode {
  return (
    <SvgIcon>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10h4v4h-4z" />
      <path d="M4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3" />
    </SvgIcon>
  );
}

function normalizeHrefPath(href: string): string {
  const noHashOrQuery = href.split(/[?#]/, 1)[0] || href;
  const noTrailingSlash = noHashOrQuery.replace(/\/+$/, '');
  const apiStartIndex = noTrailingSlash.indexOf('/api/');
  return apiStartIndex === -1
    ? noTrailingSlash
    : noTrailingSlash.slice(apiStartIndex);
}

function getApiSectionSlug(href: string): string | null {
  const path = normalizeHrefPath(href);
  const apiSegment = '/api/';
  const start = path.indexOf(apiSegment);
  if (start === -1) {
    return null;
  }
  const afterApi = path.slice(start + apiSegment.length);
  if (!afterApi) {
    return null;
  }
  return afterApi.split('/')[0] || null;
}

function getInternalLinkIcon(href: string): ReactNode {
  switch (getApiSectionSlug(href)) {
    case 'core-types':
      return <CoreTypesIcon />;
    case 'drawing':
      return <DrawingIcon />;
    case 'scene':
      return <SceneIcon />;
    case 'data-input':
      return <DataInputIcon />;
    case 'events':
      return <EventsIcon />;
    case 'assets':
      return <AssetsIcon />;
    case 'path-effects':
      return <PathEffectsIcon />;
    case 'data-values':
      return <DataValuesIcon />;
    case 'styling':
      return <StylingIcon />;
    case 'hierarchy':
      return <HierarchyIcon />;
    case 'system':
      return <SystemIcon />;
    default:
      return <DocumentIcon />;
  }
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      className={item.className}
      href={href}
      icon={<FolderIcon />}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const icon = isInternalUrl(item.href)
    ? getInternalLinkIcon(item.href)
    : <ExternalLinkIcon />;
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
