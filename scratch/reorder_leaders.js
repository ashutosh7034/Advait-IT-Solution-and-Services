const fs = require('fs');

const file = 'about.html';
const content = fs.readFileSync(file, 'utf8');

// Find the start of grid
const gridStartTag = '<div class="advait-leadership-grid">';
const gridStartIdx = content.indexOf(gridStartTag);

// Find each card block
const mandalStart = content.indexOf('<!-- Managing Director: Mr. Jayinish Kumar Mandal -->');
const ashutoshStart = content.indexOf('<!-- Founder & CEO: Ashutosh Pandey -->');
const aakashStart = content.indexOf('<!-- Technical Lead: Aakash Pandey -->');

// Find closing </article> for each
const findArticleEnd = (startIdx) => {
  const endIdx = content.indexOf('</article>', startIdx);
  return endIdx + '</article>'.length;
};

const mandalEnd = findArticleEnd(mandalStart);
const ashutoshEnd = findArticleEnd(ashutoshStart);
const aakashEnd = findArticleEnd(aakashStart);

const mandalBlock = content.substring(mandalStart, mandalEnd);
const ashutoshBlock = content.substring(ashutoshStart, ashutoshEnd);
const aakashBlock = content.substring(aakashStart, aakashEnd);

console.log('Mandal block length:', mandalBlock.length);
console.log('Ashutosh block length:', ashutoshBlock.length);
console.log('Aakash block length:', aakashBlock.length);

const isCRLF = content.includes('\r\n');
const eol = isCRLF ? '\r\n' : '\n';

// Construct reordered sequence: Ashutosh -> Mandal -> Aakash
const indent = '          ';
const newGridInner = [
  ashutoshBlock,
  '',
  indent + mandalBlock.trimStart(),
  '',
  indent + aakashBlock.trimStart()
].join(eol);

// The original chunk from mandalStart to aakashEnd:
const originalChunk = content.substring(mandalStart, aakashEnd);

const updatedContent = content.replace(originalChunk, newGridInner);

fs.writeFileSync(file, updatedContent, 'utf8');
console.log('✓ Successfully reordered leadership cards in about.html');

