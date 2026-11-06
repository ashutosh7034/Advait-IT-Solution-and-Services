const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const block = css.slice(56749, 70000);
console.log('Block length:', block.length);
console.log('Start snippet:\n', block.slice(0, 500));
console.log('End snippet:\n', block.slice(-500));

