const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\leadership_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function capture(url, width, height, filename) {
  const target = path.join(outDir, filename);
  const tempProfile = path.join(os.tmpdir(), 'chrome_md_' + Math.random().toString(36).substring(7));
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=${width},${height} --screenshot="${target}" "${url}" 2>&1`;
  try {
    execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    console.log(`✓ Saved ${filename} (${width}x${height})`);
    return target;
  } catch (e) {
    console.error(`✗ Error capturing ${filename}:`, e.message);
    return null;
  }
}

console.log('Capturing MD profile card screenshots...');
capture('http://127.0.0.1:3000/about.html#leadership', 1366, 900, 'about_md_desktop_1366x900.png');
capture('http://127.0.0.1:3000/about.html#leadership', 768, 1024, 'about_md_tablet_768x1024.png');
capture('http://127.0.0.1:3000/about.html#leadership', 390, 844, 'about_md_mobile_390x844.png');

