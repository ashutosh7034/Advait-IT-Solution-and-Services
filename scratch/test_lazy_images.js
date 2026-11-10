const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLazy() {
  const port = 9301;
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,1200',
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
    await send('Network.enable');

    await send('Page.navigate', { url: 'http://127.0.0.1:3000/index.html' });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to bottom so lazy images load
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, document.body.scrollHeight)`
    });
    await new Promise(r => setTimeout(r, 1000));

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          complete: img.complete,
          nw: img.naturalWidth,
          nh: img.naturalHeight
        }));
      })()`,
      returnByValue: true
    });

    console.log('Images in index.html after scrolling:');
    console.log(JSON.stringify(check.result.value, null, 2));

    const allLoaded = check.result.value.every(img => img.complete && img.nw > 0);
    console.log('All images loaded successfully after scroll:', allLoaded);

    ws.close();
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    proc.kill();
  }
}

testLazy();

