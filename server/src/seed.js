import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Product from './models/product.model.js';
import User from './models/user.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'assets');

const palette = {
  men: ['#1e3a5f', '#2c5282'],
  women: ['#9b2c5f', '#c53a7e'],
  kids: ['#c05621', '#dd8b2c'],
  beauty: ['#553c7b', '#7c4d9e'],
};

// Generate a simple, good-looking SVG placeholder so the shop has imagery
// out of the box. Users can replace these with real photos via the dashboard.
function writeSvg(filename, title, category) {
  const [c1, c2] = palette[category] || ['#334155', '#475569'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g)"/>
  <text x="50%" y="46%" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700" text-anchor="middle">${title}</text>
  <text x="50%" y="56%" fill="#ffffff" opacity="0.75" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">${category.toUpperCase()}</text>
</svg>`;
  fs.writeFileSync(path.join(assetsDir, filename), svg.trim());
}

const products = [
  { name: "Men's Classic Denim Jacket", price: 79.99, category: 'men', description: 'Timeless denim jacket with a modern slim fit.' },
  { name: "Men's Cotton Crew T-Shirt", price: 19.99, category: 'men', description: 'Soft breathable cotton tee for everyday wear.' },
  { name: "Men's Leather Sneakers", price: 89.0, category: 'men', description: 'Minimal white leather sneakers with cushioned soles.' },
  { name: "Men's Wool Blend Coat", price: 149.99, category: 'men', description: 'Warm tailored overcoat for the cold season.' },
  { name: "Women's Floral Summer Dress", price: 59.99, category: 'women', description: 'Lightweight floral dress perfect for warm days.' },
  { name: "Women's High-Waist Jeans", price: 64.5, category: 'women', description: 'Flattering high-waist skinny jeans in stretch denim.' },
  { name: "Women's Knit Cardigan", price: 45.0, category: 'women', description: 'Cozy oversized cardigan in soft knit.' },
  { name: "Women's Leather Handbag", price: 120.0, category: 'women', description: 'Elegant everyday handbag in genuine leather.' },
  { name: "Kids' Dinosaur Hoodie", price: 29.99, category: 'kids', description: 'Fun hooded sweatshirt with a friendly dino print.' },
  { name: "Kids' Denim Overalls", price: 34.5, category: 'kids', description: 'Durable and adorable denim overalls.' },
  { name: "Kids' Sneakers", price: 39.99, category: 'kids', description: 'Comfy velcro sneakers for busy little feet.' },
  { name: 'Hydrating Face Serum', price: 24.99, category: 'beauty', description: 'Vitamin C serum for a bright, hydrated glow.' },
  { name: 'Matte Lipstick Set', price: 32.0, category: 'beauty', description: 'Long-lasting matte lipsticks in five shades.' },
  { name: 'Nourishing Hair Oil', price: 18.5, category: 'beauty', description: 'Argan oil blend for smooth, shiny hair.' },
];

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopolic';
  await mongoose.connect(uri);
  console.log('✓ Connected to MongoDB');

  await Product.deleteMany({});
  console.log('  cleared products');

  const docs = products.map((p) => {
    const filename = `${slug(p.name)}.svg`;
    writeSvg(filename, p.name.replace(/&/g, 'and'), p.category);
    return { ...p, image: filename };
  });
  await Product.insertMany(docs);
  console.log(`✓ Inserted ${docs.length} products (+ images in assets/)`);

  // Demo account for login / dashboard
  await User.deleteOne({ email: 'admin@shopolic.com' });
  await User.create({
    name: 'Admin',
    email: 'admin@shopolic.com',
    password: 'admin123',
    role: 'admin',
  });
  console.log('✓ Created demo user  ->  admin@shopolic.com / admin123');

  await mongoose.disconnect();
  console.log('✓ Done');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
