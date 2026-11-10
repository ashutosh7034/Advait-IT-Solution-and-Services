const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

async function runBrowserAudit() {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_mandal_' + Math.random().toString(36).substring(7));
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
    await new Promise(r => setTimeout(r, 2000));

    // Audit Card Content
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const card = document.getElementById('md-profile');
        if (!card) return { error: 'Card not found' };

        const name = card.querySelector('.advait-leader-name')?.innerText.trim();
        const role = card.querySelector('.advait-leader-role')?.innerText.trim();
        const creds = card.querySelector('.advait-leader-creds')?.innerText.trim();
        const badge = card.querySelector('.advait-leader-badge')?.innerText.trim();
        const bio = card.querySelector('.advait-leader-bio')?.innerText.trim();
        const focusTitle = card.querySelector('.advait-leader-focus-title span')?.innerText.trim();
        const tags = Array.from(card.querySelectorAll('.advait-leader-tag')).map(t => t.innerText.trim());
        const highlights = Array.from(card.querySelectorAll('.advait-leader-highlights span')).map(h => h.innerText.trim());
        const tel = card.querySelector('a[href^="tel:"]');
        const mail = card.querySelector('a[href^="mailto:"]');

        return {
          name,
          role,
          creds,
          badge,
          bio,
          focusTitle,
          tags,
          highlights,
          telHref: tel ? tel.getAttribute('href') : null,
          telText: tel ? tel.innerText.trim() : null,
          mailHref: mail ? mail.getAttribute('href') : null,
          mailText: mail ? mail.innerText.trim() : null
        };
      })()`,
      returnByValue: true
    });

    console.log('\n=============================================');
    console.log('JAYINISH KUMAR MANDAL CARD AUDIT:');
    console.log(JSON.stringify(evalResult.result.value, null, 2));
    console.log('=============================================\n');

    // Test across viewports
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
      await new Promise(r => setTimeout(r, 600));

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

      // Scroll to leadership section and capture screenshot
      await send('Runtime.evaluate', {
        expression: `document.getElementById('leadership').scrollIntoView({ behavior: 'instant', block: 'start' });`
      });
      await new Promise(r => setTimeout(r, 500));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const imgBuffer = Buffer.from(screenshot.data, 'base64');
      const filename = `mandal_corporate_coo_${vp.name}.png`;
      fs.writeFileSync(path.join(artifactDir, filename), imgBuffer);
      console.log(`Saved screenshot: ${filename} (${imgBuffer.length} bytes)`);
    }

    // Image loading audit
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

    console.log('\n--- LEADERSHIP IMAGES LOAD STATUS ---');
    console.table(imgAudit.result.value);

    // Verify no academic text on page for Mandal
    const academicCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const cardText = document.getElementById('md-profile').innerText;
        const terms = [
          'Assistant Professor', 'Dy. HOD', 'Deputy Head', 'HOD',
          'Teaching Experience', 'Academic Mentorship', 'UG/PG',
          'BSc IT', 'BSc CS', 'BCA', 'MCA Projects', 'Guided 65+',
          'PhD'
        ];
        const matches = [];
        for (const t of terms) {
          if (cardText.includes(t)) matches.push(t);
        }
        return matches;
      })()`,
      returnByValue: true
    });

    console.log('\n--- ACADEMIC RESIDUAL CHECK IN MANDAL CARD ---');
    console.log('Matches (must be 0):', academicCheck.result.value);

    console.log('\nConsole Errors:', consoleErrors.length ? consoleErrors : 'None (0 errors)');

    ws.close();
    proc.kill();

    // Clean up temp profile safely with retry
    setTimeout(() => {
      try {
        fs.rmSync(tempProfile, { recursive: true, force: true });
      } catch (e) {}
    }, 1000);

    if (academicCheck.result.value.length === 0 && consoleErrors.length === 0) {
      console.log('\n[PASS] ALL VERIFICATION CHECKS PASSED WITH 0 ERRORS!');
      process.exit(0);
    } else {
      console.error('\n[FAIL] VERIFICATION FAILED!');
      process.exit(1);
    }
  } catch (err) {
    console.error('Audit failed with error:', err);
    try { proc.kill(); } catch (e) {}
    process.exit(1);
  }
}

runBrowserAudit();
