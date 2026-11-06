const fs = require('fs');

let styleCss = fs.readFileSync('css/style.css', 'utf8');

const newServicesCss = `/* ==========================================================================
   Services Page Visual-First Architecture & Grid (Premium Overhaul)
   ========================================================================== */
body.modal-open {
  overflow: hidden;
}

/* Premium Services Hero Section */
.services-hero-section {
  position: relative;
  background: linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%);
  padding: 46px 0 38px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 38px;
  overflow: hidden;
}

.services-hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(21, 94, 239, 0.08) 1.2px, transparent 1.2px);
  background-size: 26px 26px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 60%, transparent 100%);
}

.services-hero-header {
  text-align: center;
  position: relative;
  z-index: 2;
  margin-bottom: 24px;
}

.services-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid rgba(21, 94, 239, 0.22);
  box-shadow: 0 2px 8px rgba(21, 94, 239, 0.08);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.hero-badge-glow {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.25);
  display: inline-block;
  animation: pulseBlue 2s infinite;
}

@keyframes pulseBlue {
  0% { box-shadow: 0 0 0 0 rgba(21, 94, 239, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(21, 94, 239, 0); }
  100% { box-shadow: 0 0 0 0 rgba(21, 94, 239, 0); }
}

.hero-badge-icon {
  display: inline-flex;
  align-items: center;
}

.services-hero-headline {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  font-weight: 800;
  color: var(--color-navy);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 auto 12px;
  max-width: 860px;
}

.services-hero-headline .text-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, #0086C9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services-hero-lead {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 680px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.services-hero-trust-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.services-trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(226, 232, 240, 0.95);
  padding: 5px 13px;
  border-radius: var(--radius-full);
  font-size: 0.80rem;
  font-weight: 600;
  color: var(--color-navy);
  box-shadow: 0 1px 3px rgba(11, 31, 58, 0.04);
}

.services-trust-pill svg {
  color: #10B981;
  flex-shrink: 0;
}

/* Sleek Directory Command Bar */
.services-directory-bar {
  position: relative;
  background: #FFFFFF;
  border: 1px solid rgba(21, 94, 239, 0.16);
  border-radius: 16px;
  padding: 20px 24px 16px;
  box-shadow: 0 16px 40px -12px rgba(11, 31, 58, 0.08), 0 2px 6px rgba(11, 31, 58, 0.03);
  max-width: 1040px;
  margin: 0 auto;
  z-index: 2;
}

.services-bar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.services-bar-headline {
  min-width: 220px;
}

.services-bar-title {
  font-family: var(--font-heading);
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--color-navy);
  margin: 0 0 2px 0;
  letter-spacing: -0.015em;
}

.services-bar-sub {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.services-compact-search {
  position: relative;
  flex: 1;
  max-width: 460px;
  min-width: 260px;
}

.services-compact-search .search-svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: color 0.2s ease;
}

.services-compact-search:focus-within .search-svg {
  color: var(--color-primary);
}

.services-compact-search .services-search-input {
  width: 100%;
  padding: 10px 36px 10px 38px;
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  color: var(--color-navy);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.services-compact-search .services-search-input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(21, 94, 239, 0.14);
}

.services-search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-bg-subtle);
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.services-search-clear:hover {
  background: #E2E8F0;
  color: var(--color-navy);
}

/* Category Filter Rail */
.services-category-rail {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid #F1F5F9;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: var(--color-navy);
  padding: 7px 14px;
  font-size: 0.82rem;
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
  font-size: 0.72rem;
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
  box-shadow: 0 4px 14px rgba(21, 94, 239, 0.28);
  transform: translateY(-1px);
}

.cat-pill.active .cat-pill-count {
  background: rgba(255, 255, 255, 0.28);
  color: #FFFFFF;
}

.services-meta-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #F1F5F9;
  font-size: 0.80rem;
  color: var(--color-text-muted);
}

.services-status-left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.services-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  display: inline-block;
}

.services-meta-status strong {
  color: var(--color-primary);
}

/* ==========================================================================
   Visual-First 3-Column Services Grid (Crafted Cards)
   ========================================================================== */
.advait-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
  margin-bottom: 56px;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .advait-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .advait-services-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Premium Service Card Design */
.advait-service-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px -2px rgba(11, 31, 58, 0.05);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  scroll-margin-top: calc(var(--announcement-height) + var(--navbar-height) + 24px);
  position: relative;
}

.advait-service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(21, 94, 239, 0.4);
  box-shadow: 0 16px 36px -8px rgba(11, 31, 58, 0.12), 0 2px 6px rgba(11, 31, 58, 0.04);
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
  margin-bottom: 16px;
}

.advait-card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1px solid #BFDBFE;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(21, 94, 239, 0.08);
  transition: all 0.25s ease;
}

.advait-service-card:hover .advait-card-icon-wrap {
  background: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.advait-card-meta-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.advait-card-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.76rem;
  font-weight: 700;
  color: #94A3B8;
  letter-spacing: 0.04em;
}

.advait-card-category {
  font-size: 0.70rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  background: rgba(21, 94, 239, 0.07);
  border: 1px solid rgba(21, 94, 239, 0.18);
  padding: 3px 9px;
  border-radius: var(--radius-full);
}

.advait-card-title {
  font-family: var(--font-heading);
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--color-navy);
  margin: 0 0 10px 0;
  line-height: 1.3;
  letter-spacing: -0.015em;
  transition: color 0.2s ease;
}

.advait-service-card:hover .advait-card-title {
  color: var(--color-primary);
}

.advait-card-desc {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin: 0 0 16px 0;
  flex-grow: 1;
}

.advait-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.advait-card-tag {
  display: inline-flex;
  align-items: center;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-text-main);
  transition: all 0.15s ease;
}

.advait-service-card:hover .advait-card-tag {
  background: #EFF6FF;
  border-color: #DBEAFE;
  color: var(--color-navy);
}

.advait-card-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #F1F5F9;
}

.advait-card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  font-size: 0.86rem;
  font-weight: 700;
  border-radius: 8px;
  background: #F8FAFC;
  border: 1px solid var(--color-border);
  color: var(--color-navy);
  cursor: pointer;
  transition: all 0.2s ease;
}

.advait-card-cta svg {
  transition: transform 0.2s ease;
}

.advait-service-card:hover .advait-card-cta,
.advait-card-cta:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
}

.advait-service-card:hover .advait-card-cta svg,
.advait-card-cta:hover svg {
  transform: translateX(4px);
}

/* Instant Visibility Override (No reveal opacity lag on Services Header) */
.services-hero-section,
.services-hero-section *,
.services-directory-bar,
.services-directory-bar * {
  opacity: 1 !important;
  visibility: visible !important;
}
`;

