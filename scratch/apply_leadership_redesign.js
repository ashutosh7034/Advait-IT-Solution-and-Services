const fs = require('fs');

// 1. Add Leadership CSS to style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

const leaderCssAddition = `
/* ==========================================================================
   ADVait Redesigned Modern Leadership Cards
   ========================================================================== */
.advait-leadership-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1080px;
  margin: 0 auto;
}

.advait-leader-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow: 0 4px 16px -4px rgba(11, 31, 58, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.advait-leader-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px -8px rgba(11, 31, 58, 0.12);
  border-color: rgba(21, 94, 239, 0.35);
}

.advait-leader-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.advait-leader-avatar-wrap {
  width: 104px;
  height: 104px;
  border-radius: 18px;
  overflow: hidden;
  background: #EFF6FF;
  border: 2px solid #DBEAFE;
  box-shadow: 0 4px 12px rgba(21, 94, 239, 0.1);
  flex-shrink: 0;
  position: relative;
}

.advait-leader-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.advait-leader-header-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.advait-leader-badge {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  background: rgba(21, 94, 239, 0.08);
  border: 1px solid rgba(21, 94, 239, 0.18);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.advait-leader-name {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-navy);
  margin: 0;
  line-height: 1.2;
}

.advait-leader-role {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.3;
}

.advait-leader-creds {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.advait-leader-bio {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

.advait-leader-focus-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-navy);
  margin-bottom: 10px;
}

.advait-leader-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 22px;
}

.advait-leader-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-full);
  padding: 4px 11px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-navy);
}

.advait-leader-tag svg {
  color: #10B981;
}

.advait-leader-socials {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-subtle);
  margin-top: auto;
}

.advait-social-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: #FFFFFF;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-main);
  transition: all var(--transition-fast);
}

.advait-social-pill:hover {
  background: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.advait-social-pill svg {
  flex-shrink: 0;
}
`;

if (!styleCss.includes('ADVait Redesigned Modern Leadership Cards')) {
  styleCss += '\n' + leaderCssAddition;
  fs.writeFileSync('css/style.css', styleCss);
  console.log('✓ Added leadership CSS to style.css');
}

// 2. Add Responsive rules to responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');
const leaderRespAddition = `
/* Leadership Responsive Adjustments */
@media (max-width: 992px) {
  .advait-leadership-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 520px) {
  .advait-leader-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  
  .advait-leader-card {
    padding: 20px 18px;
  }
  
  .advait-leader-socials {
    flex-wrap: wrap;
  }
}
`;

if (!respCss.includes('Leadership Responsive Adjustments')) {
  respCss += '\n' + leaderRespAddition;
  fs.writeFileSync('css/responsive.css', respCss);
  console.log('✓ Added leadership responsive CSS to responsive.css');
}

// 3. Update about.html leadership section
let aboutHtml = fs.readFileSync('about.html', 'utf8');

const oldLeaderRegex = /<!-- Leadership Profiles -->\s*<section class="section" id="leadership"[\s\S]*?<\/section>/;

const newLeaderSection = `<!-- Leadership Profiles -->
    <section class="section" id="leadership" aria-labelledby="leadershipTitle">
      <div class="container">
        <div class="section-header">
          <span class="section-kicker">Leadership</span>
          <h2 id="leadershipTitle">Executive &amp; Technical Leadership</h2>
          <p class="section-subtitle">
            Advait IT Solutions is guided by experienced engineering leadership dedicated to architectural rigor, transparent project delivery, and direct client collaboration.
          </p>
        </div>

        <div class="advait-leadership-grid">
          <!-- Founder & CEO: Ashutosh Pandey -->
          <article class="advait-leader-card">
            <div>
              <div class="advait-leader-header">
                <div class="advait-leader-avatar-wrap">
                  <picture>
                    <source srcset="assets/images/founder-ashutosh.webp" type="image/webp">
                    <img src="assets/images/founder-ashutosh.png" alt="Ashutosh Pandey — Founder & CEO of Advait IT Solutions and Services" width="104" height="104" class="advait-leader-avatar" loading="lazy">
                  </picture>
                </div>
                <div class="advait-leader-header-info">
                  <span class="advait-leader-badge">Founder &amp; Executive Leadership</span>
                  <h3 class="advait-leader-name">Ashutosh Pandey</h3>
                  <div class="advait-leader-role">Founder &amp; Chief Executive Officer (CEO)</div>
                  <div class="advait-leader-creds">MCA (TCET Mumbai) • BS Data Science (IIT Madras)</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Ashutosh leads organizational vision, commercial strategy, and full-stack software architecture at Advait IT Solutions. Combining advanced postgraduate training in Computer Applications and Data Science, he bridges algorithmic precision with client-centric execution to deliver scalable, dependable digital products for growing businesses.
              </p>

              <div class="advait-leader-focus-title">Core Focus &amp; Responsibilities:</div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Strategic Growth &amp; Scoping
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Applied AI &amp; ML Architecture
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full-Stack Web Systems
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Client Governance &amp; IP Security
                </span>
              </div>
            </div>

            <div class="advait-leader-socials">
              <a href="https://www.linkedin.com/in/ashutoshpandey34/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey on LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/ashutosh7034" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey on GitHub">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://ashutoshpandey34.netlify.app/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey Portfolio">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Portfolio</span>
              </a>
            </div>
          </article>

          <!-- Technical Lead: Aakash Pandey -->
          <article class="advait-leader-card">
            <div>
              <div class="advait-leader-header">
                <div class="advait-leader-avatar-wrap">
                  <picture>
                    <source srcset="assets/images/techlead-aakash.svg" type="image/svg+xml">
                    <img src="assets/images/techlead-aakash.png" alt="Aakash Pandey — Technical Lead of Advait IT Solutions and Services" width="104" height="104" class="advait-leader-avatar" loading="lazy">
                  </picture>
                </div>
                <div class="advait-leader-header-info">
                  <span class="advait-leader-badge">Technical Leadership &amp; Engineering</span>
                  <h3 class="advait-leader-name">Aakash Pandey</h3>
                  <div class="advait-leader-role">Technical Lead &amp; Software Development Engineer</div>
                  <div class="advait-leader-creds">MCA (TCET Mumbai) • Full-Stack Engineer</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Aakash directs software implementation, application workflows, database engineering, and deployment pipelines across all client projects. Specializing in Java, Spring Boot, REST APIs, and modern database architectures, he oversees rigorous code reviews, QA routines, and release protocols to guarantee high system reliability.
              </p>

              <div class="advait-leader-focus-title">Core Focus &amp; Responsibilities:</div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full-Stack Architecture
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Java &amp; Spring Boot APIs
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Database Optimization
                </span>
                <span class="advait-leader-tag">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  CI/CD &amp; Release Protocols
                </span>
              </div>
            </div>

            <div class="advait-leader-socials">
              <a href="https://www.linkedin.com/in/aakash-up271309/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Aakash7999-git" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on GitHub">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://aakashpandey.netlify.app/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey Portfolio">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Portfolio</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>`;

if (oldLeaderRegex.test(aboutHtml)) {
  aboutHtml = aboutHtml.replace(oldLeaderRegex, newLeaderSection);
  fs.writeFileSync('about.html', aboutHtml);
  console.log('✓ Updated leadership section in about.html');
} else {
  console.error('✗ Could not match oldLeaderRegex in about.html');
}

