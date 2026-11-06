const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const rem1 = `<div class="service-card-footer">
              <a href="services.html#cloud-devops" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=cloud-deployment" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`;
const rep1 = `<div class="service-card-footer">
              <a href="services.html#cloud-devops" class="service-card-link">Explore Service &rarr;</a>
            </div>`;

const rem2 = `<div class="service-card-footer">
              <a href="services.html#maintenance" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=maintenance" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`;
const rep2 = `<div class="service-card-footer">
              <a href="services.html#maintenance" class="service-card-link">Explore Service &rarr;</a>
            </div>`;

const rem3 = `<div class="service-card-footer">
              <a href="services.html#qa-testing" class="service-card-link">Learn More &rarr;</a>
              <a href="contact.html?service=testing-qa" class="btn btn-outline-primary btn-sm">Request Quote</a>
            </div>`;
const rep3 = `<div class="service-card-footer">
              <a href="services.html#testing-qa" class="service-card-link">Explore Service &rarr;</a>
            </div>`;

if (html.includes(rem1)) html = html.replace(rem1, rep1);
if (html.includes(rem2)) html = html.replace(rem2, rep2);
if (html.includes(rem3)) html = html.replace(rem3, rep3);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✓ Successfully standardized all 6 service card footers in index.html');

