const fs = require('fs');

// =========================================================================
// 1. Update index.html (Home Hero: एकदृष्टिः, अनन्तसम्भावनाः)
// =========================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8');

const oldHeroTaglineRegex = /<div class="hero-sanskrit-tagline"[\s\S]*?<\/div>/;
const newHeroTagline = `<div class="hero-sanskrit-tagline" aria-label="Advait Sanskrit Brand Motto">
            <span class="sanskrit-devanagari" lang="sa">एकदृष्टिः, अनन्तसम्भावनाः</span>
            <span class="sanskrit-sep" aria-hidden="true">•</span>
            <span class="sanskrit-trans">One Vision. Infinite Possibilities.</span>
          </div>`;

if (oldHeroTaglineRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldHeroTaglineRegex, newHeroTagline);
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('✓ index.html updated with: एकदृष्टिः, अनन्तसम्भावनाः');
} else {
  console.log('! Could not find hero-sanskrit-tagline in index.html');
}

// =========================================================================
// 2. Update services.html (Services Hero: प्रौद्योगिक्या प्रगतिः)
// =========================================================================
let servicesHtml = fs.readFileSync('services.html', 'utf8');

const srvHeaderTarget = `<div class="services-hero-header text-center">`;
const srvHeaderReplacement = `<div class="services-hero-header text-center">
          <div class="services-sanskrit-kicker" aria-label="Services Technology Tagline">
            <span class="sanskrit-devanagari" lang="sa">प्रौद्योगिक्या प्रगतिः</span>
            <span class="sanskrit-sep" aria-hidden="true">•</span>
            <span class="sanskrit-trans">Progress Through Technology</span>
          </div>`;

if (!servicesHtml.includes('services-sanskrit-kicker')) {
  servicesHtml = servicesHtml.replace(srvHeaderTarget, srvHeaderReplacement);
  fs.writeFileSync('services.html', servicesHtml, 'utf8');
  console.log('✓ services.html updated with: प्रौद्योगिक्या प्रगतिः');
} else {
  console.log('- services.html already has services-sanskrit-kicker');
}

// =========================================================================
// 3. Update about.html (About Us: विश्वासेन विकासः & remove large extra section)
// =========================================================================
let aboutHtml = fs.readFileSync('about.html', 'utf8');

// Remove the separate large philosophy section
const largePhilosophyRegex = /<!-- Sanskrit Brand Heritage & Philosophy -->[\s\S]*?<!-- Mission & Vision -->\s*<section class="section">/;
const cleanMissionVision = `<!-- Mission & Vision -->
    <section class="section section-subtle">`;

if (largePhilosophyRegex.test(aboutHtml)) {
  aboutHtml = aboutHtml.replace(largePhilosophyRegex, cleanMissionVision);
  console.log('✓ Removed large separate philosophy section from about.html');
}

// Add compact kicker in "Who We Are" story section
const whoWeAreRegex = /<span class="section-kicker">Who We Are<\/span>\s*<h2>Dedicated to Practical, High-Impact IT Solutions<\/h2>/;
const whoWeAreReplacement = `<div class="about-sanskrit-kicker" aria-label="Advait Trust Tagline">
              <span class="sanskrit-devanagari" lang="sa">विश्वासेन विकासः</span>
              <span class="sanskrit-sep" aria-hidden="true">•</span>
              <span class="sanskrit-trans">Growth Through Trust</span>
            </div>
            <span class="section-kicker">Who We Are</span>
            <h2>Dedicated to Practical, High-Impact IT Solutions</h2>`;

if (whoWeAreRegex.test(aboutHtml)) {
  aboutHtml = aboutHtml.replace(whoWeAreRegex, whoWeAreReplacement);
  console.log('✓ about.html updated with: विश्वासेन विकासः');
}
fs.writeFileSync('about.html', aboutHtml, 'utf8');

// =========================================================================
// 4. Update advait-advantage.html (revert Sanskrit kicker to keep page clean)
// =========================================================================
let advHtml = fs.readFileSync('advait-advantage.html', 'utf8');
const advHeaderRegex = /<div class="advantage-sanskrit-kicker"[\s\S]*?<\/div>\s*<h2 id="pillarsTitle">The Four Pillars of the Advait Advantage<\/h2>/;
const advHeaderClean = `<span class="section-kicker">Core Principles</span>
          <h2 id="pillarsTitle">The Four Pillars of the Advait Advantage</h2>`;

if (advHeaderRegex.test(advHtml)) {
  advHtml = advHtml.replace(advHeaderRegex, advHeaderClean);
  fs.writeFileSync('advait-advantage.html', advHtml, 'utf8');
  console.log('✓ advait-advantage.html reverted header to clean standard layout');
}

