async function run() {
  const query = "Dior Sauvage fragrance bottle";
  const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2&first=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
  const html = await res.text();
  console.log(html.substring(20000, 25000));
  
  const m1 = html.match(/murl&quot;:&quot;([^&]+)&quot;/g);
  console.log(m1 ? m1.slice(0, 3) : "no murl");
}
run();
