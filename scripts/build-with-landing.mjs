#!/usr/bin/env node
/**
 * Build script that:
 * 1. Builds the Next.js landing page (static export)
 * 2. Builds Docusaurus
 * 3. Copies landing page output into the Docusaurus build dir
 *    - index.html replaces the Docusaurus homepage
 *    - _next/ static assets are copied alongside
 *    - Public assets (SVGs, .riv files) are copied
 */

import { execSync } from "child_process";
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const LANDING_DIR = join(ROOT, "landing");
const LANDING_OUT = join(LANDING_DIR, "out");
const DOCUSAURUS_BUILD = join(ROOT, "build");

function run(cmd, cwd = ROOT) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

// Step 1: Build landing page
console.log("\n=== Building landing page ===");
// Always restore the exact lockfile graph. Vercel can restore an older
// landing/node_modules cache even when the release updates the nested lockfile;
// checking only for the directory's existence can therefore typecheck against
// a stale Rive/Next dependency surface.
run("npm ci", LANDING_DIR);
run("npm run build", LANDING_DIR);

if (!existsSync(LANDING_OUT)) {
  console.error("Landing page build failed — no out/ directory");
  process.exit(1);
}

// Step 2: Build Docusaurus
console.log("\n=== Building Docusaurus ===");
run("npm run build");

if (!existsSync(DOCUSAURUS_BUILD)) {
  console.error("Docusaurus build failed — no build/ directory");
  process.exit(1);
}

// Step 3: Copy landing page into Docusaurus build
console.log("\n=== Merging landing page into build ===");

// Copy _next/ static bundles
const nextDir = join(LANDING_OUT, "_next");
if (existsSync(nextDir)) {
  cpSync(nextDir, join(DOCUSAURUS_BUILD, "_next"), { recursive: true });
  console.log("  Copied _next/ static bundles");
}

// Copy public assets (SVGs, .riv files, favicons)
// Skip SEO files that Docusaurus already generates (more comprehensive versions)
const SKIP_IF_EXISTS = new Set([
  "robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt",
  "ai-feed.json", "ai.txt", "openapi.json", "agents.md",
  "humans.txt", "security.txt",
]);
const assetExtensions = [".svg", ".riv", ".png", ".ico", ".txt", ".xml"];
for (const file of readdirSync(LANDING_OUT)) {
  if (assetExtensions.some((ext) => file.endsWith(ext))) {
    if (SKIP_IF_EXISTS.has(file) && existsSync(join(DOCUSAURUS_BUILD, file))) {
      console.log(`  Skipped ${file} (keeping Docusaurus version)`);
      continue;
    }
    cpSync(join(LANDING_OUT, file), join(DOCUSAURUS_BUILD, file));
    console.log(`  Copied ${file}`);
  }
}

// Copy index.html — replaces Docusaurus homepage
cpSync(join(LANDING_OUT, "index.html"), join(DOCUSAURUS_BUILD, "index.html"));
console.log("  Replaced index.html with landing page");

// Copy 404 if it exists
if (existsSync(join(LANDING_OUT, "404.html"))) {
  // Don't overwrite Docusaurus 404 — it handles doc routes
  console.log("  Skipped 404.html (keeping Docusaurus version)");
}

console.log("\n=== Build complete ===");
