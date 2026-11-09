const fs = require('fs');

// 1. Update css/style.css
let style = fs.readFileSync('css/style.css', 'utf8');

const oldOrgBlockStart = style.indexOf('/* Executive Leadership Hierarchy (Founder-Led Org Chart) */');
const oldGridBlockStart = style.indexOf('.advait-leadership-grid {', oldOrgBlockStart);
const oldGridBlockEnd = style.indexOf('}', oldGridBlockStart) + 1;

if (oldOrgBlockStart !== -1 && oldGridBlockEnd > oldOrgBlockStart) {
  const replacementGrid = `/* Leadership Section (Single-Row 3-Column Desktop Grid) */
.advait-leadership-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;
}`;
  style = style.slice(0, oldOrgBlockStart) + replacementGrid + style.slice(oldGridBlockEnd);
  fs.writeFileSync('css/style.css', style, 'utf8');
  console.log('style.css updated: org chart removed, 3-column grid set!');
} else {
  console.log('Could not find exact org block in style.css, checking fallback...');
}

// 2. Update css/responsive.css
let resp = fs.readFileSync('css/responsive.css', 'utf8');

const respSearch = `/* Leadership Responsive Adjustments (Org Chart Tree & Grid) */
@media (max-width: 1024px) {
  .advait-org-connector {
    display: none;
  }
  .advait-org-tier-top {
    margin-bottom: 24px;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
  .advait-org-tier-top .advait-leader-card {
    width: 100%;
    max-width: 100%;
  }
  .advait-org-tier-bottom {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
  }
  .advait-leadership-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 580px;
    margin: 0 auto;
  }
}`;

const newRespBlock = `/* Leadership Responsive Adjustments (3-Column -> 2-Column -> 1-Column) */
@media (max-width: 992px) {
  .advait-leadership-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    max-width: 820px;
    margin: 0 auto;
  }
  
  /* Remaining card displayed below with consistent sizing */
  .advait-leadership-grid > .advait-leader-card:nth-child(3) {
    grid-column: 1 / -1;
    max-width: calc((100% - 24px) / 2);
    justify-self: center;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .advait-leadership-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 480px;
    margin: 0 auto;
  }
  
  .advait-leadership-grid > .advait-leader-card:nth-child(3) {
    grid-column: auto;
    max-width: 100%;
  }
}`;

const normResp = resp.replace(/\r\n/g, '\n');
const normSearch = respSearch.replace(/\r\n/g, '\n');

if (normResp.includes(normSearch)) {
  const updatedResp = normResp.replace(normSearch, newRespBlock);
  fs.writeFileSync('css/responsive.css', resp.includes('\r\n') ? updatedResp.replace(/\n/g, '\r\n') : updatedResp, 'utf8');
  console.log('responsive.css updated: 2-column tablet and 1-column mobile set!');
} else {
  console.log('Fuzzy matching responsive.css...');
  // Find where .advait-leadership-grid is in responsive.css
  const startIdx = normResp.indexOf('/* Leadership Responsive Adjustments');
  const endIdx = normResp.indexOf('@media (max-width: 520px)', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    const updatedResp = normResp.slice(0, startIdx) + newRespBlock + '\n\n' + normResp.slice(endIdx);
    fs.writeFileSync('css/responsive.css', resp.includes('\r\n') ? updatedResp.replace(/\n/g, '\r\n') : updatedResp, 'utf8');
    console.log('responsive.css updated via slice!');
  }
}

// 3. Update about.html
let about = fs.readFileSync('about.html', 'utf8');
const sKicker = about.indexOf('<!-- Leadership Profiles -->');
const eKicker = about.indexOf('</section>', sKicker) + 10;

