const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const sIdx = css.indexOf('/* Compact Services Hero Section */');
console.log('sIdx:', sIdx);
const nextSection = css.indexOf('/* Interactive Service Detail Modal', sIdx);
console.log('nextSection:', nextSection);
if (nextSection === -1) {
  // let's search for modal-overlay or whatever comes next
  const endCandidates = ['/* ==========================================================================\n   MODAL', '/* Modal', '.modal-overlay', '/* ==========================================================================\n   FOOTER'];
  for (const c of endCandidates) {
    const idx = css.indexOf(c, sIdx);
    if (idx !== -1) {
      console.log('found candidate:', c, 'at', idx);
      break;
    }
  }
}

