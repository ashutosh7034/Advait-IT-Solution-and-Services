const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// We can test dropdown open state in services.html
// Let's create an evaluation test:
// We'll run a headless chrome instance that triggers click on .dropdown-toggle or adds .is-open
// To demonstrate real user interaction, let's create a lightweight test page or script that runs on the live server
const testPageHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dropdown Live Interaction Test</title>
</head>
<body style="margin: 0; padding: 0;">
  <iframe id="appFrame" src="/services.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const frame = document.getElementById('appFrame');
    frame.onload = () => {
      setTimeout(() => {
        const doc = frame.contentDocument || frame.contentWindow.document;
        const toggle = doc.querySelector('.dropdown-toggle');
        if (toggle) {
          console.log('Clicking dropdown toggle...');
          toggle.click();
        }
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_dropdown_harness.html', testPageHtml, 'utf8');

const tempProfile = path.join(os.tmpdir(), `chrome_dropdown_test_${Date.now()}`);
const outFile = path.join(outDir, 'dropdown_interaction_verified.png');

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outFile}" "http://127.0.0.1:3000/test_dropdown_harness.html"`;

try {
  execSync(cmd, { timeout: 25000 });
  const stat = fs.statSync(outFile);
  console.log(`✓ Dropdown screenshot captured: ${outFile} (${stat.size} bytes)`);
} catch (err) {
  console.error(`❌ Screenshot failed: ${err.message}`);
} finally {
  if (fs.existsSync('test_dropdown_harness.html')) {
    fs.unlinkSync('test_dropdown_harness.html');
  }
}

