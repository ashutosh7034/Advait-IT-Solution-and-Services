const fs = require('fs');

['about.html', 'advait-advantage.html', 'index.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /<a href="mailto:infoadvaitit@gmail.com" title="Email Us">\s*<svg[^>]*>[\s\S]*?<\/svg>\s*ashutosh3276s16@gmail\.com\s*<\/a>/g,
    `<a href="mailto:infoadvaitit@gmail.com" title="Email Us">\n          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>\n          infoadvaitit@gmail.com\n        </a>`
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated topbar text in ${file}`);
});

