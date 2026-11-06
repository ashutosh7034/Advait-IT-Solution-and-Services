const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const testScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/services.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const hero = doc.querySelector('.services-hero-compact');
        const toolbar = doc.querySelector('.services-toolbar-card');
        const firstCard = doc.querySelector('.advait-service-card');
        
        const hRect = hero.getBoundingClientRect();
        const tRect = toolbar.getBoundingClientRect();
        const cRect = firstCard.getBoundingClientRect();
        
        console.log('HERO_TOP:' + Math.round(hRect.top) + ':BOTTOM:' + Math.round(hRect.bottom) + ':HEIGHT:' + Math.round(hRect.height));
        console.log('TOOLBAR_TOP:' + Math.round(tRect.top) + ':BOTTOM:' + Math.round(tRect.bottom));
        console.log('FIRST_CARD_TOP:' + Math.round(cRect.top) + ':BOTTOM:' + Math.round(cRect.bottom) + ':HEIGHT:' + Math.round(cRect.height));
        console.log('CARD_VISIBLE_IN_768:' + (cRect.top < 768 ? 'YES' : 'NO') + ':PIXELS_VISIBLE:' + Math.round(Math.min(768, cRect.bottom) - cRect.top));
      }, 500);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_srv_fold.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), 'chrome_srv_fold_' + Date.now());
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1366,768 --enable-logging=stderr "http://127.0.0.1:3000/test_srv_fold.html" 2>&1`;

try {
  const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
  out.split('\n').filter(l => l.includes('_TOP:') || l.includes('IN_768:')).forEach(l => console.log('  ' + l.trim()));
} catch (e) {
  console.error('Test execution failed:', e.message);
}

if (fs.existsSync('test_srv_fold.html')) fs.unlinkSync('test_srv_fold.html');

