const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Add .services-hero-compact styling if not present
if (!css.includes('.services-hero-compact {')) {
  const compactHeroCss = `
/* Compact Services Hero Section */
.services-hero-compact {
  position: relative;
  background: linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%);
  padding: 44px 0 32px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 40px;
}

.services-hero-compact .services-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.8vw, 2.75rem);
  font-weight: 800;
  color: var(--color-navy);
  margin: 0 0 12px 0;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.services-hero-compact .services-hero-subtitle {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--color-text-secondary);
  max-width: 580px;
  margin: 0 auto 24px auto;
  line-height: 1.55;
}

.services-hero-compact .services-hero-cta-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

  css = css.replace('.services-hero-section {', compactHeroCss + '\n.services-hero-section {');
}

// Ensure .advait-card-icon-wrap has margin-bottom: 16px when directly inside card
if (!css.includes('.advait-service-card > .advait-card-icon-wrap')) {
  const iconWrapRule = `
.advait-service-card > .advait-card-icon-wrap {
  margin-bottom: 16px;
}
`;
  css = css.replace('.advait-card-icon-wrap {', iconWrapRule + '.advait-card-icon-wrap {');
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ Successfully added compact hero & icon styles to css/style.css');

