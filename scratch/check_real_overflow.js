const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const viewports = [1920, 1440, 1366, 1024, 768, 390, 375, 320];

// We inject a small script into services.html that writes a file if overflow exists
let servicesHtml = fs.readFileSync('services.html', 'utf8');

const testScript = `
<script>
window.addEventListener('load', () => {
  setTimeout(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    const isOverflowing = sw > cw;
    const status = {
      viewport: window.innerWidth,
      scrollWidth: sw,
      clientWidth: cw,
      overflowPx: sw - cw,
      isOverflowing: isOverflowing
    };
    
    // Store in localStorage or page element for verification
    const div = document.createElement('div');
    div.id = 'overflow-test-result';
    div.dataset.result = JSON.stringify(status);
    document.body.appendChild(div);
  }, 400);
});
</script>
`;

// But with headless Chrome, we can also just run CDP or capture screenshot with --hide-scrollbars
viewports.forEach(w => {
  const tempProfile = path.join(os.tmpdir(), `chk_of_${w}_${Date.now()}`);
  const outShot = path.join(os.tmpdir(), `test_of_${w}.png`);
  try {
    execSync(`"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --window-size=${w},800 --screenshot="${outShot}" "http://127.0.0.1:3000/services.html"`, { timeout: 15000 });
    console.log(`✓ Viewport ${w}px rendered successfully`);
  } catch (e) {
    console.error(`✗ Viewport ${w}px failed:`, e.message);
  }
});

