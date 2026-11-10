const fs = require('fs');

function countLines(file) {
  const content = fs.readFileSync(file, 'utf8');
  return content.split('\n').length;
}

const htmlFiles = ['index.html', 'about.html', 'services.html', 'advait-advantage.html', 'projects.html', 'contact.html', 'privacy-policy.html', '404.html'];
const cssFiles = ['css/style.css', 'css/responsive.css', 'css/animations.css'];
const jsFiles = ['js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js'];

let htmlLoc = 0;
htmlFiles.forEach(f => {
  const l = countLines(f);
  htmlLoc += l;
  console.log(f, l);
});

let cssLoc = 0;
cssFiles.forEach(f => {
  const l = countLines(f);
  cssLoc += l;
  console.log(f, l);
});

let jsLoc = 0;
jsFiles.forEach(f => {
  const l = countLines(f);
  jsLoc += l;
  console.log(f, l);
});

const before = {
  html: 4718,
  css: 6296,
  js: 2547,
  totalSourceLoc: 13561,
  totalFiles: 1660
};

const after = {
  html: htmlLoc,
  css: cssLoc,
  js: jsLoc,
  totalSourceLoc: htmlLoc + cssLoc + jsLoc,
  totalFiles: 222
};

console.log('\n=== BEFORE VS AFTER LOC COMPARISON ===');
console.log(`HTML LOC: ${before.html} -> ${after.html} (diff: ${after.html - before.html})`);
console.log(`CSS LOC: ${before.css} -> ${after.css} (diff: ${after.css - before.css}, -${((before.css - after.css)/before.css*100).toFixed(1)}%)`);
console.log(`JS LOC: ${before.js} -> ${after.js} (diff: ${after.js - before.js})`);
console.log(`Total Core Source LOC: ${before.totalSourceLoc} -> ${after.totalSourceLoc} (diff: ${after.totalSourceLoc - before.totalSourceLoc}, -${((before.totalSourceLoc - after.totalSourceLoc)/before.totalSourceLoc*100).toFixed(1)}%)`);
console.log(`Total Workspace Files: ${before.totalFiles} -> ${after.totalFiles} (eliminated: ${before.totalFiles - after.totalFiles} files!)`);

