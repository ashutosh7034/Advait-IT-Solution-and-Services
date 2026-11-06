const { execSync } = require('child_process');
const fs = require('fs');

// Inspect #projectsGallery in projects.html after DOMContentLoaded
const testPageHtml = `<!DOCTYPE html>
<html>
<body>
  <iframe id="f" src="/projects.html"></iframe>
  <script>
    const f = document.getElementById('f');
    f.onload = () => {
      setTimeout(() => {
        const doc = f.contentDocument || f.contentWindow.document;
        const gallery = doc.getElementById('projectsGallery');
        console.log('Gallery exists:', !!gallery);
        if (gallery) {
          console.log('Gallery innerHTML length:', gallery.innerHTML.length);
          console.log('Cards count:', gallery.querySelectorAll('.project-card').length);
        }
      }, 500);
    };
  </script>
</body>
</html>`;

console.log(fs.readFileSync('projects.html', 'utf8').substring(5000, 7000));

