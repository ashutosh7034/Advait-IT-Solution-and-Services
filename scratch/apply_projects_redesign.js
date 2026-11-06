const fs = require('fs');

console.log('=== APPLYING PROJECTS PAGE REDESIGN ===');

// 1. Update projects.html
let projectsHtml = fs.readFileSync('projects.html', 'utf8');

const oldHeroAndGalleryRegex = /<!-- Portfolio Header & Interactive Command Bar -->[\s\S]*?<!-- Bottom CTA -->/;

const newHeroAndGallery = `<!-- Compact Portfolio Hero & Toolbar -->
    <section class="projects-hero-compact" aria-label="Our Portfolio">
      <div class="container text-center">
        <h1 class="projects-hero-title">Software Solutions Built for Real Business Needs</h1>
        <p class="projects-hero-subtitle">
          Explore our web applications, business software, and digital solutions designed to solve real-world challenges.
        </p>

        <!-- Compact Search & Filter Toolbar -->
        <div class="projects-toolbar" id="projectsToolbar">
          <div class="projects-search-wrap">
            <svg class="search-svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="search" 
              id="projectSearchInput" 
              class="projects-search-input" 
              placeholder="Search projects by keyword, technology, or sector..." 
              aria-label="Search projects"
              autocomplete="off"
            >
          </div>

          <div class="projects-filter-rail" role="tablist" aria-label="Filter projects by category">
            <button type="button" class="filter-btn active" data-filter="all" role="tab" aria-selected="true">All Projects (6)</button>
            <button type="button" class="filter-btn" data-filter="business-software" role="tab" aria-selected="false">Business Software (2)</button>
            <button type="button" class="filter-btn" data-filter="web-apps" role="tab" aria-selected="false">Web Applications (2)</button>
            <button type="button" class="filter-btn" data-filter="websites" role="tab" aria-selected="false">Websites (1)</button>
            <button type="button" class="filter-btn" data-filter="other-it" role="tab" aria-selected="false">Other IT Solutions (1)</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid Section -->
    <section class="projects-grid-section pt-0">
      <div class="container">
        <!-- Dynamic Projects Grid (Populated by js/projects-data.js) -->
        <div class="projects-grid" id="projectsGallery" aria-live="polite">
          <!-- Projects rendered dynamically via JavaScript -->
        </div>

        <!-- Verification Notice -->
        <div class="portfolio-notice-box">
          <p>
            <strong>Engineering Transparency:</strong> All displayed case studies reflect real-world architectures engineered by our technical team. To request a live demonstration or customized scope proposal, contact our team directly.
          </p>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->`;

if (oldHeroAndGalleryRegex.test(projectsHtml)) {
  projectsHtml = projectsHtml.replace(oldHeroAndGalleryRegex, newHeroAndGallery);
  fs.writeFileSync('projects.html', projectsHtml, 'utf8');
  console.log('✓ Successfully updated projects.html');
} else {
  console.error('❌ Could not match old hero section in projects.html');
}

// 2. Update js/projects-data.js (Markup generator & live count updates)
let projectsJs = fs.readFileSync('js/projects-data.js', 'utf8');

const oldMarkupFunc = `function createProjectCardMarkup(proj) {
  return \`
    <article class="project-card" data-id="\${proj.id}">
      <div class="project-thumb">
        <img src="\${proj.image}" alt="\${proj.title}" width="600" height="338" loading="lazy">
        <span class="project-badge-status">\${proj.status}</span>
        <span class="project-badge-category">\${proj.categoryLabel}</span>
      </div>
      <div class="project-body">
        <h3>\${proj.title}</h3>
        <p>\${proj.summary}</p>
        <div class="tech-tag-list">
          \${proj.techStack.map(tech => \`<span class="tech-tag">\${tech}</span>\`).join('')}
        </div>
        <div class="project-footer">
          <button class="btn btn-primary btn-sm view-project-btn" data-id="\${proj.id}">
            View Project
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  \`;
}`;

