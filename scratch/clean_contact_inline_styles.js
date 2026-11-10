const fs = require('fs');

// 1. Update contact.html
let contact = fs.readFileSync('contact.html', 'utf8');

contact = contact.replace(
  'style="display:inline-block; vertical-align:-2px; margin-right:4px;"',
  'class="contact-lock-svg"'
);

contact = contact.replace(
  '<div class="email-display-box" style="margin-bottom: 8px;">',
  '<div class="email-display-box email-box-first">'
);

fs.writeFileSync('contact.html', contact, 'utf8');
console.log('contact.html updated: inline styles replaced with classes!');

// 2. Add classes to css/style.css
let style = fs.readFileSync('css/style.css', 'utf8');
if (!style.includes('.contact-lock-svg')) {
  const insertion = `
.contact-lock-svg {
  display: inline-block;
  vertical-align: -2px;
  margin-right: 4px;
}

.email-box-first {
  margin-bottom: 8px;
}
`;
  style = style.replace('.email-display-box {', insertion + '\n.email-display-box {');
  fs.writeFileSync('css/style.css', style, 'utf8');
  console.log('style.css updated: .contact-lock-svg and .email-box-first added!');
}