// Replace lines 2605 to 2907 in style.css
const oldServicesCssRegex = /\/\* Compact Visual Hero \*\/[\s\S]*?\.advait-service-card:hover \.advait-card-cta,\s*\.advait-card-cta:hover\s*\{[\s\S]*?\}/;

if (oldServicesCssRegex.test(styleCss)) {
  styleCss = styleCss.replace(oldServicesCssRegex, newServicesCss);
  fs.writeFileSync('css/style.css', styleCss, 'utf8');
  console.log('✓ Successfully replaced services CSS in css/style.css');
} else {
  console.error('✗ Failed to match oldServicesCssRegex in css/style.css');
}

// Check responsive.css for any services rules
let respCss = fs.readFileSync('css/responsive.css', 'utf8');

// Ensure responsive rules exist for services
const respAddition = `
/* Premium Services Directory Responsive Adjustments */
@media (max-width: 900px) {
  .services-hero-section {
    padding: 36px 0 28px 0;
  }
  .services-bar-top {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }
  .services-compact-search {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .services-hero-section {
    padding: 28px 0 20px 0;
  }
  .services-hero-headline {
    font-size: 1.75rem;
  }
  .services-hero-lead {
    font-size: 0.95rem;
  }
  .services-trust-pill {
    font-size: 0.75rem;
    padding: 4px 10px;
  }
  .services-directory-bar {
    padding: 16px 14px 12px;
    border-radius: 12px;
  }
  .services-category-rail {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 6px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .services-category-rail::-webkit-scrollbar {
    display: none;
  }
  .services-meta-status {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
`;

if (!respCss.includes('Premium Services Directory Responsive Adjustments')) {
  respCss += '\n' + respAddition;
  fs.writeFileSync('css/responsive.css', respCss, 'utf8');
  console.log('✓ Added responsive adjustments to css/responsive.css');
}

// Verify CSS Brace Balance
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