const newMarkupFunc = `function createProjectCardMarkup(proj) {
  return \`
    <article class="project-card reveal" data-id="\${proj.id}">
      <div class="project-thumb">
        <img src="\${proj.image}" alt="\${proj.title}" width="600" height="338" loading="lazy">
        <span class="project-badge-category">\${proj.categoryLabel}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">\${proj.title}</h3>
        <p class="project-desc">\${proj.summary}</p>
        <div class="tech-tag-list" aria-label="Technologies used">
          \${proj.techStack.map(tech => \`<span class="tech-tag">\${tech}</span>\`).join('')}
        </div>
        <div class="project-footer">
          <button type="button" class="btn btn-primary btn-sm view-project-btn" data-id="\${proj.id}" aria-label="View case details for \${proj.title}">
            <span>View Project</span>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  \`;
}`;

if (projectsJs.includes(oldMarkupFunc)) {
  projectsJs = projectsJs.replace(oldMarkupFunc, newMarkupFunc);
  fs.writeFileSync('js/projects-data.js', projectsJs, 'utf8');
  console.log('✓ Successfully updated createProjectCardMarkup in js/projects-data.js');
} else {
  console.log('Note: createProjectCardMarkup already updated or signature varies');
}

// 3. Add styling to css/style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

const projectsCssBlock = `
/* ==========================================================================
   Compact Projects Page & Cards Redesign
   ========================================================================== */
.projects-hero-compact {
  background: linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%);
  padding: 34px 0 22px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;
}

.projects-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(1.85rem, 3.2vw, 2.35rem);
  font-weight: 800;
  color: var(--color-navy);
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.projects-hero-subtitle {
  font-size: clamp(0.92rem, 1.4vw, 1.05rem);
  color: var(--color-text-secondary);
  max-width: 660px;
  margin: 0 auto 18px auto;
  line-height: 1.5;
}

.projects-toolbar {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.projects-search-wrap {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.projects-search-wrap .search-svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.projects-search-input {
  width: 100%;
  padding: 8px 16px 8px 38px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: #FFFFFF;
  font-size: 0.88rem;
  color: var(--color-navy);
  box-shadow: 0 1px 3px rgba(11, 31, 58, 0.04);
  transition: all var(--transition-fast);
}

.projects-search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.12);
}

.projects-filter-rail {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.projects-filter-rail .filter-btn {
  padding: 5px 14px;
  font-size: 0.80rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: #FFFFFF;
  color: var(--color-text-main);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.projects-filter-rail .filter-btn:hover {
  background: var(--color-bg-subtle);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.projects-filter-rail .filter-btn.active {
  background: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 2px 6px rgba(21, 94, 239, 0.25);
}

.projects-grid-section {
  padding-bottom: 48px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 36px;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

.project-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 8px -2px rgba(11, 31, 58, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  position: relative;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(21, 94, 239, 0.4);
  box-shadow: 0 14px 30px -6px rgba(11, 31, 58, 0.12), 0 2px 6px rgba(11, 31, 58, 0.04);
}

.project-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0B1F3B;
}

.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-thumb img {
  transform: scale(1.03);
}

.project-badge-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  color: var(--color-navy);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.project-body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-navy);
  margin: 0 0 8px 0;
  line-height: 1.35;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.project-card:hover .project-title {
  color: var(--color-primary);
}

.project-desc {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin: 0 0 14px 0;
  flex-grow: 1;
}

.tech-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 16px;
}

.tech-tag {
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #334155;
  transition: all 0.15s ease;
}

.project-card:hover .tech-tag {
  background: #EFF6FF;
  border-color: #BFDBFE;
  color: var(--color-navy);
}

.project-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #F1F5F9;
}

.project-footer .view-project-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 8px;
}
`;

if (!styleCss.includes('.projects-hero-compact {')) {
  styleCss += projectsCssBlock;
  fs.writeFileSync('css/style.css', styleCss, 'utf8');
  console.log('✓ Successfully appended projects styling to css/style.css');
}

console.log('=== PROJECTS REDESIGN SCRIPT COMPLETE ===');

