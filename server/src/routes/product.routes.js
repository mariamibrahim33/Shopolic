import { Router } from 'express';
import upload from '../middleware/upload.js';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(listProducts));
router.get('/:id', asyncHandler(getProduct));
router.post('/', upload.single('image'), asyncHandler(createProduct));
router.post('/upload', upload.single('image'), asyncHandler(createProduct));
router.put('/:id', upload.single('image'), asyncHandler(updateProduct));
router.delete('/:id', asyncHandler(deleteProduct));

export default router;
