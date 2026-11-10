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
    } else if (/\.(html|js|css|json|md)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(process.cwd());
const keywords = [
  'Assistant Professor',
  'Dy. HOD',
  'Deputy Head',
  'HOD',
  'Teaching',
  'Academic Mentorship',
  'UG/PG',
  'BSc IT',
  'BSc CS',
  'BCA',
  'MCA Projects',
  'Guided 65+',
  'PhD',
  'academic'
];

console.log(`Scanning ${files.length} files across entire codebase...`);
files.forEach(filePath => {
  const rel = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    let match;
    while ((match = regex.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      const line = content.split('\n')[lineNum - 1].trim();
      console.log(`[${rel}:${lineNum}] Matched "${match[0]}": ${line}`);
    }
  });
});

