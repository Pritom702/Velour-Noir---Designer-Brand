const https = require('https');

function downloadHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function run() {
  const q = encodeURIComponent(`site:fragrantica.com Dior Sauvage`);
  const html = await downloadHtml(`https://html.duckduckgo.com/html/?q=${q}`);
  console.log(html);
}

run();
