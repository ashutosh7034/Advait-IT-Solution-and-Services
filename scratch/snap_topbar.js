const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';

async function snapTopBar() {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_homebar_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1366,400',
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

    await send('Page.navigate', { url: 'http://127.0.0.1:3000/index.html' });
    await new Promise(r => setTimeout(r, 1200));

    const barText = await send('Runtime.evaluate', {
      expression: `document.querySelector('.announcement-contacts a[href^="mailto:"]').innerText.trim()`,
      returnByValue: true
    });
    console.log('Homepage Announcement Bar Email Text:', barText.result.value);

    const ss = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1366, height: 120, scale: 1 } });
    fs.writeFileSync(path.join(artifactDir, 'homepage_announcement_bar.png'), Buffer.from(ss.data, 'base64'));
    console.log('Saved screenshot of announcement bar: homepage_announcement_bar.png');

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

snapTopBar();

