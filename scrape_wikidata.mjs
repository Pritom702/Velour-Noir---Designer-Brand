async function searchWikidata(query) {
  try {
    const res = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json`);
    const data = await res.json();
    if (data.search && data.search.length > 0) {
      const id = data.search[0].id;
      const detailRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${id}&property=P18&format=json`);
      const detail = await detailRes.json();
      if (detail.claims && detail.claims.P18) {
        let filename = detail.claims.P18[0].mainsnak.datavalue.value;
        filename = filename.replace(/ /g, '_');
        const md5 = require('crypto').createHash('md5').update(filename).digest('hex');
        const url = `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.substring(0,2)}/${encodeURIComponent(filename)}`;
        return url;
      }
    }
  } catch(e) {}
  return null;
}

async function run() {
  const perfumes = [
    "Dior Sauvage",
    "Acqua di Giò",
    "Bleu de Chanel",
    "Creed Aventus",
    "Cool Water",
    "1 Million",
    "Versace Eros"
  ];
  for(let p of perfumes) {
    const url = await searchWikidata(p);
    console.log(p + ": " + url);
  }
}
run();
