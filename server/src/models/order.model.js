import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    shipping: {
      firstName: String,
      lastName: String,
      email: String,
      address: String,
      city: String,
      governorate: String,
      phone: String,
    },
    paymentMethod: { type: String, enum: ['cash', 'credit'], default: 'cash' },
    status: { type: String, default: 'confirmed' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
