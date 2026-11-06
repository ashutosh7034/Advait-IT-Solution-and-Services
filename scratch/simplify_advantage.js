const fs = require('fs');

let html = fs.readFileSync('advait-advantage.html', 'utf8');

const oldGridStart = html.indexOf('<div class="advantage-deep-grid">');
const oldGridEnd = html.indexOf('</div>', html.indexOf('<!-- Pillar 4 -->')) + '</div>'.length;

if (oldGridStart !== -1 && oldGridEnd !== -1) {
  const simplifiedGrid = `<div class="advantage-deep-grid">
          <!-- Pillar 1 -->
          <div class="advantage-deep-card reveal reveal-delay-1">
            <div class="why-icon-box">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <h3>Custom Architecture, Zero Bloat</h3>
            <p>
              We engineer websites and applications tailored to your exact business needs with clean, modular code, high performance, and zero restrictive templates.
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="advantage-deep-card reveal reveal-delay-2">
            <div class="why-icon-box">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </div>
            <h3>Direct Senior Technical Access</h3>
            <p>
              Collaborate directly with the engineers building your software. Clear technical communication, fast feedback cycles, and zero account manager layers.
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="advantage-deep-card reveal reveal-delay-1">
            <div class="why-icon-box">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3>Transparent, Predictable Pricing</h3>
            <p>
              Transparent itemized proposals tailored to your scope and budget. No hidden post-launch costs, no enterprise bloat, and milestone-backed delivery.
            </p>
          </div>

          <!-- Pillar 4 -->
          <div class="advantage-deep-card reveal reveal-delay-2">
            <div class="why-icon-box">
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3>Full-Lifecycle Long-Term Support</h3>
            <p>
              Dependable post-launch maintenance, security patches, automated backups, and proactive optimizations to protect your digital investment.
            </p>
          </div>
        </div>`;

  html = html.substring(0, oldGridStart) + simplifiedGrid + html.substring(oldGridEnd);
  fs.writeFileSync('advait-advantage.html', html, 'utf8');
  console.log('✓ Successfully simplified advantage pillars in advait-advantage.html');
} else {
  console.error('Could not locate advantage-deep-grid');
}

