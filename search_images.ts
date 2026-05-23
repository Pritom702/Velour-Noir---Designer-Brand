import https from 'https';

const search = (query: string) => {
  return new Promise((resolve, reject) => {
    https.get(`https://html.duckduckgo.com/html/?q=site:unsplash.com+${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        console.log(data.substring(0, 1000));
        const matches = data.match(/unsplash\.com/g);
        resolve([...new Set(matches)]);
      });
    }).on('error', reject);
  });
};

async function run() {
  console.log("RING:", await search('"diamond ring"'));
  console.log("NECKLACE:", await search('"pendant necklace"'));
  console.log("CLOU:", await search('"cartier" ring'));
}
run();
