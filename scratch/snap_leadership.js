const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

const tempProfile1 = path.join(os.tmpdir(), 'chrome_leader_after_dt_' + Date.now());
const outFile1 = path.join(outDir, 'leadership_after_desktop.png');
const cmd1 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile1}" --window-size=1366,1050 --screenshot="${outFile1}" "http://127.0.0.1:3000/about.html#leadership"`;
execSync(cmd1, { timeout: 15000 });
console.log('Saved desktop leadership to', outFile1);

const tempProfile2 = path.join(os.tmpdir(), 'chrome_leader_after_mb_' + Date.now());
const outFile2 = path.join(outDir, 'leadership_after_mobile.png');
const cmd2 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile2}" --window-size=390,950 --screenshot="${outFile2}" "http://127.0.0.1:3000/about.html#leadership"`;
execSync(cmd2, { timeout: 15000 });
console.log('Saved mobile leadership to', outFile2);

