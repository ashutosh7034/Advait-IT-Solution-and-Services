const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function createWebp() {
  const port = 9255;
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
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

    const pngBase64 = fs.readFileSync('assets/images/techlead-aakash.png').toString('base64');

    const result = await send('Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/webp', 0.9));
        };
        img.src = 'data:image/png;base64,${pngBase64}';
      })`,
      awaitPromise: true,
      returnByValue: true
    });

    const webpDataUrl = result.result.value;
    const webpBase64 = webpDataUrl.split(',')[1];
    fs.writeFileSync('assets/images/techlead-aakash.webp', Buffer.from(webpBase64, 'base64'));
    console.log('Successfully generated assets/images/techlead-aakash.webp (size: ' + fs.statSync('assets/images/techlead-aakash.webp').size + ' bytes)');

    ws.close();
  } catch (err) {
    console.error('Error generating webp:', err.message);
  } finally {
    proc.kill();
  }
}

createWebp();

