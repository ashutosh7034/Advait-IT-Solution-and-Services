const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CDP_PORT = 9333;
const PROFILE_DIR = path.join(__dirname, 'isolated_qa_profile');

// Ensure clean profile directory
if (fs.existsSync(PROFILE_DIR)) {
  fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PROFILE_DIR, { recursive: true });

async function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 10000000);
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startChrome() {
  console.log(`Starting isolated Chrome on port ${CDP_PORT}...`);
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-extensions',
    'about:blank'
  ], { detached: true, stdio: 'ignore' });

  // Wait for CDP to respond
  for (let i = 0; i < 20; i++) {
    await delay(300);
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      if (res.ok) {
        console.log('Chrome CDP is up and responding.');
        return chromeProc;
      }
    } catch (e) {
      // keep polling
    }
  }
  throw new Error('Chrome failed to start or respond on port ' + CDP_PORT);
}

async function runComprehensiveQA() {
  const chromeProc = await startChrome();

  const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
  let target = list.find(t => t.type === 'page');
  if (!target) {
    target = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`)).json();
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(res => ws.addEventListener('open', res));
  console.log('Connected to target WebSocket.');

  await sendCDP(ws, 'Page.enable');
  await sendCDP(ws, 'Runtime.enable');
  await sendCDP(ws, 'DOM.enable');
  await sendCDP(ws, 'Log.enable');

  const consoleLogs = [];
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push({ type: msg.params.type, args: msg.params.args.map(a => a.value || a.description) });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleLogs.push({ type: 'error', exception: msg.params.exceptionDetails });
    }
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900, mobile: false },
    { name: '1366x768', width: 1366, height: 768, mobile: false },
    { name: '1920x1080', width: 1920, height: 1080, mobile: false },
    { name: '768x1024', width: 768, height: 1024, mobile: true },
    { name: '390x844', width: 390, height: 844, mobile: true },
    { name: '360x800', width: 360, height: 800, mobile: true }
  ];

  const pages = [
    'index.html',
    'about.html',
    'services.html',
    'advait-advantage.html',
    'projects.html',
    'contact.html',
    'privacy-policy.html',
    '404.html'
  ];

  const qaReport = {
    browserEnvironment: {},
    pageVerification: {},
    homepageDeepInspection: {},
    responsiveMatrix: {},
    functionalTests: {},
    consoleErrors: []
  };

  // 1. Verify Browser Environment at 1440x900
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/index.html' });
  await delay(1200);

  const envCheck = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight
    })`,
    returnByValue: true
  });
  qaReport.browserEnvironment = envCheck.result.value;
  console.log('Browser Environment Check:', qaReport.browserEnvironment);

  // 2. Deep Homepage Inspection at 1440x900
  const homepageInspection = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const getStyle = (el, prop) => el ? window.getComputedStyle(el).getPropertyValue(prop) : null;
      const getRect = (el) => el ? el.getBoundingClientRect() : null;

      const header = document.querySelector('.site-header');
      const logo = document.querySelector('.brand-logo-img');
      const navLinks = Array.from(document.querySelectorAll('.nav-link'));
      const hero = document.querySelector('.hero-section');
      const heroGrid = document.querySelector('.hero-grid');
      const heroTitle = document.querySelector('.hero-title');
      const heroDesc = document.querySelector('.hero-description');
      const heroPhoto = document.querySelector('.hero-featured-photo');
      const heroVisual = document.querySelector('.hero-visual');
      const servicesSection = document.querySelector('section[aria-labelledby="servicesSectionTitle"]');
      const servicesGrid = document.querySelector('.services-grid');
      const serviceCards = Array.from(document.querySelectorAll('.service-card'));
      const footer = document.querySelector('.site-footer');
      const footerTop = document.querySelector('.footer-top');
      const footerCols = Array.from(document.querySelectorAll('.footer-col'));

      return {
        header: {
          height: getRect(header)?.height,
          logoWidth: getRect(logo)?.width,
          logoHeight: getRect(logo)?.height,
          logoNaturalRatio: logo ? logo.naturalWidth / logo.naturalHeight : null,
          navLinkCount: navLinks.length,
          navLinkPadding: getStyle(navLinks[0], 'padding'),
          navLinkFontSize: getStyle(navLinks[0], 'font-size')
        },
        hero: {
          width: getRect(hero)?.width,
          height: getRect(hero)?.height,
          marginLeft: getStyle(hero, 'margin-left'),
          marginRight: getStyle(hero, 'margin-right'),
          padding: getStyle(hero, 'padding'),
          titleFontSize: getStyle(heroTitle, 'font-size'),
          titleLineHeight: getStyle(heroTitle, 'line-height'),
          descFontSize: getStyle(heroDesc, 'font-size'),
          gridCols: getStyle(heroGrid, 'grid-template-columns'),
          visualWidth: getRect(heroVisual)?.width,
          visualHeight: getRect(heroVisual)?.height,
          photoNaturalWidth: heroPhoto?.naturalWidth,
          photoNaturalHeight: heroPhoto?.naturalHeight
        },
        services: {
          sectionPadding: getStyle(servicesSection, 'padding'),
          gridWidth: getRect(servicesGrid)?.width,
          gridCols: getStyle(servicesGrid, 'grid-template-columns'),
          cardCount: serviceCards.length,
          cardWidth: getRect(serviceCards[0])?.width,
          cardHeights: serviceCards.map(c => Math.round(c.getBoundingClientRect().height))
        },
        footer: {
          height: getRect(footer)?.height,
          colsCount: footerCols.length,
          gridTemplateCols: getStyle(footerTop, 'grid-template-columns')
        }
      };
    })()`,
    returnByValue: true
  });
  qaReport.homepageDeepInspection = homepageInspection.result.value;
  console.log('Homepage Deep Inspection:', qaReport.homepageDeepInspection);

  // 3. Responsive Matrix Testing Across All 8 Pages and 6 Viewports
  console.log('\nStarting Full Responsive Matrix Testing (8 pages x 6 viewports)...');
  for (const page of pages) {
    qaReport.responsiveMatrix[page] = {};
    for (const vp of viewports) {
      await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await sendCDP(ws, 'Page.navigate', { url: `http://localhost:8080/${page}` });
      await delay(800); // Wait for animations & fonts

      const metrics = await sendCDP(ws, 'Runtime.evaluate', {
        expression: `(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const container = document.querySelector('.container');
          const imgs = Array.from(document.querySelectorAll('img'));
          const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);

          return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollWidth: docEl.scrollWidth,
            bodyScrollWidth: body.scrollWidth,
            hasHorizontalOverflow: docEl.scrollWidth > window.innerWidth,
            overflowPixels: Math.max(0, docEl.scrollWidth - window.innerWidth),
            containerWidth: container ? container.getBoundingClientRect().width : null,
            totalImages: imgs.length,
            brokenImages: brokenImgs
          };
        })()`,
        returnByValue: true
      });

      const resVal = metrics.result.value;
      qaReport.responsiveMatrix[page][vp.name] = resVal;

      if (resVal.hasHorizontalOverflow) {
        console.error(`[OVERFLOW DEFECT] Page ${page} at ${vp.name}: ${resVal.overflowPixels}px overflow!`);
      }
    }
    console.log(`Completed viewports for ${page}`);
  }

  // 4. Capture Visual Artifacts (Full Page or Viewport Screenshots)
  console.log('\nCapturing QA verification screenshots...');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const page of pages) {
    await sendCDP(ws, 'Page.navigate', { url: `http://localhost:8080/${page}` });
    await delay(1000);
    const shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, `qa_${page.replace('.html', '')}_1440x900.png`), Buffer.from(shot.data, 'base64'));
  }
  // Mobile screenshots for index and contact
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  for (const page of ['index.html', 'contact.html', 'services.html']) {
    await sendCDP(ws, 'Page.navigate', { url: `http://localhost:8080/${page}` });
    await delay(1000);
    const shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, `qa_${page.replace('.html', '')}_390x844.png`), Buffer.from(shot.data, 'base64'));
  }

  // 5. Functional Testing
  console.log('\nRunning Functional In-Browser QA Tests...');
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  // A. Contact Form Validation on contact.html
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/contact.html' });
  await delay(1000);

  const contactFormTest = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const form = document.getElementById('projectInquiryForm');
      const submitBtn = form.querySelector('button[type=\"submit\"]');
      const formAction = form.getAttribute('action');
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('emailAddress');
      const service = document.getElementById('serviceCategory');

      // Attempt empty submit
      submitBtn.click();

      const nameError = document.getElementById('fullNameError')?.textContent || '';
      const emailError = document.getElementById('emailAddressError')?.textContent || '';
      const serviceError = document.getElementById('serviceCategoryError')?.textContent || '';

      return {
        formId: form.id,
        formAction,
        hasFormspreeId: formAction.includes('xoeeagyl'),
        emptySubmitBlocked: !!(nameError && emailError && serviceError),
        nameError,
        emailError,
        serviceError
      };
    })()`,
    returnByValue: true
  });
  qaReport.functionalTests.contactFormValidation = contactFormTest.result.value;

  // B. Projects Filtering and Modal on projects.html
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/projects.html' });
  await delay(1000);

  const projectsFilterTest = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const allCards = document.querySelectorAll('.project-card');
      const initialCount = allCards.length;

      // Click "Web Applications" filter
      const webAppBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.textContent.includes('Web Applications'));
      if (webAppBtn) webAppBtn.click();

      const visibleAfterFilter = Array.from(document.querySelectorAll('.project-card')).filter(c => c.style.display !== 'none').length;

      // Click first card to open modal
      const firstCard = document.querySelector('.project-card');
      firstCard?.click();

      const modal = document.getElementById('projectModal');
      const isModalOpen = modal?.classList.contains('active');

      // Close modal
      const closeBtn = document.getElementById('modalCloseBtn');
      closeBtn?.click();
      const isModalClosed = !modal?.classList.contains('active');

      return {
        initialCount,
        filterClicked: !!webAppBtn,
        visibleAfterFilter,
        modalOpened: isModalOpen,
        modalClosed: isModalClosed
      };
    })()`,
    returnByValue: true
  });
  qaReport.functionalTests.projectsFilteringAndModal = projectsFilterTest.result.value;

  // C. Mobile Navigation Toggle on index.html (at 390x844)
  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:8080/index.html' });
  await delay(1000);

  const mobileNavTest = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const hamburger = document.querySelector('.hamburger-btn');
      const navMenu = document.querySelector('.nav-menu');
      const initialOpen = navMenu.classList.contains('is-open');

      hamburger?.click();
      const openedAfterClick = navMenu.classList.contains('is-open');

      hamburger?.click();
      const closedAfterClick = !navMenu.classList.contains('is-open');

      return {
        hasHamburger: !!hamburger,
        initialOpen,
        openedAfterClick,
        closedAfterClick
      };
    })()`,
    returnByValue: true
  });
  qaReport.functionalTests.mobileNavigation = mobileNavTest.result.value;

  // D. Keyboard Skip Links across all 8 pages
  qaReport.functionalTests.skipLinks = {};
  for (const page of pages) {
    await sendCDP(ws, 'Page.navigate', { url: `http://localhost:8080/${page}` });
    await delay(500);
    const skipCheck = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const skipLink = document.querySelector('.skip-link');
        const href = skipLink?.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        return {
          hasSkipLink: !!skipLink,
          targetId: href,
          targetExists: !!target,
          targetTagName: target?.tagName
        };
      })()`,
      returnByValue: true
    });
    qaReport.functionalTests.skipLinks[page] = skipCheck.result.value;
  }

  qaReport.consoleErrors = consoleLogs;

  fs.writeFileSync(path.join(__dirname, 'qa_full_results.json'), JSON.stringify(qaReport, null, 2));
  console.log('\nAll QA tests completed. Full results saved to scratch/qa_full_results.json');

  ws.close();
  try {
    process.kill(chromeProc.pid);
  } catch (e) {}
}

runComprehensiveQA().catch(err => {
  console.error('QA Test Runner Error:', err);
  process.exit(1);
});
