const fs = require('fs');

// 1. Update css/style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

const oldToolbarRule = `.projects-toolbar {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}`;

const newToolbarRule = `.projects-toolbar {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  box-sizing: border-box;
}`;

if (styleCss.includes(oldToolbarRule)) {
  styleCss = styleCss.replace(oldToolbarRule, newToolbarRule);
}

const oldFilterRailRule = `.projects-filter-rail {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}`;

const newFilterRailRule = `.projects-filter-rail {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}`;

if (styleCss.includes(oldFilterRailRule)) {
  styleCss = styleCss.replace(oldFilterRailRule, newFilterRailRule);
}

fs.writeFileSync('css/style.css', styleCss, 'utf8');
console.log('✓ Updated projects-toolbar and projects-filter-rail in css/style.css');

// 2. Update css/responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');

const oldRespRail = `  .projects-filter-rail {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 6px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }`;

const newRespRail = `  .projects-filter-rail {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 2px 4px 8px 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    box-sizing: border-box;
  }`;

if (respCss.includes(oldRespRail)) {
  respCss = respCss.replace(oldRespRail, newRespRail);
  fs.writeFileSync('css/responsive.css', respCss, 'utf8');
  console.log('✓ Updated projects-filter-rail in css/responsive.css');
} else {
  console.log('Note: oldRespRail not matched exactly, checking with regex');
  respCss = respCss.replace(/\.projects-filter-rail\s*\{[^}]*overflow-x:\s*auto;[^}]*\}/g, newRespRail);
  fs.writeFileSync('css/responsive.css', respCss, 'utf8');
  console.log('✓ Updated projects-filter-rail in css/responsive.css via regex');
}

