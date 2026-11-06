const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Add --font-devanagari variable to :root if not present
if (!css.includes('--font-devanagari')) {
  css = css.replace(
    '--font-mono:',
    '--font-devanagari: \'Noto Sans Devanagari\', \'Plus Jakarta Sans\', \'Segoe UI\', system-ui, sans-serif;\n  --font-mono:'
  );
  console.log('✓ Added --font-devanagari to :root in style.css');
}

// 2. Add Sanskrit brand identity styling block
const sanskritCssBlock = `
/* ==========================================================================
   Sanskrit Brand Identity Typography & Components
   ========================================================================== */

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
  margin: 0 auto 16px auto;
  padding: 5px 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(21, 94, 239, 0.22);
  border-radius: var(--radius-full);
  box-shadow: 0 2px 10px rgba(11, 31, 58, 0.05);
  backdrop-filter: blur(8px);
  max-width: fit-content;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.hero-sanskrit-tagline:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 14px rgba(21, 94, 239, 0.15);
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

/* About Page Sanskrit Philosophy Banner */
.about-philosophy-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: 0 4px 16px -4px rgba(11, 31, 58, 0.06);
  margin-bottom: 30px;
  border-left: 4px solid var(--color-primary);
}

.about-philosophy-intro {
  max-width: 780px;
  margin-bottom: 24px;
}

.philosophy-main-title {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 2.4vw, 1.85rem);
  font-weight: 800;
  color: var(--color-navy);
  margin: 6px 0 10px 0;
  line-height: 1.25;
}

.philosophy-lead {
  font-size: 0.96rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 0;
}

.about-philosophy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.philosophy-item {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.philosophy-item:hover {
  transform: translateY(-2px);
  border-color: #BFDBFE;
  box-shadow: 0 6px 16px rgba(21, 94, 239, 0.08);
}

.philosophy-shloka-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E2E8F0;
}

.philosophy-shloka-badge .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary);
}

.shloka-source {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: #EFF6FF;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #DBEAFE;
}

.philosophy-item-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.philosophy-item p {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin-bottom: 0;
}

/* Advantage Page Sanskrit Kicker */
.advantage-sanskrit-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #EFF8FF;
  border: 1px solid #BFDBFE;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.advantage-sanskrit-kicker .sanskrit-devanagari {
  font-family: var(--font-devanagari);
  font-size: 0.94rem;
  font-weight: 700;
  color: var(--color-primary);
}

.advantage-sanskrit-kicker .sanskrit-sep {
  color: #93C5FD;
  font-size: 0.75rem;
}

.advantage-sanskrit-kicker .sanskrit-trans {
  font-size: 0.80rem;
  font-weight: 600;
  color: var(--color-navy);
}

/* Footer Sanskrit Tagline */
.footer-sanskrit-tagline {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0 14px 0;
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

if (!css.includes('/* Sanskrit Brand Identity Typography & Components */')) {
  css += sanskritCssBlock;
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('✓ Added Sanskrit CSS to style.css');
} else {
  console.log('- Sanskrit CSS already present in style.css');
}

// 3. Responsive additions in responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');
const respAddition = `
/* Sanskrit Brand Identity Responsive Adjustments */
@media (max-width: 768px) {
  .hero-sanskrit-tagline {
    flex-wrap: wrap;
    padding: 6px 12px;
    gap: 6px;
  }
  .about-philosophy-card {
    padding: 20px 16px;
  }
  .about-philosophy-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .advantage-sanskrit-kicker {
    flex-wrap: wrap;
    justify-content: center;
  }
}
`;

if (!respCss.includes('/* Sanskrit Brand Identity Responsive Adjustments */')) {
  respCss += respAddition;
  fs.writeFileSync('css/responsive.css', respCss, 'utf8');
  console.log('✓ Added Sanskrit responsive rules to responsive.css');
} else {
  console.log('- Sanskrit responsive rules already present in responsive.css');
}

