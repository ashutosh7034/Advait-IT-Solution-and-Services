const fs = require('fs');

const resp = fs.readFileSync('css/responsive.css', 'utf8');

// Check selectors in responsive.css
const selRegex = /([^{}@]+)\{/g;
let m;
const selCounts = {};
while ((m = selRegex.exec(resp)) !== null) {
  const sel = m[1].trim();
  if (!sel.startsWith('@') && !sel.startsWith('/*')) {
    selCounts[sel] = (selCounts[sel] || 0) + 1;
  }
}

console.log('Duplicate selectors in responsive.css:');
Object.entries(selCounts).filter(([s, c]) => c > 1).forEach(([s, c]) => {
  console.log(`  "${s}": ${c} times`);
});

// Check if any obsolete classes are present in responsive.css
['profile-card', 'profile-details', 'profile-media', 'project-filters', 'project-badge-status', 'leadership-grid'].forEach(cls => {
  if (resp.includes(cls)) {
    console.log(`responsive.css contains obsolete class: ${cls}`);
  }
});

