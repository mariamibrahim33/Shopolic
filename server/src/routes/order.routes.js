import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrder, getMyOrders } from '../controllers/order.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', requireAuth, asyncHandler(createOrder));
router.get('/', requireAuth, asyncHandler(getMyOrders));

export default router;
