const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const testScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/projects.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const win = f.contentWindow;
        const cWidth = doc.documentElement.clientWidth;
        const culprits = [];
        
        doc.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > cWidth + 1) {
            culprits.push({
              tag: el.tagName,
              id: el.id,
              class: el.className,
              right: rect.right,
              cWidth: cWidth,
              diff: rect.right - cWidth
            });
          }
        });
        
        console.log('CULPRITS:' + JSON.stringify(culprits.slice(0, 10)));
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_find_culprits.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), 'chrome_culp_' + Date.now());
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=375,800 --enable-logging=stderr "http://127.0.0.1:3000/test_find_culprits.html"`;

try {
  execSync(cmd, { timeout: 15000 });
} catch (e) {
  //
} finally {
  if (fs.existsSync('test_find_culprits.html')) fs.unlinkSync('test_find_culprits.html');
}

