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
    } else if (/\.(html|js|css|json)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(process.cwd());
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

console.log('=== PRODUCTION FILES EMAIL INVENTORY ===\n');

files.forEach(filePath => {
  const rel = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  const fileEmails = [];
  while ((match = emailRegex.exec(content)) !== null) {
    const email = match[0].toLowerCase();
    if (email === 'name@company.com') continue; // placeholder in input
    const lineNum = content.substring(0, match.index).split('\n').length;
    const line = content.split('\n')[lineNum - 1].trim();
    fileEmails.push({ email, lineNum, line });
  }
  if (fileEmails.length > 0) {
    console.log(`\n📄 ${rel} (${fileEmails.length} references):`);
    fileEmails.forEach(e => {
      console.log(`  Line ${e.lineNum} [${e.email}]: ${e.line}`);
    });
  }
});

