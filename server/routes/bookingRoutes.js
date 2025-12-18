import express from 'express'
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
} from '../controllers/bookingController.js'
import { protect, authorize } from '../middlewares/auth.js'
import { bookingValidation, validate } from '../middlewares/validation.js'
import { bookingLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

router.use(protect)

router.get('/', authorize('admin', 'hotel-owner'), getBookings)
router.get('/user/:userId', getUserBookings)
router.get('/:id', getBooking)
router.post('/', bookingLimiter, validate(bookingValidation), createBooking)
router.put('/:id', updateBooking)
router.post('/:id/cancel', cancelBooking)

export default router
