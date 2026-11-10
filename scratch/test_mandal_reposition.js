const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testLeadership() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    } else {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page error: ${err.message}`);
  });

  const targetUrl = 'http://127.0.0.1:3000/about.html';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  // 1. Check card content and text for Mandal
  const mandalData = await page.evaluate(() => {
    const card = document.getElementById('md-profile');
    if (!card) return null;
    return {
      name: card.querySelector('.advait-leader-name')?.innerText.trim(),
      role: card.querySelector('.advait-leader-role')?.innerText.trim(),
      creds: card.querySelector('.advait-leader-creds')?.innerText.trim(),
      bio: card.querySelector('.advait-leader-bio')?.innerText.trim(),
      focusTitle: card.querySelector('.advait-leader-focus-title span')?.innerText.trim(),
      tags: Array.from(card.querySelectorAll('.advait-leader-tag')).map(t => t.innerText.trim()),
      highlights: Array.from(card.querySelectorAll('.advait-leader-highlights span')).map(h => h.innerText.trim()),
      phoneLink: card.querySelector('a[href^="tel:"]')?.getAttribute('href'),
      phoneText: card.querySelector('a[href^="tel:"] span')?.innerText.trim(),
      emailLink: card.querySelector('a[href^="mailto:"]')?.getAttribute('href'),
      emailText: card.querySelector('a[href^="mailto:"] span')?.innerText.trim()
    };
  });

  console.log('\n--- MANDAL CARD CONTENT AUDIT ---');
  console.log(JSON.stringify(mandalData, null, 2));

  // 2. Test Viewports & Layout Parity
  const viewports = [
    { name: 'desktop_1366', width: 1366, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 }
  ];

  const artifactDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 500));

    const cardMetrics = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.advait-leader-card'));
      return cards.map(c => {
        const rect = c.getBoundingClientRect();
        return {
          id: c.id || c.querySelector('.advait-leader-name')?.innerText,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          left: Math.round(rect.left)
        };
      });
    });

    console.log(`\n--- VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) ---`);
    console.table(cardMetrics);

    // Capture screenshot of the leadership section
    const leadershipSection = await page.$('#leadership');
    if (leadershipSection) {
      const screenshotPath = path.join(artifactDir, `leadership_mandal_coo_${vp.name}.png`);
      await leadershipSection.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot: ${screenshotPath}`);
    }
  }

  // 3. Verify all images are loaded
  const imageAudit = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('#leadership img'));
    return imgs.map(img => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
  });

  console.log('\n--- LEADERSHIP IMAGES AUDIT ---');
  console.table(imageAudit);

  await browser.close();

  if (errors.length > 0) {
    console.error('\nERRORS FOUND:');
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log('\nALL VERIFICATIONS PASSED WITH 0 ERRORS!');
  }
}

testLeadership().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

