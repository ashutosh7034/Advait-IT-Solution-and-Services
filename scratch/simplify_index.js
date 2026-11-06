const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace dual button footers with single clear link in index.html
const replacements = [
  {
    target: `<div class="service-card-footer">
              <a href="services.html#web-dev" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=website-development" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#web-dev" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  },
  {
    target: `<div class="service-card-footer">
              <a href="services.html#web-apps" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=web-applications" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#web-apps" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  },
  {
    target: `<div class="service-card-footer">
              <a href="services.html#software-dev" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=software-engineering" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#software-dev" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  },
  {
    target: `<div class="service-card-footer">
              <a href="services.html#cloud-devops" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=cloud-devops" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#cloud-devops" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  },
  {
    target: `<div class="service-card-footer">
              <a href="services.html#testing-qa" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=software-testing" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#testing-qa" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  },
  {
    target: `<div class="service-card-footer">
              <a href="services.html#security" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=security-hardening" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`,
    replacement: `<div class="service-card-footer">
              <a href="services.html#security" class="service-card-link">Explore Service &rarr;</a>
            </div>`
  }
];

let replacedCount = 0;
replacements.forEach(r => {
  if (html.includes(r.target)) {
    html = html.replace(r.target, r.replacement);
    replacedCount++;
  }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log(`✓ Replaced ${replacedCount} service card footers in index.html`);

