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
        const cards = doc.querySelectorAll('.advait-service-card');

        // Click All Services
        const allBtn = doc.querySelector('.cat-pill[data-filter="all"]');
        if (allBtn) allBtn.click();

        // Search for "database"
        const searchInput = doc.querySelector('#servicesSearchInput');
        if (searchInput) {
          searchInput.value = 'database';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          const vis = Array.from(cards).filter(c => c.style.display !== 'none').length;
          console.log('SEARCH_TEST:database_under_all:VIS=' + vis + (vis === 2 ? ':PASS' : ':FAIL'));
        }
      }, 600);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_search_all.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), 'chrome_srv_search_' + Date.now());
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=1366,768 --enable-logging=stderr "http://127.0.0.1:3000/test_search_all.html" 2>&1`;

try {
  const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
  out.split('\n').filter(l => l.includes('SEARCH_TEST:')).forEach(l => console.log('  ' + l.trim()));
} catch (e) {
  console.error('Test execution failed:', e.message);
}

if (fs.existsSync('test_search_all.html')) fs.unlinkSync('test_search_all.html');

