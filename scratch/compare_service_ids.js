const fs = require('fs');
const js = fs.readFileSync('js/services.js', 'utf8');
const html = fs.readFileSync('services.html', 'utf8');

const start = js.indexOf('const SERVICES_DATA =');
const end = js.indexOf('];\n\n  let activeCategory', start);
const jsServices = eval(js.slice(start + 22, end + 1));

console.log('JS SERVICES DATA (count: ' + jsServices.length + '):');
jsServices.forEach(s => console.log('  id: ' + s.id + ' | cat: ' + s.categoryFilter + ' | label: ' + s.categoryLabel));

const htmlCards = [];
const re = /<article class="advait-service-card[^"]*" id="([^"]+)" data-service-id="([^"]+)"/g;
let m;
while ((m = re.exec(html)) !== null) {
  htmlCards.push({ id: m[1], serviceId: m[2] });
}
console.log('\nHTML CARDS (count: ' + htmlCards.length + '):');
htmlCards.forEach(c => console.log('  id: ' + c.id + ' | data-service-id: ' + c.serviceId));

console.log('\nCOMPARISON & MISMATCHES:');
htmlCards.forEach((c, idx) => {
  const jsMatch = jsServices.find(s => s.id === c.serviceId);
  if (!jsMatch) {
    console.log('  MISMATCH at [' + idx + ']: HTML has ' + c.serviceId + ' but NOT in JS SERVICES_DATA!');
  } else {
    console.log('  MATCH [' + idx + ']: ' + c.serviceId);
  }
});
