const fs = require('fs');

console.log('=== PHASE 7: PERFORMANCE & SECURITY AUDIT ===\n');

const filesToScan = [
  'index.html', 'about.html', 'services.html', 'advait-advantage.html',
  'projects.html', 'contact.html', 'privacy-policy.html', '404.html',
  'css/style.css', 'css/responsive.css', 'css/animations.css',
  'js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js',
  'robots.txt', 'sitemap.xml'
];

// Patterns for secrets/keys
const secretPatterns = [
  /(?:api[_-]?key|secret|password|auth[_-]?token|bearer)\s*[:=]\s*['\"][A-Za-z0-9_-]{16,}['\"]/i,
  /AIza[0-9A-Za-z-_]{35}/, // Google API key
  /ghp_[0-9a-zA-Z]{36}/, // GitHub token
  /sk_live_[0-9a-zA-Z]{24}/, // Stripe secret key
  /AKIA[0-9A-Z]{16}/ // AWS Access Key
];

let secretsFound = 0;
filesToScan.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  secretPatterns.forEach(p => {
    if (p.test(content)) {
      console.log(`[ALERT] Potential secret pattern matched in ${f}`);
      secretsFound++;
    }
  });
});
if (secretsFound === 0) {
  console.log('✓ PASS: Zero hardcoded credentials or API secrets found.');
}

// Check external scripts
console.log('\n--- External Scripts Audit ---');
filesToScan.filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const scripts = c.match(/<script[^>]+src=[\"'][^\"']+[\"'][^>]*>/gi) || [];
  const external = scripts.filter(s => s.includes('http://') || s.includes('https://') || s.includes('//'));
  console.log(`${f}: ${external.length} external scripts`);
  external.forEach(s => console.log('   ', s.trim()));
});

// Check image loading strategy (loading="lazy" / dimensions)
console.log('\n--- Image Loading Strategy ---');
filesToScan.filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const imgTags = c.match(/<img[^>]+>/gi) || [];
  let missingLazy = 0;
  let missingDimensions = 0;
  imgTags.forEach(img => {
    if (!img.includes('loading=')) missingLazy++;
    if (!img.includes('width=') || !img.includes('height=')) missingDimensions++;
  });
  console.log(`${f}: ${imgTags.length} images (${missingLazy} missing loading attr, ${missingDimensions} missing width/height)`);
});