// =========================================================================
// 5. Update Footers across all 8 pages (Primary Tagline: एकदृष्टिः, अनन्तसम्भावनाः)
// =========================================================================
const allPages = [
  'index.html',
  'about.html',
  'advait-advantage.html',
  'services.html',
  'projects.html',
  'contact.html',
  'privacy-policy.html',
  '404.html'
];

const oldFooterTaglineRegex = /<div class="footer-sanskrit-tagline"[\s\S]*?<\/div>/g;
const newFooterTagline = `<div class="footer-sanskrit-tagline" aria-label="Advait Brand Motto">
            <span class="sanskrit-devanagari" lang="sa">एकदृष्टिः, अनन्तसम्भावनाः</span>
            <span class="sanskrit-sep" aria-hidden="true">•</span>
            <span class="sanskrit-trans">One Vision. Infinite Possibilities.</span>
          </div>`;

allPages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  if (oldFooterTaglineRegex.test(content)) {
    content = content.replace(oldFooterTaglineRegex, newFooterTagline);
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✓ Updated footer in ${p} with: एकदृष्टिः, अनन्तसम्भावनाः`);
  } else {
    console.log(`- ${p} footer tagline not matched`);
  }
});

// =========================================================================
// 6. Update css/style.css
// =========================================================================
let css = fs.readFileSync('css/style.css', 'utf8');

const sIdx = css.indexOf('/* Sanskrit Brand Identity Typography & Components */');
if (sIdx > -1) {
  css = css.slice(0, sIdx);
}

const refinedCssBlock = `/* Sanskrit Brand Identity Typography & Components */
.sanskrit-devanagari {
  font-family: var(--font-devanagari);
  letter-spacing: 0.02em;
}

/* Home Hero Sanskrit Brand Motto */
.hero-sanskrit-tagline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto 14px auto;
  padding: 4px 16px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(21, 94, 239, 0.22);
  border-radius: var(--radius-full);
  box-shadow: 0 2px 8px rgba(11, 31, 58, 0.05);
  backdrop-filter: blur(8px);
  max-width: fit-content;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.hero-sanskrit-tagline:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(21, 94, 239, 0.15);
}

.hero-sanskrit-tagline .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.03em;
}

.hero-sanskrit-tagline .sanskrit-sep {
  color: rgba(21, 94, 239, 0.35);
  font-size: 0.75rem;
}

.hero-sanskrit-tagline .sanskrit-trans {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-navy);
  letter-spacing: 0.01em;
}

/* Services Page Sanskrit Technology Kicker */
.services-sanskrit-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #EFF8FF;
  border: 1px solid #BFDBFE;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 8px;
}

.services-sanskrit-kicker .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-primary);
}

.services-sanskrit-kicker .sanskrit-sep {
  color: #93C5FD;
  font-size: 0.75rem;
}

.services-sanskrit-kicker .sanskrit-trans {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-navy);
}

/* About Us Page Sanskrit Trust Kicker */
.about-sanskrit-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #EFF8FF;
  border: 1px solid #BFDBFE;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.about-sanskrit-kicker .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-primary);
}

.about-sanskrit-kicker .sanskrit-sep {
  color: #93C5FD;
  font-size: 0.75rem;
}

.about-sanskrit-kicker .sanskrit-trans {
  font-size: 0.80rem;
  font-weight: 600;
  color: var(--color-navy);
}

/* Footer Sanskrit Tagline */
.footer-sanskrit-tagline {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 12px 0;
  font-size: 0.80rem;
  color: #94A3B8;
  flex-wrap: wrap;
}

.footer-sanskrit-tagline .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-weight: 700;
  color: #60A5FA;
  font-size: 0.90rem;
  letter-spacing: 0.03em;
}

.footer-sanskrit-tagline .sanskrit-sep {
  color: #475569;
}

.footer-sanskrit-tagline .sanskrit-trans {
  color: #94A3B8;
  font-size: 0.78rem;
}
`;

css += refinedCssBlock;
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ css/style.css updated with exact tagline components');

// =========================================================================
// 7. Update css/responsive.css
// =========================================================================
let respCss = fs.readFileSync('css/responsive.css', 'utf8');
const rIdx = respCss.indexOf('/* Sanskrit Brand Identity Responsive Adjustments */');
if (rIdx > -1) {
  respCss = respCss.slice(0, rIdx);
}

const refinedRespBlock = `/* Sanskrit Brand Identity Responsive Adjustments */
@media (max-width: 768px) {
  .hero-sanskrit-tagline {
    flex-wrap: wrap;
    padding: 6px 12px;
    gap: 6px;
  }
  .about-sanskrit-kicker,
  .services-sanskrit-kicker {
    flex-wrap: wrap;
  }
}
`;

respCss += refinedRespBlock;
fs.writeFileSync('css/responsive.css', respCss, 'utf8');
console.log('✓ css/responsive.css updated with responsive tagline adjustments');

