const fs = require('fs');

const srv = fs.readFileSync('services.html', 'utf8');
const contact = fs.readFileSync('contact.html', 'utf8');

console.log('Services filter buttons:');
const btnMatches = srv.match(/class=["'][^"']*(?:filter|pill|cat|tab)[^"']*["']/g) || [];
console.log([...new Set(btnMatches)].slice(0, 10));

console.log('Services search:');
const srvSearch = srv.match(/<input[^>]*>/g) || [];
console.log(srvSearch);

console.log('Contact form:');
const formMatches = contact.match(/<form[^>]*>/g) || [];
console.log(formMatches);

console.log('Contact chips:');
const chipMatches = contact.match(/class=["'][^"']*(?:chip|quick)[^"']*["']/g) || [];
console.log([...new Set(chipMatches)].slice(0, 10));

