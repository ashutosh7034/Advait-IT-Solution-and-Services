const { execSync } = require('child_process');
const http = require('http');

// Let's test evaluating projects-data.js in Node or with JSDOM or running chrome with console output
try {
  // Let's check js/projects-data.js syntax
  const js = require('fs').readFileSync('js/projects-data.js', 'utf8');
  new Function(js);
  console.log('✓ js/projects-data.js syntax is valid');
} catch (e) {
  console.error('❌ Syntax error in js/projects-data.js:', e);
}

