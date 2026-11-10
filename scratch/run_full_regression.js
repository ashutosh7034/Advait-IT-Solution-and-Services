const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runRegression() {
  const port = 9289;
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
    const pages = await listRes.json();
    const ws = new WebSocket(pages[0].webSocketDebuggerUrl);

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
    const failedUrls = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.responseReceived') {
        const status = msg.params.response.status;
        if (status >= 400) {
          failedUrls.push({ url: msg.params.response.url, status });
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

    console.log('=== FUNCTIONAL REGRESSION TEST SUITE (CORRECTED SELECTORS) ===\n');

    // Test 1: Homepage
    console.log('1. Testing Homepage (index.html)...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/index.html' });
    await new Promise(r => setTimeout(r, 1200));

    const homeCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const brand = document.querySelector('.navbar-brand img');
        const heroSlides = document.querySelectorAll('.hero-slide');
        const sanskritMotto = document.querySelector('.hero-sanskrit-tagline');
        const navDropdown = document.querySelector('.nav-item.dropdown');
        return {
          brandLoaded: brand && brand.complete && brand.naturalWidth > 0,
          heroSlidesCount: heroSlides.length,
          sanskritVisible: !!sanskritMotto,
          dropdownExists: !!navDropdown
        };
      })()`,
      returnByValue: true
    });
    console.log('   Homepage checks:', homeCheck.result.value);

    // Test 2: About Us
    console.log('2. Testing About Us (about.html)...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1200));

    const aboutCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leadership-grid .advait-leader-card'));
        const images = cards.map(c => {
          const img = c.querySelector('.advait-leader-avatar');
          return img && img.complete && img.naturalWidth > 0;
        });
        const yCoords = cards.map(c => Math.round(c.getBoundingClientRect().top));
        const allSameRow = yCoords.length === 3 && yCoords[0] === yCoords[1] && yCoords[1] === yCoords[2];
        return {
          cardCount: cards.length,
          allSameRow,
          allImagesLoaded: images.every(Boolean)
        };
      })()`,
      returnByValue: true
    });
    console.log('   About Us checks:', aboutCheck.result.value);

    // Test 3: Services Page
    console.log('3. Testing Services (services.html)...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/services.html' });
    await new Promise(r => setTimeout(r, 1200));

    const servicesCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = document.querySelectorAll('.advait-service-card');
        const modal = document.querySelector('#serviceDetailModal');
        // Click first explore button to test modal
        const firstBtn = document.querySelector('.service-explore-btn');
        if (firstBtn) firstBtn.click();
        const modalActive = modal ? modal.classList.contains('is-active') : false;
        return {
          cardCount: cards.length,
          modalExists: !!modal,
          modalOpensOnClick: modalActive
        };
      })()`,
      returnByValue: true
    });
    console.log('   Services checks:', servicesCheck.result.value);

    // Test 4: Projects Page
    console.log('4. Testing Projects (projects.html)...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/projects.html' });
    await new Promise(r => setTimeout(r, 1200));

    const projectsCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = document.querySelectorAll('.project-card');
        const filterBtns = document.querySelectorAll('.projects-filter-rail .filter-btn');
        const searchInput = document.querySelector('.projects-search-input');
        return {
          projectCardsCount: cards.length,
          filterBtnsCount: filterBtns.length,
          searchAvailable: !!searchInput
        };
      })()`,
      returnByValue: true
    });
    console.log('   Projects checks:', projectsCheck.result.value);

    // Test 5: Contact Page
    console.log('5. Testing Contact (contact.html)...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/contact.html' });
    await new Promise(r => setTimeout(r, 1200));

    const contactCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const chips = document.querySelectorAll('.contact-chip-item');
        const form = document.querySelector('#advaitContactForm');
        const emailBoxes = document.querySelectorAll('.email-display-box');
        const lockIcon = document.querySelector('.contact-lock-svg');
        return {
          chipsCount: chips.length,
          formFound: !!form,
          emailBoxesCount: emailBoxes.length,
          lockIconStyled: !!lockIcon
        };
      })()`,
      returnByValue: true
    });
    console.log('   Contact checks:', contactCheck.result.value);

    console.log('\n--- NETWORK & CONSOLE AUDIT ---');
    console.log('Failed HTTP Requests (>400):', failedUrls.length === 0 ? '0 (ALL PASS)' : failedUrls);
    console.log('Console Errors:', consoleErrors.length === 0 ? '0 (ALL PASS)' : consoleErrors);

    ws.close();
  } catch (err) {
    console.error('Regression error:', err.message);
  } finally {
    proc.kill();
  }
}

runRegression();
