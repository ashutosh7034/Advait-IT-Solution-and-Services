const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\projects_audit';

// Test 1: Category filter click (Business Software)
const testFilterHtml = `<!DOCTYPE html>
<html>
<body style="margin: 0;">
  <iframe id="f" src="/projects.html" style="width: 1440px; height: 900px; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.filter-btn[data-filter="business-software"]');
        if (btn) btn.click();
      }, 500);
    };
  </script>
</body>
</html>`;
fs.writeFileSync('test_filter_harness.html', testFilterHtml, 'utf8');

const p1 = path.join(os.tmpdir(), `chrome_filt_${Date.now()}`);
const outFilt = path.join(outDir, 'projects_filtered_business.png');
execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${p1}" --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outFilt}" "http://127.0.0.1:3000/test_filter_harness.html"`);
console.log('✓ Filter screenshot saved');

// Test 2: Project Modal Dialog
const testModalHtml = `<!DOCTYPE html>
<html>
<body style="margin: 0;">
  <iframe id="f" src="/projects.html" style="width: 1440px; height: 900px; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.view-project-btn');
        if (btn) btn.click();
      }, 500);
    };
  </script>
</body>
</html>`;
fs.writeFileSync('test_proj_modal_harness.html', testModalHtml, 'utf8');

const p2 = path.join(os.tmpdir(), `chrome_pmod_${Date.now()}`);
const outMod = path.join(outDir, 'project_modal_verified.png');
execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${p2}" --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outMod}" "http://127.0.0.1:3000/test_proj_modal_harness.html"`);
console.log('✓ Project modal screenshot saved');

// Clean up
if (fs.existsSync('test_filter_harness.html')) fs.unlinkSync('test_filter_harness.html');
if (fs.existsSync('test_proj_modal_harness.html')) fs.unlinkSync('test_proj_modal_harness.html');

