const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json'));

const keywords = [
  'Assistant Professor',
  'Dy. HOD',
  'Deputy Head',
  'HOD',
  'Teaching Experience',
  'Academic Mentorship',
  'UG/PG',
  'BSc IT',
  'BSc CS',
  'BCA',
  'MCA Projects',
  'Guided 65+',
  'PhD (Pursuing)',
  'academic and engineering leadership',
  'academic credentials',
  'Operational & Academic Leadership'
];

console.log('Scanning project files for academic terms...');
files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  keywords.forEach(kw => {
    let pos = 0;
    while ((pos = content.indexOf(kw, pos)) !== -1) {
      const lineNum = content.substring(0, pos).split('\n').length;
      console.log(`[${file}:${lineNum}] Matched: "${kw}"`);
      pos += kw.length;
    }
  });
});

