import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'wallet', 'razorpay'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
      select: false, // Don't include sensitive payment details by default
    },
    refundAmount: Number,
    refundReason: String,
    refundedAt: Date,
  },
  {
    timestamps: true,
  }
)

// Index
paymentSchema.index({ booking: 1 })
paymentSchema.index({ user: 1 })
paymentSchema.index({ transactionId: 1 })

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
