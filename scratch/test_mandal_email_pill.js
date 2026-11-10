const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testPill() {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_testpill_' + Math.random().toString(36).substring(7));
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

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = idCounter++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    // Test with email replaced by infoadvaitit@gmail.com
    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const mailPill = document.querySelector('#md-profile a[href^="mailto:"]');
        if (mailPill) {
          mailPill.href = 'mailto:infoadvaitit@gmail.com';
          mailPill.querySelector('span').innerText = 'infoadvaitit@gmail.com';
        }

        const cards = Array.from(document.querySelectorAll('.advait-leader-card'));
        const pills = Array.from(document.querySelectorAll('#md-profile .advait-social-pill'));

        return {
          cardHeights: cards.map(c => ({
            name: c.querySelector('.advait-leader-name').innerText,
            height: Math.round(c.getBoundingClientRect().height),
            width: Math.round(c.getBoundingClientRect().width)
          })),
          pillPositions: pills.map(p => ({
            text: p.innerText.trim(),
            top: Math.round(p.getBoundingClientRect().top),
            left: Math.round(p.getBoundingClientRect().left),
            width: Math.round(p.getBoundingClientRect().width)
          }))
        };
      })()`,
      returnByValue: true
    });

    console.log('Result with infoadvaitit@gmail.com:');
    console.log(JSON.stringify(result.result.value, null, 2));

    ws.close();
    proc.kill();
    setTimeout(() => {
      try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (e) {}
    }, 1000);
  } catch (err) {
    console.error('Error:', err);
    try { proc.kill(); } catch (e) {}
  }
}

testPill();

