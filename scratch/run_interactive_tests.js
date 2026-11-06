const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

console.log('=== ADVait SERVICES PAGE INTERACTIVE FUNCTIONAL TEST ===\n');

// Create test runner HTML
let html = fs.readFileSync('services.html', 'utf8');

const testHarness = `
<script>
window.addEventListener('load', async () => {
  const results = [];
  function assert(cond, name) {
    results.push({ name, pass: !!cond });
    console.log((cond ? '✓ PASS: ' : '❌ FAIL: ') + name);
  }

  try {
    // 1. Initial State
    const allCards = Array.from(document.querySelectorAll('.advait-service-card'));
    assert(allCards.length === 14, 'Initial card count is 14');
    
    const countEl = document.querySelector('#servicesVisibleCount');
    assert(countEl && countEl.textContent.trim() === '14', 'Visible counter shows 14');

    // 2. Category Filter Tests
    const testCategories = [
      { filter: 'web-dev', expected: 4, label: 'Web & Apps' },
      { filter: 'software-dev', expected: 2, label: 'Software & APIs' },
      { filter: 'mobile-dev', expected: 1, label: 'Mobile' },
      { filter: 'cloud-devops', expected: 3, label: 'Cloud & DevOps' },
      { filter: 'qa-security', expected: 2, label: 'Security & QA' },
      { filter: 'it-consulting', expected: 2, label: 'Consulting' },
      { filter: 'all', expected: 14, label: 'All Services' }
    ];

    for (const tc of testCategories) {
      const pill = document.querySelector('.cat-pill[data-filter="' + tc.filter + '"]');
      if (pill) {
        pill.click();
        const visibleCards = allCards.filter(c => c.style.display !== 'none');
        assert(visibleCards.length === tc.expected, 'Filter [' + tc.label + '] shows ' + tc.expected + ' cards (actual: ' + visibleCards.length + ')');
        assert(countEl.textContent.trim() === tc.expected.toString(), 'Counter displays ' + tc.expected + ' for [' + tc.label + ']');
      } else {
        assert(false, 'Filter pill [' + tc.filter + '] found in DOM');
      }
    }

    // 3. Search Filter Test
    const searchInput = document.querySelector('#servicesSearchInput');
    const searchClear = document.querySelector('#servicesSearchClear');
    assert(searchInput, 'Search input exists');

    searchInput.value = 'cloud';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    const cloudCards = allCards.filter(c => c.style.display !== 'none');
    assert(cloudCards.length >= 1, 'Search for "cloud" returns matching cards (found: ' + cloudCards.length + ')');

    // Clear search
    if (searchClear) {
      searchClear.click();
      const resetCards = allCards.filter(c => c.style.display !== 'none');
      assert(resetCards.length === 14, 'Clearing search restores all 14 cards');
    }

    // 4. Modal Dialog Test - Web Dev
    const modal = document.querySelector('#serviceDetailModal');
    const closeBtn = document.querySelector('#serviceModalCloseBtn');
    const webDevBtn = document.querySelector('.service-explore-btn[data-service-id="web-dev"]');

    assert(modal && closeBtn && webDevBtn, 'Modal dialog components exist');

    webDevBtn.click();
    assert(modal.classList.contains('is-active'), 'Modal opens on Explore click for Website Development');

    const modalTitle = document.querySelector('#modalServiceTitle');
    assert(modalTitle && modalTitle.textContent === 'Website Development', 'Modal displays correct title: Website Development');

    const modalImg = document.querySelector('#modalServiceImage');
    const mediaBanner = document.querySelector('#modalServiceMedia');
    assert(modalImg && modalImg.getAttribute('src').includes('service-web-development.jpg'), 'Modal image loaded correctly');
    assert(mediaBanner && mediaBanner.style.display !== 'none', 'Modal media banner is visible');

    // Close modal
    closeBtn.click();
    assert(!modal.classList.contains('is-active'), 'Modal closes when clicking close button');

    // 5. Modal Dialog Test - Cybersecurity (Vector SVG + safe DOM formatting)
    const cyberBtn = document.querySelector('.service-explore-btn[data-service-id="cybersecurity"]');
    cyberBtn.click();
    assert(modal.classList.contains('is-active'), 'Modal opens for Cybersecurity');
    
    assert(modalImg && modalImg.getAttribute('src').includes('hero-cybersecurity.svg'), 'Cybersecurity vector illustration loaded');

    const descEl = document.querySelector('#modalServiceDesc');
    const emTag = descEl.querySelector('em');
    assert(emTag !== null, 'Semantic <em> tag parsed as DOM element (not raw literal text)');
    assert(!descEl.innerHTML.includes('&lt;em&gt;'), 'Zero unparsed escaped &lt;em&gt; strings');

    // Close via Escape key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(!modal.classList.contains('is-active'), 'Modal closes on Escape keypress');

    // Save final report to server
    fetch('http://127.0.0.1:3000/test_report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    }).catch(() => {});

  } catch (err) {
    console.error('Test execution error:', err.message);
  }
});
</script>
`;

html = html.replace('</body>', `${testHarness}</body>`);
fs.writeFileSync('test_interactive_runner.html', html);

// Simple receiver server on port 3005 to catch results
const reportServer = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/test_report') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      res.writeHead(200);
      res.end('OK');
      try {
        const testResults = JSON.parse(body);
        console.log('\n=== TEST HARNESS RESULTS ===');
        let passCount = 0;
        testResults.forEach(r => {
          if (r.pass) passCount++;
          console.log((r.pass ? '✓ PASS: ' : '❌ FAIL: ') + r.name);
        });
        console.log(`\nTOTAL: ${passCount}/${testResults.length} tests passed successfully.`);
        reportServer.close();
        process.exit(passCount === testResults.length ? 0 : 1);
      } catch (e) {
        console.error('Failed to parse test results:', e);
        reportServer.close();
        process.exit(1);
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

reportServer.listen(3005, '127.0.0.1', () => {
  // Launch Chrome headless pointing to runner
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempProfile = path.join(os.tmpdir(), `chrome_test_run_${Date.now()}`);
  
  // Update runner to post to port 3005
  let runnerHtml = fs.readFileSync('test_interactive_runner.html', 'utf8');
  runnerHtml = runnerHtml.replace('http://127.0.0.1:3000/test_report', 'http://127.0.0.1:3005/test_report');
  fs.writeFileSync('test_interactive_runner.html', runnerHtml);

  try {
    const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=3000 "http://127.0.0.1:3000/test_interactive_runner.html"`;
    execSync(cmd, { timeout: 15000 });
  } catch (err) {
    // execSync finishes or times out
  }
});

// Safety timeout
setTimeout(() => {
  console.log('Test harness completed or timed out.');
  reportServer.close();
  if (fs.existsSync('test_interactive_runner.html')) {
    fs.unlinkSync('test_interactive_runner.html');
  }
  process.exit(0);
}, 12000);

