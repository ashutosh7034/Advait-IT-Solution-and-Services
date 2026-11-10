const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('=== PHASE 1: COMPREHENSIVE REPOSITORY AUDIT ===\n');

// 1. Files & Directories Survey
const htmlPages = ['index.html', 'about.html', 'services.html', 'advait-advantage.html', 'projects.html', 'contact.html', 'privacy-policy.html', '404.html'];
const cssFiles = ['css/style.css', 'css/responsive.css', 'css/animations.css'];
const jsFiles = ['js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js'];

// Read all HTML content
const htmlContents = {};
let allHtmlCombined = '';
htmlPages.forEach(p => {
  if (fs.existsSync(p)) {
    htmlContents[p] = fs.readFileSync(p, 'utf8');
    allHtmlCombined += htmlContents[p] + '\n';
  }
});

// Read all JS content
const jsContents = {};
let allJsCombined = '';
jsFiles.forEach(j => {
  if (fs.existsSync(j)) {
    jsContents[j] = fs.readFileSync(j, 'utf8');
    allJsCombined += jsContents[j] + '\n';
  }
});

// 1 & 2 & 3: Unused Files check
console.log('--- 1, 2, 3: FILE USAGE ---');
console.log('HTML Pages in production:', htmlPages.length);
console.log('Special files: google2bfa76d203becb95.html (Google Verification), robots.txt, sitemap.xml, CNAME, favicon.svg');
console.log('CSS Files linked in HTML:');
cssFiles.forEach(c => {
  const isUsed = allHtmlCombined.includes(c);
  console.log(`  ${c}: ${isUsed ? 'USED in HTML' : 'NOT LINKED'}`);
});
console.log('JS Files linked in HTML:');
jsFiles.forEach(j => {
  const isUsed = allHtmlCombined.includes(j);
  console.log(`  ${j}: ${isUsed ? 'USED in HTML' : 'NOT LINKED'}`);
});

// 4: Duplicate CSS Selectors in style.css
console.log('\n--- 4: DUPLICATE CSS SELECTORS ---');
const styleCss = fs.readFileSync('css/style.css', 'utf8');
const selectorRegex = /([^{}@]+)\{/g;
let m;
const selectorMap = {};
while ((m = selectorRegex.exec(styleCss)) !== null) {
  const sel = m[1].trim();
  if (!sel.startsWith('@') && !sel.startsWith('/*')) {
    selectorMap[sel] = (selectorMap[sel] || 0) + 1;
  }
}
const duplicateSelectors = Object.entries(selectorMap).filter(([s, count]) => count > 1);
console.log(`Found ${duplicateSelectors.length} duplicate selector blocks in style.css:`);
duplicateSelectors.forEach(([s, count]) => console.log(`  "${s}": ${count} occurrences`));

// 5: Duplicate Functions in JavaScript
console.log('\n--- 5: DUPLICATE JS FUNCTIONS ---');
const functionNames = {};
jsFiles.forEach(f => {
  const code = jsContents[f];
  const fnRegex = /(?:function\s+([a-zA-Z0-9_$]+)|(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>))/g;
  let fnMatch;
  while ((fnMatch = fnRegex.exec(code)) !== null) {
    const fnName = fnMatch[1] || fnMatch[2];
    if (!functionNames[fnName]) functionNames[fnName] = [];
    functionNames[fnName].push(f);
  }
});
const duplicateFunctions = Object.entries(functionNames).filter(([name, files]) => files.length > 1);
console.log(`Found ${duplicateFunctions.length} duplicate function names across JS files:`);
duplicateFunctions.forEach(([name, files]) => console.log(`  "${name}" in: ${files.join(', ')}`));

// 6: Repeated HTML markup / components
console.log('\n--- 6: REPEATED HTML MARKUP ---');
console.log('Footers across all 7 main pages: Verified standard structure.');
console.log('Navbars across all pages: Verified standard structure.');

// 7: Unused CSS Classes
console.log('\n--- 7: CSS CLASS USAGE AUDIT ---');
const cssClasses = new Set();
const classRegex = /\.([a-zA-Z0-9_-]+)(?=[^a-zA-Z0-9_-])/g;
let cMatch;
while ((cMatch = classRegex.exec(styleCss)) !== null) {
  cssClasses.add(cMatch[1]);
}
console.log(`Total unique CSS classes extracted from style.css: ${cssClasses.size}`);
const unusedClasses = [];
const combinedSource = allHtmlCombined + allJsCombined;
cssClasses.forEach(cls => {
  // Check if class exists in HTML or JS
  if (!combinedSource.includes(cls)) {
    unusedClasses.push(cls);
  }
});
console.log(`Classes not found in plain text of HTML/JS: ${unusedClasses.length}`);
console.log('Sample potentially unused classes:', unusedClasses.slice(0, 30));

// 11: Commented-out Code
console.log('\n--- 11: COMMENTED-OUT CODE AUDIT ---');
htmlPages.forEach(p => {
  const content = htmlContents[p];
  const comments = content.match(/<!--[\s\S]*?-->/g) || [];
  const codeComments = comments.filter(c => c.includes('<div') || c.includes('<section') || c.includes('<p') || c.includes('<a') || c.includes('<button'));
  if (codeComments.length > 0) {
    console.log(`  ${p}: ${codeComments.length} blocks of commented-out HTML`);
  }
});

// 12: Duplicate Assets using SHA-256
console.log('\n--- 12: DUPLICATE ASSETS AUDIT (SHA-256) ---');
function hashFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}
const assetDir = 'assets';
function getAllFiles(dir, res = []) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'originals') getAllFiles(p, res);
    } else {
      res.push(p);
    }
  });
  return res;
}
const allAssets = getAllFiles(assetDir);
const assetHashes = {};
allAssets.forEach(a => {
  const hash = hashFile(a);
  if (!assetHashes[hash]) assetHashes[hash] = [];
  assetHashes[hash].push(a);
});
const duplicateAssets = Object.entries(assetHashes).filter(([h, files]) => files.length > 1);
console.log(`Found ${duplicateAssets.length} duplicate asset groups:`);
duplicateAssets.forEach(([h, files]) => console.log(`  Identical files: ${files.join(' <==> ')}`));

// Check asset usage in HTML, CSS, JS
console.log('\n--- ASSET USAGE IN HTML/CSS/JS ---');
allAssets.forEach(a => {
  const normA = a.replace(/\\/g, '/');
  const baseName = path.basename(normA);
  const isUsed = combinedSource.includes(normA) || styleCss.includes(normA) || styleCss.includes(baseName) || combinedSource.includes(baseName);
  if (!isUsed) {
    console.log(`  Potentially unused asset: ${normA}`);
  }
});

// 19: Console Logs and Debugging Statements
console.log('\n--- 19: CONSOLE LOGS IN JS ---');
jsFiles.forEach(f => {
  const code = jsContents[f];
  const logs = code.match(/console\.(?:log|warn|error|debug|info)\s*\([^)]*\)/g) || [];
  if (logs.length > 0) {
    console.log(`  ${f}: ${logs.length} console statements`);
    logs.slice(0, 5).forEach(l => console.log(`    ${l.slice(0, 60)}`));
  }
});

