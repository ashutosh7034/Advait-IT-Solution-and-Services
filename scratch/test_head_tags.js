const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasPreconnect = content.includes('rel="preconnect" href="https://fonts.googleapis.com"');
  const hasFonts = content.includes('fonts.googleapis.com/css2');
  const hasFavicon = content.includes('favicon.svg');
  const hasViewport = content.includes('name="viewport"');
  const hasDesc = content.includes('name="description"');
  const hasTitle = /<title>[^<]+<\/title>/.test(content);
  const title = (content.match(/<title>([^<]+)<\/title>/) || [])[1] || 'NONE';

  console.log(`[${f}] Title: "${title}"`);
  console.log(`  preconnect: ${hasPreconnect}, fonts: ${hasFonts}, favicon: ${hasFavicon}, viewport: ${hasViewport}, desc: ${hasDesc}`);
});
