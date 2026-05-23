const https = require('https');

function searchImg(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' perfume fragrance bottle')}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const matches = data.match(/https?:\/\/[^"'\s]+\.(?:jpg|png|jpeg)/i);
        resolve(matches ? matches[0] : null);
      });
    }).on('error', reject);
  });
}

async function run() {
  const perfumes = [
    "paco rabanne 1 million edt",
    "dior sauvage edt",
    "jo malone wood sage and sea salt",
    "creed aventus",
    "acqua di gio edt",
    "bleu de chanel",
    "davidoff cool water edt",
    "ysl y edp",
    "versace eros",
    "tom ford oud wood"
  ];
  for (const p of perfumes) {
    const url = await searchImg(p);
    console.log(p + ":", url);
  }
}
run();
