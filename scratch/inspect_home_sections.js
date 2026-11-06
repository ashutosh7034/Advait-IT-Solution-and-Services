const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('class="hero') || l.includes('</section>')) {
    console.log((i + 1) + ': ' + l.trim().substring(0, 90));
  }
});

