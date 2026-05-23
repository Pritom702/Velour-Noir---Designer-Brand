const https = require('https');

function downloadHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         return resolve(downloadHtml(res.headers.location));
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function searchFragrantica(query) {
  const q = encodeURIComponent(`site:fragrantica.com ${query}`);
  const html = await downloadHtml(`https://html.duckduckgo.com/html/?q=${q}`);
  const match = html.match(/href="([^"]+fragrantica\.com\/perfume\/[^"]+)"/);
  if (match) {
    let url = match[1];
    if(url.startsWith('//')) url = 'https:' + url;
    return url;
  }
  return null;
}

async function getFragranticaImage(url) {
  const html = await downloadHtml(url);
  const match = html.match(/<img[^>]+itemprop="image"[^>]+src="([^"]+)"/i) || html.match(/<img[^>]+src="([^"]+)"[^>]+itemprop="image"/i) || html.match(/<img[^>]+src="(https:\/\/f\.notino\.com\/[^"]+)"/i) || html.match(/<img[^>]+src="(https:\/\/f\.fragrantica\.com\/images\/perfume\/[^"]+)"/i);
  if (match) {
    return match[1];
  }
  return null;
}

async function run() {
  const perfumes = [
    "Dior Sauvage",
    "YSL Y Eau de Parfum",
    "Davidoff Cool Water",
    "Versace Eros",
    "Bleu de Chanel",
    "Acqua Di Gio",
    "Creed Aventus",
    "Tom Ford Oud Wood",
    "Jo Malone Wood Sage & Sea Salt",
    "Paco Rabanne 1 Million"
  ];

  for (const p of perfumes) {
    const url = await searchFragrantica(p);
    if (!url) {
      console.log(p + ": NULL URL");
      continue;
    }
    const imgUrl = await getFragranticaImage(url);
    console.log(p + ": " + imgUrl);
  }
}

run();
