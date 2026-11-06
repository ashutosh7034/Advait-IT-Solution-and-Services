const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
const lines = html.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('</section') || l.includes('servicesGrid')) {
    console.log((i + 1) + ': ' + l.trim().substring(0, 80));
  }
});

