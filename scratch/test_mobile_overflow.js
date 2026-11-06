const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const script = `
window.addEventListener('load', () => {
  setTimeout(() => {
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    
    const overflowing = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1.5) {
        overflowing.push({
          tag: el.tagName,
          id: el.id,
          class: (el.className || '').toString().slice(0, 50),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          diff: Math.round(rect.right - docWidth)
        });
      }
    });

    const report = {
      clientWidth: docWidth,
      scrollWidth: scrollWidth,
      bodyScrollWidth: bodyWidth,
      hasOverflow: scrollWidth > docWidth,
      overflowingCount: overflowing.length,
      topOverflowing: overflowing.slice(0, 10)
    };

    // send to local server or write via fetch
    fetch('http://127.0.0.1:3000/report_overflow', {
      method: 'POST',
      body: JSON.stringify(report)
    }).catch(() => {});
  }, 500);
});
`;

let testHtml = fs.readFileSync('services.html', 'utf8');
testHtml = testHtml.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('test_overflow_run.html', testHtml);

// In dev_server.js, let's see if we can log or just capture with chrome
