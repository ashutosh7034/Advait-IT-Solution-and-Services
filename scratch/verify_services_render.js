const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

const tempProfile = path.join(os.tmpdir(), 'chrome_services_inspect_' + Date.now());
const outFile1 = path.join(outDir, 'services_rendered_desktop.png');

// Capture services page desktop
const cmd1 = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --window-size=1440,1100 --screenshot="${outFile1}" "http://127.0.0.1:3000/services.html"`;
execSync(cmd1, { timeout: 15000 });
console.log('Saved services desktop screenshot to', outFile1);

