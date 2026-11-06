const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const testScript = `<!DOCTYPE html>
<html>
<body>
  <iframe id="f" src="/projects.html"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const badge = doc.querySelector('.project-badge-category');
        if (badge) {
          const comp = f.contentWindow.getComputedStyle(badge);
          console.log('BADGE_INFO:' + JSON.stringify({
            width: comp.width,
            height: comp.height,
            display: comp.display,
            position: comp.position,
            top: comp.top,
            left: comp.left,
            bottom: comp.bottom,
            right: comp.right,
            borderRadius: comp.borderRadius,
            background: comp.backgroundColor
          }));
        }
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_badge_inspect.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), `chrome_badge_${Date.now()}`);

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --enable-logging=stderr "http://127.0.0.1:3000/test_badge_inspect.html"`;

try {
  const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
  console.log('Chrome Output:\n', out);
} catch (e) {
  console.log('Error/Output:\n', e.stdout || e.stderr || e.message);
} finally {
  if (fs.existsSync('test_badge_inspect.html')) fs.unlinkSync('test_badge_inspect.html');
}

