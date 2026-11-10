const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(aboutPath, 'utf8');

// 1. Meta descriptions
content = content.replace(
  'Discover our Mumbai-based engineering leadership, academic credentials, and commitment to delivering high-performance, affordable custom software.',
  'Discover our Mumbai-based executive leadership, industry expertise, and commitment to delivering high-performance, affordable custom software.'
);
content = content.replace(
  'Discover our Mumbai-based engineering leadership, academic credentials, and commitment to delivering high-performance, affordable custom software.',
  'Discover our Mumbai-based executive leadership, industry expertise, and commitment to delivering high-performance, affordable custom software.'
);

// 2. Section subtitle
content = content.replace(
  'Advait IT Solutions is guided by seasoned academic and engineering leadership dedicated to architectural rigor, transparent project delivery, and technology mentorship.',
  'Advait IT Solutions is guided by seasoned executive and engineering leadership dedicated to architectural rigor, transparent project delivery, and technology excellence.'
);

// 3. Leadership Card for Mr. Jayinish Kumar Mandal
const oldMandalCard = `          <!-- 2. Joint MD & COO: Mr. Jayinish Kumar Mandal -->
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
          </article>`;

const newMandalCard = `          <!-- 2. Joint MD & COO: Mr. Jayinish Kumar Mandal -->
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
                  <span class="advait-leader-badge">Operations &amp; Project Management</span>
                  <h3 class="advait-leader-name" id="leaderMandal">Mr. Jayinish Kumar Mandal</h3>
                  <div class="advait-leader-role">Joint Managing Director &amp; Chief Operating Officer (COO)</div>
                  <div class="advait-leader-creds">11 Years Project Management • MCSA Certified</div>
                </div>
              </div>

              <p class="advait-leader-bio">
                Leads business operations, project management, and organizational execution at Advait IT Solutions and Services. With 11 years of project management experience, he focuses on operational efficiency, project coordination, process management, resource planning, and consistent service delivery across client engagements.
              </p>

              <div class="advait-leader-focus-title">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <span>Operations &amp; Project Management</span>
              </div>
              <div class="advait-leader-tags">
                <span class="advait-leader-tag">Business Operations</span>
                <span class="advait-leader-tag">Project Management</span>
                <span class="advait-leader-tag">Project Planning &amp; Execution</span>
                <span class="advait-leader-tag">Team Coordination</span>
                <span class="advait-leader-tag">Process Management</span>
                <span class="advait-leader-tag">Resource Management</span>
                <span class="advait-leader-tag">IT Service Delivery</span>
                <span class="advait-leader-tag">Client Coordination</span>
              </div>

              <ul class="advait-leader-highlights">
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>11 Years of Project Management Experience</span>
                </li>
                <li>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Microsoft Certified Systems Administrator (MCSA)</span>
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
          </article>`;

// Normalise line endings for replacement
const normalize = str => str.replace(/\r\n/g, '\n');
const normalizedContent = normalize(content);
const normalizedOldCard = normalize(oldMandalCard);
const normalizedNewCard = normalize(newMandalCard);

if (normalizedContent.includes(normalizedOldCard)) {
  const updated = normalizedContent.replace(normalizedOldCard, normalizedNewCard);
  fs.writeFileSync(aboutPath, updated, 'utf8');
  console.log('SUCCESS: Mandal leadership card updated in about.html!');
} else {
  console.error('ERROR: Could not find old card in about.html');
}

