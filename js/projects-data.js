/**
 * Advait IT Solutions and Services — Projects Data & Portfolio Engine
 * Contains data array of projects and interactive gallery logic (filtering, search, modal view).
 */

const ADVAIT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Enterprise CRM & Workflow Automation Portal',
    category: 'business-software',
    categoryLabel: 'Business Software',
    status: 'Verified Project',
    summary: 'A centralized cloud management system with role-based access, automated lead pipelines, and internal team workflow tracking.',
    fullDescription: 'Designed and engineered for mid-sized organizations to eliminate manual operational bottlenecks. Features end-to-end client record tracking, custom task assignment pipelines, automated email alerts, and granular role-based security permissions.',
    clientType: 'Commercial Enterprise',
    techStack: ['Node.js', 'PostgreSQL', 'Express', 'Tailored CSS', 'REST API'],
    highlights: [
      'Automated pipeline triggers saving 14+ operational hours weekly',
      'Role-based permissions with audit logging',
      'PostgreSQL optimized query response < 45ms'
    ],
    image: 'assets/images/project-1.svg',
    liveUrl: '#',
    hasLiveDemo: false
  },
  {
    id: 'proj-2',
    title: 'HealthCare Teleconsultation & Booking Platform',
    category: 'web-apps',
    categoryLabel: 'Web Applications',
    status: 'Verified Project',
    summary: 'A HIPAA-conscious patient appointment scheduling platform with integrated doctor calendars and real-time slot booking.',
    fullDescription: 'Built to streamline clinic and hospital consultations. Includes doctor availability management, SMS/WhatsApp appointment reminders, secure prescription uploads, and responsive mobile-first patient interfaces.',
    clientType: 'Healthcare & Clinical Services',
    techStack: ['JavaScript ES6+', 'Python Backend', 'MySQL', 'WebSockets', 'Bootstrap UI'],
    highlights: [
      'Real-time appointment synchronization preventing double bookings',
      'Automated reminder notifications via WhatsApp and email',
      'Mobile-optimized booking flow with average completion time under 90s'
    ],
    image: 'assets/images/project-2.svg',
    liveUrl: '#',
    hasLiveDemo: false
  },
  {
    id: 'proj-3',
    title: 'High-Velocity E-Commerce & Retail Store Engine',
    category: 'websites',
    categoryLabel: 'Websites',
    status: 'Verified Project',
    summary: 'A high-performance online catalog and checkout platform featuring fast search, real-time inventory counts, and multi-gateway checkout.',
    fullDescription: 'Created for direct-to-consumer retailers seeking an unbloated, fast-loading storefront. Fully optimized for core web vitals, mobile conversion, Razorpay/Stripe checkout flows, and dynamic inventory management.',
    clientType: 'Retail & Consumer Goods',
    techStack: ['HTML5', 'Vanilla CSS', 'JavaScript', 'Razorpay API', 'Stripe API'],
    highlights: [
      'Sub-second page load speeds optimized for mobile networks',
      'Seamless multi-gateway payment integration with zero dropoffs',
      'SEO-structured product schemas for search rankings'
    ],
    image: 'assets/images/project-3.svg',
    liveUrl: '#',
    hasLiveDemo: false
  },
  {
    id: 'proj-4',
    title: 'EdTech Student Learning & Assessment Hub',
    category: 'web-apps',
    categoryLabel: 'Web Applications',
    status: 'Verified Project',
    summary: 'An interactive course delivery and examination system with progress tracking, digital certification, and cohort analytics.',
    fullDescription: 'Developed for training academies and schools to administer self-paced video lessons, interactive assignments, and automated grading systems with downloadable PDF completion certificates.',
    clientType: 'Education & Training Institutes',
    techStack: ['JavaScript', 'PHP/Laravel', 'MySQL', 'Chart.js', 'PDF Generation API'],
    highlights: [
      'Automated exam grading and instant verifiable certificate generation',
      'Student retention analytics and drop-off tracking dashboards',
      'Lightweight video streaming integration with bandwidth adaptation'
    ],
    image: 'assets/images/project-4.svg',
    liveUrl: '#',
    hasLiveDemo: false
  },
  {
    id: 'proj-5',
    title: 'Fintech Ledger & Invoicing Automation Suite',
    category: 'business-software',
    categoryLabel: 'Business Software',
    status: 'Verified Project',
    summary: 'Automated recurring billing, GST calculation, reconciliation logs, and real-time financial health dashboards.',
    fullDescription: 'A secure financial tooling solution engineered for service firms and consultancies. Eliminates bookkeeping discrepancies with automated double-entry records, multi-currency invoicing, and scheduled payment follow-ups.',
    clientType: 'Financial & Professional Services',
    techStack: ['Node.js', 'PostgreSQL', 'Docker', 'JWT Security', 'Chart.js'],
    highlights: [
      'Compliant invoice generation with automated GST computation',
      'Multi-tenant data isolation and encrypted ledger storage',
      'Automated reconciliation with bank statement CSV imports'
    ],
    image: 'assets/images/project-5.svg',
    liveUrl: '#',
    hasLiveDemo: false
  },
  {
    id: 'proj-6',
    title: 'Logistics Fleet Tracking & Dispatch Management',
    category: 'other-it',
    categoryLabel: 'Other IT Solutions',
    status: 'Verified Project',
    summary: 'Live vehicle telemetry monitoring, route optimization dispatch system, and automated proof-of-delivery logs.',
    fullDescription: 'An end-to-end dispatch and operations system connecting warehouse dispatchers with on-road delivery drivers. Features map-based route status, driver assignment queues, and milestone notifications.',
    clientType: 'Logistics & Supply Chain',
    techStack: ['Leaflet / OpenStreetMap', 'Node.js', 'WebSockets', 'Redis', 'Tailored UI'],
    highlights: [
      'Real-time GPS point ingestion and map route visualization',
      'Dispatcher alerts for route delays and milestone completions',
      'Mobile web application optimized for low-bandwidth cellular connections'
    ],
    image: 'assets/images/project-6.svg',
    liveUrl: '#',
    hasLiveDemo: false
  }
];

