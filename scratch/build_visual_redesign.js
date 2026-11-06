const fs = require('fs');

const catalog = JSON.parse(fs.readFileSync('scratch/services_catalog.json', 'utf8'));

// 1. Generate Cards Markup
const cardsMarkup = catalog.map(s => {
  return `        <!-- Service Card: ${s.title} -->
        <article class="advait-service-card reveal" id="${s.id}" data-category="${s.categoryFilter}" data-service-id="${s.id}">
          <div class="advait-card-header">
            <div class="advait-card-icon" aria-hidden="true">
              ${s.icon}
            </div>
            <span class="advait-card-category">${s.categoryLabel}</span>
          </div>

          <h3 class="advait-card-title">${s.title}</h3>

          <p class="advait-card-desc">
            ${s.cardDesc}
          </p>

          <div class="advait-card-footer">
            <button type="button" class="advait-card-cta service-explore-btn" data-service-id="${s.id}" aria-label="Explore ${s.title} service details">
              <span>Explore Service</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </article>`;
}).join('\n\n');

// 2. Read existing services.html to preserve Head and Nav
const curHtml = fs.readFileSync('services.html', 'utf8');
const mainIndex = curHtml.indexOf('<main id="mainContent">');
const headAndNav = curHtml.substring(0, mainIndex);

// Compact Hero & Controls
const heroAndControls = `  <main id="mainContent">
    <!-- Compact Visual-First Services Header -->
    <section class="services-hero-section">
      <div class="container">
        <!-- Compact Hero Content -->
        <div class="services-hero-header text-center">
          <h1 class="services-hero-headline">Technology Solutions That Move Your Business Forward</h1>
          <p class="services-hero-lead">We design, build, and manage digital solutions for growing businesses.</p>
        </div>

        <!-- Integrated Directory Bar: Search + Category Filters in One Sleek Card -->
        <div class="services-directory-bar">
          <div class="services-bar-top">
            <h2 class="services-bar-title">Explore Our Services</h2>
            
            <!-- Compact Search -->
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

          <!-- Compact Filter Tabs -->
          <div class="services-category-rail" role="tablist" aria-label="Filter services by category">
            <button type="button" class="cat-pill active" data-filter="all" role="tab" aria-selected="true">All Services (14)</button>
            <button type="button" class="cat-pill" data-filter="web-dev" role="tab" aria-selected="false">Web &amp; Apps (4)</button>
            <button type="button" class="cat-pill" data-filter="software-dev" role="tab" aria-selected="false">Software &amp; APIs (2)</button>
            <button type="button" class="cat-pill" data-filter="mobile-dev" role="tab" aria-selected="false">Mobile (1)</button>
            <button type="button" class="cat-pill" data-filter="cloud-devops" role="tab" aria-selected="false">Cloud &amp; DevOps (3)</button>
            <button type="button" class="cat-pill" data-filter="qa-security" role="tab" aria-selected="false">Security &amp; QA (2)</button>
            <button type="button" class="cat-pill" data-filter="it-consulting" role="tab" aria-selected="false">Consulting (2)</button>
          </div>

          <div class="services-meta-status">
            <span>Showing <strong id="servicesVisibleCount">14</strong> of 14 specialized services</span>
          </div>
        </div>
      </div>
    </section>`;

// Grid Section
const gridSection = `
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
${cardsMarkup}
        </div>

      </div>
    </section>

    <!-- Accessible Service Detail Modal Dialog -->
    <div class="modal-overlay" id="serviceDetailModal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="modalServiceTitle">
      <div class="modal-container" id="serviceModalContainer">
        <div class="modal-header">
          <div>
            <span class="modal-badge-cat" id="modalServiceKicker">Web &amp; Apps</span>
            <h3 id="modalServiceTitle" class="modal-service-title">Website Development</h3>
          </div>
          <button type="button" class="modal-close-btn" id="serviceModalCloseBtn" aria-label="Close service details">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="serviceModalBody">
          <!-- Optional Image Banner: only shown when verified image exists -->
          <div class="modal-media-banner" id="modalServiceMedia" style="display: none;">
            <img id="modalServiceImage" src="" alt="" width="700" height="180" loading="lazy">
          </div>
          
          <div class="modal-desc" id="modalServiceDesc"></div>

          <div class="service-meta-grid" id="modalServiceMetaGrid">
            <!-- Dynamically populated meta blocks -->
          </div>

          <div class="modal-section-block">
            <h4 class="modal-section-title">Complete Service Capabilities:</h4>
            <div class="service-tags-wrap" id="modalServiceTags">
              <!-- Dynamically populated tags -->
            </div>
          </div>

          <div class="modal-actions-bar">
            <a href="contact.html" class="btn btn-primary" id="modalQuoteBtn">Request a Custom Quote</a>
            <a href="https://wa.me/919702420582" class="btn btn-whatsapp-outline btn-sm" id="modalWhatsAppBtn" target="_blank" rel="noopener">Discuss on WhatsApp</a>
            <button type="button" class="btn btn-outline-secondary btn-sm" id="modalDismissBtn">Close</button>
          </div>
        </div>
      </div>
    </div>`;

// Bottom CTA & Footer
const ctaIndex = curHtml.indexOf('<!-- Bottom CTA -->');
const ctaAndFooter = curHtml.substring(ctaIndex);

const fullNewHtml = headAndNav + heroAndControls + gridSection + '\n\n    ' + ctaAndFooter;
fs.writeFileSync('services.html', fullNewHtml, 'utf8');
console.log('Successfully regenerated services.html');

