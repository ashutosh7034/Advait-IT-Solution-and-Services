const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit\\current_services_view.png';

execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1366,768 --screenshot="${target}" "http://127.0.0.1:3000/services.html"`);
console.log('Saved to', target);

