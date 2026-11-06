const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// Simplify Ashutosh's card by removing the verbose focus title and tags
const ashutoshOldBioAndTags = `<p class="advait-leader-bio">
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
              </div>`;

const ashutoshSimplified = `<p class="advait-leader-bio">
                Leads organizational strategy, commercial scoping, and full-stack software architecture at Advait IT Solutions. Specializes in scalable web systems, data science solutions, and transparent project delivery.
              </p>`;

if (html.includes(ashutoshOldBioAndTags)) {
  html = html.replace(ashutoshOldBioAndTags, ashutoshSimplified);
}

// Simplify Aakash's card by removing the verbose focus title and tags
const aakashOldBioAndTags = `<p class="advait-leader-bio">
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
              </div>`;

const aakashSimplified = `<p class="advait-leader-bio">
                Directs software engineering, API development, and deployment pipelines across all client projects. Specializes in Java, Spring Boot, database optimization, and high-reliability release engineering.
              </p>`;

if (html.includes(aakashOldBioAndTags)) {
  html = html.replace(aakashOldBioAndTags, aakashSimplified);
}

fs.writeFileSync('about.html', html, 'utf8');
console.log('✓ Successfully simplified leadership profiles in about.html');

