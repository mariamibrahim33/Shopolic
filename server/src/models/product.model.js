import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    // Stored filename only (e.g. "shirt.jpg"); the frontend builds the URL
    // as http://localhost:3000/assets/<image>
    image: { type: String, default: '' },
    // "men" | "women" | "kids" | "beauty" | "" (shown everywhere)
    category: { type: String, default: '', lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
