const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function checkIndex() {
  const index = await fetchUrl('https://advaititsolutions.com/index.html');
  console.log('Index Status:', index.status);
  console.log('Index Last-Modified:', index.headers['last-modified']);
  console.log('Index ETag:', index.headers['etag']);
  console.log('Index Age:', index.headers['age']);
}

checkIndex();

