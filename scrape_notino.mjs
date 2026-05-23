async function searchMakeUp(query) {
  try {
    const res = await fetch(`https://makeup.uk/search/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const match = html.match(/<img[^>]+src="([^"]+\.jpg)"[^>]+class="[^"]*product-item__img[^"]*"/i) || 
                  html.match(/<img[^>]+class="[^"]*product-item__img[^"]*"[^>]+src="([^"]+\.jpg)"/i) || 
                  html.match(/<img[^>]+src="([^"]+)"[^>]+alt="[^"]*"/i);
    if (match) {
        let url = match[1];
        if(url.startsWith('/')) url = 'https://makeup.uk' + url;
        return url;
    }
    return null;
  } catch (e) { return null; }
}

async function run() {
  const perfumes = [
    "Dior Sauvage",
    "YSL Y Eau de Parfum",
    "Davidoff Cool Water men",
    "Versace Eros men",
    "Bleu de Chanel",
    "Acqua Di Gio",
    "Creed Aventus",
    "Tom Ford Oud Wood",
    "Jo Malone Wood Sage",
    "Paco Rabanne 1 Million"
  ];
  for(let p of perfumes) {
    const url = await searchMakeUp(p);
    console.log(p + ": " + url);
  }
}
run();
