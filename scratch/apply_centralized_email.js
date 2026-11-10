const fs = require('fs');
const path = require('path');

const root = process.cwd();

function updateFile(relPath, fn) {
  const fullPath = path.join(root, relPath);
  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = fn(original);
  if (original !== updated) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`[UPDATED] ${relPath}`);
  } else {
    console.log(`[NO CHANGE] ${relPath}`);
  }
}

// 1. Footer replacement helper
const oldFooterBlock = `            <div class="footer-contact-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>Email 1: <a href="mailto:ashutosh3276s16@gmail.com">ashutosh3276s16@gmail.com</a></span>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>Email 2: <a href="mailto:akp2756097@gmail.com">akp2756097@gmail.com</a></span>
            </div>`;

const newFooterBlock = `            <div class="footer-contact-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>Email: <a href="mailto:infoadvaitit@gmail.com">infoadvaitit@gmail.com</a></span>
            </div>`;

function replaceFooter(content) {
  // Normalize CRLF to LF for matching
  const hasCRLF = content.includes('\r\n');
  let norm = content.replace(/\r\n/g, '\n');
  const oldNorm = oldFooterBlock.replace(/\r\n/g, '\n');
  const newNorm = newFooterBlock.replace(/\r\n/g, '\n');

  if (norm.includes(oldNorm)) {
    norm = norm.replace(oldNorm, newNorm);
    return hasCRLF ? norm.replace(/\n/g, '\r\n') : norm;
  }
  return content;
}

