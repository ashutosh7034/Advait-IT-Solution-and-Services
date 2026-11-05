const fs = require('fs');
const path = require('path');

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errors++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

console.log('=== CI QUALITY CHECK: ADVAIT IT SOLUTIONS ===\n');

// 1. Verify HTML structure & meta for main pages
const appHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('google'));
assert(appHtmlFiles.length === 8, `Found ${appHtmlFiles.length}/8 expected website HTML files`);

appHtmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  assert(content.includes('<!DOCTYPE html>'), `[${file}] Has valid DOCTYPE`);
  assert(/<title>[^<]+<\/title>/.test(content), `[${file}] Has non-empty title`);
  assert(/<meta\s+name=["']description["']/i.test(content), `[${file}] Has meta description`);
  assert(content.includes('googletagmanager.com') || content.includes('G-MNV8W0JCC7'), `[${file}] Contains GA4 / Google Analytics tag`);
  assert(!content.includes('yourdomain.com'), `[${file}] Zero placeholder domain references`);
  assert(!content.includes('akp2756097@gmail.com'), `[${file}] Zero old/inconsistent email references`);

  // Check on-disk assets
  const srcMatches = [...content.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  srcMatches.forEach(src => {
    if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      const full = path.join('.', src.split('?')[0]);
      assert(fs.existsSync(full), `[${file}] Local src asset exists: ${src}`);
    }
  });

  // Check on-disk links
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  hrefMatches.forEach(href => {
    if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:')) {
      const cleanPath = href.split('#')[0].split('?')[0];
      if (cleanPath) {
        assert(fs.existsSync(path.join('.', cleanPath)), `[${file}] Internal link target exists: ${cleanPath}`);
      }
    }
  });
});

// 2. Validate JSON-LD structured data blocks
appHtmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const jsonLdMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  jsonLdMatches.forEach((m, idx) => {
    try {
      JSON.parse(m[1]);
      assert(true, `[${file}] JSON-LD block #${idx + 1} is valid JSON`);
    } catch (err) {
      assert(false, `[${file}] JSON-LD block #${idx + 1} failed parsing: ${err.message}`);
    }
  });
});

// 3. Validate CSS files
const cssFiles = fs.readdirSync('css').filter(f => f.endsWith('.css'));
cssFiles.forEach(file => {
  const css = fs.readFileSync(path.join('css', file), 'utf8');
  const openCount = (css.match(/\{/g) || []).length;
  const closeCount = (css.match(/\}/g) || []).length;
  assert(openCount === closeCount, `[css/${file}] Braces are balanced (${openCount} open, ${closeCount} close)`);
});

// 4. Validate Sitemap & Robots
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert(!sitemap.includes('yourdomain.com'), 'sitemap.xml has 0 yourdomain.com references');
assert(sitemap.includes('https://advaititsolutions.com'), 'sitemap.xml has production domain');

const robots = fs.readFileSync('robots.txt', 'utf8');
assert(!robots.includes('yourdomain.com'), 'robots.txt has 0 yourdomain.com references');
assert(robots.includes('https://advaititsolutions.com/sitemap.xml'), 'robots.txt points to production sitemap');

// 5. Security & Sensitive info scan
const scanFiles = [
  ...appHtmlFiles,
  'google2bfa76d203becb95.html',
  ...cssFiles.map(f => path.join('css', f)),
  ...fs.readdirSync('js').filter(f => f.endsWith('.js')).map(f => path.join('js', f))
];

const secretPatterns = [
  /AIza[0-9A-Za-z-_]{35}/,
  /sk_live_[0-9a-zA-Z]{24}/,
  /ghp_[0-9a-zA-Z]{36}/,
  /BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY/
];

scanFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    secretPatterns.forEach(pat => {
      assert(!pat.test(text), `[${file}] No private credentials or secrets detected`);
    });
  }
});

console.log('\n=== CI SUMMARY ===');
if (errors > 0) {
  console.error(`💥 FAILED: ${errors} errors detected.`);
  process.exit(1);
} else {
  console.log(`🎉 ALL CHECKS PASSED: 0 errors detected across full test suite!`);
  process.exit(0);
}
