import express from 'express'
import {
  createPaymentOrder,
  verifyPayment,
  getPayment,
  refundPayment,
} from '../controllers/paymentController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.use(protect)

router.post('/create-order', createPaymentOrder)
router.post('/verify', verifyPayment)
router.get('/:id', getPayment)
router.post('/:id/refund', authorize('admin'), refundPayment)

export default router
