const fs = require('fs');

// 1. Update about.html
let about = fs.readFileSync('about.html', 'utf8');

// Update meta description
about = about.replace(
  /<meta name="description" content="Learn about Advait IT Solutions and Services in Mumbai, our leadership \([^)]+\)/,
  '<meta name="description" content="Learn about Advait IT Solutions and Services in Mumbai, our leadership (Founder & CEO Ashutosh Pandey, Joint Managing Director & COO Mr. Jayinish Kumar Mandal, and Joint Managing Director & CTO Aakash Pandey)'
);

// Update schema description
about = about.replace(
  /"description": "Overview of Advait IT Solutions and Services, an IT company based in Mumbai governed by [^"]+"/,
  '"description": "Overview of Advait IT Solutions and Services, an IT company based in Mumbai governed by Founder & CEO Ashutosh Pandey, Joint Managing Director & COO Mr. Jayinish Kumar Mandal, and Joint Managing Director & CTO Aakash Pandey."'
);

// Update leadership section
const sKicker = about.indexOf('<!-- Leadership Profiles -->');
const eKicker = about.indexOf('</section>', sKicker) + 10;

if (sKicker !== -1 && eKicker !== -1) {
  const newSection = `<!-- Leadership Profiles -->
    <section class="section" id="leadership" aria-labelledby="leadershipTitle">
      <div class="container">
        <div class="section-header">
          <span class="section-kicker">Leadership</span>
          <h2 id="leadershipTitle">Executive Leadership Structure</h2>
          <p class="section-subtitle">
            Advait IT Solutions is guided by a unified executive leadership team dedicated to architectural excellence, operational discipline, and client success.
          </p>
        </div>

        <div class="advait-org-chart">
          <!-- Top Tier: Founder & CEO -->
          <div class="advait-org-tier-top">
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
          </div>

          <!-- Hierarchy Connector Tree -->
          <div class="advait-org-connector" aria-hidden="true">
            <div class="advait-org-stem"></div>
            <div class="advait-org-branch"></div>
          </div>

          <!-- Bottom Tier: Joint Managing Directors -->
          <div class="advait-org-tier-bottom">
            <!-- Joint MD & COO: Mr. Jayinish Kumar Mandal -->
            <article class="advait-leader-card" id="md-profile" aria-labelledby="leaderMandal">
              <div>
                <div class="advait-leader-header">
                  <div class="advait-leader-avatar-wrap">
                    <img src="assets/images/md-jayinish-mandal.jpg" 
                         alt="Mr. Jayinish Kumar Mandal — Joint Managing Director &amp; COO, Advait IT Solutions and Services" 
                         width="96" 
                         height="96" 
                         class="advait-leader-avatar" 
                         loading="lazy">
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

            <!-- Joint MD & CTO: Aakash Pandey -->
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
      </div>
    </section>`;

  about = about.slice(0, sKicker) + newSection + about.slice(eKicker);
  fs.writeFileSync('about.html', about, 'utf8');
  console.log('about.html successfully updated!');
} else {
  console.error('Could not find leadership section bounds in about.html');
}

// 2. Update index.html schema
let index = fs.readFileSync('index.html', 'utf8');
const oldEmployeeBlock = `"employee": [
          {
            "@type": "Person",
            "name": "Aakash Pandey",
            "jobTitle": "Chief Operating Officer (COO) & Technical Lead",
            "alumniOf": "Thakur College of Engineering and Technology (TCET)",
            "sameAs": [
              "https://www.linkedin.com/in/aakash-up271309/",
              "https://github.com/Aakash7999-git",
              "https://aakashpandey.netlify.app/"
            ]
          }
        ],`;

const newEmployeeBlock = `"employee": [
          {
            "@type": "Person",
            "name": "Mr. Jayinish Kumar Mandal",
            "jobTitle": "Joint Managing Director & Chief Operating Officer (COO)",
            "telephone": "+91-9673480534",
            "email": "janishm@gmail.com"
          },
          {
            "@type": "Person",
            "name": "Aakash Pandey",
            "jobTitle": "Joint Managing Director & Chief Technology Officer (CTO)",
            "alumniOf": "Thakur College of Engineering and Technology (TCET)",
            "sameAs": [
              "https://www.linkedin.com/in/aakash-up271309/",
              "https://github.com/Aakash7999-git",
              "https://aakashpandey.netlify.app/"
            ]
          }
        ],`;

if (index.includes(oldEmployeeBlock)) {
  index = index.replace(oldEmployeeBlock, newEmployeeBlock);
  fs.writeFileSync('index.html', index, 'utf8');
  console.log('index.html schema updated successfully!');
} else {
  console.log('Could not match exact oldEmployeeBlock in index.html, checking fuzzy match...');
  // Check CRLF vs LF
  const normIndex = index.replace(/\r\n/g, '\n');
  const normOld = oldEmployeeBlock.replace(/\r\n/g, '\n');
  if (normIndex.includes(normOld)) {
    const updated = normIndex.replace(normOld, newEmployeeBlock.replace(/\r\n/g, '\n'));
    fs.writeFileSync('index.html', index.includes('\r\n') ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
    console.log('index.html schema updated via normalized match!');
  } else {
    console.warn('oldEmployeeBlock not found in index.html');
  }
}

