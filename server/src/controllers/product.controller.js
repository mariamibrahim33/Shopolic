import Product from '../models/product.model.js';

// GET /product  (optional ?category=men)
export async function listProducts(req, res) {
  const filter = {};
  if (req.query.category) filter.category = req.query.category.toLowerCase();
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

// GET /product/:id
export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

// POST /product  and  POST /product/upload  (multipart, field "image")
export async function createProduct(req, res) {
  const { name, price, description, category } = req.body;
  const product = await Product.create({
    name,
    price,
    description,
    category,
    image: req.file ? req.file.filename : req.body.image || '',
  });
  res.status(201).json(product);
}

// PUT /product/:id  (multipart, field "image")
export async function updateProduct(req, res) {
  const { name, price, description, category } = req.body;
  const update = { name, price, description, category };
  if (req.file) update.image = req.file.filename;

  const product = await Product.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

// DELETE /product/:id
export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
}
