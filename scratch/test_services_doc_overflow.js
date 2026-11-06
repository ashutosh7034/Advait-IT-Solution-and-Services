const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const widths = [320, 360, 375, 390, 414, 768, 1024, 1366, 1920];

const testScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/services.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const root = doc.documentElement;
        console.log('DOC_OVERFLOW:' + (root.scrollWidth - root.clientWidth));
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_srv_ovf.html', testScript, 'utf8');

widths.forEach(w => {
  const tempProfile = path.join(os.tmpdir(), 'chrome_srv_ovf_' + w + '_' + Date.now());
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=1500 --window-size=${w},800 --enable-logging=stderr "http://127.0.0.1:3000/test_srv_ovf.html" 2>&1`;
  try {
    const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    const match = out.match(/DOC_OVERFLOW:(\d+)/);
    const ovf = match ? match[1] : 'unknown';
    console.log('Viewport ' + w + 'px: ' + (ovf === '0' ? '✓ 0px document overflow (PASS)' : '❌ ' + ovf + 'px overflow'));
  } catch (e) {
    console.error('Viewport ' + w + 'px failed:', e.message);
  }
});

if (fs.existsSync('test_srv_ovf.html')) fs.unlinkSync('test_srv_ovf.html');

