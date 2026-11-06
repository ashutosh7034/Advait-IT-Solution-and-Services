const fs = require('fs');

const servicesData = [
  {
    id: "web-dev",
    title: "Website Development",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    desc: "Bespoke, responsive, and blazing-fast corporate websites engineered to convert visitors and strengthen brand authority."
  },
  {
    id: "web-apps",
    title: "Web Application Development",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    desc: "Interactive web applications, customer portals, and transaction dashboards engineered for scale and automated workflows."
  },
  {
    id: "software-dev",
    title: "Custom Software Development",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    desc: "Tailored internal tools, database systems, and custom business software built around your operational needs."
  },
  {
    id: "mobile-dev",
    title: "Mobile Application Development",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    desc: "High-performance iOS and Android apps with fluid user interfaces, offline support, and secure API integration."
  },
  {
    id: "ui-ux",
    title: "UI/UX & Website Redesign",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,
    desc: "User research, wireframing, modern interface design, and legacy revamps focused on customer conversion."
  },
  {
    id: "maintenance",
    title: "Website Maintenance & Updates",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    desc: "Dependable maintenance, security patches, performance monitoring, and regular backups ensuring high uptime."
  },
  {
    id: "hosting-server",
    title: "Domain, Hosting & Server Services",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    desc: "VPS provisioning, DNS configuration, automated backups, server hardening, and SSL certificate installation."
  },
  {
    id: "cloud-devops",
    title: "Cloud, DevOps & Deployment",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    desc: "Automated CI/CD pipelines, containerization with Docker, and cloud deployments on AWS and reliable VPS."
  },
  {
    id: "testing-qa",
    title: "Software Testing & QA",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    desc: "Functional, cross-browser, performance, and responsive testing to eliminate bugs before production release."
  },
  {
    id: "security",
    title: "Cybersecurity & Website Security",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    desc: "Defense-in-depth security hardening, vulnerability audits, SSL/TLS, and strict access control protocols."
  },
  {
    id: "api-db",
    title: "API Development & Database Management",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    desc: "Scalable RESTful API engineering, third-party webhook integrations, and relational database optimization."
  },
  {
    id: "it-consulting",
    title: "Technical Support & IT Consulting",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    desc: "Pragmatic technical consulting, architecture reviews, technology stack selection, and IT troubleshooting."
  },
  {
    id: "seo",
    title: "SEO & Website Optimization",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    desc: "Technical SEO audits, Core Web Vitals acceleration, schema markup, and search index optimization."
  },
  {
    id: "additional-digital",
    title: "Additional Digital & Integrations",
    icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    desc: "Corporate email configuration, payment gateways (Razorpay, Stripe), CRM lead forms, and analytics setup."
  }
];

const cardsHtml = servicesData.map(svc => `
        <!-- Service Card: ${svc.title} -->
        <article class="advait-service-card reveal" id="${svc.id}" data-service-id="${svc.id}">
          <div class="advait-card-icon-wrap" aria-hidden="true">
            ${svc.icon}
          </div>
          <h3 class="advait-card-title">${svc.title}</h3>
          <p class="advait-card-desc">${svc.desc}</p>
          <div class="advait-card-footer">
            <button type="button" class="advait-card-cta service-explore-btn" data-service-id="${svc.id}" aria-label="Explore ${svc.title} service details">
              <span>Explore Service</span>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </article>`).join('\n');

const newMainContent = `  <main id="mainContent">
    <!-- Section 1 — Compact Hero -->
    <section class="services-hero-compact" aria-label="Our IT Services">
      <div class="container text-center">
        <h1 class="services-hero-title">Our IT Services</h1>
        <p class="services-hero-subtitle">
          Smart, reliable, and affordable technology solutions for your business.
        </p>
        <div class="services-hero-cta-wrap">
          <a href="contact.html" class="btn btn-primary">Discuss Your Project</a>
        </div>
      </div>
    </section>

    <!-- Section 2 — Services Grid -->
    <section class="services-grid-section pt-0">
      <div class="container">
        <div class="advait-services-grid" id="servicesGrid">
${cardsHtml}
        </div>
      </div>
    </section>

    <!-- Section 3 — Simple CTA -->
    <section class="section section-light pt-0">
      <div class="container">
        <div class="cta-banner reveal">
          <h2>Looking for a Custom IT Solution?</h2>
          <p>Let's discuss your requirements.</p>
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

let html = fs.readFileSync('services.html', 'utf8');

// Replace the <main id="mainContent">...</main>
const mainStart = html.indexOf('<main id="mainContent">');
const mainEnd = html.indexOf('</main>') + '</main>'.length;

if (mainStart !== -1 && mainEnd !== -1) {
  html = html.substring(0, mainStart) + newMainContent + html.substring(mainEnd);
  fs.writeFileSync('services.html', html, 'utf8');
  console.log('✓ Successfully simplified services.html!');
} else {
  console.error('Failed to locate mainContent in services.html');
}

