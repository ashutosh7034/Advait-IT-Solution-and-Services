const fs = require('fs');

['about.html', 'index.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const scripts = c.match(/<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/g) || [];
  scripts.forEach(s => {
    if (s.includes('Pandey') || s.includes('Mandal')) {
      console.log('FILE:', f);
      console.log(s);
    }
  });
});

