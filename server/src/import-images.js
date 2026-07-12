import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Product from './models/product.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dropDir = path.join(__dirname, '..', 'product-photos');
const assetsDir = path.join(__dirname, '..', 'assets');

// Short drop-in filename (without extension)  ->  exact product name.
// Save your photo with one of these names and put it in server/product-photos/.
const nameMap = {
  'denim-jacket': "Men's Classic Denim Jacket",
  'mens-tshirt': "Men's Cotton Crew T-Shirt",
  'mens-sneakers': "Men's Leather Sneakers",
  'mens-coat': "Men's Wool Blend Coat",
  'womens-dress': "Women's Floral Summer Dress",
  'womens-jeans': "Women's High-Waist Jeans",
  'womens-cardigan': "Women's Knit Cardigan",
  'womens-handbag': "Women's Leather Handbag",
  'kids-hoodie': "Kids' Dinosaur Hoodie",
  'kids-overalls': "Kids' Denim Overalls",
  'kids-sneakers': "Kids' Sneakers",
  'face-serum': 'Hydrating Face Serum',
  'lipstick': 'Matte Lipstick Set',
  'hair-oil': 'Nourishing Hair Oil',
};

const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopolic';
  await mongoose.connect(uri);
  console.log('✓ Connected to MongoDB\n');

  const files = fs.existsSync(dropDir) ? fs.readdirSync(dropDir) : [];
  const photos = files.filter((f) => allowed.includes(path.extname(f).toLowerCase()));

  if (photos.length === 0) {
    console.log('No photos found in server/product-photos/.');
    console.log('Add images named like: denim-jacket.jpg, lipstick.png  (see README.md there)\n');
    await mongoose.disconnect();
    return;
  }

  let matched = 0;
  for (const file of photos) {
    const base = path.basename(file, path.extname(file)).toLowerCase();
    const productName = nameMap[base];
    if (!productName) {
      console.warn(`✗ ${file}: name not recognized (skipped). Use one of the names in README.md`);
      continue;
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      console.warn(`✗ ${file}: no product "${productName}" in DB (run "npm run seed" first)`);
      continue;
    }

    const destName = `${base}${path.extname(file).toLowerCase()}`;
    fs.copyFileSync(path.join(dropDir, file), path.join(assetsDir, destName));
    product.image = destName;
    await product.save();
    console.log(`✓ ${file}  ->  ${productName}`);
    matched++;
  }

  console.log(`\n✓ Imported ${matched} photo(s). Refresh the app to see them.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
