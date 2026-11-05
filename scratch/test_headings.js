const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'google2bfa76d203becb95.html');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const headings = content.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g) || [];
  const h1s = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g) || [];
  console.log(`[${f}] Total headings: ${headings.length}, <h1> count: ${h1s.length}`);
  if (h1s.length !== 1) {
    console.error(`  FAIL: ${f} has ${h1s.length} <h1> tags!`);
  }
});
