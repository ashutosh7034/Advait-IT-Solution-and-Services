const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function capture(url, width, height, filename) {
  const target = path.join(outDir, filename);
  const tempProfile = path.join(os.tmpdir(), 'chrome_verif_' + Math.random().toString(36).substring(7));
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

console.log('Testing and capturing screenshots...');
capture('http://127.0.0.1:3000/services.html', 1366, 768, 'services_restored_clean_1366x768.png');
capture('http://127.0.0.1:3000/services.html#web-dev', 1366, 768, 'services_restored_web_dev_1366x768.png');
capture('http://127.0.0.1:3000/services.html', 390, 844, 'services_restored_clean_390x844.png');

