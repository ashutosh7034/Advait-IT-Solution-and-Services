const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = ['index.html', 'services.html', 'about.html', 'advait-advantage.html'];
const widths = [320, 360, 390, 768, 1366, 1920];

pages.forEach(pg => {
  const testScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/${pg}" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const root = doc.documentElement;
        console.log('PG:${pg}:OVF:' + (root.scrollWidth - root.clientWidth));
      }, 500);
    };
  </script>
</body>
</html>`;

  fs.writeFileSync('test_ovf_temp.html', testScript, 'utf8');

  widths.forEach(w => {
    const tempProfile = path.join(os.tmpdir(), 'chrome_ovf_' + w + '_' + Date.now());
    const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=1500 --window-size=${w},800 --enable-logging=stderr "http://127.0.0.1:3000/test_ovf_temp.html" 2>&1`;
    try {
      const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
      const m = out.match(/PG:[^:]+:OVF:(\d+)/);
      const ovf = m ? m[1] : 'unknown';
      console.log(`${pg} @ ${w}px: ${ovf === '0' ? '✓ 0px overflow (PASS)' : '❌ ' + ovf + 'px overflow'}`);
    } catch (e) {
      console.error(`${pg} @ ${w}px failed:`, e.message);
    }
  });

  if (fs.existsSync('test_ovf_temp.html')) fs.unlinkSync('test_ovf_temp.html');
});
