const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
  if (!footerMatch) {
    console.log(`${f}: NO FOOTER!`);
    return;
  }
  const footerContent = footerMatch[1];
  const links = (footerContent.match(/href=["']([^"']+)["']/g) || []).map(l => l.replace(/href=["']|["']/g, ''));
  const hasEmail = footerContent.includes('ashutosh3276s16@gmail.com');
  const hasWa1 = footerContent.includes('9702420582');
  const hasWa2 = footerContent.includes('6391929317');
  const hasYear = footerContent.includes('dynamic-year');
  const hasAdvaitAdvantage = links.includes('advait-advantage.html');

  console.log(`[${f}] Footer has ${links.length} links: email=${hasEmail}, wa1=${hasWa1}, wa2=${hasWa2}, year=${hasYear}, advaitAdvantage=${hasAdvaitAdvantage}`);
});
