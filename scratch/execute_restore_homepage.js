const fs = require('fs');
const { execSync } = require('child_process');

console.log('=== RESTORING PREVIOUS HOMEPAGE ===');

// 1. Get original index.html from git HEAD (commit af0d6be)
const originalIndex = execSync('git show HEAD:index.html', { encoding: 'utf8' });

// 2. Clean the accidental '>>' typo from meta tags if present
let cleanedIndex = originalIndex
  .replace(/content="Advait IT Solutions and Services is a premier IT and software development company in Mumbai offering custom software, web &amp; mobile apps, cloud, and AI solutions\.">>/g, 'content="Advait IT Solutions and Services is a premier IT and software development company in Mumbai offering custom software, web &amp; mobile apps, cloud, and AI solutions.">')
  .replace(/content="Advait IT Solutions, Advait IT Solutions and Services, Advait IT Services, IT Services Company, Software Development Company, Website Development Company in Mumbai, Custom Software Development, Web Application Development, Mobile App Development Company, AI Development Services, IT Consulting Services, Cloud Solutions">>/g, 'content="Advait IT Solutions, Advait IT Solutions and Services, Advait IT Services, IT Services Company, Software Development Company, Website Development Company in Mumbai, Custom Software Development, Web Application Development, Mobile App Development Company, AI Development Services, IT Consulting Services, Cloud Solutions">')
  .replace(/content="Advait IT Solutions and Services \| Software &amp; IT Solutions">>/g, 'content="Advait IT Solutions and Services | Software &amp; IT Solutions">')
  .replace(/content="Premier IT services and software development company in Mumbai\. Custom web applications, mobile apps, cloud infrastructure, AI solutions, and ongoing maintenance\.">>/g, 'content="Premier IT services and software development company in Mumbai. Custom web applications, mobile apps, cloud infrastructure, AI solutions, and ongoing maintenance.">');

fs.writeFileSync('index.html', cleanedIndex, 'utf8');
console.log('✓ index.html restored from HEAD (commit af0d6be) with cleaned meta syntax');

// 3. Clean homepage-specific split hero CSS from css/style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

// Match and remove lines 3815 to 4033: /* 1. HOMEPAGE 2-Column Split Hero */ up to /* 2. INNER PAGE SPLIT HERO
const splitHeroRegex = /\/\* 1\. HOMEPAGE 2-Column Split Hero \*\/[\s\S]*?(?=\/\* 2\. INNER PAGE SPLIT HERO)/;
if (splitHeroRegex.test(styleCss)) {
  styleCss = styleCss.replace(splitHeroRegex, '');
  console.log('✓ Removed homepage-specific split hero CSS from css/style.css');
}

// Remove .advait-hero-split selectors from opacity override
styleCss = styleCss.replace(
  /\.advait-hero-split,\s*\.advait-hero-split \.reveal,\s*/g,
  ''
);

fs.writeFileSync('css/style.css', styleCss, 'utf8');

// 4. Clean homepage-specific split hero CSS from css/responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');

respCss = respCss.replace(
  /\s*\.metrics-ribbon-grid\s*\{[\s\S]*?\}\s*\.metric-ribbon-item\s*\{[\s\S]*?\}\s*\.metric-ribbon-item:last-child\s*\{[\s\S]*?\}/g,
  ''
);

respCss = respCss.replace(/\.advait-hero-split,\s*/g, '');
respCss = respCss.replace(/\s*\.hero-floating-chip\s*\{[\s\S]*?\}/g, '');
respCss = respCss.replace(/\s*\.advait-hero-actions\s*\{[\s\S]*?\}/g, '');
respCss = respCss.replace(/\s*\.advait-hero-actions \.btn\s*\{[\s\S]*?\}/g, '');
respCss = respCss.replace(/\s*\.hero-trust-bullets\s*\{[\s\S]*?\}/g, '');

fs.writeFileSync('css/responsive.css', respCss, 'utf8');
console.log('✓ Cleaned homepage-specific rules from css/responsive.css');

// 5. Verify CSS Brace Balance
['css/style.css', 'css/responsive.css'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let open = (content.match(/\{/g) || []).length;
  let close = (content.match(/\}/g) || []).length;
  if (open !== close) {
    console.error(`❌ CSS syntax error in ${f}: open ${open} != close ${close}`);
  } else {
    console.log(`✓ CSS brace balance verified in ${f}: ${open} open, ${close} close`);
  }
});

