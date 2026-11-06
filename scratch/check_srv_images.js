const fs = require('fs');
const js = fs.readFileSync('js/services.js', 'utf8');
const start = js.indexOf('const SERVICES_DATA =');
const end = js.indexOf('];\n\n  let activeCategory', start);
const services = eval(js.slice(start + 22, end + 1));
services.forEach(s => {
  const exists = s.image ? fs.existsSync(s.image) : false;
  console.log(`ID: ${s.id} | Image: "${s.image}" | Exists: ${exists}`);
});

