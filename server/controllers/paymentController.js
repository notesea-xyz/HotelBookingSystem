import razorpay from '../config/razorpay.js'
import Payment from '../models/Payment.js'
import Booking from '../models/Booking.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import crypto from 'crypto'

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { bookingId, amount } = req.body

  // Check if Razorpay is configured
  if (!razorpay) {
    return res.status(503).json({
      success: false,
      message: 'Payment service is not configured. Please contact administrator.',
    })
  }

  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // Convert to paise (INR smallest unit)
    currency: 'INR',
    receipt: `booking_${bookingId}`,
    notes: {
      bookingId: bookingId,
      userId: req.user.id,
    },
  })

  res.status(200).json({
    success: true,
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    },
  })
})

// @desc    Verify and confirm payment
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body

  // Check if Razorpay is configured
  if (!razorpay) {
    return res.status(503).json({
      success: false,
      message: 'Payment service is not configured. Please contact administrator.',
    })
  }

  // Verify payment signature
  const sign = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex')

  if (razorpay_signature === expectedSign) {
    // Fetch payment details
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id)

    // Create payment record
    const payment = await Payment.create({
      booking: bookingId,
      user: req.user.id,
      amount: paymentDetails.amount / 100,
      currency: paymentDetails.currency,
      method: paymentDetails.method || 'razorpay',
      status: 'completed',
      transactionId: razorpay_payment_id,
    })

    // Update booking
    await Booking.findByIdAndUpdate(bookingId, {
      payment: payment._id,
      status: 'confirmed',
    })

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: payment,
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed',
    })
  }
})

// @desc    Get payment
// @route   GET /api/payments/:id
// @access  Private
export const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate('booking')
    .populate('user')

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found',
    })
  }

  res.status(200).json({
    success: true,
    data: payment,
  })
})

// @desc    Refund payment
// @route   POST /api/payments/:id/refund
// @access  Private/Admin
export const refundPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found',
    })
  }

  // Check if Razorpay is configured
  if (!razorpay) {
    return res.status(503).json({
      success: false,
      message: 'Payment service is not configured. Please contact administrator.',
    })
  }

  // Create refund in Razorpay
  const refund = await razorpay.payments.refund(payment.transactionId, {
    amount: Math.round(payment.amount * 100), // Convert to paise
    notes: {
      reason: req.body.reason,
    },
  })

  // Update payment record
  payment.status = 'refunded'
  payment.refundAmount = payment.amount
  payment.refundReason = req.body.reason
  payment.refundedAt = Date.now()
  await payment.save()

  res.status(200).json({
    success: true,
    data: payment,
  })
})
