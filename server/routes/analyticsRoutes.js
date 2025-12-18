import express from 'express'
import {
  getDashboardStats,
  getRevenueAnalytics,
  getBookingAnalytics,
} from '../controllers/analyticsController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.use(protect, authorize('admin', 'hotel-owner'))

router.get('/dashboard', getDashboardStats)
router.get('/revenue', getRevenueAnalytics)
router.get('/bookings', getBookingAnalytics)

export default router
