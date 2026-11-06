const fs = require('fs');

const htmlFiles = [
  'index.html',
  'about.html',
  'advait-advantage.html',
  'services.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html',
  '404.html'
];

const targetStr = 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
const replacementStr = 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Updated Google Fonts in ${file}`);
  } else if (content.includes('Noto+Sans+Devanagari')) {
    console.log(`- ${file} already contains Noto Sans Devanagari`);
  } else {
    console.warn(`! Target string not found in ${file}`);
  }
});

