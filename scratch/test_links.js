const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const targetBlanks = content.match(/<a[^>]*target=["']_blank["'][^>]*>/g) || [];
  targetBlanks.forEach(tag => {
    if (!tag.includes('noopener')) {
      console.log(`Missing rel="noopener" in ${f}: ${tag}`);
    }
  });
});
console.log('Target blank audit completed.');