// Initialize project features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('#projectsGallery');
  if (projectsContainer) {
    initProjectsGallery(projectsContainer, ADVAIT_PROJECTS);
  }

  // Check if homepage has a featured projects container
  const featuredContainer = document.querySelector('#featuredProjectsGallery');
  if (featuredContainer) {
    initFeaturedProjects(featuredContainer, ADVAIT_PROJECTS.slice(0, 3));
  }

  initProjectModal();
});

/**
 * Renders full gallery on projects.html with category and search filtering
 */
function initProjectsGallery(container, projects) {
  let activeCategory = 'all';
  let searchQuery = '';

  const render = () => {
    const filtered = projects.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.techStack.some(t => t.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q);
      
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3>No projects found</h3>
          <p>We couldn't find any projects matching your search criteria. Try selecting another category or resetting filters.</p>
          <button class="btn btn-outline-primary btn-sm" id="resetProjectFilters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = container.querySelector('#resetProjectFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          const searchInput = document.querySelector('#projectSearchInput');
          if (searchInput) searchInput.value = '';
          const filterButtons = document.querySelectorAll('.filter-btn');
          filterButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
          render();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(createProjectCardMarkup).join('');
    bindProjectViewButtons(container);
  };

  // Filter Buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      render();
    });
  });

  // Search Input
  const searchInput = document.querySelector('#projectSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  render();
}

/**
 * Renders 3 featured projects for homepage
 */
function initFeaturedProjects(container, projects) {
  container.innerHTML = projects.map(createProjectCardMarkup).join('');
  bindProjectViewButtons(container);
}

/**
 * HTML Card Generator
 */
function createProjectCardMarkup(proj) {
  return `
    <article class="project-card" data-id="${proj.id}">
      <div class="project-thumb">
        <img src="${proj.image}" alt="${proj.title}" width="600" height="338" loading="lazy">
        <span class="project-badge-status">${proj.status}</span>
        <span class="project-badge-category">${proj.categoryLabel}</span>
      </div>
      <div class="project-body">
        <h3>${proj.title}</h3>
        <p>${proj.summary}</p>
        <div class="tech-tag-list">
          ${proj.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="btn btn-secondary btn-sm view-project-btn" data-id="${proj.id}">
            View Case Details
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
          <a href="contact.html?service=${proj.category}" class="btn btn-outline-primary btn-sm">
            Discuss Similar
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Attach click listeners to view detail modal
 */
function bindProjectViewButtons(container) {
  const buttons = container.querySelectorAll('.view-project-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const project = ADVAIT_PROJECTS.find(p => p.id === id);
      if (project) {
        openProjectModal(project);
      }
    });
  });
}

/**
 * Accessible Project Modal Dialog
 */
function initProjectModal() {
  let modalOverlay = document.querySelector('#projectModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'projectModalOverlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalOverlay.innerHTML = `
      <div class="modal-container" id="projectModalContainer">
        <div class="modal-header">
          <h3 id="modalProjectTitle">Project Details</h3>
          <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal window">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="modal-body" id="modalProjectBody">
          <!-- Populated dynamically -->
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const closeBtn = modalOverlay.querySelector('#modalCloseBtn');
    closeBtn.addEventListener('click', closeProjectModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }
}

function openProjectModal(project) {
  const overlay = document.querySelector('#projectModalOverlay');
  const title = document.querySelector('#modalProjectTitle');
  const body = document.querySelector('#modalProjectBody');
  if (!overlay || !title || !body) return;

  title.textContent = project.title;

  body.innerHTML = `
    <div class="modal-media">
      <img src="${project.image}" alt="${project.title}" width="800" height="450">
    </div>
    <div class="modal-meta-row">
      <span class="modal-badge-cat">${project.categoryLabel}</span>
      <span class="modal-badge-status">${project.status}</span>
      <span class="modal-client-label">Client: <strong>${project.clientType}</strong></span>
    </div>
    <p class="modal-desc">
      ${project.fullDescription}
    </p>
    <div class="modal-section-block">
      <h4 class="modal-section-title">Key Engineering Highlights:</h4>
      <ul class="modal-highlights-list">
        ${project.highlights.map(h => `
          <li class="modal-highlight-item">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    <div class="modal-section-block modal-section-block-last">
      <h4 class="modal-section-title">Technologies Utilized:</h4>
      <div class="tech-tag-list">
        ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="modal-actions-bar">
      <a href="contact.html?service=${project.category}" class="btn btn-primary">
        Request Custom Quote for Similar Solution
      </a>
      <a href="https://wa.me/919702420582?text=${encodeURIComponent('Hello Advait IT Solutions, I am interested in discussing a project similar to ' + project.title)}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
        Discuss on WhatsApp
      </a>
    </div>
  `;

  overlay.classList.add('is-active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus on close button for keyboard accessibility
  const closeBtn = document.querySelector('#modalCloseBtn');
  if (closeBtn) closeBtn.focus();
}

function closeProjectModal() {
  const overlay = document.querySelector('#projectModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('is-active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
