const fs = require('fs');

// Helper to normalize line endings for replacement
function safeReplace(filePath, regex, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${filePath}`);
    return true;
  } else {
    console.log(`- Not matched in ${filePath}`);
    return false;
  }
}

// 1. about.html: Sanskrit Brand Heritage & Philosophy section
const aboutRegex = /<!--\s*Mission & Vision\s*-->\s*<section class="section section-subtle">/;
const aboutReplacement = `<!-- Sanskrit Brand Heritage & Philosophy -->
    <section class="section section-subtle py-8" aria-label="Brand Heritage and Sanskrit Philosophy">
      <div class="container">
        <div class="about-philosophy-card reveal">
          <div class="about-philosophy-intro">
            <span class="section-kicker">Brand Heritage &amp; Ethos</span>
            <h2 class="philosophy-main-title">The Essence of Advait</h2>
            <p class="philosophy-lead">
              The name <strong>Advait</strong> (अद्वैत) signifies <em>Non-Duality</em>&mdash;representing an undivided partnership with our clients, seamless integration of design with technology, and uncompromised singular commitment to software engineering excellence.
            </p>
          </div>
          <div class="about-philosophy-grid">
            <div class="philosophy-item">
              <div class="philosophy-shloka-badge">
                <span class="sanskrit-devanagari" lang="sa">एकमेवाद्वितीयम्</span>
                <span class="shloka-source">Chāndogya Upaniṣad 6.2.1</span>
              </div>
              <h3 class="philosophy-item-heading">Singular Dedication</h3>
              <p>
                <em>"The One without a second."</em> We build technology partnerships where there is no division between your business objectives and our engineering focus. You work directly with dedicated technical leaders who treat your software as their own.
              </p>
            </div>
            <div class="philosophy-item">
              <div class="philosophy-shloka-badge">
                <span class="sanskrit-devanagari" lang="sa">योगः कर्मसु कौशलम्</span>
                <span class="shloka-source">Bhagavad Gītā 2.50</span>
              </div>
              <h3 class="philosophy-item-heading">Excellence in Action</h3>
              <p>
                <em>"Skill and excellence in action is Yoga."</em> For our developers, code is craftsmanship. We adhere to meticulous architectural standards, clean modular design, high performance, and reliable delivery without shortcuts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section">`;

safeReplace('about.html', aboutRegex, aboutReplacement);

// 2. advait-advantage.html: Pillars Kicker & orphaned HTML clean up
const advHeaderRegex = /<div class="section-header reveal">\s*<span class="section-kicker">Core Principles<\/span>\s*<h2 id="pillarsTitle">The Four Pillars of the Advait Advantage<\/h2>/;
const advHeaderRepl = `<div class="section-header reveal">
          <div class="advantage-sanskrit-kicker" aria-label="Sanskrit Core Principle">
            <span class="sanskrit-devanagari" lang="sa">योगः कर्मसु कौशलम्</span>
            <span class="sanskrit-sep" aria-hidden="true">•</span>
            <span class="sanskrit-trans">Excellence in Action (Gītā 2.50)</span>
          </div>
          <h2 id="pillarsTitle">The Four Pillars of the Advait Advantage</h2>`;

safeReplace('advait-advantage.html', advHeaderRegex, advHeaderRepl);

const orphanRegex = /<!-- Pillar 4 -->[\s\S]*?<h3>4\. Full Lifecycle &amp; Security Support<\/h3>[\s\S]*?<\/section>/;
const cleanPillar4 = `<!-- Pillar 4 -->
          <div class="advantage-deep-card reveal reveal-delay-2">
            <div class="why-icon-box">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3>Full-Lifecycle Long-Term Support</h3>
            <p>
              Dependable post-launch maintenance, security patches, automated backups, and proactive optimizations to protect your digital investment.
            </p>
          </div>
        </div>
      </div>
    </section>`;

safeReplace('advait-advantage.html', orphanRegex, cleanPillar4);

// 3. Site-Wide Footers across all 8 pages
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

const footerRegex = /(<a href="index\.html" class="footer-brand-logo-link"[^>]*>[\s\S]*?<img [^>]*class="footer-brand-logo"[^>]*>[\s\S]*?<\/a>)(?![\s\S]{0,100}footer-sanskrit-tagline)/;

const footerTaglineHtml = `$1
          <div class="footer-sanskrit-tagline" aria-label="Advait Brand Motto">
            <span class="sanskrit-devanagari" lang="sa">एकमेवाद्वितीयम्</span>
            <span class="sanskrit-sep" aria-hidden="true">•</span>
            <span class="sanskrit-trans">Singular Dedication to Excellence</span>
          </div>`;

allPages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  if (!content.includes('footer-sanskrit-tagline')) {
    content = content.replace(footerRegex, footerTaglineHtml);
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✓ Added footer Sanskrit tagline to ${p}`);
  } else {
    console.log(`- ${p} already has footer Sanskrit tagline`);
  }
});
