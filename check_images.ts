import * as https from 'https';

https.get('https://unsplash.com/s/photos/diamond-ring', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    console.log("DIAMOND RING:", [...new Set(matches)].slice(0, 5));
  });
});

https.get('https://unsplash.com/s/photos/necklaces', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    console.log("NECKLACE:", [...new Set(matches)].slice(0, 5));
  });
});

https.get('https://unsplash.com/s/photos/trench-coat', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    console.log("TRENCH COAT:", [...new Set(matches)].slice(0, 5));
  });
});
