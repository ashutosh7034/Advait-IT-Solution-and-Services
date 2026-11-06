const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\projects_audit';

const tempProfile = path.join(os.tmpdir(), `chrome_proj_after_${Date.now()}`);
const outFile = path.join(outDir, 'projects_after_1366x768.png');

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1366,768 --screenshot="${outFile}" "http://127.0.0.1:3000/projects.html"`;

try {
  execSync(cmd, { timeout: 25000 });
  const stat = fs.statSync(outFile);
  console.log(`✓ After screenshot saved: ${outFile} (${stat.size} bytes)`);
} catch (err) {
  console.error(`❌ Screenshot failed: ${err.message}`);
}

