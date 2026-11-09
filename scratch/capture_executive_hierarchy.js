const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\Ashutosh Pandey\\.gemini\\antigravity\\brain\\060dcf0e-539d-4e3b-b82d-a55927fa89e3\\leadership_audit';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function captureViewport(width, height, targetSelector, offset, filename) {
  const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_' + Math.random().toString(36).substring(7));
  const proc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--window-size=${width},${height}`,
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
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll to target element
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('${targetSelector}');
        if (el) {
          const offset = ${offset};
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          window.scrollTo(0, elementPosition - offset);
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshot.data, 'base64');
    const targetPath = path.join(outDir, filename);
    fs.writeFileSync(targetPath, buffer);
    console.log(`Captured ${filename} (${width}x${height}) -> ${targetPath}`);

    ws.close();
  } catch (err) {
    console.error(`Error capturing ${filename}:`, err.message);
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 600));
  }
}

async function run() {
  console.log('Capturing Executive Leadership Structure Screenshots...');
  // 1. Desktop: Full org hierarchy tree
  await captureViewport(1366, 1200, '#leadership', 40, 'executive_hierarchy_desktop_1366.png');
  // 2. Tablet: Responsive hierarchy stack
  await captureViewport(768, 1200, '#leadership', 40, 'executive_hierarchy_tablet_768.png');
  // 3. Mobile: Ashutosh top card
  await captureViewport(390, 844, '#leadership', 40, 'executive_hierarchy_mobile_top_390.png');
  // 4. Mobile: Mandal & Aakash cards
  await captureViewport(390, 844, '#md-profile', 30, 'executive_hierarchy_mobile_md_390.png');
  console.log('All executive hierarchy screenshots captured successfully!');
}

run();

