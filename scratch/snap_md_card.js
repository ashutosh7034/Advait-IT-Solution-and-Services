const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\leadership_audit';

function captureCard(width, height, filename) {
  const harnessHtml = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; overflow: hidden;">
  <iframe id="frame" src="/about.html" style="width: ${width}px; height: ${height}px; border: none;"></iframe>
  <script>
    const f = document.getElementById('frame');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const target = doc.getElementById('md-profile') || doc.getElementById('leadership');
        if (target) {
          const rect = target.getBoundingClientRect();
          f.contentWindow.scrollTo(0, f.contentWindow.scrollY + rect.top - 20);
        }
      }, 300);
    };
  </script>
</body>
</html>`;

  fs.writeFileSync('test_md_harness.html', harnessHtml, 'utf8');

  const targetFile = path.join(outDir, filename);
  const tempProfile = path.join(os.tmpdir(), 'chrome_md_snap_' + Date.now());
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2500 --window-size=${width},${height} --screenshot="${targetFile}" "http://127.0.0.1:3000/test_md_harness.html" 2>&1`;

  try {
    execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    console.log(`✓ Saved ${filename}`);
  } catch (e) {
    console.error(`✗ Error:`, e.message);
  } finally {
    if (fs.existsSync('test_md_harness.html')) fs.unlinkSync('test_md_harness.html');
  }
}

console.log('Capturing MD card...');
captureCard(1366, 850, 'md_card_desktop_1366.png');
captureCard(768, 950, 'md_card_tablet_768.png');
captureCard(390, 844, 'md_card_mobile_390.png');

