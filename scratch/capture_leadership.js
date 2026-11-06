const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';
const tempProfile = path.join(os.tmpdir(), 'chrome_leader_audit_' + Date.now());
const outFile = path.join(outDir, 'leadership_before_audit.png');

// Use a small script to scroll to leadership section and take screenshot
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --window-size=1366,1200 --screenshot="${outFile}" "http://127.0.0.1:3000/about.html#leadership"`;
execSync(cmd, { timeout: 15000 });
console.log('Saved leadership screenshot to', outFile);

