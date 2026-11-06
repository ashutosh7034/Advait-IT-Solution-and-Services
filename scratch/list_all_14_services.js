const fs = require('fs');
const js = fs.readFileSync('js/services.js', 'utf8');
const start = js.indexOf('const SERVICES_DATA =');
const end = js.indexOf('];\n\n  let activeCategory', start);
const services = eval(js.slice(start + 22, end + 1));
console.log('Total services in JS:', services.length);
services.forEach((s, i) => {
  console.log(`${i + 1}. ID: "${s.id}", Category: "${s.categoryFilter}", Label: "${s.categoryLabel}", Title: "${s.title}", QuoteSlug: "${s.quoteSlug}"`);
});

