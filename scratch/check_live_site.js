const https = require('https');

function checkLiveSite(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log('Fetching live site: https://advaititsolutions.com/about.html ...');
  try {
    const res = await checkLiveSite('https://advaititsolutions.com/about.html');
    console.log('Status:', res.statusCode);
    console.log('Headers:\n', JSON.stringify(res.headers, null, 2));

    // Check if Mandal's card on live site has Assistant Professor or MCSA
    const hasAssistantProfessor = res.body.includes('Assistant Professor');
    const hasMCSA = res.body.includes('MCSA Certified');
    const has11Years = res.body.includes('11 Years Project Management');
    const hasJayinish = res.body.includes('Jayinish');

    console.log('\n--- LIVE SITE CONTENT CHECK ---');
    console.log('Contains Jayinish:', hasJayinish);
    console.log('Contains "Assistant Professor":', hasAssistantProfessor);
    console.log('Contains "MCSA Certified":', hasMCSA);
    console.log('Contains "11 Years Project Management":', has11Years);

    // Look for git commit or etag
    console.log('ETag:', res.headers['etag']);
    console.log('Last-Modified:', res.headers['last-modified']);
    console.log('Age:', res.headers['age']);
    console.log('Cache-Control:', res.headers['cache-control']);
    console.log('Server:', res.headers['server']);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

run();

