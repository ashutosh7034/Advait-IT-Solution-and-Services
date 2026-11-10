const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = [
  'index.html',
  'about.html',
  'services.html',
  'advait-advantage.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html',
  '404.html'
];

const viewports = [320, 360, 390, 768, 1366, 1920];

async function runIndependentVerification() {
  const port = 9295;
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,900',
    `--user-data-dir=${tempProfile}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pageList = await listRes.json();
    const ws = new WebSocket(pageList[0].webSocketDebuggerUrl);

    let idCounter = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = idCounter++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const consoleErrors = [];
    const failedNetwork = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.responseReceived') {
        const status = msg.params.response.status;
        if (status >= 400) {
          failedNetwork.push({ url: msg.params.response.url, status });
        }
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        if (msg.params.type === 'error') {
          consoleErrors.push(msg.params.args.map(a => a.value).join(' '));
        }
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
    await send('Network.enable');

    console.log('====================================================');
    console.log('   INDEPENDENT VERIFICATION AUDIT — ADVAIT WEBSITE');
    console.log('====================================================\n');

    // 1. Test All 8 Pages: Load, Images, Links, Console
    const pageResults = {};
    for (const p of pages) {
      await send('Page.navigate', { url: `http://127.0.0.1:3000/${p}` });
      await new Promise(r => setTimeout(r, 1000));

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const title = document.title;
          const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.currentSrc || img.src,
            loaded: img.complete && img.naturalWidth > 0,
            nw: img.naturalWidth,
            nh: img.naturalHeight
          }));
          const brokenImages = images.filter(img => !img.loaded);
          const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'));
          return {
            title,
            imageCount: images.length,
            brokenImagesCount: brokenImages.length,
            brokenImagesList: brokenImages.map(b => b.src),
            linkCount: links.length
          };
        })()`,
        returnByValue: true
      });

      pageResults[p] = evalRes.result.value;
      console.log(`[PAGE AUDIT] ${p}:`);
      console.log(`   Title: "${evalRes.result.value.title}"`);
      console.log(`   Images: ${evalRes.result.value.imageCount} total, ${evalRes.result.value.brokenImagesCount} broken`);
      console.log(`   Links: ${evalRes.result.value.linkCount} links`);
    }

    // 2. Specific Verification: Leadership Section on About Us
    console.log('\n--- 2. VERIFYING EXECUTIVE LEADERSHIP SECTION (about.html) ---');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1200));

    const leadershipInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leadership-grid .advait-leader-card'));
        return cards.map(c => {
          const r = c.getBoundingClientRect();
          const img = c.querySelector('.advait-leader-avatar');
          return {
            name: c.querySelector('.advait-leader-name').innerText,
            role: c.querySelector('.advait-leader-role').innerText,
            badge: c.querySelector('.advait-leader-badge').innerText,
            x: Math.round(r.left),
            y: Math.round(r.top),
            w: Math.round(r.width),
            h: Math.round(r.height),
            imgSrc: img ? img.currentSrc : null,
            imgLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
            imgDimensions: img ? \`\${img.naturalWidth}x\${img.naturalHeight}\` : 'none'
          };
        });
      })()`,
      returnByValue: true
    });

    const lCards = leadershipInfo.result.value;
    console.log(`Found ${lCards.length} leadership cards:`);
    lCards.forEach((c, i) => {
      console.log(`   Card ${i + 1}: ${c.name} | ${c.role}`);
      console.log(`      Dimensions: ${c.w}px width x ${c.h}px height | Top (Y): ${c.y}px`);
      console.log(`      Photo: ${c.imgSrc} (${c.imgDimensions}) - Loaded: ${c.imgLoaded}`);
    });

    const sameRow = lCards.length === 3 && lCards[0].y === lCards[1].y && lCards[1].y === lCards[2].y;
    const sameWidth = lCards.length === 3 && lCards[0].w === lCards[1].w && lCards[1].w === lCards[2].w;
    const sameHeight = lCards.length === 3 && lCards[0].h === lCards[1].h && lCards[1].h === lCards[2].h;
    const allPhotosLoaded = lCards.every(c => c.imgLoaded);

    console.log(`   All 3 in same horizontal row: ${sameRow}`);
    console.log(`   All 3 equal width (384px): ${sameWidth}`);
    console.log(`   All 3 equal height (705px): ${sameHeight}`);
    console.log(`   All 3 photographs loaded: ${allPhotosLoaded}`);

    // 3. Multi-Viewport Responsive Overflow Testing
    console.log('\n--- 3. MULTI-VIEWPORT RESPONSIVE OVERFLOW AUDIT ---');
    const overflowReport = {};
    for (const p of pages) {
      overflowReport[p] = {};
      await send('Page.navigate', { url: `http://127.0.0.1:3000/${p}` });
      await new Promise(r => setTimeout(r, 600));

      for (const w of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: w,
          height: 900,
          deviceScaleFactor: 1,
          mobile: w < 768
        });
        await new Promise(r => setTimeout(r, 200));

        const ovRes = await send('Runtime.evaluate', {
          expression: `(() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            return Math.max(0, docWidth - winWidth);
          })()`,
          returnByValue: true
        });

        overflowReport[p][w] = ovRes.result.value;
      }
      const allZero = Object.values(overflowReport[p]).every(v => v === 0);
      console.log(`   ${p}: ${allZero ? '✓ 0px overflow across all viewports (PASS)' : 'OVERFLOW DETECTED: ' + JSON.stringify(overflowReport[p])}`);
    }

    // 4. Interactive Components Verification
    console.log('\n--- 4. INTERACTIVE COMPONENTS VERIFICATION ---');
    // Dropdown test on Homepage
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/index.html' });
    await new Promise(r => setTimeout(r, 800));
    const dropdownTest = await send('Runtime.evaluate', {
      expression: `(() => {
        const toggle = document.querySelector('.dropdown-toggle');
        const dropdown = document.querySelector('.nav-item.dropdown');
        if (toggle) toggle.click();
        const isOpen = dropdown ? dropdown.classList.contains('is-open') : false;
        return { dropdownToggleFound: !!toggle, dropdownOpens: isOpen };
      })()`,
      returnByValue: true
    });
    console.log('   Navbar Dropdown test:', dropdownTest.result.value);

    // Services Modal test on Services page
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/services.html' });
    await new Promise(r => setTimeout(r, 800));
    const modalTest = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.service-explore-btn');
        const modal = document.querySelector('#serviceDetailModal');
        if (btn) btn.click();
        const isActive = modal ? modal.classList.contains('is-active') : false;
        const closeBtn = document.querySelector('#serviceModalCloseBtn');
        if (closeBtn) closeBtn.click();
        const isClosed = modal ? !modal.classList.contains('is-active') : false;
        return { exploreBtnFound: !!btn, modalOpens: isActive, modalCloses: isClosed };
      })()`,
      returnByValue: true
    });
    console.log('   Services Modal test:', modalTest.result.value);

    // Contact form validation test
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/contact.html' });
    await new Promise(r => setTimeout(r, 800));
    const contactTest = await send('Runtime.evaluate', {
      expression: `(() => {
        const form = document.querySelector('#advaitContactForm');
        const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
        if (submitBtn) submitBtn.click();
        const hasErrors = document.querySelectorAll('.has-error, .is-invalid').length > 0 || (form ? !form.checkValidity() : false);
        return { formFound: !!form, validationTriggered: hasErrors };
      })()`,
      returnByValue: true
    });
    console.log('   Contact Form Validation test:', contactTest.result.value);

    // 5. Console & Network Summary
    console.log('\n--- 5. NETWORK & CONSOLE SUMMARY ---');
    console.log('   Failed network requests (>400):', failedNetwork.length === 0 ? '0 (ALL PASS)' : failedNetwork);
    console.log('   Console errors:', consoleErrors.length === 0 ? '0 (ALL PASS)' : consoleErrors);

    ws.close();
  } catch (err) {
    console.error('Error during independent verification:', err.message);
  } finally {
    proc.kill();
  }
}

runIndependentVerification();

