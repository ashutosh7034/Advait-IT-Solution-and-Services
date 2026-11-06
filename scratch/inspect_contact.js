const fs = require('fs');
const html = fs.readFileSync('contact.html', 'utf8');
const lines = html.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('</section>') || l.includes('<h1') || l.includes('<h2')) {
    console.log((i + 1) + ': ' + l.trim().substring(0, 90));
  }
});

