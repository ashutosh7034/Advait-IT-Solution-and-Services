const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const startMarkerCRLF = '/* ==========================================================================\r\n   Services Page Premium Grid & Interactive Controls';
const startMarkerLF = '/* ==========================================================================\n   Services Page Premium Grid & Interactive Controls';

let startIndex = css.indexOf(startMarkerCRLF);
if (startIndex === -1) startIndex = css.indexOf(startMarkerLF);

const endMarkerCRLF = '/* ==========================================================================\r\n   Project Search & Filter Component';
const endMarkerLF = '/* ==========================================================================\n   Project Search & Filter Component';

let endIndex = css.indexOf(endMarkerCRLF);
if (endIndex === -1) endIndex = css.indexOf(endMarkerLF);

console.log('Start index:', startIndex, 'End index:', endIndex);

const visualCSS = `/* ==========================================================================
   Services Page Visual-First Architecture & Grid
   ========================================================================== */
body.modal-open {
  overflow: hidden;
}

/* Compact Visual Hero */
.services-hero-section {
  background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);
  padding: 24px 0 18px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 28px;
}

.services-hero-header {
  margin-bottom: 14px;
}

.services-hero-headline {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 2.2vw, 1.9rem);
  font-weight: 800;
  color: var(--color-navy);
  letter-spacing: -0.025em;
  margin: 0 0 6px 0;
  line-height: 1.25;
}

.services-hero-lead {
  font-size: 0.94rem;
  color: var(--color-text-muted);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.45;
}

/* Compact Integrated Directory Toolbar */
.services-directory-bar {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px 18px 10px;
  box-shadow: 0 2px 6px rgba(11, 31, 58, 0.04);
  max-width: 960px;
  margin: 0 auto;
}

.services-bar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.services-bar-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 0;
  letter-spacing: -0.01em;
}

.services-compact-search {
  position: relative;
  flex: 1;
  max-width: 480px;
  min-width: 240px;
}

.services-compact-search .search-svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.services-compact-search .services-search-input {
  width: 100%;
  padding: 7px 30px 7px 34px;
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.86rem;
  color: var(--color-navy);
  transition: all 0.2s ease;
}

.services-compact-search .services-search-input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.12);
}

.services-search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-bg-subtle);
  border: none;
  width: 20px;
  height: 20px;
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
  gap: 6px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid #F1F5F9;
}

.cat-pill {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  color: var(--color-navy);
  padding: 5px 12px;
  font-size: 0.80rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.cat-pill:hover {
  background: #FFFFFF;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.cat-pill.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(21, 94, 239, 0.22);
}

.services-meta-status {
  margin-top: 6px;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  text-align: right;
}

.services-meta-status strong {
  color: var(--color-primary);
}

/* ==========================================================================
   Visual-First 3-Column Services Grid
   ========================================================================== */
.advait-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 52px;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .advait-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
}

@media (max-width: 640px) {
  .advait-services-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Service Card Design */
.advait-service-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 1px 3px rgba(11, 31, 58, 0.04);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
  scroll-margin-top: calc(var(--announcement-height) + var(--navbar-height) + 20px);
  position: relative;
}

.advait-service-card:hover {
  transform: translateY(-3px);
  border-color: rgba(21, 94, 239, 0.35);
  box-shadow: 0 10px 24px rgba(21, 94, 239, 0.08), 0 2px 6px rgba(11, 31, 58, 0.04);
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
  margin-bottom: 14px;
}

.advait-card-icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--color-primary-light);
  border: 1px solid rgba(21, 94, 239, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.advait-service-card:hover .advait-card-icon {
  background: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
}

.advait-card-category {
  font-size: 0.70rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  padding: 3px 8px;
  border-radius: 4px;
}

.advait-card-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 0 0 8px 0;
  line-height: 1.35;
}

.advait-card-desc {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-main);
  margin: 0 0 18px 0;
  flex-grow: 1;
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
  padding: 8px 14px;
  font-size: 0.84rem;
  font-weight: 600;
  border-radius: 6px;
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  color: var(--color-navy);
  cursor: pointer;
  transition: all 0.18s ease;
}

.advait-service-card:hover .advait-card-cta,
.advait-card-cta:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
}

/* Empty Search State */
.services-empty-state {
  text-align: center;
  padding: 48px 24px;
  background: #FFFFFF;
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  max-width: 520px;
  margin: 0 auto 48px;
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
  margin: 0 auto 14px;
}

.services-empty-state h3 {
  font-size: 1.20rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.services-empty-state p {
  font-size: 0.90rem;
  color: var(--color-text-muted);
  margin-bottom: 18px;
}

/* Modal Enhancements */
.modal-service-title {
  font-size: 1.30rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 4px 0 0 0;
}

.modal-media-banner {
  width: 100%;
  max-height: 180px;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}

.modal-media-banner img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.modal-desc {
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--color-text-main);
  margin-bottom: 20px;
}

.modal-desc em {
  font-style: italic;
  color: var(--color-navy);
  display: block;
  margin-top: 10px;
  padding: 10px 14px;
  background: var(--color-bg-subtle);
  border-left: 3px solid var(--color-primary);
  border-radius: 0 4px 4px 0;
  font-size: 0.90rem;
}

.service-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
  padding: 18px;
  background: var(--color-bg-subtle);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.service-meta-block h4 {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.service-meta-block p {
  font-size: 0.88rem;
  margin: 0;
  color: var(--color-text-main);
  line-height: 1.45;
}

.service-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.service-pill-tag {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-navy);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

`;

if (startIndex !== -1 && endIndex !== -1) {
  css = css.substring(0, startIndex) + visualCSS + css.substring(endIndex);
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('Successfully updated css/style.css');
} else {
  console.error('Could not locate markers in css/style.css');
}

