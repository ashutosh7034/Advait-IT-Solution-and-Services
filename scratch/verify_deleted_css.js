const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== VERIFYING DELETED CSS BLOCKS ===\n');

const diff = execSync('git diff HEAD -- css/style.css', { encoding: 'utf8' });

// Extract all deleted lines that define selectors
const deletedLines = diff.split('\n').filter(l => l.startsWith('-') && !l.startsWith('---'));
const deletedSelectors = [];

deletedLines.forEach(l => {
  const line = l.slice(1).trim();
  if (line.includes('{') || (line.startsWith('.') && !line.includes(':') && line.endsWith(','))) {
    const sel = line.replace(/\{.*/, '').trim();
    if (sel && !sel.startsWith('/*') && !sel.startsWith('@') && !sel.startsWith('*')) {
      deletedSelectors.push(sel);
    }
  }
});

console.log('Total deleted selector lines identified:', deletedSelectors.length);

// Read all active HTML and JS
const htmlFiles = ['index.html', 'about.html', 'services.html', 'advait-advantage.html', 'projects.html', 'contact.html', 'privacy-policy.html', '404.html'];
const jsFiles = ['js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js'];

let combinedCode = '';
htmlFiles.forEach(f => combinedCode += fs.readFileSync(f, 'utf8') + '\n');
jsFiles.forEach(f => combinedCode += fs.readFileSync(f, 'utf8') + '\n');

// Also read current style.css to check if the selector was superseded (still exists later in the file)
const currentStyle = fs.readFileSync('css/style.css', 'utf8');

const report = [];
deletedSelectors.forEach(sel => {
  // Check if sel or any of its class tokens exist in HTML/JS
  const classTokens = sel.match(/\.([a-zA-Z0-9_-]+)/g) || [];
  let usedInHtmlOrJs = false;
  let usedClasses = [];
  classTokens.forEach(ct => {
    const cls = ct.slice(1);
    if (combinedCode.includes(cls)) {
      usedInHtmlOrJs = true;
      usedClasses.push(cls);
    }
  });

  const stillInCss = currentStyle.includes(sel.split(',')[0].trim());

  report.push({
    selector: sel,
    usedInHtmlOrJs,
    usedClasses,
    supersededInCurrentCss: stillInCss
  });
});

console.log('Summary of deleted selectors:');
let dangerCount = 0;
report.forEach(r => {
  if (r.usedInHtmlOrJs && !r.supersededInCurrentCss) {
    console.log(`[POTENTIAL ISSUE] "${r.selector}" is in HTML/JS (${r.usedClasses.join(', ')}) but NOT in current CSS!`);
    dangerCount++;
  }
});

if (dangerCount === 0) {
  console.log('✓ PASS: 100% of deleted CSS selectors were either genuinely unused (0 occurrences in HTML/JS) or cleanly superseded by modern declarations in style.css!');
}

