const fs = require('fs');

let srv = fs.readFileSync('services.html', 'utf8');
srv = srv.replace(
  '<img id="modalServiceImage" src="" alt="" width="700" height="180" loading="lazy">',
  '<img id="modalServiceImage" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E" alt="" width="700" height="180" loading="lazy">'
);
fs.writeFileSync('services.html', srv, 'utf8');
console.log('Updated services.html: modalServiceImage placeholder set!');

