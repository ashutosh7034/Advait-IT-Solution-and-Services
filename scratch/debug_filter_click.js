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
      try {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.filter-btn[data-filter="business-software"]');
        console.log('BTN_FOUND:', !!btn);
        if (btn) {
          btn.click();
          setTimeout(() => {
            const activeBtn = doc.querySelector('.filter-btn.active');
            const visibleCards = doc.querySelectorAll('#projectsGallery .project-card');
            console.log('ACTIVE_BTN:', activeBtn ? activeBtn.getAttribute('data-filter') : 'none');
            console.log('VISIBLE_CARDS_COUNT:', visibleCards.length);
          }, 200);
        }
      } catch (e) {
        console.log('ERR:', e.message);
      }
    };
  </script>
</body>
</html>`;

fs.writeFileSync('test_filter_debug.html', testScript, 'utf8');

const tempProfile = path.join(os.tmpdir(), `chrome_fdeb_${Date.now()}`);

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --enable-logging=stderr "http://127.0.0.1:3000/test_filter_debug.html"`;

try {
  execSync(cmd, { timeout: 15000 });
} catch (e) {
  //
} finally {
  if (fs.existsSync('test_filter_debug.html')) fs.unlinkSync('test_filter_debug.html');
}

