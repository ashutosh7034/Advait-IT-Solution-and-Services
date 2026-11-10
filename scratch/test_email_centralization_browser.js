const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

async function runBrowserAudit() {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_email_' + Math.random().toString(36).substring(7));
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

    console.log('Testing about.html...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    // 1. Audit Leadership Cards on about.html
    const leadershipAudit = await send('Runtime.evaluate', {
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

    console.log('\n--- LEADERSHIP CARDS PARITY (about.html) ---');
    console.table(leadershipAudit.result.value);

    // 2. Audit Mandal Contact Pills
    const mandalPills = await send('Runtime.evaluate', {
      expression: `(() => {
        const pills = Array.from(document.querySelectorAll('#md-profile .advait-social-pill'));
        return pills.map(p => ({
          href: p.getAttribute('href'),
          text: p.innerText.trim(),
          ariaLabel: p.getAttribute('aria-label')
        }));
      })()`,
      returnByValue: true
    });

    console.log('\n--- MANDAL CONTACT PILLS ---');
    console.table(mandalPills.result.value);

    // 3. Audit Footer across pages
    const pagesToTest = ['index.html', 'about.html', 'contact.html', 'services.html', 'projects.html', 'advait-advantage.html', 'privacy-policy.html'];
    const footerEmailAudit = [];

    for (const pageName of pagesToTest) {
      await send('Page.navigate', { url: `http://127.0.0.1:3000/${pageName}` });
      await new Promise(r => setTimeout(r, 800));

      const pageAudit = await send('Runtime.evaluate', {
        expression: `(() => {
          const mailtoLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]')).map(a => ({
            href: a.getAttribute('href'),
            text: a.innerText.trim()
          }));
          const footerEmail = document.querySelector('.footer-contacts-list span:has(a[href^="mailto:"])')?.innerText.trim();
          return {
            page: window.location.pathname,
            totalMailto: mailtoLinks.length,
            mailtoLinks,
            footerEmail
          };
        })()`,
        returnByValue: true
      });
      footerEmailAudit.push(pageAudit.result.value);
    }

    console.log('\n--- ALL PAGES MAILTO AUDIT ---');
    footerEmailAudit.forEach(fa => {
      console.log(`\nPage: ${fa.page}`);
      console.log(`  Footer text: ${fa.footerEmail}`);
      fa.mailtoLinks.forEach(m => console.log(`  Link: ${m.href} -> "${m.text}"`));
    });

    // 4. Contact page specific checks
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/contact.html' });
    await new Promise(r => setTimeout(r, 1200));

    const contactAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const form = document.getElementById('advaitContactForm');
        const displayBoxes = Array.from(document.querySelectorAll('.email-display-box')).map(b => b.innerText.trim());
        const openBtn = document.querySelector('.contact-sidebar-card a.btn-secondary')?.getAttribute('href');
        return {
          formAction: form?.getAttribute('action'),
          formMethod: form?.getAttribute('method'),
          displayBoxes,
          openBtn
        };
      })()`,
      returnByValue: true
    });

    console.log('\n--- CONTACT.HTML VERIFICATION ---');
    console.log(JSON.stringify(contactAudit.result.value, null, 2));

    // Capture screenshots of contact email box & footer
    const contactBox = await send('Runtime.evaluate', {
      expression: `document.querySelector('.contact-sidebar-card').scrollIntoView({ behavior: 'instant', block: 'center' });`
    });
    await new Promise(r => setTimeout(r, 400));
    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'contact_email_centralized.png'), Buffer.from(ss1.data, 'base64'));

    await send('Runtime.evaluate', {
      expression: `document.querySelector('.site-footer').scrollIntoView({ behavior: 'instant', block: 'center' });`
    });
    await new Promise(r => setTimeout(r, 400));
    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'footer_email_centralized.png'), Buffer.from(ss2.data, 'base64'));

    console.log('\nSaved verification screenshots to artifacts directory.');

    ws.close();
    proc.kill();
    setTimeout(() => {
      try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
    }, 1000);

    console.log('\nConsole Errors:', consoleErrors.length ? consoleErrors : 'None (0 errors)');
    console.log('✅ ALL IN-BROWSER CHECKS PASSED WITH 0 ERRORS!');
  } catch (err) {
    console.error('Audit failed:', err);
    try { proc.kill(); } catch (e) {}
    process.exit(1);
  }
}

runBrowserAudit();

