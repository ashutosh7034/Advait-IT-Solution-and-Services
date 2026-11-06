const fs = require('fs');

const js = fs.readFileSync('js/services.js', 'utf8');
const dataMatch = js.match(/const SERVICES_DATA = (\[[\s\S]*?\]);/);
if (!dataMatch) {
  console.error('SERVICES_DATA not found');
  process.exit(1);
}

const services = JSON.parse(dataMatch[1]);

// Image mappings for all 14 services
const imageMap = {
  'web-dev': 'assets/images/service-web-development.jpg',
  'web-apps': 'assets/images/service-app-development.jpg',
  'software-dev': 'assets/images/service-custom-software.jpg',
  'mobile-dev': 'assets/images/hero-app-interface.svg',
  'ui-ux': 'assets/images/hero-developer-studio.svg',
  'maintenance': 'assets/images/service-maintenance.jpg',
  'hosting-domain': 'assets/images/hero-network-topology.svg',
  'cloud-devops': 'assets/images/service-cloud-devops.jpg',
  'qa-testing': 'assets/images/service-qa-security.jpg',
  'cybersecurity': 'assets/images/hero-cybersecurity.svg',
  'api-database': 'assets/images/hero-data-orbit.svg',
  'it-consulting': 'assets/images/about-corporate-team.jpg',
  'seo-optimization': 'assets/images/hero-digital-circuit.svg',
  'additional-digital': 'assets/images/hero-automation-grid.svg'
};

const altMap = {
  'web-dev': 'Advait IT engineer coding responsive website',
  'web-apps': 'Custom web application interface and dashboard',
  'software-dev': 'Database-driven business software architecture',
  'mobile-dev': 'Mobile application UI and cross-platform interface',
  'ui-ux': 'UI/UX wireframing and conversion interface design',
  'maintenance': 'Website maintenance and server updates',
  'hosting-domain': 'Domain hosting and network topology infrastructure',
  'cloud-devops': 'Cloud deployment and automated CI/CD pipelines',
  'qa-testing': 'Software quality assurance and test validation',
  'cybersecurity': 'Cybersecurity architecture and SSL data encryption',
  'api-database': 'REST API endpoints and database schema design',
  'it-consulting': 'Advait technical leadership and IT consulting team',
  'seo-optimization': 'Search engine optimization and structured data architecture',
  'additional-digital': 'API integrations and automated digital workflow systems'
};

// Update image and imageAlt in services
services.forEach(s => {
  if (imageMap[s.id]) s.image = imageMap[s.id];
  if (altMap[s.id]) s.imageAlt = altMap[s.id];
});

console.log('Verified 14 services with images.');

// Generate 14 Service Cards HTML
function generateCardHtml(s, idx) {
  const numStr = (idx + 1).toString().padStart(2, '0');
  const tagsHtml = (s.tags || []).slice(0, 3).map(t => `              <span class="advait-card-tag">${t}</span>`).join('\n');
  
  return `        <!-- Service Card ${numStr}: ${s.title} -->
        <article class="advait-service-card reveal" id="${s.id}" data-category="${s.categoryFilter}" data-service-id="${s.id}">
          <div class="advait-card-header">
            <div class="advait-card-icon-wrap" aria-hidden="true">
              ${s.icon}
            </div>
            <div class="advait-card-meta-wrap">
              <span class="advait-card-num">#${numStr}</span>
              <span class="advait-card-category">${s.categoryLabel}</span>
            </div>
          </div>

          <h3 class="advait-card-title">${s.title}</h3>

          <p class="advait-card-desc">
            ${s.cardDesc}
          </p>

          <div class="advait-card-tags" aria-label="Core Capabilities">
${tagsHtml}
          </div>

          <div class="advait-card-footer">
            <button type="button" class="advait-card-cta service-explore-btn" data-service-id="${s.id}" aria-label="Explore ${s.title} service details">
              <span>Explore Capabilities</span>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </article>`;
}

const allCardsHtml = services.map((s, idx) => generateCardHtml(s, idx)).join('\n\n');

