const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

async function auditAakashDesignation() {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_aakash_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1366,900',
    `--user-data-dir=${tempProfile}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const pages = await listRes.json();
    const wsUrl = pages[0].webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);

    let idCounter = 1;
    const pending = new Map();
    const consoleErrors = [];

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = idCounter++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Navigating to http://127.0.0.1:3000/about.html...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    // 1. Audit Leadership Profiles Data
    const profilesData = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leader-card'));
        return cards.map(c => ({
          name: c.querySelector('.advait-leader-name')?.innerText.trim(),
          role: c.querySelector('.advait-leader-role')?.innerText.trim(),
          badge: c.querySelector('.advait-leader-badge')?.innerText.trim(),
          creds: c.querySelector('.advait-leader-creds')?.innerText.trim()
        }));
      })()`,
      returnByValue: true
    });

    console.log('\n--- LEADERSHIP PROFILES DATA (about.html) ---');
    console.table(profilesData.result.value);

    // 2. Multi-viewport card layout & parity checks
    const viewports = [
      { name: 'desktop_1366', width: 1366, height: 900, mobile: false },
      { name: 'tablet_768', width: 768, height: 1024, mobile: false },
      { name: 'mobile_390', width: 390, height: 844, mobile: true }
    ];

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });
      await new Promise(r => setTimeout(r, 500));

      const metrics = await send('Runtime.evaluate', {
        expression: `(() => {
          const cards = Array.from(document.querySelectorAll('.advait-leader-card'));
          return cards.map(c => {
            const rect = c.getBoundingClientRect();
            return {
              name: c.querySelector('.advait-leader-name')?.innerText.trim(),
              role: c.querySelector('.advait-leader-role')?.innerText.trim(),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              top: Math.round(rect.top),
              left: Math.round(rect.left)
            };
          });
        })()`,
        returnByValue: true
      });

      console.log(`\n--- VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) ---`);
      console.table(metrics.result.value);

      // Scroll and capture screenshot
      await send('Runtime.evaluate', {
        expression: `document.getElementById('leadership').scrollIntoView({ behavior: 'instant', block: 'start' });`
      });
      await new Promise(r => setTimeout(r, 400));
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `leadership_aakash_cofounder_${vp.name}.png`), Buffer.from(ss.data, 'base64'));
      console.log(`Saved screenshot: leadership_aakash_cofounder_${vp.name}.png`);
    }

    // 3. Image loading check
    const imgAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('#leadership img'));
        return imgs.map(img => ({
          alt: img.alt,
          currentSrc: img.currentSrc,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        }));
      })()`,
      returnByValue: true
    });

    console.log('\n--- LEADERSHIP IMAGES LOAD AUDIT ---');
    console.table(imgAudit.result.value);

    // 4. Verify no old designations exist on the page
    const residualCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const bodyText = document.body.innerText;
        const oldPhrases = [
          'Joint Managing Director & Chief Technology Officer',
          'Joint Managing Director & CTO',
          'Joint MD & CTO'
        ];
        return oldPhrases.filter(p => bodyText.includes(p));
      })()`,
      returnByValue: true
    });

    console.log('\nResidual Old Designations Check (must be empty):', residualCheck.result.value);
    console.log('Console Errors:', consoleErrors.length ? consoleErrors : 'None (0 errors)');

    ws.close();
    proc.kill();
    setTimeout(() => {
      try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
    }, 1000);

    if (residualCheck.result.value.length === 0 && consoleErrors.length === 0) {
      console.log('\n✅ ALL AAKASH DESIGNATION AUDITS PASSED WITH 0 ERRORS!');
      process.exit(0);
    } else {
      console.error('\n❌ AUDIT FAILED!');
      process.exit(1);
    }
  } catch (err) {
    console.error('Audit failed with error:', err);
    try { proc.kill(); } catch (e) {}
    process.exit(1);
  }
}

auditAakashDesignation();

