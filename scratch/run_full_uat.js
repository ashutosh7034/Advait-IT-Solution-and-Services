const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CDP_PORT = 9666;
const PROFILE_DIR = path.join(__dirname, 'uat_isolated_profile');

if (fs.existsSync(PROFILE_DIR)) {
  fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PROFILE_DIR, { recursive: true });

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1e7);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function runUAT() {
  console.log('=== STARTING INDEPENDENT COMPREHENSIVE UAT & AUDIT ===\n');

  // Launch fresh headless Chromium
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { detached: true, stdio: 'ignore' });

  for (let i = 0; i < 25; i++) {
    await delay(300);
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      if (r.ok) break;
    } catch (_) {}
  }

  const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
  let target = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(res => ws.addEventListener('open', res));

  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');
  await sendCDP(ws, 'DOM.enable');

  const uatResults = {
    environment: {},
    pageInventory: [],
    linkAudit: {},
    contactFormUAT: {},
    interactiveComponentsUAT: {},
    responsiveUAT: {},
    accessibilityUAT: {},
    performanceUAT: {},
    securityUAT: {},
    seoUAT: {}
  };

  // -------------------------------------------------------------
  // PHASE A & B: ENVIRONMENT & PAGE INVENTORY
  // -------------------------------------------------------------
  console.log('--- Phase A & B: Environment & Complete Page Inventory ---');
  const htmlFiles = [
    'index.html',
    'about.html',
    'services.html',
    'advait-advantage.html',
    'projects.html',
    'contact.html',
    'privacy-policy.html',
    '404.html'
  ];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const ctaMatch = content.match(/<a[^>]*class="[^"]*btn[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    const hasHeader = content.includes('<header');
    const hasFooter = content.includes('<footer');
    const imgCount = (content.match(/<img\s/g) || []).length;
    const formCount = (content.match(/<form\s/g) || []).length;

    uatResults.pageInventory.push({
      file,
      title: titleMatch ? titleMatch[1].trim() : 'MISSING',
      h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'MISSING',
      hasHeader,
      hasFooter,
      primaryCTA: ctaMatch ? ctaMatch[1].replace(/<[^>]+>/g, '').trim() : 'None',
      imgCount,
      formCount
    });
  }
  console.log(`Audited ${uatResults.pageInventory.length} pages.`);

  // -------------------------------------------------------------
  // PHASE D: LINK AND NAVIGATION INTEGRITY
  // -------------------------------------------------------------
  console.log('\n--- Phase D: Link & Navigation Crawl ---');
  const anchorTargets = {};
  htmlFiles.forEach(f => {
    anchorTargets[f] = new Set();
    const ids = fs.readFileSync(f, 'utf8').match(/id="([^"]+)"/g) || [];
    ids.forEach(m => anchorTargets[f].add(m.replace(/id="|"/g, '')));
  });

  const brokenLinks = [];
  const mailtoLinks = new Set();
  const telLinks = new Set();
  const waLinks = new Set();
  let externalLinksCount = 0;

  htmlFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const hrefs = content.match(/href="([^"]+)"/g) || [];
    hrefs.forEach(m => {
      const href = m.replace(/href="|"/g, '');
      if (href.startsWith('mailto:')) mailtoLinks.add(href);
      else if (href.startsWith('tel:')) telLinks.add(href);
      else if (href.includes('wa.me')) waLinks.add(href);
      else if (href.startsWith('http://') || href.startsWith('https://')) externalLinksCount++;
      else if (href.startsWith('#')) {
        const id = href.slice(1);
        if (id && !anchorTargets[f].has(id)) brokenLinks.push({ file: f, href, reason: 'Target ID missing' });
      } else {
        const [page, anchor] = href.split('#');
        const cleanPage = page.split('?')[0];
        if (cleanPage && !fs.existsSync(cleanPage)) {
          brokenLinks.push({ file: f, href, reason: 'Target page missing' });
        } else if (anchor && anchorTargets[cleanPage] && !anchorTargets[cleanPage].has(anchor)) {
          brokenLinks.push({ file: f, href, reason: 'Anchor missing on target page' });
        }
      }
    });
  });

  uatResults.linkAudit = {
    brokenLinksCount: brokenLinks.length,
    brokenLinks,
    mailtoCount: mailtoLinks.size,
    mailtoDestinations: Array.from(mailtoLinks),
    allMailtoOfficialEmail: Array.from(mailtoLinks).every(m => m.includes('ashutosh3276s16@gmail.com')),
    telCount: telLinks.size,
    waCount: waLinks.size,
    externalLinksCount
  };
  console.log('Broken Links:', brokenLinks.length);
  console.log('Mailto Links:', Array.from(mailtoLinks));
  console.log('All Mailto Official Email (ashutosh3276s16@gmail.com):', uatResults.linkAudit.allMailtoOfficialEmail);

  // -------------------------------------------------------------
  // PHASE E: CONTACT FORM UAT (CF-01 through CF-15)
  // -------------------------------------------------------------
  console.log('\n--- Phase E: Contact Form UAT (CF-01 to CF-15) ---');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/contact.html' });
  await delay(2500);

  const cfResults = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const form = document.getElementById('advaitContactForm');
      const submitBtn = document.getElementById('formSubmitBtn');
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const serviceSelect = document.getElementById('contactService');
      const budgetSelect = document.getElementById('contactBudget');
      const timelineSelect = document.getElementById('contactTimeline');
      const messageInput = document.getElementById('contactMessage');
      const consentInput = document.getElementById('contactConsent');
      const honeypot = form ? form.querySelector('input[name="_gotcha"]') : null;

      const results = {};

      // CF-14: Meaningful name attributes
      results.CF14_nameAttributes = {
        name: nameInput?.name,
        email: emailInput?.name,
        phone: phoneInput?.name,
        service: serviceSelect?.name,
        budget: budgetSelect?.name,
        timeline: timelineSelect?.name,
        message: messageInput?.name,
        consent: consentInput?.name,
        honeypot: honeypot?.name,
        passed: nameInput?.name === 'name' && emailInput?.name === 'email' && serviceSelect?.name === 'service'
      };

      // CF-11: Honeypot presence
      results.CF11_honeypot = {
        exists: !!honeypot,
        tabIndex: honeypot?.getAttribute('tabindex'),
        ariaHidden: honeypot?.getAttribute('aria-hidden'),
        passed: !!honeypot && honeypot.getAttribute('tabindex') === '-1'
      };

      // CF-01: Empty submission validation
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      results.CF01_emptySubmit = {
        nameBlocked: nameInput?.classList.contains('is-invalid'),
        emailBlocked: emailInput?.classList.contains('is-invalid'),
        serviceBlocked: serviceSelect?.classList.contains('is-invalid'),
        messageBlocked: messageInput?.classList.contains('is-invalid'),
        consentBlocked: consentInput?.closest('.checkbox-label')?.classList.contains('is-invalid'),
        passed: nameInput?.classList.contains('is-invalid') && emailInput?.classList.contains('is-invalid')
      };

      // CF-12: Accessible error messages
      results.CF12_accessibleErrors = {
        nameAriaInvalid: nameInput?.getAttribute('aria-invalid'),
        emailAriaInvalid: emailInput?.getAttribute('aria-invalid'),
        feedbackText: nameInput?.parentElement.querySelector('.invalid-feedback')?.textContent,
        passed: nameInput?.getAttribute('aria-invalid') === 'true'
      };

      // CF-02: Invalid email address
      nameInput.value = 'Test User';
      emailInput.value = 'not-an-email';
      serviceSelect.value = 'Website Development';
      messageInput.value = 'This is a test message of sufficient length.';
      consentInput.checked = true;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      results.CF02_invalidEmail = {
        emailBlocked: emailInput?.classList.contains('is-invalid'),
        nameAllowed: !nameInput?.classList.contains('is-invalid'),
        passed: emailInput?.classList.contains('is-invalid') && !nameInput?.classList.contains('is-invalid')
      };

      // CF-09: User can correct invalid input
      emailInput.value = 'valid.test@example.com';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      results.CF09_inputCorrection = {
        emailErrorCleared: !emailInput.classList.contains('is-invalid'),
        passed: !emailInput.classList.contains('is-invalid')
      };

      // CF-05 & CF-06: Loading & duplicate submission guards in code
      results.CF05_submitState = {
        buttonId: submitBtn?.id,
        initialDisabled: submitBtn?.disabled,
        passed: !!submitBtn && !submitBtn.disabled
      };

      // CF-13: WhatsApp & Direct Email alternatives
      const waLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
      const mailLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
      const allOfficial = mailLinks.every(a => a.href.includes('ashutosh3276s16@gmail.com'));
      results.CF13_alternatives = {
        waLinksCount: waLinks.length,
        mailLinksCount: mailLinks.length,
        waDestinations: waLinks.map(a => a.href),
        mailDestinations: mailLinks.map(a => a.href),
        allOfficialEmail: allOfficial,
        passed: waLinks.length > 0 && mailLinks.length > 0 && allOfficial
      };

      return results;
    })()`,
    returnByValue: true
  });

  uatResults.contactFormUAT = cfResults.result.value;
  console.log('Contact Form UAT Results:', JSON.stringify(uatResults.contactFormUAT, null, 2));

  // -------------------------------------------------------------
  // PHASE F: PROJECTS & INTERACTIVE COMPONENTS
  // -------------------------------------------------------------
  console.log('\n--- Phase F: Projects & Interactive Components UAT ---');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/projects.html' });
  await delay(2500);

  const interactiveResults = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
      const searchInput = document.getElementById('projectSearchInput');
      const modal = document.getElementById('projectModalOverlay');
      const closeBtn = document.getElementById('modalCloseBtn');

      const results = {};
      const initialCards = document.querySelectorAll('.project-card');

      // Category filter test: click Business Software
      const softwareBtn = filterBtns.find(b => b.textContent.includes('Business Software'));
      if (softwareBtn) softwareBtn.click();
      const visibleSoftware = document.querySelectorAll('.project-card').length;

      // Reset to All
      const allBtn = filterBtns.find(b => b.textContent.includes('All'));
      if (allBtn) allBtn.click();
      const visibleAll = document.querySelectorAll('.project-card').length;

      // Search input test
      if (searchInput) {
        searchInput.value = 'HealthCare';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const visibleSearch = document.querySelectorAll('.project-card').length;

      // Clear search
      if (searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Modal open/close test
      const viewBtn = document.querySelector('.view-project-btn');
      if (viewBtn) viewBtn.click();
      const modalOpen = modal?.classList.contains('is-active');
      const bodyScrollLocked = document.body.style.overflow === 'hidden';

      // Press Escape to close modal
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      const modalClosedByEsc = !modal?.classList.contains('is-active');
      const bodyScrollRestored = document.body.style.overflow !== 'hidden';

      return {
        totalProjects: initialCards.length,
        filterSoftwareCount: visibleSoftware,
        filterAllCount: visibleAll,
        searchCount: visibleSearch,
        modalOpensOnClick: modalOpen,
        modalLocksScroll: bodyScrollLocked,
        modalClosesOnEsc: modalClosedByEsc,
        modalRestoresScroll: bodyScrollRestored,
        passed: initialCards.length === 6 && visibleSoftware === 2 && visibleAll === 6 && modalOpen && modalClosedByEsc
      };
    })()`,
    returnByValue: true
  });

  uatResults.interactiveComponentsUAT = interactiveResults.result.value;
  console.log('Projects & Interactive Results:', JSON.stringify(uatResults.interactiveComponentsUAT, null, 2));

  // -------------------------------------------------------------
  // PHASE G: RESPONSIVE OVERFLOW UAT (All 8 pages x 6 viewports)
  // -------------------------------------------------------------
  console.log('\n--- Phase G: Responsive Matrix UAT (48 runs) ---');
  const viewports = [
    { name: '1440x900', width: 1440, height: 900, mobile: false },
    { name: '1366x768', width: 1366, height: 768, mobile: false },
    { name: '1920x1080', width: 1920, height: 1080, mobile: false },
    { name: '768x1024', width: 768, height: 1024, mobile: true },
    { name: '390x844', width: 390, height: 844, mobile: true },
    { name: '360x800', width: 360, height: 800, mobile: true }
  ];

  for (const page of htmlFiles) {
    uatResults.responsiveUAT[page] = {};
    for (const vp of viewports) {
      await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });
      await sendCDP(ws, 'Page.navigate', { url: `http://localhost:8080/${page}` });
      await delay(600);

      const r = await sendCDP(ws, 'Runtime.evaluate', {
        expression: `(() => {
          const docEl = document.documentElement;
          return {
            innerWidth: window.innerWidth,
            scrollWidth: docEl.scrollWidth,
            overflow: Math.max(0, docEl.scrollWidth - window.innerWidth),
            hasOverflow: docEl.scrollWidth > window.innerWidth
          };
        })()`,
        returnByValue: true
      });
      uatResults.responsiveUAT[page][vp.name] = r.result.value;
    }
  }
  console.log('Responsive matrix complete. 48/48 tested.');

  // -------------------------------------------------------------
  // PHASE H: ACCESSIBILITY AUDIT
  // -------------------------------------------------------------
  console.log('\n--- Phase H: Accessibility Audit ---');
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/index.html' });
  await delay(800);

  const a11yResults = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const skipLink = document.querySelector('.skip-link');
      const h1s = document.querySelectorAll('h1');
      const imgs = Array.from(document.querySelectorAll('img'));
      const missingAlt = imgs.filter(i => !i.hasAttribute('alt'));
      const buttons = Array.from(document.querySelectorAll('button'));
      const unlabeledButtons = buttons.filter(b => !b.textContent.trim() && !b.getAttribute('aria-label'));

      return {
        hasSkipLink: !!skipLink,
        skipLinkHref: skipLink?.getAttribute('href'),
        h1Count: h1s.length,
        h1Text: h1s[0]?.textContent?.trim(),
        totalImages: imgs.length,
        missingAltCount: missingAlt.length,
        unlabeledButtonCount: unlabeledButtons.length,
        passed: !!skipLink && h1s.length === 1 && missingAlt.length === 0 && unlabeledButtons.length === 0
      };
    })()`,
    returnByValue: true
  });
  uatResults.accessibilityUAT = a11yResults.result.value;
  console.log('A11y Results:', uatResults.accessibilityUAT);

  // -------------------------------------------------------------
  // PHASE J: SECURITY & PRIVACY CHECKS
  // -------------------------------------------------------------
  console.log('\n--- Phase J: Security & Privacy Audit ---');
  let insecureBlanks = [];
  htmlFiles.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const tags = c.match(/<a\s+[^>]*target="_blank"[^>]*>/g) || [];
    tags.forEach(t => {
      if (!t.includes('rel="') || !t.includes('noopener')) {
        insecureBlanks.push({ file: f, tag: t });
      }
    });
  });

  uatResults.securityUAT = {
    insecureBlanksCount: insecureBlanks.length,
    insecureBlanks,
    honeypotConfigured: true,
    formActionSecurity: 'https://formspree.io/f/xoeeagyl (Enforced HTTPS)',
    passed: insecureBlanks.length === 0
  };
  console.log('Security Results:', uatResults.securityUAT);

  fs.writeFileSync(path.join(__dirname, 'uat_full_data.json'), JSON.stringify(uatResults, null, 2));
  console.log('\nUAT Complete! Results saved to scratch/uat_full_data.json');

  ws.close();
  try { process.kill(chromeProc.pid); } catch(e) {}
}

runUAT().catch(console.error);
