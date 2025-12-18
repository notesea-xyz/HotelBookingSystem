import Notification from '../models/Notification.js'

export const createNotification = async (userId, type, title, message, link = null, data = null) => {
  try {
    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message,
      link,
      data,
    })

    return notification
  } catch (error) {
    console.error('Error creating notification:', error)
  }
}

export const sendBookingNotification = async (userId, booking) => {
  await createNotification(
    userId,
    'booking',
    'New Booking',
    `Your booking ${booking.bookingNumber} has been confirmed!`,
    `/booking-confirmation/${booking._id}`,
    { bookingId: booking._id }
  )
}

export const sendPaymentNotification = async (userId, payment) => {
  await createNotification(
    userId,
    'payment',
    'Payment Successful',
    `Payment of $${payment.amount} has been processed successfully.`,
    `/my-bookings`,
    { paymentId: payment._id }
  )
}

export const sendReviewNotification = async (userId, review) => {
  await createNotification(
    userId,
    'review',
    'New Review',
    'You received a new review for your hotel.',
    `/reviews/${review._id}`,
    { reviewId: review._id }
  )
}
