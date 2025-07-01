const fs = require('fs');

const SOURCE = 'random.json';     // File sumber asli
const DEST = 'urls.json';         // File hasil acakan

const data = JSON.parse(fs.readFileSync(SOURCE, 'utf-8'));

// Jika ada key yang harus dipertahankan (misalnya wsrvOn)
const persistentKeys = ['wsrvOn'];
const preserved = {};

for (const key of persistentKeys) {
  if (data[key]) {
    preserved[key] = data[key];
    delete data[key];
  }
}

// Shuffle dan ambil 5 item
const shuffled = Object.entries(data)
  .sort(() => 0.5 - Math.random())
  .slice(0, 5);

const result = Object.fromEntries(shuffled);

// Gabungkan yang dipertahankan (jika ada)
const final = { ...preserved, ...result };

fs.writeFileSync(DEST, JSON.stringify(final, null, 2));
console.log("✅ urls.json updated with 5 randomized items + preserved keys");
