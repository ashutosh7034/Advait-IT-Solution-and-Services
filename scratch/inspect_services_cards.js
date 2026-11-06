const fs = require('fs');
const content = fs.readFileSync('services.html', 'utf8');
const re = /<article[^>]+id="([^"]+)"[^>]*>/g;
let m;
const list = [];
while ((m = re.exec(content)) !== null) {
  list.push(m[0]);
}
console.log('Total articles found:', list.length);
list.forEach(item => console.log(item));

