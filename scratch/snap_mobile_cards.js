const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';

const tempProfile = path.join(os.tmpdir(), `chrome_svc_mb_cards_${Date.now()}`);
const outFile = path.join(outDir, 'services_cards_grid_mobile.png');

// 390 x 1400 to show hero and first 2 single-column cards on mobile
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=1500 --window-size=390,1400 --screenshot="${outFile}" "http://127.0.0.1:3000/services.html"`;
execSync(cmd, { timeout: 20000 });
console.log('Saved mobile cards screenshot to', outFile);

