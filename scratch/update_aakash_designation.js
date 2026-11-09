const fs = require('fs');

// 1. Update index.html JSON-LD
const indexPath = 'index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

indexContent = indexContent.replace(
  '"jobTitle": "Technical Lead & Software Development Engineer"',
  '"jobTitle": "Chief Operating Officer (COO) & Technical Lead"'
);
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('✓ Updated index.html JSON-LD jobTitle');

// 2. Update about.html
const aboutPath = 'about.html';
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

// Update about.html JSON-LD description if applicable
aboutContent = aboutContent.replace(
  'founded by Ashutosh Pandey and led technically by Aakash Pandey.',
  'founded by Ashutosh Pandey, and led operationally and technically by COO & Technical Lead Aakash Pandey.'
);

// Update Aakash's leader card
const aakashOldCardStart = '<!-- Technical Lead: Aakash Pandey -->';
const startIdx = aboutContent.indexOf(aakashOldCardStart);
const endIdx = aboutContent.indexOf('</article>', startIdx) + '</article>'.length;

const isCRLF = aboutContent.includes('\r\n');
const eol = isCRLF ? '\r\n' : '\n';

const aakashNewCardLines = [
  '          <!-- Chief Operating Officer & Technical Lead: Aakash Pandey -->',
  '          <article class="advait-leader-card" aria-labelledby="leaderAakash">',
  '            <div>',
  '              <div class="advait-leader-header">',
  '                <div class="advait-leader-avatar-wrap">',
  '                  <picture>',
  '                    <source srcset="assets/images/techlead-aakash.svg" type="image/svg+xml">',
  '                    <img src="assets/images/techlead-aakash.png" alt="Aakash Pandey — Chief Operating Officer (COO) &amp; Technical Lead of Advait IT Solutions and Services" width="96" height="96" class="advait-leader-avatar" loading="lazy">',
  '                  </picture>',
  '                </div>',
  '                <div class="advait-leader-header-info">',
  '                  <span class="advait-leader-badge">Operations &amp; Technical Leadership</span>',
  '                  <h3 class="advait-leader-name" id="leaderAakash">Aakash Pandey</h3>',
  '                  <div class="advait-leader-role">Chief Operating Officer (COO) &amp; Technical Lead</div>',
  '                  <div class="advait-leader-creds">MCA (TCET Mumbai) • Full-Stack Engineer</div>',
  '                </div>',
  '              </div>',
  '',
  '              <p class="advait-leader-bio">',
  '                Oversees day-to-day technology operations, software engineering execution, project coordination, and technical delivery. Leads full-stack development, API architecture, deployment pipelines, database optimization, and engineering quality across client projects.',
  '              </p>',
  '',
  '              <div class="advait-leader-focus-title">',
  '                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
  '                <span>Areas of Responsibility</span>',
  '              </div>',
  '              <div class="advait-leader-tags">',
  '                <span class="advait-leader-tag">Technology Operations</span>',
  '                <span class="advait-leader-tag">Software Engineering</span>',
  '                <span class="advait-leader-tag">Java &amp; Spring Boot</span>',
  '                <span class="advait-leader-tag">RESTful APIs &amp; Microservices</span>',
  '                <span class="advait-leader-tag">Database Optimization</span>',
  '                <span class="advait-leader-tag">CI/CD &amp; DevOps</span>',
  '                <span class="advait-leader-tag">Project Delivery</span>',
  '                <span class="advait-leader-tag">Quality Assurance</span>',
  '              </div>',
  '',
  '              <ul class="advait-leader-highlights">',
  '                <li>',
  '                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
  '                  <span>Leads technology operations &amp; software engineering delivery</span>',
  '                </li>',
  '                <li>',
  '                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
  '                  <span>Directs CI/CD release pipelines &amp; engineering quality</span>',
  '                </li>',
  '              </ul>',
  '            </div>',
  '',
  '            <div class="advait-leader-socials">',
  '              <a href="https://www.linkedin.com/in/aakash-up271309/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on LinkedIn">',
  '                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
  '                <span>LinkedIn</span>',
  '              </a>',
  '              <a href="https://github.com/Aakash7999-git" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey on GitHub">',
  '                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  '                <span>GitHub</span>',
  '              </a>',
  '              <a href="https://aakashpandey.netlify.app/" target="_blank" rel="noopener noreferrer" class="advait-social-pill" aria-label="Aakash Pandey Portfolio">',
  '                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  '                <span>Portfolio</span>',
  '              </a>',
  '            </div>',
  '          </article>'
];

const newCardChunk = aakashNewCardLines.join(eol);
aboutContent = aboutContent.substring(0, startIdx) + newCardChunk + aboutContent.substring(endIdx);

fs.writeFileSync(aboutPath, aboutContent, 'utf8');
console.log('✓ Successfully updated Aakash Pandey leadership card in about.html');

