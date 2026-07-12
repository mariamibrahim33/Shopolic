import Order from '../models/order.model.js';

// POST /order  (auth required)
export async function createOrder(req, res) {
  const { items, subtotal, shippingFee, total, shipping, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cannot place an order with an empty cart' });
  }

  const order = await Order.create({
    user: req.user.id,
    items,
    subtotal,
    shippingFee,
    total,
    shipping,
    paymentMethod,
  });

  res.status(201).json(order);
}

// GET /order  (auth required) — the logged-in user's own orders
export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
}
