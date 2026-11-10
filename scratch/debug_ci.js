const fs = require('fs');
const code = fs.readFileSync('scratch/test_ci.js', 'utf8');
console.log(code.substring(code.length - 800));

