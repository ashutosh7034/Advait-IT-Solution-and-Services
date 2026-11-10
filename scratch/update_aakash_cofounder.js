const fs = require('fs');
const path = require('path');

// 1. Update about.html
const aboutPath = path.join(__dirname, '..', 'about.html');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

// meta description
aboutContent = aboutContent.replace(
  'Joint Managing Director & CTO Aakash Pandey',
  'Co-Founder & CTO Aakash Pandey'
);

// json-ld description
aboutContent = aboutContent.replace(
  'Joint Managing Director & CTO Aakash Pandey.',
  'Co-Founder & CTO Aakash Pandey.'
);

// Mandal card email fix if needed
aboutContent = aboutContent.replace(
  'href="mailto:jaynishm@gmail.com"',
  'href="mailto:infoadvaitit@gmail.com"'
);
aboutContent = aboutContent.replace(
  'aria-label="Email Advait IT Solutions: jaynishm@gmail.com"',
  'aria-label="Email Advait IT Solutions: infoadvaitit@gmail.com"'
);
aboutContent = aboutContent.replace(
  '<span>jaynishm@gmail.com</span>',
  '<span>infoadvaitit@gmail.com</span>'
);

// Aakash comment
aboutContent = aboutContent.replace(
  '<!-- 3. Joint MD & CTO: Aakash Pandey -->',
  '<!-- 3. Co-Founder & CTO: Aakash Pandey -->'
);

// Aakash image alt
aboutContent = aboutContent.replace(
  'alt="Aakash Pandey — Joint Managing Director &amp; CTO of Advait IT Solutions and Services"',
  'alt="Aakash Pandey — Co-Founder &amp; CTO of Advait IT Solutions and Services"'
);

// Aakash leader role
aboutContent = aboutContent.replace(
  '<div class="advait-leader-role">Joint Managing Director &amp; Chief Technology Officer (CTO)</div>',
  '<div class="advait-leader-role">Co-Founder &amp; Chief Technology Officer (CTO)</div>'
);

fs.writeFileSync(aboutPath, aboutContent, 'utf8');
console.log('about.html updated successfully!');

// 2. Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

indexContent = indexContent.replace(
  '"jobTitle": "Joint Managing Director & Chief Technology Officer (CTO)",',
  '"jobTitle": "Co-Founder & Chief Technology Officer (CTO)",'
);

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('index.html updated successfully!');

