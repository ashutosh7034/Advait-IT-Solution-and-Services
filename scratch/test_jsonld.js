const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let errors = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const jsonLdMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  jsonLdMatches.forEach((tag, idx) => {
    const raw = tag.replace(/<script type="application\/ld\+json">|<\/script>/g, '').trim();
    try {
      const parsed = JSON.parse(raw);
      console.log(`[${f}] JSON-LD #${idx+1} valid! Type: ${parsed['@type'] || parsed['@graph']?.[0]?.['@type']}`);
    } catch (e) {
      console.error(`[${f}] JSON-LD #${idx+1} INVALID JSON:`, e.message);
      errors++;
    }
  });
});

if (errors === 0) {
  console.log('PASS: All JSON-LD structured data blocks are valid JSON!');
} else {
  console.error(`FAIL: Found ${errors} invalid JSON-LD blocks.`);
  process.exit(1);
}
