const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('   ADVAIT IT SOLUTIONS — COMPREHENSIVE END-TO-END AUDIT SUITE   ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// -----------------------------------------------------------------------------
// 1. PROJECT STRUCTURE & ASSETS
// -----------------------------------------------------------------------------
console.log('--- 1. PROJECT STRUCTURE & STATIC ASSETS ---');
const requiredFiles = [
  'index.html',
  'about.html',
  'services.html',
  'advait-advantage.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'README.md',
  'css/style.css',
  'css/animations.css',
  'css/responsive.css',
  'js/main.js',
  'js/interactions.js',
  'js/projects-data.js',
  'js/form-validation.js',
  'assets/logos/logo.jpg',
  'assets/images/founder-ashutosh.png',
  'assets/images/techlead-aakash.png'
];

requiredFiles.forEach(file => {
  assert(fs.existsSync(file) && fs.statSync(file).size > 0, `File exists and non-empty: ${file}`);
});

// -----------------------------------------------------------------------------
// 2. CSS DESIGN SYSTEM & CUSTOM PROPERTIES
// -----------------------------------------------------------------------------
console.log('\n--- 2. CSS DESIGN SYSTEM TOKENS ---');
const styleCss = fs.readFileSync('css/style.css', 'utf8');
const rootMatch = styleCss.match(/:root\s*\{([\s\S]*?)\}/);
assert(Boolean(rootMatch), ':root design token block exists in css/style.css');

const rootContent = rootMatch ? rootMatch[1] : '';
const tokens = [
  '--color-primary',
  '--color-secondary',
  '--color-navy',
  '--color-surface',
  '--color-text-main',
  '--color-border',
  '--font-body',
  '--font-heading',
  '--navbar-height',
  '--announcement-height'
];

tokens.forEach(tok => {
  assert(rootContent.includes(tok), `Design token defined: ${tok}`);
});

// Check that smooth scroll on html is guarded
assert(styleCss.includes('html.page-loaded'), 'Smooth scroll is enabled via html.page-loaded for reload stability');

// -----------------------------------------------------------------------------
// 3. JAVASCRIPT SYNTAX & RUNTIME VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 3. JAVASCRIPT LOGIC & SAFETY GUARDS ---');
const mainJs = fs.readFileSync('js/main.js', 'utf8');
assert(mainJs.includes("document.documentElement.classList.add('page-loaded')"), 'main.js marks page-loaded on window load');
assert(mainJs.includes('parent.querySelector(\'.dropdown-menu\')'), 'main.js guards dropdown toggles with menu presence check');

const formJs = fs.readFileSync('js/form-validation.js', 'utf8');
assert(formJs.includes('AbortController'), 'form-validation.js implements AbortController network timeout');
assert(formJs.includes('escapeHtml'), 'form-validation.js implements HTML escaping for error output');
assert(!formJs.includes('.style.color ='), 'form-validation.js avoids direct inline style mutations');

const projJs = fs.readFileSync('js/projects-data.js', 'utf8');
assert(!projJs.includes('style="margin-bottom:'), 'projects-data.js avoids inline styles in modal markup');
assert(projJs.includes('width="600" height="338"'), 'projects-data.js includes explicit image dimensions');

// -----------------------------------------------------------------------------
// 4. HTML PAGES AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 4. HTML PAGES COMPLIANCE & NAVIGATION ---');
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'advait-advantage.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html',
  '404.html'
];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\nAuditing [${file}]:`);

  // HTML5 DOCTYPE & lang
  assert(/<!DOCTYPE html>/i.test(content), `${file}: Has valid DOCTYPE`);
  assert(/<html[^>]*lang="en"/i.test(content), `${file}: Has html lang="en"`);

  // Head metadata
  assert(/<title>[^<]+<\/title>/.test(content), `${file}: Has non-empty <title>`);
  assert(/<meta\s+name="viewport"/i.test(content), `${file}: Has responsive viewport meta`);
  assert(/<meta\s+name="description"/i.test(content), `${file}: Has SEO meta description`);
  assert(content.includes('fonts.googleapis.com'), `${file}: Has Google Fonts preconnect/stylesheet`);

  // Heading hierarchy
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g) || [];
  assert(h1Matches.length === 1, `${file}: Has exactly ONE <h1> tag (found: ${h1Matches.length})`);

  // Landmarks
  assert(/<main[^>]*id="mainContent"/i.test(content) || file === '404.html', `${file}: Has <main id="mainContent">`);
  assert(content.includes('class="site-header"'), `${file}: Has .site-header`);
  assert(content.includes('class="site-footer"'), `${file}: Has .site-footer`);

  // Navigation consistency (for non-404 pages)
  if (file !== '404.html') {
    assert(content.includes('class="nav-menu"'), `${file}: Has .nav-menu`);
    assert(content.includes('class="dropdown-menu"'), `${file}: Has Services Mega Dropdown menu`);
    assert(content.includes('class="mobile-nav-cta"'), `${file}: Has mobile drawer CTA container`);
    assert(content.includes('Chat on WhatsApp'), `${file}: Has WhatsApp action in mobile drawer`);
  }

  // Zero inline style attributes
  const inlineStyles = content.match(/style=["'][^"']*["']/g) || [];
  assert(inlineStyles.length === 0, `${file}: Has ZERO inline style attributes (found: ${inlineStyles.length})`);

  // Check all images have alt, width, and height
  const imgTags = content.match(/<img[^>]*>/g) || [];
  let imgErrors = 0;
  imgTags.forEach(img => {
    if (!img.includes('alt=') || !img.includes('width=') || !img.includes('height=')) {
      imgErrors++;
    }
  });
  assert(imgErrors === 0, `${file}: All <img> tags (${imgTags.length}) have alt, width, and height`);
});

// -----------------------------------------------------------------------------
// 5. SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
}
