const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  req.on('error', (err) => {
    console.error('Request error:', err.message);
  });
  res.on('error', (err) => {
    console.error('Response error:', err.message);
  });

  try {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(process.cwd(), reqPath);
    
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      const notFound = fs.existsSync('404.html') ? fs.readFileSync('404.html') : '404 Not Found';
      res.end(notFound);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error('Stream error:', err.message);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
    stream.pipe(res);
  } catch (err) {
    console.error('Server handling error:', err.message);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});

server.on('error', (err) => {
  console.error('Server socket error:', err.message);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Advait Local Development Server running at http://127.0.0.1:3000');
});

