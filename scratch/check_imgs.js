const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const imgTags = content.match(/<img[^>]*>/g) || [];
  imgTags.forEach(tag => {
    const hasWidth = /width=/.test(tag);
    const hasHeight = /height=/.test(tag);
    const srcMatch = tag.match(/src=["']([^"']+)["']/);
    const src = srcMatch ? srcMatch[1] : 'unknown';
    if (!hasWidth || !hasHeight) {
      console.log(`${f}: Missing width/height on ${src} -> ${tag}`);
    }
  });
});
