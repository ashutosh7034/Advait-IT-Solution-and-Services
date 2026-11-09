const fs = require('fs');

const f = 'about.html';
const c = fs.readFileSync(f, 'utf8');

const startTag = '<div class="footer-contacts-list">';
const idx = c.indexOf(startTag);
console.log('start index:', idx);

const nextColIdx = c.indexOf('<div class="footer-column">', idx);
console.log('next col index:', nextColIdx);

const sub = c.substring(idx, nextColIdx);
console.log('Found block:');
console.log(sub);