// Now let's assemble the new section in services.html
const heroAndGridHtml = `    <!-- Premium Services Hero Section -->
    <section class="services-hero-section" aria-label="Services Header &amp; Directory">
      <div class="services-hero-bg-accent" aria-hidden="true"></div>
      <div class="container services-hero-container">
        <!-- Hero Header -->
        <div class="services-hero-header">
          <div class="services-hero-badge">
            <span class="hero-badge-glow" aria-hidden="true"></span>
            <span class="hero-badge-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <span>Comprehensive IT Services</span>
          </div>

          <h1 class="services-hero-headline">
            Technology Solutions That <span class="text-gradient">Move Your Business Forward</span>
          </h1>

          <p class="services-hero-lead">
            We design, build, deploy, and maintain custom digital solutions for growing businesses — transparent pricing, dedicated engineers, and reliable long-term support.
          </p>

          <div class="services-hero-trust-row" aria-label="Advait service highlights">
            <div class="services-trust-pill">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>14 Specialized Domains</span>
            </div>
            <div class="services-trust-pill">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Transparent Project Quotes</span>
            </div>
            <div class="services-trust-pill">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Direct Engineering Leadership</span>
            </div>
          </div>
        </div>

        <!-- Sleek Directory Command Bar -->
        <div class="services-directory-bar" id="servicesDirectoryBar">
          <div class="services-bar-top">
            <div class="services-bar-headline">
              <h2 class="services-bar-title">Explore Our Services</h2>
              <span class="services-bar-sub">Filter by discipline or search capabilities</span>
            </div>
            
            <!-- Sleek Search Input -->
            <div class="services-compact-search">
              <svg class="search-svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="search" 
                id="servicesSearchInput" 
                class="services-search-input" 
                placeholder="Search services by keyword, tech, or deliverable..." 
                aria-label="Search all 14 services"
                autocomplete="off"
              >
              <button type="button" id="servicesSearchClear" class="services-search-clear" aria-label="Clear search input">&times;</button>
            </div>
          </div>

          <!-- Category Filter Rail -->
          <div class="services-category-rail" role="tablist" aria-label="Filter services by category">
            <button type="button" class="cat-pill active" data-filter="all" role="tab" aria-selected="true">
              <span>All Services</span>
              <span class="cat-pill-count">14</span>
            </button>
            <button type="button" class="cat-pill" data-filter="web-dev" role="tab" aria-selected="false">
              <span>Web &amp; Apps</span>
              <span class="cat-pill-count">4</span>
            </button>
            <button type="button" class="cat-pill" data-filter="software-dev" role="tab" aria-selected="false">
              <span>Software &amp; APIs</span>
              <span class="cat-pill-count">2</span>
            </button>
            <button type="button" class="cat-pill" data-filter="mobile-dev" role="tab" aria-selected="false">
              <span>Mobile</span>
              <span class="cat-pill-count">1</span>
            </button>
            <button type="button" class="cat-pill" data-filter="cloud-devops" role="tab" aria-selected="false">
              <span>Cloud &amp; DevOps</span>
              <span class="cat-pill-count">3</span>
            </button>
            <button type="button" class="cat-pill" data-filter="qa-security" role="tab" aria-selected="false">
              <span>Security &amp; QA</span>
              <span class="cat-pill-count">2</span>
            </button>
            <button type="button" class="cat-pill" data-filter="it-consulting" role="tab" aria-selected="false">
              <span>Consulting</span>
              <span class="cat-pill-count">2</span>
            </button>
          </div>

          <div class="services-meta-status">
            <span class="services-status-left">
              <span class="services-status-dot" aria-hidden="true"></span>
              <span id="servicesFilterActiveLabel">Viewing: <strong>All Services</strong></span>
            </span>
            <span class="services-status-right">
              Showing <strong id="servicesVisibleCount">14</strong> of 14 specialized services
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="services-grid-section pt-0">
      <div class="container">

        <!-- Empty search results state -->
        <div id="servicesEmptyState" class="services-empty-state" style="display: none;">
          <div class="empty-state-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3>No matching services found</h3>
          <p id="emptyStateText">We could not find any services matching your search criteria. Try adjusting keywords or resetting filters.</p>
          <button type="button" class="btn btn-primary btn-sm" id="resetServicesFiltersBtn">
            Reset All Filters
          </button>
        </div>

        <!-- 3-Column Services Grid -->
        <div class="advait-services-grid" id="servicesGrid">
${allCardsHtml}
        </div>
      </div>
    </section>`;

// Replace in services.html
let servicesHtml = fs.readFileSync('services.html', 'utf8');
const oldSectionRegex = /<!-- Compact Visual-First Services Header -->[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

if (oldSectionRegex.test(servicesHtml)) {
  servicesHtml = servicesHtml.replace(oldSectionRegex, heroAndGridHtml);
  fs.writeFileSync('services.html', servicesHtml, 'utf8');
  console.log('✓ Successfully updated services.html markup with premium hero and 14 enhanced cards');
} else {
  console.error('✗ Failed to match oldSectionRegex in services.html');
}

// Update js/services.js with enriched SERVICES_DATA
const updatedServicesJs = js.replace(
  /const SERVICES_DATA = \[[\s\S]*?\];/,
  'const SERVICES_DATA = ' + JSON.stringify(services, null, 2) + ';'
);

// Also add filter active label update logic in applyFiltersAndSearch
let finalServicesJs = updatedServicesJs;

// Check if updateActiveFilterLabel already exists
if (!finalServicesJs.includes('updateActiveFilterLabel')) {
  finalServicesJs = finalServicesJs.replace(
    /function applyFiltersAndSearch\(\) \{/,
    `function updateActiveFilterLabel(categoryName) {
    const labelEl = document.querySelector('#servicesFilterActiveLabel');
    if (labelEl) {
      labelEl.innerHTML = 'Viewing: <strong>' + categoryName + '</strong>';
    }
  }

  function applyFiltersAndSearch() {`
  );

  finalServicesJs = finalServicesJs.replace(
    /const activePill = document\.querySelector\('\.cat-pill\.active'\);/,
    `const activePill = document.querySelector('.cat-pill.active');
    if (activePill) {
      const pillName = activePill.querySelector('span') ? activePill.querySelector('span').textContent : activePill.textContent;
      updateActiveFilterLabel(pillName.trim());
    }`
  );
}

fs.writeFileSync('js/services.js', finalServicesJs, 'utf8');
console.log('✓ Successfully updated js/services.js with full image mappings and filter label status');