// 1. about.html
updateFile('about.html', content => {
  let c = content;
  // Header
  c = c.replace(
    'href="mailto:ashutosh3276s16@gmail.com" title="Email Us"',
    'href="mailto:infoadvaitit@gmail.com" title="Email Us"'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\n            </a>',
    'infoadvaitit@gmail.com\n            </a>'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\r\n            </a>',
    'infoadvaitit@gmail.com\r\n            </a>'
  );
  // Mandal card
  c = c.replace(
    'href="mailto:janishm@gmail.com" class="advait-social-pill advait-contact-pill" aria-label="Email Mr. Jayinish Kumar Mandal: janishm@gmail.com"',
    'href="mailto:infoadvaitit@gmail.com" class="advait-social-pill advait-contact-pill" aria-label="Email Advait IT Solutions: infoadvaitit@gmail.com"'
  );
  c = c.replace(
    '<span>janishm@gmail.com</span>',
    '<span>infoadvaitit@gmail.com</span>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 2. advait-advantage.html
updateFile('advait-advantage.html', content => {
  let c = content;
  // Header
  c = c.replace(
    'href="mailto:ashutosh3276s16@gmail.com" title="Email Us"',
    'href="mailto:infoadvaitit@gmail.com" title="Email Us"'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\n            </a>',
    'infoadvaitit@gmail.com\n            </a>'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\r\n            </a>',
    'infoadvaitit@gmail.com\r\n            </a>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 3. contact.html
updateFile('contact.html', content => {
  let c = content;
  // Schema
  c = c.replace(
    '"email": "ashutosh3276s16@gmail.com"',
    '"email": "infoadvaitit@gmail.com"'
  );
  // Header
  c = c.replace(
    '<a href="mailto:ashutosh3276s16@gmail.com">ashutosh3276s16@gmail.com</a>',
    '<a href="mailto:infoadvaitit@gmail.com">infoadvaitit@gmail.com</a>'
  );
  // Quick connect chip
  c = c.replace(
    '<a href="mailto:ashutosh3276s16@gmail.com" class="contact-chip-item">\n              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>\n              <span>ashutosh3276s16@gmail.com</span>\n            </a>',
    '<a href="mailto:infoadvaitit@gmail.com" class="contact-chip-item">\n              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>\n              <span>infoadvaitit@gmail.com</span>\n            </a>'
  );
  // In case of CRLF
  c = c.replace(
    '<a href="mailto:ashutosh3276s16@gmail.com" class="contact-chip-item">\r\n              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>\r\n              <span>ashutosh3276s16@gmail.com</span>\r\n            </a>',
    '<a href="mailto:infoadvaitit@gmail.com" class="contact-chip-item">\r\n              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>\r\n              <span>infoadvaitit@gmail.com</span>\r\n            </a>'
  );

  // Email Direct Sidebar Card: Consolidate the two boxes into one official box
  const oldSidebarBoxes = `              <div class="email-display-box email-box-first">
                <a href="mailto:ashutosh3276s16@gmail.com" class="email-display-link">
                  ashutosh3276s16@gmail.com
                </a>
              </div>
              <div class="email-display-box mb-3">
                <a href="mailto:akp2756097@gmail.com" class="email-display-link">
                  akp2756097@gmail.com
                </a>
              </div>
              <a href="mailto:ashutosh3276s16@gmail.com?subject=New%20Project%20Inquiry%20-%20Advait%20IT%20Solutions" class="btn btn-secondary btn-sm w-100">
                Open in Email Client &rarr;
              </a>`;

  const newSidebarBoxes = `              <div class="email-display-box mb-3">
                <a href="mailto:infoadvaitit@gmail.com" class="email-display-link">
                  infoadvaitit@gmail.com
                </a>
              </div>
              <a href="mailto:infoadvaitit@gmail.com?subject=New%20Project%20Inquiry%20-%20Advait%20IT%20Solutions" class="btn btn-secondary btn-sm w-100">
                Open in Email Client &rarr;
              </a>`;

  const normC = c.replace(/\r\n/g, '\n');
  const normOldBoxes = oldSidebarBoxes.replace(/\r\n/g, '\n');
  const normNewBoxes = newSidebarBoxes.replace(/\r\n/g, '\n');

  if (normC.includes(normOldBoxes)) {
    c = normC.replace(normOldBoxes, normNewBoxes);
  }

  // Footer
  c = replaceFooter(c);
  return c;
});

// 4. index.html
updateFile('index.html', content => {
  let c = content;
  // Schema organization email
  c = c.replace(
    '"email": "ashutosh3276s16@gmail.com"',
    '"email": "infoadvaitit@gmail.com"'
  );
  // Schema remove janishm email
  c = c.replace(
    '            "email": "janishm@gmail.com"\n          },',
    '          },'
  );
  c = c.replace(
    '            "email": "janishm@gmail.com"\r\n          },',
    '          },'
  );
  // Header
  c = c.replace(
    'href="mailto:ashutosh3276s16@gmail.com" title="Email Us"',
    'href="mailto:infoadvaitit@gmail.com" title="Email Us"'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\n            </a>',
    'infoadvaitit@gmail.com\n            </a>'
  );
  c = c.replace(
    'ashutosh3276s16@gmail.com\r\n            </a>',
    'infoadvaitit@gmail.com\r\n            </a>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 5. privacy-policy.html
updateFile('privacy-policy.html', content => {
  let c = content;
  c = c.replace('<code>ashutosh3276s16@gmail.com</code>', '<code>infoadvaitit@gmail.com</code>');
  c = c.replace('<strong>ashutosh3276s16@gmail.com</strong>', '<strong>infoadvaitit@gmail.com</strong>');
  c = c.replace(
    'Email: <a href="mailto:ashutosh3276s16@gmail.com" class="link-primary">ashutosh3276s16@gmail.com</a>',
    'Email: <a href="mailto:infoadvaitit@gmail.com" class="link-primary">infoadvaitit@gmail.com</a>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 6. projects.html
updateFile('projects.html', content => {
  let c = content;
  // Header
  c = c.replace(
    '<a href="mailto:ashutosh3276s16@gmail.com">ashutosh3276s16@gmail.com</a>',
    '<a href="mailto:infoadvaitit@gmail.com">infoadvaitit@gmail.com</a>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 7. services.html
updateFile('services.html', content => {
  let c = content;
  // Header
  c = c.replace(
    '<a href="mailto:ashutosh3276s16@gmail.com">ashutosh3276s16@gmail.com</a>',
    '<a href="mailto:infoadvaitit@gmail.com">infoadvaitit@gmail.com</a>'
  );
  // Footer
  c = replaceFooter(c);
  return c;
});

// 8. js/form-validation.js
updateFile('js/form-validation.js', content => {
  return content.replace(
    'mailto:ashutosh3276s16@gmail.com?subject=Project Inquiry - Advait IT Solutions',
    'mailto:infoadvaitit@gmail.com?subject=Project Inquiry - Advait IT Solutions'
  );
});

// 9. scratch/test_ci.js
updateFile('scratch/test_ci.js', content => {
  let c = content;
  c = c.replace(
    "assert(content.includes('ashutosh3276s16@gmail.com'), `[${file}] Contains primary email (ashutosh3276s16@gmail.com)`);\n    assert(content.includes('akp2756097@gmail.com'), `[${file}] Contains secondary email (akp2756097@gmail.com)`);",
    "assert(content.includes('infoadvaitit@gmail.com'), `[${file}] Contains official company email (infoadvaitit@gmail.com)`);\n    assert(!content.includes('ashutosh3276s16@gmail.com'), `[${file}] Free of personal email (ashutosh3276s16@gmail.com)`);\n    assert(!content.includes('akp2756097@gmail.com'), `[${file}] Free of personal email (akp2756097@gmail.com)`);\n    assert(!content.includes('janishm@gmail.com'), `[${file}] Free of personal email (janishm@gmail.com)`);"
  );
  c = c.replace(
    "assert(content.includes('ashutosh3276s16@gmail.com'), `[${file}] Contains primary email (ashutosh3276s16@gmail.com)`);\r\n    assert(content.includes('akp2756097@gmail.com'), `[${file}] Contains secondary email (akp2756097@gmail.com)`);",
    "assert(content.includes('infoadvaitit@gmail.com'), `[${file}] Contains official company email (infoadvaitit@gmail.com)`);\r\n    assert(!content.includes('ashutosh3276s16@gmail.com'), `[${file}] Free of personal email (ashutosh3276s16@gmail.com)`);\r\n    assert(!content.includes('akp2756097@gmail.com'), `[${file}] Free of personal email (akp2756097@gmail.com)`);\r\n    assert(!content.includes('janishm@gmail.com'), `[${file}] Free of personal email (janishm@gmail.com)`);"
  );
  return c;
});

console.log('\nCentralized email replacement script complete.');

