const https = require('https');

function download(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', c => data+=c);
      res.on('end', () => resolve(data));
    });
  });
}

async function searchUnsplash(query) {
  const q = encodeURIComponent(`"perfume" bottle ${query}`);
  const html = await download(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`);
  const match = html.match(/"regular":"([^"]+q=80&w=1080[^"]*)"/);
  if(match) return match[1];
  
  // Try fallback match
  const match2 = html.match(/(https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"]+)/);
  if (match2) return match2[1];
  
  return null;
}

async function run() {
  const perfumes = [
    "Dior Sauvage",
    "YSL Y",
    "Cool Water perfume",
    "Versace Eros perfume",
    "Bleu de Chanel",
    "Acqua Di Gio",
    "Creed Aventus",
    "Tom Ford Oud Wood",
    "Jo Malone Wood Sage",
    "Paco Rabanne 1 Million"
  ];
  for(let p of perfumes) {
    const url = await searchUnsplash(p);
    console.log(p + ": " + url);
  }
}

run();
