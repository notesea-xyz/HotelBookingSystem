import express from 'express'
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  addReviewResponse,
} from '../controllers/reviewController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.get('/hotel/:hotelId', getReviews)

router.use(protect)
router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)
router.post('/:id/response', authorize('hotel-owner', 'admin'), addReviewResponse)

export default router
