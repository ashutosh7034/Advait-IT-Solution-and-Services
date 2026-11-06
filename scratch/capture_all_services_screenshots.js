const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'services_after_1366x768.png', width: 1366, height: 768 },
  { name: 'services_1920x1080.png', width: 1920, height: 1080 },
  { name: 'services_1280x720.png', width: 1280, height: 720 },
  { name: 'services_768x1024.png', width: 768, height: 1024 },
  { name: 'services_390x844.png', width: 390, height: 844 },
  { name: 'services_360x800.png', width: 360, height: 800 }
];

viewports.forEach(vp => {
  const targetFile = path.join(outDir, vp.name);
  const tempProfile = path.join(os.tmpdir(), 'chrome_srv_snap_' + vp.width + '_' + Date.now());
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=${vp.width},${vp.height} --screenshot="${targetFile}" "http://127.0.0.1:3000/services.html" 2>&1`;
  try {
    execSync(cmd, { timeout: 15000, encoding: 'utf8' });
    console.log(`✓ Saved ${vp.name} (${vp.width}x${vp.height})`);
  } catch (e) {
    console.error(`Failed ${vp.name}:`, e.message);
  }
});

// Interactive: capture filtered state
const filterTestScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/services.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.cat-pill[data-filter="web-dev"]');
        if (btn) btn.click();
      }, 500);
    };
  </script>
</body>
</html>`;
fs.writeFileSync('test_filter_snap.html', filterTestScript, 'utf8');

const filterTarget = path.join(outDir, 'services_filtered_web_apps.png');
const tempProfileF = path.join(os.tmpdir(), 'chrome_srv_filter_' + Date.now());
const cmdF = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfileF}" --virtual-time-budget=2000 --window-size=1366,768 --screenshot="${filterTarget}" "http://127.0.0.1:3000/test_filter_snap.html" 2>&1`;
try {
  execSync(cmdF, { timeout: 15000, encoding: 'utf8' });
  console.log(`✓ Saved services_filtered_web_apps.png`);
} catch (e) {
  console.error(`Failed services_filtered_web_apps:`, e.message);
}
if (fs.existsSync('test_filter_snap.html')) fs.unlinkSync('test_filter_snap.html');

// Interactive: capture modal dialog
const modalTestScript = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0;">
  <iframe id="f" src="/services.html" style="width: 100vw; height: 100vh; border: none;"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const btn = doc.querySelector('.service-explore-btn[data-service-id="web-dev"]');
        if (btn) btn.click();
      }, 500);
    };
  </script>
</body>
</html>`;
fs.writeFileSync('test_modal_snap.html', modalTestScript, 'utf8');

const modalTarget = path.join(outDir, 'services_modal_verified.png');
const tempProfileM = path.join(os.tmpdir(), 'chrome_srv_modal_' + Date.now());
const cmdM = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfileM}" --virtual-time-budget=2500 --window-size=1366,768 --screenshot="${modalTarget}" "http://127.0.0.1:3000/test_modal_snap.html" 2>&1`;
try {
  execSync(cmdM, { timeout: 15000, encoding: 'utf8' });
  console.log(`✓ Saved services_modal_verified.png`);
} catch (e) {
  console.error(`Failed services_modal_verified:`, e.message);
}
if (fs.existsSync('test_modal_snap.html')) fs.unlinkSync('test_modal_snap.html');

