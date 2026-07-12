import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

function signToken(user) {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /user/register
export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password are required' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email is already registered' });
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({ accessToken: signToken(user) });
}

// POST /user/login
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await user.comparePassword(password || ''))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ accessToken: signToken(user) });
}
