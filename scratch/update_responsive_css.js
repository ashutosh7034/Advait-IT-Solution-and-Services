const fs = require('fs');

const respPath = 'css/responsive.css';
let resp = fs.readFileSync(respPath, 'utf8');

const oldBlock = `/* Leadership Responsive Adjustments (3-Column to 1-Column) */
@media (max-width: 992px) {
  .advait-leadership-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 580px;
    margin: 0 auto;
  }
}`;

const newBlock = `/* Leadership Responsive Adjustments (Org Chart Tree & Grid) */
@media (max-width: 1024px) {
  .advait-org-connector {
    display: none;
  }
  .advait-org-tier-top {
    margin-bottom: 24px;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
  .advait-org-tier-top .advait-leader-card {
    width: 100%;
    max-width: 100%;
  }
  .advait-org-tier-bottom {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
  }
  .advait-leadership-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 580px;
    margin: 0 auto;
  }
}`;

if (resp.includes('.advait-org-connector')) {
  console.log('responsive.css already has org connector rules');
} else {
  // Normalize line endings for replacement
  const normalizedResp = resp.replace(/\r\n/g, '\n');
  const normalizedOld = oldBlock.replace(/\r\n/g, '\n');
  if (normalizedResp.includes(normalizedOld)) {
    const updated = normalizedResp.replace(normalizedOld, newBlock);
    // write back with CRLF if original had CRLF
    const hasCRLF = resp.includes('\r\n');
    fs.writeFileSync(respPath, hasCRLF ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
    console.log('responsive.css updated successfully!');
  } else {
    console.error('Could not find oldBlock in responsive.css');
  }
}

