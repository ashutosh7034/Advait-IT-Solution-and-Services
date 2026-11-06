const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('.dropdown') || l.includes('dropdown-menu')) {
    console.log((i + 1) + ': ' + l);
  }
});

