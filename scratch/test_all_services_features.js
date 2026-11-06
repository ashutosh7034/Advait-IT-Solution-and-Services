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

        // Test 1: Test all categories
        const categories = [
          { cat: 'all', exp: 14 },
          { cat: 'web-dev', exp: 4 },
          { cat: 'software-dev', exp: 2 },
          { cat: 'mobile-dev', exp: 1 },
          { cat: 'cloud-devops', exp: 3 },
          { cat: 'qa-security', exp: 2 },
          { cat: 'it-consulting', exp: 2 }
        ];

        categories.forEach(item => {
          const btn = doc.querySelector('.cat-pill[data-filter="' + item.cat + '"]');
          if (btn) {
            btn.click();
            const vis = Array.from(cards).filter(c => c.style.display !== 'none').length;
            console.log('CAT_TEST:' + item.cat + ':VIS=' + vis + ':EXP=' + item.exp + (vis === item.exp ? ':PASS' : ':FAIL'));
          }
        });

        // Test 2: Search for "database"
        const searchInput = doc.querySelector('#servicesSearchInput');
        if (searchInput) {
          searchInput.value = 'database';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          const vis = Array.from(cards).filter(c => c.style.display !== 'none').length;
          console.log('SEARCH_TEST:database:VIS=' + vis + (vis > 0 ? ':PASS' : ':FAIL'));
        }

        // Test 3: Reset search
        const clearBtn = doc.querySelector('#servicesSearchClear');
        if (clearBtn) {
          clearBtn.click();
          const allBtn = doc.querySelector('.cat-pill[data-filter="all"]');
          if (allBtn) allBtn.click();
        }

        // Test 4: Test modal opening on formerly mismatched cards
        const testIds = ['hosting-domain', 'qa-testing', 'cybersecurity', 'api-database', 'seo-optimization'];
        testIds.forEach(id => {
          const btn = doc.querySelector('.service-explore-btn[data-service-id="' + id + '"]');
          if (btn) {
            btn.click();
            const titleEl = doc.querySelector('#modalServiceTitle');
            const title = titleEl ? titleEl.textContent : '';
            console.log('MODAL_CHECK:' + id + ':TITLE=' + title + (title.length > 0 ? ':PASS' : ':FAIL'));
            // Close modal
            const closeBtn = doc.querySelector('#serviceModalCloseBtn');
            if (closeBtn) closeBtn.click();
          } else {
            console.log('MODAL_CHECK:' + id + ':BTN_NOT_FOUND:FAIL');
          }
        });

      }, 800);
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_all_services.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), 'chrome_srv_all_' + Date.now());
const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=4000 --window-size=1366,768 --enable-logging=stderr "http://127.0.0.1:3000/test_all_services.html" 2>&1`;

try {
  const out = execSync(cmd, { timeout: 15000, encoding: 'utf8' });
  out.split('\n').filter(l => l.includes('CAT_TEST:') || l.includes('SEARCH_TEST:') || l.includes('MODAL_CHECK:')).forEach(l => console.log('  ' + l.trim()));
} catch (e) {
  console.error('Test execution failed:', e.message);
}

if (fs.existsSync('test_all_services.html')) fs.unlinkSync('test_all_services.html');

