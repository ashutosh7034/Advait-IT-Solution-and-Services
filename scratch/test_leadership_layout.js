const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLeadershipLayout() {
  const port = 9266;
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

    const consoleLogs = [];
    const failedRequests = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.responseReceived') {
        const status = msg.params.response.status;
        if (status >= 400) {
          failedRequests.push({ url: msg.params.response.url, status });
        }
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(msg.params.args.map(a => a.value).join(' '));
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
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    // Test Desktop
    const desktopInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leadership-grid .advait-leader-card'));
        const grid = document.querySelector('.advait-leadership-grid');
        const gridRect = grid.getBoundingClientRect();
        return {
          gridTop: Math.round(gridRect.top),
          gridWidth: Math.round(gridRect.width),
          cardCount: cards.length,
          cards: cards.map(c => {
            const r = c.getBoundingClientRect();
            const img = c.querySelector('.advait-leader-avatar');
            return {
              name: c.querySelector('.advait-leader-name').innerText,
              role: c.querySelector('.advait-leader-role').innerText,
              x: Math.round(r.left),
              y: Math.round(r.top),
              w: Math.round(r.width),
              h: Math.round(r.height),
              imgSrc: img ? img.currentSrc : null,
              imgComplete: img ? img.complete : false,
              imgNaturalWidth: img ? img.naturalWidth : 0,
              imgNaturalHeight: img ? img.naturalHeight : 0
            };
          })
        };
      })()`,
      returnByValue: true
    });

    console.log('=== Desktop Results (1366px) ===');
    console.log(JSON.stringify(desktopInfo.result.value, null, 2));

    // Check if all cards have identical y (same horizontal row)
    const cards = desktopInfo.result.value.cards;
    const sameRow = cards.length === 3 && cards[0].y === cards[1].y && cards[1].y === cards[2].y;
    console.log('All 3 cards in the SAME horizontal row:', sameRow);

    // Check if all cards have identical height
    const equalHeight = cards.length === 3 && cards[0].h === cards[1].h && cards[1].h === cards[2].h;
    console.log('All 3 cards have EQUAL height:', equalHeight);

    // Check if all images loaded successfully
    const allImagesLoaded = cards.every(c => c.imgComplete && c.imgNaturalWidth > 0);
    console.log('All 3 profile images loaded with natural dimensions:', allImagesLoaded);

    // Test Tablet
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 600));

    const tabletInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leadership-grid .advait-leader-card'));
        return cards.map(c => {
          const r = c.getBoundingClientRect();
          return {
            name: c.querySelector('.advait-leader-name').innerText,
            x: Math.round(r.left),
            y: Math.round(r.top),
            w: Math.round(r.width),
            h: Math.round(r.height)
          };
        });
      })()`,
      returnByValue: true
    });

    console.log('=== Tablet Results (768px) ===');
    console.log(JSON.stringify(tabletInfo.result.value, null, 2));

    // Test Mobile
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-leadership-grid .advait-leader-card'));
        const bodyWidth = document.documentElement.scrollWidth;
        const viewportWidth = window.innerWidth;
        return {
          overflowPx: Math.max(0, bodyWidth - viewportWidth),
          cards: cards.map(c => {
            const r = c.getBoundingClientRect();
            return {
              name: c.querySelector('.advait-leader-name').innerText,
              x: Math.round(r.left),
              y: Math.round(r.top),
              w: Math.round(r.width),
              h: Math.round(r.height)
            };
          })
        };
      })()`,
      returnByValue: true
    });

    console.log('=== Mobile Results (390px) ===');
    console.log(JSON.stringify(mobileInfo.result.value, null, 2));

    console.log('Failed network requests:', failedRequests);

    ws.close();
  } catch (err) {
    console.error('Error during testing:', err.message);
  } finally {
    proc.kill();
  }
}

testLeadershipLayout();

