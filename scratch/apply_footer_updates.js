const fs = require('fs');

const files = [
  'about.html',
  'index.html',
  'services.html',
  'advait-advantage.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html'
];

const newContactsBlockTemplate = [
  '          <div class="footer-contacts-list">',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  '              <span>Email 1: <a href="mailto:ashutosh3276s16@gmail.com">ashutosh3276s16@gmail.com</a></span>',
  '            </div>',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  '              <span>Email 2: <a href="mailto:akp2756097@gmail.com">akp2756097@gmail.com</a></span>',
  '            </div>',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
  '              <span>Company Phone: <a href="tel:+919702420582">+91 9702420582</a></span>',
  '            </div>',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
  '              <span>MD Phone: <a href="tel:+919673480534">+91 96734 80534</a></span>',
  '            </div>',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>',
  '              <span>WhatsApp 1: <a href="https://wa.me/919702420582" target="_blank" rel="noopener noreferrer" class="whatsapp-link">+91 9702420582</a></span>',
  '            </div>',
  '            <div class="footer-contact-item">',
  '              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>',
  '              <span>WhatsApp 2: <a href="https://wa.me/9163919929317" target="_blank" rel="noopener noreferrer" class="whatsapp-link">+91 63919929317</a></span>',
  '            </div>',
  '          </div>'
];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const isCRLF = c.includes('\r\n');
  const eol = isCRLF ? '\r\n' : '\n';
  const newBlock = newContactsBlockTemplate.join(eol);

  const startTag = '<div class="footer-contacts-list">';
  const startIdx = c.indexOf(startTag);
  if (startIdx === -1) {
    console.error(`ERROR: startTag not found in ${f}`);
    return;
  }

  // Find the closing </div> of footer-contacts-list
  // It is followed by </div> (closing the brand column) and then <div class="footer-column">
  const nextColIdx = c.indexOf('<div class="footer-column">', startIdx);
  if (nextColIdx === -1) {
    console.error(`ERROR: nextColIdx not found in ${f}`);
    return;
  }

  // Looking backwards from nextColIdx for </div>\s*</div>
  const beforeNext = c.substring(startIdx, nextColIdx);
  const match = beforeNext.match(/<div class="footer-contacts-list">[\s\S]*?<\/div>(\s*<\/div>\s*)$/);
  if (!match) {
    console.error(`ERROR: match failed in ${f}`);
    return;
  }

  const trailingWhitespace = match[1];
  const oldFullChunk = beforeNext;
  const newFullChunk = newBlock + trailingWhitespace;

  const updated = c.replace(oldFullChunk, newFullChunk);
  fs.writeFileSync(f, updated, 'utf8');
  console.log(`✓ Updated footer in ${f}`);
});

