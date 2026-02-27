#!/usr/bin/env node

import fs from 'node:fs';

const host = 'forge.mograph.life';
const key = process.env.INDEXNOW_KEY || '';
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${host}/indexnow.txt`;
const urls = [
  'https://forge.mograph.life/apps/lerp/',
  'https://forge.mograph.life/apps/lerp/sitemap.xml',
  'https://forge.mograph.life/apps/lerp/llms.txt',
  'https://forge.mograph.life/apps/lerp/llms-full.txt',
];

if (!key) {
  console.log('INDEXNOW_KEY not set. Skipping ping.');
  process.exit(0);
}

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

const endpoint = 'https://api.indexnow.org/indexnow';

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const body = await response.text();
  console.error(`IndexNow ping failed (${response.status}): ${body}`);
  process.exit(1);
}

const logLine = `${new Date().toISOString()} IndexNow ping success for ${urls.length} URLs\n`;
fs.appendFileSync('indexnow.log', logLine);
console.log(logLine.trim());
