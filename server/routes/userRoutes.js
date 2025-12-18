import express from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} from '../controllers/userController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.use(protect)

router.get('/', authorize('admin'), getUsers)
router.get('/:id', getUser)
router.put('/profile', updateUser)
router.put('/password', updatePassword)
router.delete('/:id', authorize('admin'), deleteUser)

export default router
