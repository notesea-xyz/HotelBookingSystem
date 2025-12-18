import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['booking', 'payment', 'review', 'general'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: String,
    read: {
      type: Boolean,
      default: false,
    },
    data: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
)

// Index
notificationSchema.index({ user: 1, read: 1 })
notificationSchema.index({ createdAt: -1 })

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
