const fs = require('fs');

const style = fs.readFileSync('css/style.css', 'utf8');

// Read all HTML and JS files
const htmlPages = ['index.html', 'about.html', 'services.html', 'advait-advantage.html', 'projects.html', 'contact.html', 'privacy-policy.html', '404.html'];
const jsFiles = ['js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js'];

let combinedCode = '';
htmlPages.forEach(p => combinedCode += fs.readFileSync(p, 'utf8') + '\n');
jsFiles.forEach(j => combinedCode += fs.readFileSync(j, 'utf8') + '\n');

// Extract all class selectors from style.css
// Matches .class-name where it's a valid CSS class name
const classRegex = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
let match;
const classCount = {};
while ((match = classRegex.exec(style)) !== null) {
  const cls = match[1];
  classCount[cls] = (classCount[cls] || 0) + 1;
}

console.log('Total unique classes in style.css:', Object.keys(classCount).length);

const unused = [];
Object.keys(classCount).forEach(cls => {
  // Regex to test if class is used in combinedCode (either in class="..." or in JS document.querySelector('.class') or classList.add('class'))
  const r = new RegExp('([\\s\"\'`.]|^)' + cls + '([\\s\"\'`:;>]|$)', 'm');
  if (!r.test(combinedCode)) {
    unused.push(cls);
  }
});

console.log('Classes not found in HTML or JS:', unused.length);
console.log('List of unreferenced classes:');
console.log(unused.sort());

