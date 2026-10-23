const fs = require('fs');
const path = require('path');

const brain = 'C:\\Users\\pande\\.gemini\\antigravity-ide\\brain\\be6c81dc-07a2-4514-a167-3e0a05ba1a1a';
const dest = path.join(__dirname, '..', 'assets', 'images');

const map = {
  hero_corporate_workspace: 'hero-corporate-workspace.jpg',
  service_web_development: 'service-web-development.jpg',
  service_app_development: 'service-app-development.jpg',
  service_custom_software: 'service-custom-software.jpg',
  service_cloud_devops: 'service-cloud-devops.jpg',
  service_qa_security: 'service-qa-security.jpg',
  service_maintenance: 'service-maintenance.jpg',
  about_corporate_team: 'about-corporate-team.jpg'
};

const brainFiles = fs.readdirSync(brain);

for (const [prefix, targetName] of Object.entries(map)) {
  const match = brainFiles.find(f => f.startsWith(prefix) && f.endsWith('.jpg'));
  if (match) {
    const srcPath = path.join(brain, match);
    const dstPath = path.join(dest, targetName);
    fs.copyFileSync(srcPath, dstPath);
    console.log('Copied ' + match + ' -> ' + targetName + ' (' + fs.statSync(dstPath).size + ' bytes)');
  } else {
    console.warn('Could not find file with prefix ' + prefix);
  }
}
