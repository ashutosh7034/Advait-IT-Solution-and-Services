const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const targetFile = path.join(outDir, 'services_baseline_1366x768.png');
const tempProfile = path.join(os.tmpdir(), 'chrome_srv_base_' + Date.now());

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1366,768 --screenshot="${targetFile}" "http://127.0.0.1:3000/services.html" 2>&1`;

try {
  execSync(cmd, { timeout: 15000, encoding: 'utf8' });
  console.log('✓ Baseline saved:', targetFile);
} catch (e) {
  console.error('Failed to capture baseline:', e.message);
}

