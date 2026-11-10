const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === '.git' || file === 'node_modules' || file === 'scratch') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(html|js|json)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(process.cwd());
console.log(`Scanning ${files.length} production files for Aakash designations...`);

files.forEach(filePath => {
  const rel = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (line.includes('Aakash') || line.includes('Joint Managing Director & Chief Technology') || line.includes('CTO') || line.includes('Co-Founder')) {
      console.log(`[${rel}:${idx + 1}] ${line.trim()}`);
    }
  });
});

