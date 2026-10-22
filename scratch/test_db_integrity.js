const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('js/projects-data.js', 'utf8');
const match = content.match(/const ADVAIT_PROJECTS = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('FAIL: Could not extract ADVAIT_PROJECTS');
  process.exit(1);
}

const projects = eval(match[1]);
console.log(`Auditing ${projects.length} portfolio project records in ADVAIT_PROJECTS:`);

const ids = new Set();
let errors = 0;
const allowedCategories = ['business-software', 'web-apps', 'websites', 'other-it'];

projects.forEach((p, idx) => {
  // Check ID
  if (!p.id || ids.has(p.id)) {
    console.error(`Record ${idx}: Invalid or duplicate ID '${p.id}'`);
    errors++;
  }
  ids.add(p.id);

  // Check required strings
  ['title', 'category', 'categoryLabel', 'status', 'summary', 'fullDescription', 'clientType', 'image'].forEach(field => {
    if (!p[field] || typeof p[field] !== 'string') {
      console.error(`Record ${p.id}: Missing or invalid field '${field}'`);
      errors++;
    }
  });

  // Check category
  if (!allowedCategories.includes(p.category)) {
    console.error(`Record ${p.id}: Unknown category '${p.category}'`);
    errors++;
  }

  // Check arrays
  if (!Array.isArray(p.techStack) || p.techStack.length === 0) {
    console.error(`Record ${p.id}: Missing techStack array`);
    errors++;
  }
  if (!Array.isArray(p.highlights) || p.highlights.length === 0) {
    console.error(`Record ${p.id}: Missing highlights array`);
    errors++;
  }

  // Check image on disk
  if (!fs.existsSync(p.image)) {
    console.error(`Record ${p.id}: Broken image file on disk -> ${p.image}`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`PASS: All ${projects.length} project records passed data integrity checks with 0 errors!`);
} else {
  console.error(`FAIL: Found ${errors} data integrity errors.`);
  process.exit(1);
}
