const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3';
const auditDir = path.join(artDir, 'leadership_audit');
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

async function capture(width, height, targetSelector, offset, filename, mobile = false) {
  const port = 9277;
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
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
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('${targetSelector}');
        if (el) {
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          window.scrollTo(0, elementPosition - ${offset});
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshot.data, 'base64');
    
    // Save to auditDir and artDir
    fs.writeFileSync(path.join(auditDir, filename), buffer);
    fs.writeFileSync(path.join(artDir, filename), buffer);
    console.log(`Saved screenshot: ${filename} (${width}x${height})`);

    ws.close();
  } catch (err) {
    console.error(`Error capturing ${filename}:`, err.message);
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 600));
  }
}

async function run() {
  console.log('Capturing 3-Column Leadership Screenshots...');
  // 1. Desktop 1366px: full 3 cards in one row
  await capture(1366, 1000, '#leadership', 40, 'leadership_3cards_desktop_1366.png', false);
  // 2. Tablet 768px: 2 columns top + 1 centered below
  await capture(768, 1150, '#leadership', 40, 'leadership_3cards_tablet_768.png', false);
  // 3. Mobile 390px: single column
  await capture(390, 844, '#leadership', 30, 'leadership_3cards_mobile_390.png', true);
  console.log('All screenshots captured successfully!');
}

run();

