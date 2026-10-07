#!/usr/bin/env node
// Renders tools/og-card.html to assets/og-card.png (1200x630) with Playwright.
// Usage: node tools/render-og-card.js   (needs the "playwright" package and a Chromium install)
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.join(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(root, 'tools/og-card.html'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(root, 'assets/og-card.png') });
  await browser.close();
  console.log('Wrote assets/og-card.png');
})();
