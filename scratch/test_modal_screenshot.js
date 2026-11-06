const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

let servicesHtml = fs.readFileSync('services.html', 'utf8');

// Inject inline opener that executes after everything is loaded
servicesHtml = servicesHtml.replace('</body>', `
<script>
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const btn = document.querySelector('.service-explore-btn[data-service-id="cybersecurity"]');
    if (btn) btn.click();
  }, 200);
});
</script>
</body>`);

fs.writeFileSync('test_modal_cyber.html', servicesHtml);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';
const tempProfile = path.join(os.tmpdir(), 'chrome_modal_cyber_' + Date.now());
const outFile = path.join(outDir, 'modal_cybersecurity_rendered.png');

// wait for 1 sec before screenshot
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1200,900 --screenshot="${outFile}" "http://127.0.0.1:3000/test_modal_cyber.html"`;
execSync(cmd, { timeout: 15000 });
console.log('Saved modal screenshot to', outFile);

fs.unlinkSync('test_modal_cyber.html');
