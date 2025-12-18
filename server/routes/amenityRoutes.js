import express from 'express'
import { getAmenities, createAmenity } from '../controllers/amenityController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getAmenities)
router.post('/', protect, authorize('admin'), createAmenity)

export default router
