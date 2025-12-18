import express from 'express'
import {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  searchHotels,
  getFeaturedHotels,
  getHotelRooms,
} from '../controllers/hotelController.js'
import { protect, authorize } from '../middlewares/auth.js'
import { hotelValidation, validate } from '../middlewares/validation.js'

const router = express.Router()

router.get('/', getHotels)
router.get('/search', searchHotels)
router.get('/featured', getFeaturedHotels)
router.get('/:id', getHotel)
router.get('/:id/rooms', getHotelRooms)

router.use(protect)
router.post(
  '/',
  authorize('hotel-owner', 'admin'),
  validate(hotelValidation),
  createHotel
)
router.put('/:id', authorize('hotel-owner', 'admin'), updateHotel)
router.delete('/:id', authorize('admin'), deleteHotel)

export default router
