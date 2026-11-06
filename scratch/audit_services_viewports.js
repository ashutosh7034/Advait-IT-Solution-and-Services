const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\services_audit';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: 'desktop_1920', w: 1920, h: 1080 },
  { name: 'desktop_1440', w: 1440, h: 900 },
  { name: 'laptop_1366', w: 1366, h: 768 },
  { name: 'small_laptop_1024', w: 1024, h: 768 },
  { name: 'tablet_768', w: 768, h: 1024 },
  { name: 'mobile_390', w: 390, h: 844 },
  { name: 'mobile_375', w: 375, h: 667 },
  { name: 'mobile_320', w: 320, h: 568 }
];

console.log('=== RUNNING MULTI-VIEWPORT BROWSER AUDIT FOR SERVICES.HTML ===\n');

viewports.forEach(vp => {
  const tempProfile = path.join(os.tmpdir(), `chrome_svc_vp_${vp.name}_${Date.now()}`);
  const outFile = path.join(outDir, `services_${vp.name}.png`);
  
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=1500 --window-size=${vp.w},${vp.h} --screenshot="${outFile}" "http://127.0.0.1:3000/services.html"`;
  try {
    execSync(cmd, { timeout: 20000 });
    const stat = fs.statSync(outFile);
    console.log(`✓ [${vp.name}] ${vp.w}x${vp.h} -> Saved (${stat.size} bytes)`);
  } catch (err) {
    console.error(`❌ [${vp.name}] ${vp.w}x${vp.h} failed: ${err.message}`);
  }
});

console.log('\nAudit screenshots saved to:', outDir);

