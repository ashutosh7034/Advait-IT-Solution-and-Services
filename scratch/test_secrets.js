const fs = require('fs');
const path = require('path');

const projectDir = '.';
const ignoreDirs = ['.git', 'scratch', 'assets'];

function scan(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (ignoreDirs.includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scan(full);
    } else if (stat.isFile() && !item.endsWith('.png') && !item.endsWith('.jpg') && !item.endsWith('.svg')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/api[_-]?key|secret|password|private[_-]?key|bearer\s+[a-zA-Z0-9_\-\.]{20,}/i.test(line)) {
          // Exclude comments about Formspree placeholder or generic text
          if (!line.includes('YOUR_FORMSPREE_ID') && !line.includes('No exposed secrets') && !line.includes('Password reset')) {
            console.log(`POTENTIAL SECRET in ${full}:${idx+1} -> ${line.trim()}`);
          }
        }
      });
    }
  }
}

console.log('Scanning for exposed secrets...');
scan(projectDir);
console.log('Secret scan completed.');
