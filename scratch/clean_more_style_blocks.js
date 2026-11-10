const fs = require('fs');

const stylePath = 'css/style.css';
let raw = fs.readFileSync(stylePath, 'utf8');
const hasCRLF = raw.includes('\r\n');
let style = raw.replace(/\r\n/g, '\n');
const originalLength = style.split('\n').length;

// 1. Remove Old Leadership Profiles block
const oldLeadersComment = '/* ==========================================================================\n   Leadership & Team Profiles\n   ========================================================================== */';
const oldLeadersEnd = '.profile-social-link:hover svg {\n  color: #FFFFFF;\n}';

if (style.includes(oldLeadersComment) && style.includes(oldLeadersEnd)) {
  const sIdx = style.indexOf(oldLeadersComment);
  const eIdx = style.indexOf(oldLeadersEnd) + oldLeadersEnd.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed obsolete Leadership Profiles block');
} else {
  console.log('Could not find old Leadership block');
}

// 2. Remove Old 404 Error Page block
const old404Comment = '/* ==========================================================================\n   404 Error Page\n   ========================================================================== */';
const old404End = '.error-page-actions {\n  display: flex;\n  gap: 14px;\n  justify-content: center;\n  flex-wrap: wrap;\n}';

if (style.includes(old404Comment) && style.includes(old404End)) {
  const sIdx = style.indexOf(old404Comment);
  const eIdx = style.indexOf(old404End) + old404End.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed obsolete 404 Error Page block');
} else {
  console.log('Could not find old 404 block');
}

// Normalize multiple consecutive blank lines
style = style.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(stylePath, hasCRLF ? style.replace(/\n/g, '\r\n') : style, 'utf8');
const newLength = style.split('\n').length;
console.log('New style.css LOC:', newLength);
console.log(`Cleaned ${originalLength - newLength} redundant lines from style.css!`);

