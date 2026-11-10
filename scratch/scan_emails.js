const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === '.git' || file === 'node_modules') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(html|js|css|json|md|yml)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(process.cwd());
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

console.log('=== SCANNING REPOSITORY FOR ALL EMAIL ADDRESSES ===\n');

const findings = {};

files.forEach(filePath => {
  const rel = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = emailRegex.exec(content)) !== null) {
    const email = match[0].toLowerCase();
    const lineNum = content.substring(0, match.index).split('\n').length;
    const line = content.split('\n')[lineNum - 1].trim();

    if (!findings[email]) findings[email] = [];
    findings[email].push({ file: rel, lineNum, line });
  }
});

for (const [email, occurrences] of Object.entries(findings)) {
  console.log(`\nEmail: ${email} (${occurrences.length} occurrences):`);
  occurrences.forEach(o => {
    console.log(`  [${o.file}:${o.lineNum}] ${o.line}`);
  });
}

