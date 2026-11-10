const fs = require('fs');

const stylePath = 'css/style.css';
let style = fs.readFileSync(stylePath, 'utf8');
const originalLength = style.split('\n').length;
console.log('Original style.css LOC:', originalLength);

// 1. Remove Old Project Showcase block (lines ~1543 to 1706)
const oldProjectsComment = '/* ==========================================================================\n   Project Showcase / Work Gallery\n   ========================================================================== */';
const oldProjectsEnd = '.project-footer .btn {\n  width: 100%;\n  justify-content: center;\n}';

if (style.includes(oldProjectsComment) && style.includes(oldProjectsEnd)) {
  const sIdx = style.indexOf(oldProjectsComment);
  const eIdx = style.indexOf(oldProjectsEnd) + oldProjectsEnd.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed obsolete Project Showcase block');
} else {
  console.log('Could not find exact old Projects block');
}

// 2. Remove Old Leadership Profiles block (lines ~1753 to 1908)
const oldLeadersComment = '/* ==========================================================================\n   Leadership & Team Profiles\n   ========================================================================== */';
const oldLeadersEnd = '.profile-social-link:hover {\n  background: var(--color-primary);\n  color: #FFFFFF;\n  border-color: var(--color-primary);\n}';

if (style.includes(oldLeadersComment) && style.includes(oldLeadersEnd)) {
  const sIdx = style.indexOf(oldLeadersComment);
  const eIdx = style.indexOf(oldLeadersEnd) + oldLeadersEnd.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed obsolete Leadership Profiles block');
} else {
  console.log('Could not find exact old Leadership block');
}

// 3. Remove Old 404 Error Page block (lines ~3581 to 3626)
const old404Comment = '/* ==========================================================================\n   404 / Error Page\n   ========================================================================== */';
const old404End = '.error-page-actions .btn {\n  min-width: 160px;\n}';

if (style.includes(old404Comment) && style.includes(old404End)) {
  const sIdx = style.indexOf(old404Comment);
  const eIdx = style.indexOf(old404End) + old404End.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed obsolete 404 Error Page block');
} else {
  console.log('Could not find exact old 404 block');
}

// 4. Remove Unused About Philosophy block (~92 lines)
const philosophyComment = '/* About Page Sanskrit Philosophy Banner */';
const philosophyEnd = '.philosophy-item p {\n  font-size: 0.88rem;\n  color: var(--color-text-secondary);\n  line-height: 1.55;\n  margin-bottom: 0;\n}';

if (style.includes(philosophyComment) && style.includes(philosophyEnd)) {
  const sIdx = style.indexOf(philosophyComment);
  const eIdx = style.indexOf(philosophyEnd) + philosophyEnd.length;
  style = style.slice(0, sIdx) + style.slice(eIdx);
  console.log('Removed unused About Philosophy block');
} else {
  console.log('Could not find exact philosophy block');
}

// 5. Consolidate Duplicate Sanskrit Rules
// Lines 5075-5213 has duplicate .sanskrit-devanagari, .hero-sanskrit-tagline, .footer-sanskrit-tagline, but has unique .services-sanskrit-kicker and .about-sanskrit-kicker
const duplicateSanskritComment = '/* Sanskrit Brand Identity Typography & Components */';
const sKickStart = style.lastIndexOf(duplicateSanskritComment);

if (sKickStart !== -1) {
  // Extract .services-sanskrit-kicker and .about-sanskrit-kicker from the duplicate block
  const dupBlock = style.slice(sKickStart);
  
  // Find services kicker
  const srvKickerMatch = dupBlock.match(/\/\* Services Page Sanskrit Technology Kicker \*\/[\s\S]*?\.services-sanskrit-kicker \.sanskrit-trans \{[\s\S]*?\}/);
  // Find about kicker
  const abtKickerMatch = dupBlock.match(/\/\* About Us Page Sanskrit Trust Kicker \*\/[\s\S]*?\.about-sanskrit-kicker \.sanskrit-trans \{[\s\S]*?\}/);
  
  // Remove the duplicate block
  style = style.slice(0, sKickStart);
  
  // Insert the kickers right before Footer Sanskrit Tagline in the main Sanskrit section
  const footerTaglineComment = '/* Footer Sanskrit Tagline */';
  const fIdx = style.indexOf(footerTaglineComment);
  if (fIdx !== -1 && srvKickerMatch && abtKickerMatch) {
    const kickersToInsert = srvKickerMatch[0] + '\n\n' + abtKickerMatch[0] + '\n\n';
    style = style.slice(0, fIdx) + kickersToInsert + style.slice(fIdx);
    console.log('Consolidated Sanskrit kickers and removed duplicate Sanskrit block');
  } else {
    console.log('Inserted kickers at end');
    if (srvKickerMatch && abtKickerMatch) {
      style += '\n' + srvKickerMatch[0] + '\n\n' + abtKickerMatch[0] + '\n';
    }
  }
}

// Normalize multiple consecutive blank lines to at most 2
style = style.replace(/\n{4,}/g, '\n\n');

fs.writeFileSync(stylePath, style, 'utf8');
const newLength = style.split('\n').length;
console.log('New style.css LOC:', newLength);
console.log(`Cleaned ${originalLength - newLength} redundant lines from style.css!`);

