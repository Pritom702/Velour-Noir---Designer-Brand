async function searchBing(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2&first=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const matches = [...html.matchAll(/murl&quot;:&quot;([^&]+)&quot;/g)];
    if(matches.length > 0) {
       for(let m of matches) {
           let url = m[1];
           if(url.includes('.jpg') || url.includes('.png')) {
               return url;
           }
       }
       return matches[0][1];
    }
  } catch(e) {}
  return "/images/placeholder.jpg";
}

async function run() {
  const perfumes = [
    "Dior Sauvage fragrance bottle white background",
    "YSL Y Eau de Parfum bottle white background",
    "Davidoff Cool Water men bottle white background",
    "Versace Eros men bottle white background",
    "Bleu de Chanel bottle white background",
    "Acqua Di Gio armani bottle white background",
    "Creed Aventus bottle white background",
    "Tom Ford Oud Wood bottle white background",
    "Jo Malone Wood Sage bottle white background",
    "Paco Rabanne 1 Million bottle edt white background"
  ];
  for(let p of perfumes) {
     const url = await searchBing(p);
     console.log(`"${p.split(' bottle')[0]}": "${url}"`);
  }
}
run();
