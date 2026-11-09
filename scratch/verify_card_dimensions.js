const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkDimensions() {
  const port = 9244;
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
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/about.html' });
    await new Promise(r => setTimeout(r, 1200));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.advait-org-chart .advait-leader-card'));
        return cards.map(c => {
          const rect = c.getBoundingClientRect();
          const name = c.querySelector('.advait-leader-name').innerText;
          const role = c.querySelector('.advait-leader-role').innerText;
          const tagsCount = c.querySelectorAll('.advait-leader-tag').length;
          const highlightsCount = c.querySelectorAll('.advait-leader-highlights li').length;
          const img = c.querySelector('.advait-leader-avatar');
          return {
            name,
            role,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            tagsCount,
            highlightsCount,
            avatar: { w: img ? img.offsetWidth : 0, h: img ? img.offsetHeight : 0 }
          };
        });
      })()`,
      returnByValue: true
    });

    console.log('Leadership Card Parity Results (1366px Desktop):');
    console.log(JSON.stringify(evalRes.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    proc.kill();
  }
}

checkDimensions();

