const fs = require('fs');

// 1. Read existing services.html
const html = fs.readFileSync('services.html', 'utf8');

// The redesigned Main Content
const newMainContent = `  <main id="mainContent">
    <!-- Compact Hero & Filter Section -->
    <section class="services-hero-compact" aria-label="Our IT Services">
      <div class="container">
        <div class="services-hero-header text-center">
          <h1 class="services-hero-title">Technology Services That Drive Business Growth</h1>
          <p class="services-hero-subtitle">
            From custom software to cloud deployment, we build reliable digital solutions for your business.
          </p>
          <div class="services-hero-cta-wrap">
            <a href="contact.html" class="btn btn-primary btn-sm services-hero-cta">Discuss Your Project &rarr;</a>
          </div>
        </div>

        <!-- Integrated Search & Category Filter Toolbar -->
        <div class="services-toolbar-card">
          <div class="services-toolbar-row">
            <div class="services-search-box">
              <svg class="search-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="search" id="servicesSearchInput" class="services-search-input" placeholder="Search services (e.g. Website, API, Cloud, Security)..." aria-label="Search IT services by keyword">
              <button type="button" id="servicesSearchClear" class="services-search-clear" aria-label="Clear search input" style="display: none;">&times;</button>
            </div>

            <div class="services-filter-rail" role="tablist" aria-label="Service categories">
              <button type="button" class="cat-pill active" data-filter="all" role="tab" aria-selected="true">
                All Services <span class="cat-pill-count">14</span>
              </button>
              <button type="button" class="cat-pill" data-filter="web-dev" role="tab" aria-selected="false">
                Web &amp; Apps <span class="cat-pill-count">4</span>
              </button>
              <button type="button" class="cat-pill" data-filter="software-dev" role="tab" aria-selected="false">
                Software &amp; APIs <span class="cat-pill-count">2</span>
              </button>
              <button type="button" class="cat-pill" data-filter="mobile-dev" role="tab" aria-selected="false">
                Mobile <span class="cat-pill-count">1</span>
              </button>
              <button type="button" class="cat-pill" data-filter="cloud-devops" role="tab" aria-selected="false">
                Cloud &amp; DevOps <span class="cat-pill-count">3</span>
              </button>
              <button type="button" class="cat-pill" data-filter="qa-security" role="tab" aria-selected="false">
                Security &amp; QA <span class="cat-pill-count">2</span>
              </button>
              <button type="button" class="cat-pill" data-filter="it-consulting" role="tab" aria-selected="false">
                Consulting <span class="cat-pill-count">2</span>
              </button>
            </div>
          </div>

          <div class="services-status-bar">
            <span class="services-counter">Showing <strong id="servicesVisibleCount">14</strong> of 14 services</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="services-grid-section pt-0">
      <div class="container">
        <!-- Empty State Container -->
        <div id="servicesEmptyState" class="services-empty-state" style="display: none;">
          <div class="empty-state-icon">
            <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <h3>No Matching Services Found</h3>
          <p id="emptyStateText">We could not find any services matching your query.</p>
          <button type="button" id="resetServicesFiltersBtn" class="btn btn-outline-primary btn-sm">Reset All Filters</button>
        </div>

        <div class="advait-services-grid" id="servicesGrid">

          <!-- Card 1: Website Development -->
          <article class="advait-service-card" id="web-dev" data-service-id="web-dev" data-category="web-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <span class="advait-card-category">Web &amp; Apps</span>
            </div>
            <h3 class="advait-card-title">Website Development</h3>
            <p class="advait-card-desc">Bespoke, responsive, and blazing-fast corporate websites engineered to convert visitors and strengthen brand authority.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="web-dev" aria-label="Explore Website Development service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=website-development" class="advait-card-quote-link" title="Get a customized quote for Website Development">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 2: Web Application Development -->
          <article class="advait-service-card" id="web-apps" data-service-id="web-apps" data-category="web-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <span class="advait-card-category">Web &amp; Apps</span>
            </div>
            <h3 class="advait-card-title">Web Application Development</h3>
            <p class="advait-card-desc">Interactive web applications, customer portals, and transaction dashboards engineered for scale and automated workflows.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="web-apps" aria-label="Explore Web Application Development service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=web-applications" class="advait-card-quote-link" title="Get a customized quote for Web Application Development">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 3: Custom Software Development -->
          <article class="advait-service-card" id="software-dev" data-service-id="software-dev" data-category="software-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <span class="advait-card-category">Software &amp; APIs</span>
            </div>
            <h3 class="advait-card-title">Custom Software Development</h3>
            <p class="advait-card-desc">Tailored internal tools, database systems, and custom business software built around your operational needs.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="software-dev" aria-label="Explore Custom Software Development service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=software-development" class="advait-card-quote-link" title="Get a customized quote for Custom Software Development">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 4: Mobile Application Development -->
          <article class="advait-service-card" id="mobile-dev" data-service-id="mobile-dev" data-category="mobile-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
              <span class="advait-card-category">Mobile</span>
            </div>
            <h3 class="advait-card-title">Mobile Application Development</h3>
            <p class="advait-card-desc">High-performance iOS and Android apps with fluid user interfaces, offline support, and secure API integration.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="mobile-dev" aria-label="Explore Mobile Application Development service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=mobile-development" class="advait-card-quote-link" title="Get a customized quote for Mobile Application Development">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 5: UI/UX & Website Redesign -->
          <article class="advait-service-card" id="ui-ux" data-service-id="ui-ux" data-category="web-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
              </div>
              <span class="advait-card-category">Web &amp; Apps</span>
            </div>
            <h3 class="advait-card-title">UI/UX &amp; Website Redesign</h3>
            <p class="advait-card-desc">User research, wireframing, modern interface design, and legacy revamps focused on customer conversion.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="ui-ux" aria-label="Explore UI/UX & Website Redesign service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=ui-ux-design" class="advait-card-quote-link" title="Get a customized quote for UI/UX & Website Redesign">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 6: Website Maintenance & Updates -->
          <article class="advait-service-card" id="maintenance" data-service-id="maintenance" data-category="cloud-devops">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <span class="advait-card-category">Cloud &amp; DevOps</span>
            </div>
            <h3 class="advait-card-title">Website Maintenance &amp; Updates</h3>
            <p class="advait-card-desc">Dependable maintenance, security patches, performance monitoring, and regular backups ensuring high uptime.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="maintenance" aria-label="Explore Website Maintenance & Updates service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=website-maintenance" class="advait-card-quote-link" title="Get a customized quote for Website Maintenance">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 7: Domain, Hosting & Server Services -->
          <article class="advait-service-card" id="hosting-domain" data-service-id="hosting-domain" data-category="cloud-devops">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <span class="advait-card-category">Cloud &amp; DevOps</span>
            </div>
            <h3 class="advait-card-title">Domain, Hosting &amp; Server Services</h3>
            <p class="advait-card-desc">VPS provisioning, DNS configuration, automated backups, server hardening, and SSL certificate installation.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="hosting-domain" aria-label="Explore Domain, Hosting & Server Services service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=hosting-servers" class="advait-card-quote-link" title="Get a customized quote for Hosting & Servers">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 8: Cloud, DevOps & Deployment -->
          <article class="advait-service-card" id="cloud-devops" data-service-id="cloud-devops" data-category="cloud-devops">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              </div>
              <span class="advait-card-category">Cloud &amp; DevOps</span>
            </div>
            <h3 class="advait-card-title">Cloud, DevOps &amp; Deployment</h3>
            <p class="advait-card-desc">Automated CI/CD pipelines, containerization with Docker, and cloud deployments on AWS and reliable VPS.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="cloud-devops" aria-label="Explore Cloud, DevOps & Deployment service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=cloud-devops" class="advait-card-quote-link" title="Get a customized quote for Cloud & DevOps">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 9: Software Testing & QA -->
          <article class="advait-service-card" id="qa-testing" data-service-id="qa-testing" data-category="qa-security">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span class="advait-card-category">Security &amp; QA</span>
            </div>
            <h3 class="advait-card-title">Software Testing &amp; QA</h3>
            <p class="advait-card-desc">Functional, cross-browser, performance, and responsive testing to eliminate bugs before production release.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="qa-testing" aria-label="Explore Software Testing & QA service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=qa-testing" class="advait-card-quote-link" title="Get a customized quote for Software Testing">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 10: Cybersecurity & Website Security -->
          <article class="advait-service-card" id="cybersecurity" data-service-id="cybersecurity" data-category="qa-security">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span class="advait-card-category">Security &amp; QA</span>
            </div>
            <h3 class="advait-card-title">Cybersecurity &amp; Website Security</h3>
            <p class="advait-card-desc">Defense-in-depth security hardening, vulnerability audits, SSL/TLS, and strict access control protocols.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="cybersecurity" aria-label="Explore Cybersecurity & Website Security service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=cybersecurity" class="advait-card-quote-link" title="Get a customized quote for Website Security">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 11: API Development & Database Management -->
          <article class="advait-service-card" id="api-database" data-service-id="api-database" data-category="software-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <span class="advait-card-category">Software &amp; APIs</span>
            </div>
            <h3 class="advait-card-title">API Development &amp; Database Management</h3>
            <p class="advait-card-desc">Scalable RESTful API engineering, third-party webhook integrations, and relational database optimization.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="api-database" aria-label="Explore API Development & Database Management service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=api-database" class="advait-card-quote-link" title="Get a customized quote for API & Database">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 12: Technical Support & IT Consulting -->
          <article class="advait-service-card" id="it-consulting" data-service-id="it-consulting" data-category="it-consulting">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <span class="advait-card-category">Consulting</span>
            </div>
            <h3 class="advait-card-title">Technical Support &amp; IT Consulting</h3>
            <p class="advait-card-desc">Pragmatic technical consulting, architecture reviews, technology stack selection, and IT troubleshooting.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="it-consulting" aria-label="Explore Technical Support & IT Consulting service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=it-consulting" class="advait-card-quote-link" title="Get a customized quote for IT Consulting">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 13: SEO & Website Optimization -->
          <article class="advait-service-card" id="seo-optimization" data-service-id="seo-optimization" data-category="web-dev">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <span class="advait-card-category">Web &amp; Apps</span>
            </div>
            <h3 class="advait-card-title">SEO &amp; Website Optimization</h3>
            <p class="advait-card-desc">Technical SEO audits, Core Web Vitals acceleration, schema markup, and search index optimization.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="seo-optimization" aria-label="Explore SEO & Website Optimization service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=seo-optimization" class="advait-card-quote-link" title="Get a customized quote for SEO Optimization">Get Quote &rarr;</a>
            </div>
          </article>

          <!-- Card 14: Additional Digital & Integrations -->
          <article class="advait-service-card" id="additional-digital" data-service-id="additional-digital" data-category="it-consulting">
            <div class="advait-card-header">
              <div class="advait-card-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <span class="advait-card-category">Consulting</span>
            </div>
            <h3 class="advait-card-title">Additional Digital &amp; Integrations</h3>
            <p class="advait-card-desc">Corporate email configuration, payment gateways (Razorpay, Stripe), CRM lead forms, and analytics setup.</p>
            <div class="advait-card-footer">
              <button type="button" class="advait-card-cta service-explore-btn" data-service-id="additional-digital" aria-label="Explore Additional Digital & Integrations service details">
                <span>Explore Service</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
              <a href="contact.html?service=digital-services" class="advait-card-quote-link" title="Get a customized quote for Digital Services">Get Quote &rarr;</a>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- Custom Project Proposal Banner -->
    <section class="section section-light pt-0">
      <div class="container">
        <div class="cta-banner">
          <h2>Looking for a Custom IT Solution?</h2>
          <p>Let's discuss your requirements and engineer a high-performing digital architecture for your business.</p>
          <div class="cta-banner-actions">
            <a href="contact.html" class="btn btn-primary btn-lg">Get a Free Consultation</a>
            <a href="https://wa.me/919702420582?text=Hello%20Advait%20IT%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project." class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">Connect on WhatsApp</a>
          </div>
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
    </div>
  </main>`;

// Replace <main ... </main>
const mainStart = html.indexOf('<main id="mainContent">');
const mainEnd = html.indexOf('</main>', mainStart) + 7;

if (mainStart > -1 && mainEnd > -1) {
  const updatedHtml = html.slice(0, mainStart) + newMainContent + html.slice(mainEnd);
  fs.writeFileSync('services.html', updatedHtml, 'utf8');
  console.log('✓ services.html updated successfully with compact hero, filter toolbar, and enhanced cards!');
} else {
  console.error('Could not find <main> in services.html');
}

