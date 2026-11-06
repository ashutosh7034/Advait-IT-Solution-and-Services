const fs = require('fs');

let css = fs.readFileSync('css/responsive.css', 'utf8');

const targetStr = `/* ==========================================================================
   Services Premium Grid & Controls Responsive Rules
   ========================================================================== */`;

const start = css.indexOf(targetStr);
if (start !== -1) {
  css = css.substring(0, start);
}

const visualResponsiveCSS = `/* ==========================================================================
   Services Visual-First Responsive Rules
   ========================================================================== */
@media (max-width: 768px) {
  .services-hero-section {
    padding: 18px 0 14px 0;
    margin-bottom: 20px;
  }

  .services-hero-headline {
    font-size: 1.35rem;
  }

  .services-hero-lead {
    font-size: 0.88rem;
  }

  .services-directory-bar {
    padding: 12px 14px 8px;
  }

  .services-bar-top {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .services-compact-search {
    max-width: 100%;
    min-width: 100%;
  }

  .services-category-rail {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 6px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .services-category-rail::-webkit-scrollbar {
    display: none;
  }

  .cat-pill {
    flex-shrink: 0;
    padding: 5px 11px;
    font-size: 0.78rem;
  }

  .advait-service-card {
    padding: 18px 16px;
  }
}

@media (max-width: 480px) {
  .services-meta-status {
    text-align: left;
  }
}
`;

css += visualResponsiveCSS;
fs.writeFileSync('css/responsive.css', css, 'utf8');
console.log('Successfully updated css/responsive.css');

