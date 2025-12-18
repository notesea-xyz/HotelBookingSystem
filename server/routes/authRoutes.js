import express from 'express'
import {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from '../controllers/authController.js'
import { protect } from '../middlewares/auth.js'
import { authLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/logout', logout)
router.get('/me', protect, getCurrentUser)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.put('/verify-email/:token', verifyEmail)

export default router
