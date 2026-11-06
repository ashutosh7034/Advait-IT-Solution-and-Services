const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\simplified_audit';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const pages = [
  { name: 'services', url: 'http://127.0.0.1:3000/services.html' },
  { name: 'home', url: 'http://127.0.0.1:3000/index.html' },
  { name: 'about', url: 'http://127.0.0.1:3000/about.html' },
  { name: 'advantage', url: 'http://127.0.0.1:3000/advait-advantage.html' },
  { name: 'projects', url: 'http://127.0.0.1:3000/projects.html' },
  { name: 'contact', url: 'http://127.0.0.1:3000/contact.html' }
];

const viewports = [
  { name: 'desktop_1440', w: 1440, h: 900 },
  { name: 'tablet_768', w: 768, h: 1024 },
  { name: 'mobile_375', w: 375, h: 667 }
];

console.log('=== RUNNING COMPREHENSIVE BROWSER AUDIT ACROSS ALL SIMPLIFIED PAGES ===\n');

pages.forEach(p => {
  viewports.forEach(vp => {
    const tempProfile = path.join(os.tmpdir(), `chrome_audit_${p.name}_${vp.name}_${Date.now()}`);
    const outFile = path.join(outDir, `${p.name}_${vp.name}.png`);
    
    const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=${vp.w},${vp.h} --screenshot="${outFile}" "${p.url}"`;
    try {
      execSync(cmd, { timeout: 25000 });
      const stat = fs.statSync(outFile);
      console.log(`✓ [${p.name}] ${vp.name} (${vp.w}x${vp.h}) -> Saved (${stat.size} bytes)`);
    } catch (err) {
      console.error(`❌ [${p.name}] ${vp.name} failed: ${err.message}`);
    }
  });
});

console.log('\nAudit complete! Screenshots saved to:', outDir);

