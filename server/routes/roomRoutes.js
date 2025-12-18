import express from 'express'
import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
} from '../controllers/roomController.js'
import { protect, authorize } from '../middlewares/auth.js'
import { roomValidation, validate } from '../middlewares/validation.js'

const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoom)
router.get('/:id/availability', getRoomAvailability)

router.use(protect)
router.post(
  '/',
  authorize('hotel-owner', 'admin'),
  validate(roomValidation),
  createRoom
)
router.put('/:id', authorize('hotel-owner', 'admin'), updateRoom)
router.delete('/:id', authorize('hotel-owner', 'admin'), deleteRoom)

export default router
