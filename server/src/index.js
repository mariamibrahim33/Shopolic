import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded/seeded product images at /assets/<filename>
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Lightweight health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);

// --- Serve the built Angular app (production / all-in-one deployment) ---
// The Angular build lands in <repo>/dist/shopolic/browser
const clientDir = path.join(__dirname, '..', '..', 'dist', 'shopolic', 'browser');
const hasClient = fs.existsSync(path.join(clientDir, 'index.html'));

if (hasClient) {
  app.use(express.static(clientDir));
  // SPA fallback: any non-API GET returns index.html so Angular routing works
  app.get('*', (req, res) => res.sendFile(path.join(clientDir, 'index.html')));
} else {
  app.get('/', (req, res) => res.json({ status: 'Shopolic API is running' }));
}

// Central error handler (e.g. multer errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopolic';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    app.listen(PORT, () => console.log(`✓ Shopolic running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });
