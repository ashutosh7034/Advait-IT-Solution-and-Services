const fs = require('fs');

const stylePath = 'css/style.css';
let style = fs.readFileSync(stylePath, 'utf8');

// Org chart CSS rules to insert
const orgChartCss = `/* Executive Leadership Hierarchy (Founder-Led Org Chart) */
.advait-org-chart {
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
}

.advait-org-tier-top {
  display: flex;
  justify-content: center;
  width: 100%;
}

.advait-org-tier-top .advait-leader-card {
  width: 524px;
  max-width: 100%;
}

.advait-org-connector {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  margin: 0 auto;
}

.advait-org-stem {
  width: 2px;
  height: 28px;
  background: #BFDBFE;
}

.advait-org-branch {
  width: 556px;
  max-width: 100%;
  height: 24px;
  border-top: 2px solid #BFDBFE;
  border-left: 2px solid #BFDBFE;
  border-right: 2px solid #BFDBFE;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.advait-org-tier-bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 524px));
  justify-content: center;
  gap: 32px;
  max-width: 1080px;
  margin: 0 auto;
  align-items: stretch;
  width: 100%;
}

.advait-org-tier-bottom .advait-leader-card {
  width: 100%;
  height: 100%;
}

.advait-leadership-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;
}`;

if (!style.includes('.advait-org-chart')) {
  style = style.replace('.advait-leadership-grid {', orgChartCss.replace('.advait-leadership-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n  align-items: stretch;\n}', '') + '\n.advait-leadership-grid {');
  fs.writeFileSync(stylePath, style, 'utf8');
  console.log('style.css updated successfully!');
} else {
  console.log('style.css already contains .advait-org-chart');
}

