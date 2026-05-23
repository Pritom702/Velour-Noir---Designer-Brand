const https = require('https');

function download(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data+=c);
      res.on('end', () => resolve(data));
    });
  });
}

function searchWikimedia(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const resJson = JSON.parse(data);
          let title = resJson.query.search[0]?.title;
          if(title) {
            https.get(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r2 => {
              let d2 = '';
              r2.on('data', c => d2 += c);
              r2.on('end', () => {
                try {
                  const pages = JSON.parse(d2).query.pages;
                  const page = Object.values(pages)[0];
                  if(page.imageinfo) resolve(page.imageinfo[0].url);
                  else resolve(null);
                } catch(e) { resolve(null); }
              });
            });
          } else { resolve(null); }
        } catch(e) { resolve(null); }
      });
    });
  });
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
    "Wood Sage & Sea Salt",
    "Paco Rabanne 1 Million"
  ];
  const results = {};
  for(let p of perfumes) {
    const url = await searchWikimedia(p);
    console.log(p + ": " + url);
  }
}

run();
