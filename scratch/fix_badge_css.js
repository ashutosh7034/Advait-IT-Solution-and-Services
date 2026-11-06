const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Clean up earlier rule at ~1637
const oldBadge1 = `.project-badge-category {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-navy);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}`;

const cleanBadgeRule = `.project-badge-category {
  position: absolute;
  top: 12px;
  left: 12px;
  bottom: auto;
  right: auto;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  color: var(--color-navy);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  line-height: 1.2;
  z-index: 2;
}`;

if (css.includes(oldBadge1)) {
  css = css.replace(oldBadge1, cleanBadgeRule);
}

// Clean up second rule if present
const oldBadge2Regex = /\.project-badge-category\s*\{[^}]*bottom:\s*auto[^}]*\}/;
// If not having bottom: auto, replace the one at the end of file
css = css.replace(/\.project-badge-category\s*\{[^}]*\}/g, cleanBadgeRule);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✓ Cleaned up .project-badge-category in css/style.css');

