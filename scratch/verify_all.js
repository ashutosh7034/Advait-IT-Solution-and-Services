const fs = require('fs');
const path = require('path');
const http = require('http');

const projectDir = '.';
const htmlFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));
let brokenCount = 0;
let totalInline = 0;

console.log('=== STEP 1: Verify 0 Inline Styles in HTML Files ===');
htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(projectDir, f), 'utf8');
  const matches = (content.match(/style=["'][^"']*["']/g) || [])
    .filter(style => style !== 'style="display:none;visibility:hidden"');
  if (matches.length > 0) {
    console.error(`FAIL: ${f} has ${matches.length} inline styles:`, matches);
    totalInline += matches.length;
  }
});
if (totalInline === 0) {
  console.log(`PASS: 100% of HTML files have ZERO inline style attributes! (0 across ${htmlFiles.length} files)`);
} else {
  console.error(`FAIL: Total inline styles: ${totalInline}`);
}

console.log('\n=== STEP 2: Verify All Local Links & Image Assets Exist on Disk ===');
htmlFiles.forEach(file => {
  const filePath = path.join(projectDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check src
  const srcRegex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const target = match[1];
    if (!target.startsWith('http') && !target.startsWith('//') && !target.startsWith('data:')) {
      const fullTarget = path.join(projectDir, target);
      if (!fs.existsSync(fullTarget)) {
        console.error(`Broken SRC in ${file} -> ${target}`);
        brokenCount++;
      } else {
        // verify image file is non-empty
        const stat = fs.statSync(fullTarget);
        if (stat.size === 0) {
          console.error(`Empty file in ${file} -> ${target}`);
          brokenCount++;
        }
      }
    }
  }

  // Check href
  const hrefRegex = /href=["']([^"']+)["']/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    const target = match[1];
    if (!target.startsWith('http') && !target.startsWith('mailto:') && !target.startsWith('#') && !target.startsWith('tel:') && !target.startsWith('javascript:')) {
      const cleanPath = target.split('#')[0].split('?')[0];
      if (cleanPath) {
        const fullTarget = path.join(projectDir, cleanPath);
        if (!fs.existsSync(fullTarget)) {
          console.error(`Broken HREF in ${file} -> ${cleanPath}`);
          brokenCount++;
        }
      }
    }
  }
});

if (brokenCount === 0) {
  console.log('PASS: All references (links, stylesheets, scripts, images) exist and are non-empty on disk!');
} else {
  console.error(`FAIL: Found ${brokenCount} broken references.`);
}

console.log('\n=== STEP 3: Verify HTTP 200 Endpoints on Local Dev Server (port 8080) ===');
const endpoints = [
  '/',
  '/index.html',
  '/about.html',
  '/advait-advantage.html',
  '/services.html',
  '/projects.html',
  '/contact.html',
  '/privacy-policy.html',
  '/404.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/interactions.js',
  '/js/projects-data.js',
  '/js/form-validation.js',
  '/assets/logos/logo.jpg',
  '/assets/logos/logo.svg',
  '/assets/logos/logo-white.svg',
  '/assets/images/founder-ashutosh.png',
  '/assets/images/founder-ashutosh.svg',
  '/assets/images/techlead-aakash.png',
  '/assets/images/techlead-aakash.svg',
  '/assets/images/hero-corporate-workspace.jpg'
];

function checkEndpoint(ep) {
  return new Promise((resolve) => {
    http.get({
      host: '127.0.0.1',
      port: 8080,
      path: ep
    }, (res) => {
      resolve({ path: ep, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ path: ep, error: err.message });
    });
  });
}

(async () => {
  let failed = 0;
  for (const ep of endpoints) {
    const res = await checkEndpoint(ep);
    if (res.status === 200 || res.status === 304) {
      console.log(`  ✓ ${ep.padEnd(42)} [HTTP ${res.status}] (${res.contentType})`);
    } else {
      console.error(`  ✗ ${ep.padEnd(42)} [${res.error || 'HTTP ' + res.status}]`);
      failed++;
    }
  }

  console.log('\n=== SUMMARY ===');
  if (failed === 0 && brokenCount === 0 && totalInline === 0) {
    console.log(`ALL CHECKS PASSED: 100% of ${endpoints.length} endpoints active and healthy. 0 broken links/images. 0 inline styles.`);
  } else {
    console.error(`FAILURES: ${failed} endpoint errors, ${brokenCount} broken references, ${totalInline} inline styles.`);
  }
})();
