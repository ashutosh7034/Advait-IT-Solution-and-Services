const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';

const tempProfile = path.join(os.tmpdir(), `chrome_svc_cards_${Date.now()}`);
const outFile = path.join(outDir, 'services_cards_grid_desktop.png');

// 1440 x 1750 to show the hero + top 2 rows of 3-column cards
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=1500 --window-size=1440,1750 --screenshot="${outFile}" "http://127.0.0.1:3000/services.html"`;
execSync(cmd, { timeout: 20000 });
console.log('Saved services cards grid screenshot to', outFile);

