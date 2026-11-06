const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('.services-hero') || l.includes('.advait-services-grid') || l.includes('.advait-service-card')) {
    console.log((i + 1) + ': ' + l.trim());
  }
});

