const fs = require('fs');

// Create mock browser DOM environment
global.document = {
  addEventListener: (event, cb) => cb(),
  querySelector: (sel) => {
    return {
      innerHTML: '',
      querySelectorAll: () => [],
      addEventListener: () => {},
      appendChild: () => {},
      setAttribute: () => {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      style: {}
    };
  },
  querySelectorAll: () => [],
  createElement: () => ({
    setAttribute: () => {},
    classList: { add: () => {}, remove: () => {} },
    innerHTML: '',
    appendChild: () => {},
    querySelector: () => ({ addEventListener: () => {} }),
    querySelectorAll: () => []
  }),
  body: {
    appendChild: () => {},
    style: {}
  }
};
global.window = {
  addEventListener: () => {},
  location: { pathname: '/projects.html', hash: '', search: '' },
  matchMedia: () => ({ matches: false })
};

try {
  // Load projects-data.js
  const code = fs.readFileSync('js/projects-data.js', 'utf8');
  eval(code);
  console.log('PASS: js/projects-data.js executed with 0 syntax or runtime errors!');
  console.log('Total projects loaded:', ADVAIT_PROJECTS.length);
} catch (err) {
  console.error('FAIL: Error executing projects-data.js:', err);
  process.exit(1);
}
