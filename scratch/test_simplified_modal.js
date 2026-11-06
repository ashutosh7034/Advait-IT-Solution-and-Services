const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\simplified_audit';

const testPageHtml = `<!DOCTYPE html>
<html>
<body style="margin: 0;">
  <iframe id="f" src="/services.html" style="width: 1440px; height: 900px; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.service-explore-btn');
        if (btn) {
          btn.click();
        }
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_modal_harness.html', testPageHtml, 'utf8');

const tempProfile = path.join(os.tmpdir(), `chrome_modal_${Date.now()}`);
const outFile = path.join(outDir, 'services_modal_verified.png');

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outFile}" "http://127.0.0.1:3000/test_modal_harness.html"`;

try {
  execSync(cmd, { timeout: 25000 });
  console.log('✓ Modal screenshot saved:', outFile);
} catch (err) {
  console.error(err);
} finally {
  if (fs.existsSync('test_modal_harness.html')) fs.unlinkSync('test_modal_harness.html');
}

