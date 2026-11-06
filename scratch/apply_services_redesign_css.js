const fs = require('fs');

// Patch style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const sIdx = css.indexOf('/* Compact Services Hero Section */');
const endMarker = '/* Modal Enhancements */';
const eIdx = css.indexOf(endMarker, sIdx);

if (sIdx > -1 && eIdx > -1) {
  const newServicesCss = `/* ==========================================================================
   Services Page — Redesigned Compact Hero, Toolbar & Service Cards
   ========================================================================== */

/* Compact Hero Section */
.services-hero-compact {
  position: relative;
  background: linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%);
  padding: 24px 0 16px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;
}

.services-hero-header {
  text-align: center;
  margin-bottom: 14px;
}

.services-hero-compact .services-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(1.65rem, 2.8vw, 2.15rem);
  font-weight: 800;
  color: var(--color-navy);
  margin: 0 0 6px 0;
  letter-spacing: -0.025em;
  line-height: 1.22;
}

.services-hero-compact .services-hero-subtitle {
  font-size: clamp(0.90rem, 1.6vw, 1.02rem);
  color: var(--color-text-secondary);
  max-width: 680px;
  margin: 0 auto 12px auto;
  line-height: 1.45;
}

.services-hero-compact .services-hero-cta-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
}

.services-hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  font-size: 0.86rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 8px rgba(21, 94, 239, 0.22);
  transition: all 0.2s ease;
}

.services-hero-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(21, 94, 239, 0.32);
}

/* Integrated Search & Filter Toolbar Card */
.services-toolbar-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 12px 18px 10px;
  box-shadow: 0 4px 16px -4px rgba(11, 31, 58, 0.06);
  max-width: 1040px;
  margin: 0 auto;
}

.services-toolbar-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

@media (min-width: 992px) {
  .services-toolbar-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.services-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
  flex-shrink: 0;
}

.services-search-box .search-svg {
  position: absolute;
  left: 12px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.services-search-input {
  width: 100%;
  padding: 7px 32px 7px 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: #F8FAFC;
  font-size: 0.84rem;
  color: var(--color-navy);
  transition: all 0.2s ease;
}

.services-search-input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.12);
}

.services-search-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.15rem;
  line-height: 1;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.15s ease;
}

.services-search-clear:hover {
  color: var(--color-navy);
  background: #E2E8F0;
}

.services-filter-rail {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: var(--color-navy);
  padding: 5px 12px;
  font-size: 0.80rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  user-select: none;
}

.cat-pill .cat-pill-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #E2E8F0;
  color: var(--color-navy);
  font-size: 0.70rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.cat-pill:hover {
  background: #FFFFFF;
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(21, 94, 239, 0.1);
}

.cat-pill:hover .cat-pill-count {
  background: #DBEAFE;
  color: var(--color-primary);
}

.cat-pill.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, #0086C9 100%);
  border-color: var(--color-primary);
  color: #FFFFFF;
  box-shadow: 0 3px 12px rgba(21, 94, 239, 0.25);
  transform: translateY(-1px);
}

.cat-pill.active .cat-pill-count {
  background: rgba(255, 255, 255, 0.28);
  color: #FFFFFF;
}

.services-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px dashed #F1F5F9;
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.services-status-bar strong {
  color: var(--color-navy);
}

/* Services Grid & Cards */
.services-grid-section {
  padding-bottom: 60px;
}

.advait-services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 991px) {
  .advait-services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .advait-services-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

.advait-service-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 18px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  box-shadow: 0 1px 3px rgba(11, 31, 58, 0.05);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease;
  scroll-margin-top: calc(var(--announcement-height) + var(--navbar-height) + 20px);
  position: relative;
}

.advait-service-card:hover {
  transform: translateY(-3px);
  border-color: #BFDBFE;
  box-shadow: 0 10px 24px -6px rgba(21, 94, 239, 0.12), 0 2px 6px rgba(11, 31, 58, 0.04);
}

.advait-service-card.card-highlighted {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.25), 0 12px 28px rgba(21, 94, 239, 0.14);
  animation: pulseCardHighlight 2s ease-out;
}

.advait-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.advait-card-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.advait-service-card:hover .advait-card-icon-wrap {
  transform: scale(1.06);
}

.advait-card-category {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-primary);
  background: #EFF8FF;
  border: 1px solid #DBEAFE;
  padding: 2px 8px;
  border-radius: 4px;
}

.advait-card-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 0 0 6px 0;
  line-height: 1.32;
}

.advait-card-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.48;
  margin: 0 0 14px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.8em;
}

.advait-card-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.advait-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  font-size: 0.80rem;
  font-weight: 600;
  border-radius: 6px;
  background: #F0F6FE;
  border: 1px solid #BFDBFE;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.advait-card-cta:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
}

.advait-card-cta svg {
  transition: transform 0.2s ease;
}

.advait-card-cta:hover svg {
  transform: translateX(3px);
}

.advait-card-quote-link {
  font-size: 0.80rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.advait-card-quote-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Empty State */
.services-empty-state {
  text-align: center;
  padding: 44px 20px;
  background: #F8FAFC;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}

.services-empty-state .empty-state-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.services-empty-state h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.services-empty-state p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

`;

  css = css.slice(0, sIdx) + newServicesCss + css.slice(eIdx);
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('✓ style.css updated successfully!');
} else {
  console.error('Could not locate services block in style.css: sIdx =', sIdx, 'eIdx =', eIdx);
}

// Check responsive.css for mobile filter rail rules
let respCss = fs.readFileSync('css/responsive.css', 'utf8');
if (!respCss.includes('.services-filter-rail')) {
  const mediaQuery = '@media (max-width: 767px) {';
  const mqIdx = respCss.indexOf(mediaQuery);
  if (mqIdx > -1) {
    const addition = `
  /* Services filter rail horizontal smooth scrolling on mobile */
  .services-toolbar-card {
    padding: 10px 12px 8px;
  }
  .services-filter-rail {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .services-filter-rail::-webkit-scrollbar {
    display: none;
  }
`;
    respCss = respCss.slice(0, mqIdx + mediaQuery.length) + addition + respCss.slice(mqIdx + mediaQuery.length);
    fs.writeFileSync('css/responsive.css', respCss, 'utf8');
    console.log('✓ responsive.css updated with mobile services filter rail rules!');
  }
} else {
  console.log('responsive.css already has .services-filter-rail rules');
}

