const fs = require('fs');

const jsFiles = ['js/main.js', 'js/interactions.js', 'js/services.js', 'js/projects-data.js', 'js/form-validation.js'];

console.log('=== JAVASCRIPT DETAILED AUDIT ===\n');

jsFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const lines = code.split('\n');
  
  // Functions
  const fnMatches = code.match(/function\s+([a-zA-Z0-9_$]+)|(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g) || [];
  
  // Event listeners
  const evMatches = code.match(/addEventListener\s*\(\s*['\"]([^'\"]+)['\"]/g) || [];
  
  // Console calls
  const consoleMatches = code.match(/console\.[a-z]+\s*\([^)]*\)/g) || [];
  
  console.log(`${f} (${lines.length} lines):`);
  console.log(`  Functions declared: ${fnMatches.length}`);
  console.log(`  Event listeners attached: ${evMatches.length}`);
  console.log(`  Console statements: ${consoleMatches.length}`);
  if (consoleMatches.length > 0) {
    consoleMatches.forEach(c => console.log('    Console:', c));
  }
});

