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

async function check() {
  const css = await fetchUrl('https://advaititsolutions.com/css/style.css');
  console.log('CSS Status:', css.status);
  console.log('CSS Last-Modified:', css.headers['last-modified']);
  console.log('CSS ETag:', css.headers['etag']);
  console.log('CSS Age:', css.headers['age']);
  console.log('CSS Cache-Control:', css.headers['cache-control']);

  const about = await fetchUrl('https://advaititsolutions.com/about.html');
  const cardStart = about.body.indexOf('id="md-profile"');
  if (cardStart !== -1) {
    const cardSnippet = about.body.substring(cardStart - 100, cardStart + 1200);
    console.log('\n--- LIVE MD-PROFILE HTML ON GITHUB PAGES ---');
    console.log(cardSnippet);
  } else {
    console.log('md-profile not found');
  }
}

check();

