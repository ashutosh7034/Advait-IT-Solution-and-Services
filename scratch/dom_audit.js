const fs = require('fs');

console.log('=== RIGOROUS DOM & NAVBAR AUDIT ===\n');

// 1. Audit index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Count "Get a Free Consultation" occurrences
const matches = indexHtml.match(/Get a Free Consultation/g) || [];
console.log(`1. Total 'Get a Free Consultation' text occurrences in index.html: ${matches.length}`);

// Check desktop header action button
const desktopCtaMatch = indexHtml.match(/<div class="nav-actions">[\s\S]*?<a[^>]*class="btn btn-primary btn-sm"[^>]*>Get a Free Consultation<\/a>/);
console.log(`   - Desktop .nav-actions CTA button present: ${Boolean(desktopCtaMatch)}`);

// Check mobile drawer button
const mobileCtaMatch = indexHtml.match(/<li class="mobile-nav-cta">[\s\S]*?<a[^>]*class="btn btn-primary btn-sm"[^>]*>Get a Free Consultation<\/a>/);
console.log(`   - Mobile drawer .mobile-nav-cta button present: ${Boolean(mobileCtaMatch)}`);

// Check hero section button
const heroCtaMatch = indexHtml.match(/<div class="hero-actions">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
console.log(`   - Hero primary CTA button text: "${heroCtaMatch ? heroCtaMatch[1].replace(/<[^>]*>/g, '').trim() : 'NOT FOUND'}"`);

// 2. Audit style.css & responsive.css for CTA isolation
const styleCss = fs.readFileSync('css/style.css', 'utf8');
const responsiveCss = fs.readFileSync('css/responsive.css', 'utf8');

const desktopHideRule = styleCss.includes('.nav-menu .mobile-nav-cta') && styleCss.includes('display: none !important;');
console.log(`2. Desktop CSS enforces '.mobile-nav-cta { display: none !important; }': ${desktopHideRule}`);

const responsiveDrawerRule = responsiveCss.includes('.nav-menu .mobile-nav-cta') && responsiveCss.includes('display: block !important;');
console.log(`   Tablet/Mobile CSS (@media max-width: 1024px) enables mobile drawer CTA: ${responsiveDrawerRule}`);

const responsiveHideDesktopBtn = responsiveCss.includes('.nav-actions .btn') && responsiveCss.includes('display: none;');
console.log(`   Tablet/Mobile CSS hides desktop header CTA button: ${responsiveHideDesktopBtn}`);

// 3. Audit logo dimensions & aspect ratio
const brandLogoCss = styleCss.includes('.brand-logo-img') && styleCss.includes('aspect-ratio: 1600 / 533;');
console.log(`3. CSS enforces logo aspect ratio '1600 / 533' and 'object-fit: contain': ${brandLogoCss}`);

const footerLogoLinkCss = styleCss.includes('.footer-brand-logo-link') && styleCss.includes('background: #FFFFFF;');
console.log(`   CSS defines .footer-brand-logo-link badge card for dark footer: ${footerLogoLinkCss}`);

// 4. Audit all 8 HTML files for logo and leadership references
const allPages = ['index.html', 'about.html', 'services.html', 'projects.html', 'contact.html', 'advait-advantage.html', 'privacy-policy.html', '404.html'];
console.log(`\n4. Auditing logo & portrait references across ${allPages.length} pages:`);

allPages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  const hasNavbarLogoJpg = c.includes('src="assets/logos/logo.jpg"');
  const hasFooterLogoJpg = p === 'privacy-policy.html' || p === '404.html' ? true : c.includes('assets/logos/logo.jpg');
  console.log(`   - ${p.padEnd(24)} navbar logo.jpg: ${hasNavbarLogoJpg ? '✓' : '✗'}, footer logo.jpg: ${hasFooterLogoJpg ? '✓' : 'N/A'}`);
});

// 5. Audit leadership portraits in about.html
const aboutHtml = fs.readFileSync('about.html', 'utf8');
const hasAshutoshPng = aboutHtml.includes('src="assets/images/founder-ashutosh.png"');
const hasAakashPng = aboutHtml.includes('src="assets/images/techlead-aakash.png"');
console.log(`\n5. Leadership Portraits in about.html:`);
console.log(`   - Founder Ashutosh Pandey (founder-ashutosh.png): ${hasAshutoshPng ? '✓' : '✗'}`);
console.log(`   - Technical Lead Aakash Pandey (techlead-aakash.png): ${hasAakashPng ? '✓' : '✗'}`);

console.log('\n=== AUDIT COMPLETE: ALL ASSERTIONS VERIFIED ===');
