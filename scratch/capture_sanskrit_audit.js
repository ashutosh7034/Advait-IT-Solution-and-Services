const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\sanskrit_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const captures = [
  { url: 'http://127.0.0.1:3000/index.html', file: 'home_sanskrit_hero_1366.png', w: 1366, h: 768 },
  { url: 'http://127.0.0.1:3000/index.html', file: 'home_sanskrit_hero_mobile_390.png', w: 390, h: 844 },
  { url: 'http://127.0.0.1:3000/about.html', file: 'about_sanskrit_philosophy_1366.png', w: 1366, h: 1000 },
  { url: 'http://127.0.0.1:3000/advait-advantage.html', file: 'advantage_sanskrit_pillars_1366.png', w: 1366, h: 1000 },
  { url: 'http://127.0.0.1:3000/about.html', file: 'about_sanskrit_mobile_390.png', w: 390, h: 844 }
];

captures.forEach(c => {
  const target = path.join(outDir, c.file);
  const tempProfile = path.join(os.tmpdir(), 'chrome_sk_snap_' + Date.now() + '_' + Math.random());
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2500 --window-size=${c.w},${c.h} --screenshot="${target}" "${c.url}" 2>&1`;
  try {
    execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    console.log(`✓ Saved ${c.file}`);
  } catch (e) {
    console.error(`Failed ${c.file}:`, e.message);
  }
});

