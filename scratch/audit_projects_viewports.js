const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\projects_audit';

const viewports = [
  { name: '1920x1080', w: 1920, h: 1080 },
  { name: '1366x768', w: 1366, h: 768 },
  { name: '1280x720', w: 1280, h: 720 },
  { name: '768x1024', w: 768, h: 1024 },
  { name: '390x844', w: 390, h: 844 },
  { name: '360x800', w: 360, h: 800 }
];

console.log('=== MULTI-VIEWPORT AUDIT FOR PROJECTS.HTML ===\n');

viewports.forEach(vp => {
  const tempProfile = path.join(os.tmpdir(), `chrome_proj_vp_${vp.name}_${Date.now()}`);
  const outFile = path.join(outDir, `projects_${vp.name}.png`);
  
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=2000 --window-size=${vp.w},${vp.h} --screenshot="${outFile}" "http://127.0.0.1:3000/projects.html"`;
  try {
    execSync(cmd, { timeout: 25000 });
    const stat = fs.statSync(outFile);
    console.log(`✓ [${vp.name}] -> Saved (${stat.size} bytes)`);
  } catch (err) {
    console.error(`❌ [${vp.name}] failed: ${err.message}`);
  }
});

console.log('\nAll viewport captures saved to:', outDir);

