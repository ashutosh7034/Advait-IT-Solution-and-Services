const fs = require('fs');

const js = fs.readFileSync('js/services.js', 'utf8');
const dataMatch = js.match(/const SERVICES_DATA = (\[[\s\S]*?\]);/);
if (dataMatch) {
  const data = JSON.parse(dataMatch[1]);
  data.forEach(s => {
    const exists = s.image ? fs.existsSync(s.image) : false;
    console.log(`${s.id.padEnd(20)} | image: ${s.image.padEnd(45)} | exists: ${exists}`);
  });
}

