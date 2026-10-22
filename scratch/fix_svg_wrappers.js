const fs = require('fs');

function makeSvgWrapper(sourceFile, mimeType, width, height) {
  const b64 = fs.readFileSync(sourceFile).toString('base64');
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + width + ' ' + height + '" width="100%" height="100%">\n' +
         '  <image width="' + width + '" height="' + height + '" xlink:href="data:' + mimeType + ';base64,' + b64 + '"/>\n' +
         '</svg>\n';
}

fs.writeFileSync('assets/logos/logo.svg', makeSvgWrapper('assets/logos/logo.jpg', 'image/jpeg', 1600, 533));
fs.writeFileSync('assets/logos/logo-white.svg', makeSvgWrapper('assets/logos/logo.jpg', 'image/jpeg', 1600, 533));
fs.writeFileSync('assets/images/founder-ashutosh.svg', makeSvgWrapper('assets/images/founder-ashutosh.png', 'image/png', 1254, 1254));
fs.writeFileSync('assets/images/techlead-aakash.svg', makeSvgWrapper('assets/images/techlead-aakash.png', 'image/png', 372, 372));

console.log('Valid SVG wrappers generated successfully!');
