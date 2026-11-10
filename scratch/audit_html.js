const fs = require('fs');

const htmlPages = ['index.html', 'about.html', 'services.html', 'advait-advantage.html', 'projects.html', 'contact.html', 'privacy-policy.html', '404.html'];

console.log('=== HTML AUDIT: COMMENTS, INLINE STYLES, EMPTY ELEMENTS ===\n');

htmlPages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  
  // Comments
  const comments = content.match(/<!--[\s\S]*?-->/g) || [];
  const commentedHtml = comments.filter(c => /<[a-z][\s\S]*>/i.test(c));
  
  // Inline styles
  const inlineStyles = content.match(/style=[\"'][^\"']+[\"']/gi) || [];
  
  // Empty containers (e.g. <div></div> or <p></p>)
  const emptyContainers = content.match(/<(div|p|span|section)[^>]*>\s*<\/\1>/gi) || [];
  
  console.log(`${p}:`);
  console.log(`  Total comments: ${comments.length}`);
  console.log(`  Commented-out HTML blocks: ${commentedHtml.length}`);
  console.log(`  Inline style attributes: ${inlineStyles.length}`);
  console.log(`  Empty containers: ${emptyContainers.length}`);
  if (commentedHtml.length > 0) {
    commentedHtml.forEach(c => console.log('    Commented HTML:', c.slice(0, 80).replace(/\n/g, ' ')));
  }
  if (emptyContainers.length > 0) {
    emptyContainers.forEach(e => console.log('    Empty container:', e));
  }
});

