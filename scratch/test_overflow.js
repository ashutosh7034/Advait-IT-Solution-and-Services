const fs = require('fs');

const cssFiles = ['css/style.css', 'css/responsive.css', 'css/animations.css'];

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Look for fixed pixel widths that could cause overflow on mobile
  const fixedWidths = content.match(/width:\s*([4-9]\d{2,}|\d{4,})px/g) || [];
  console.log(`${file}: found ${fixedWidths.length} fixed pixel widths >= 400px:`, fixedWidths);
});