if (sKicker !== -1 && eKicker !== -1) {
  const newLeadershipHtml = `<!-- Leadership Profiles -->
    <section class="section" id="leadership" aria-labelledby="leadershipTitle">
      <div class="container">
        <div class="section-header">
          <span class="section-kicker">Leadership</span>
          <h2 id="leadershipTitle">Executive Leadership</h2>
          <p class="section-subtitle">
            Advait IT Solutions is guided by seasoned academic and engineering leadership dedicated to architectural rigor, transparent project delivery, and technology mentorship.
          </p>
        </div>

        <div class="advait-leadership-grid">
          <!-- 1. Founder & CEO: Ashutosh Pandey -->
          <article class="advait-leader-card" aria-labelledby="leaderAshutosh">
            <div>
              <div class="advait-leader-header">
                <div class="advait-leader-avatar-wrap">
                  <picture>
                    <source srcset="assets/images/founder-ashutosh.webp" type="image/webp">
                    <img src="assets/images/founder-ashutosh.png" alt="Ashutosh Pandey — Founder &amp; CEO of Advait IT Solutions and Services" width="96" height="96" class="advait-leader-avatar" loading="lazy">
                  </picture>
                </div>
                <div class="advait-leader-header-info">
                  <span class="advait-leader-badge">Founder &amp; Executive Leadership</span>
                  <h3 class="advait-leader-name" id="leaderAshutosh">Ashutosh Pandey</h3>
                  <div class="advait-leader-role">Founder &amp; Chief Executive Officer (CEO)</div>
                  <div class="advait-leader-creds">MCA (TCET Mumbai) • BS Data Science (IIT Madras)</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Provides overarching vision, strategic direction, and executive business leadership for Advait IT Solutions. Oversees enterprise partnerships, commercial expansion, and full-stack software architecture while guiding long-term organizational strategy.
              </p>

              <div class="advait-leader-focus-title">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                <span>Executive &amp; Technical Strategy</span>
              </div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">Company Vision &amp; Strategy</span>
                <span class="advait-leader-tag">Business Leadership &amp; Growth</span>
                <span class="advait-leader-tag">Full-Stack Architecture</span>
                <span class="advait-leader-tag">Cloud &amp; Data Systems</span>
                <span class="advait-leader-tag">Client Partnerships</span>
              </div>

              <ul class="advait-leader-highlights">
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Directs end-to-end client solution delivery &amp; business growth</span>
                </li>
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Architected 20+ live production enterprise web systems</span>
                </li>
              </ul>
            </div>

            <div class="advait-leader-socials">
              <a href="https://www.linkedin.com/in/ashutoshpandey34/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey on LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/ashutosh7034" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey on GitHub">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://ashutoshpandey34.netlify.app/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Ashutosh Pandey Portfolio">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Portfolio</span>
              </a>
            </div>
          </article>

          <!-- 2. Joint MD & COO: Mr. Jayinish Kumar Mandal -->
          <article class="advait-leader-card" id="md-profile" aria-labelledby="leaderMandal">
            <div>
              <div class="advait-leader-header">
                <div class="advait-leader-avatar-wrap">
                  <picture>
                    <source srcset="assets/images/md-jayinish-mandal.webp" type="image/webp">
                    <img src="assets/images/md-jayinish-mandal.jpg" 
                         alt="Mr. Jayinish Kumar Mandal — Joint Managing Director &amp; COO, Advait IT Solutions and Services" 
                         width="96" 
                         height="96" 
                         class="advait-leader-avatar" 
                         loading="lazy">
                  </picture>
                </div>
                <div class="advait-leader-header-info">
                  <span class="advait-leader-badge">Operations &amp; Administration</span>
                  <h3 class="advait-leader-name" id="leaderMandal">Mr. Jayinish Kumar Mandal</h3>
                  <div class="advait-leader-role">Joint Managing Director &amp; Chief Operating Officer (COO)</div>
                  <div class="advait-leader-creds">Assistant Professor, Dy. HOD • MCA • PhD (Pursuing)</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Directs day-to-day business operations, administrative governance, and internal execution across Advait IT Solutions. With 11 years of academic and IT leadership, oversees team coordination, operational quality, and project guidance alignment.
              </p>

              <div class="advait-leader-focus-title">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Operational &amp; Academic Leadership</span>
              </div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">Business Operations</span>
                <span class="advait-leader-tag">Operational Execution</span>
                <span class="advait-leader-tag">Process Management</span>
                <span class="advait-leader-tag">Project Management</span>
                <span class="advait-leader-tag">Academic Mentorship</span>
              </div>

              <ul class="advait-leader-highlights">
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Guided 65+ UG Projects (BSc IT, CS, BCA) &amp; PG MCA Projects</span>
                </li>
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Microsoft Certified System Administrator (MCSA)</span>
                </li>
              </ul>
            </div>

            <div class="advait-leader-socials" aria-label="Direct Contact">
              <a href="tel:9673480534" class="advait-social-pill advait-contact-pill" aria-label="Call Mr. Jayinish Kumar Mandal: 9673480534">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>+91 96734 80534</span>
              </a>
              <a href="mailto:janishm@gmail.com" class="advait-social-pill advait-contact-pill" aria-label="Email Mr. Jayinish Kumar Mandal: janishm@gmail.com">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>janishm@gmail.com</span>
              </a>
            </div>
          </article>

          <!-- 3. Joint MD & CTO: Aakash Pandey -->
          <article class="advait-leader-card" aria-labelledby="leaderAakash">
            <div>
              <div class="advait-leader-header">
                <div class="advait-leader-avatar-wrap">
                  <picture>
                    <source srcset="assets/images/techlead-aakash.webp" type="image/webp">
                    <img src="assets/images/techlead-aakash.png" alt="Aakash Pandey — Joint Managing Director &amp; CTO of Advait IT Solutions and Services" width="96" height="96" class="advait-leader-avatar" loading="lazy">
                  </picture>
                </div>
                <div class="advait-leader-header-info">
                  <span class="advait-leader-badge">Technology &amp; Architecture</span>
                  <h3 class="advait-leader-name" id="leaderAakash">Aakash Pandey</h3>
                  <div class="advait-leader-role">Joint Managing Director &amp; Chief Technology Officer (CTO)</div>
                  <div class="advait-leader-creds">MCA (TCET Mumbai) • Full-Stack Engineer</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Leads technology strategy, software engineering architecture, and technical execution across all client initiatives. Directs full-stack development, API systems, CI/CD pipelines, and code quality standards to ensure high-performance deliverables.
              </p>

              <div class="advait-leader-focus-title">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>Engineering &amp; Technical Direction</span>
              </div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">Technology Strategy</span>
                <span class="advait-leader-tag">Software Engineering</span>
                <span class="advait-leader-tag">Full-Stack Architecture</span>
                <span class="advait-leader-tag">RESTful APIs &amp; Microservices</span>
                <span class="advait-leader-tag">DevOps &amp; Cloud Systems</span>
              </div>

              <ul class="advait-leader-highlights">
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Leads technology architecture &amp; engineering delivery</span>
                </li>
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Directs CI/CD release pipelines &amp; engineering quality</span>
                </li>
              </ul>
            </div>

            <div class="advait-leader-socials">
              <a href="https://www.linkedin.com/in/aakash-up271309/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Aakash7999-git" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on GitHub">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://aakashpandey.netlify.app/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey Portfolio">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Portfolio</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>`;

  about = about.slice(0, sKicker) + newLeadershipHtml + about.slice(eKicker);
  fs.writeFileSync('about.html', about, 'utf8');
  console.log('about.html updated: 3 cards in one horizontal row grid!');
} else {
  console.error('Could not find leadership section bounds in about.html');
}

