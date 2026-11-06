const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

const tempProfile1 = path.join(os.tmpdir(), 'chrome_home_restored_dt_' + Date.now());
const outFile1 = path.join(outDir, 'homepage_restored_desktop.png');
// Let's give it 1 second virtual time budget so that the background image loads and hero slider initializes
const cmd1 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile1}" --virtual-time-budget=1500 --window-size=1440,1100 --screenshot="${outFile1}" "http://127.0.0.1:3000/index.html"`;
execSync(cmd1, { timeout: 15000 });
console.log('Saved restored homepage desktop screenshot to', outFile1);

const tempProfile2 = path.join(os.tmpdir(), 'chrome_home_restored_mb_' + Date.now());
const outFile2 = path.join(outDir, 'homepage_restored_mobile.png');
const cmd2 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile2}" --virtual-time-budget=1500 --window-size=390,900 --screenshot="${outFile2}" "http://127.0.0.1:3000/index.html"`;
execSync(cmd2, { timeout: 15000 });
console.log('Saved restored homepage mobile screenshot to', outFile2);

