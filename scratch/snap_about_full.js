const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

const tempProfile1 = path.join(os.tmpdir(), 'chrome_leader_full_' + Date.now());
const outFile1 = path.join(outDir, 'about_page_full_desktop.png');
// 1440x2600 to capture hero down through mission, vision, and leadership
const cmd1 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile1}" --window-size=1440,2400 --screenshot="${outFile1}" "http://127.0.0.1:3000/about.html"`;
execSync(cmd1, { timeout: 15000 });
console.log('Saved about full screenshot to', outFile1);

