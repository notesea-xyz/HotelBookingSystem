import { sendEmail } from '../config/email.js'

export const sendWelcomeEmail = async (user) => {
  const message = `
    <h1>Welcome to HotelBook, ${user.firstName}!</h1>
    <p>Thank you for joining us. We're excited to help you find your perfect stay.</p>
    <p>Start exploring amazing hotels and make your first booking today!</p>
    <a href="${process.env.CLIENT_URL}/hotels">Browse Hotels</a>
  `

  await sendEmail({
    email: user.email,
    subject: 'Welcome to HotelBook!',
    message,
  })
}

export const sendBookingConfirmationEmail = async (booking, user) => {
  const message = `
    <h1>Booking Confirmation</h1>
    <p>Dear ${user.firstName},</p>
    <p>Your booking has been confirmed!</p>
    <h2>Booking Details:</h2>
    <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
    <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
    <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
    <p><strong>Total Price:</strong> $${booking.totalPrice}</p>
    <p>We look forward to hosting you!</p>
  `

  await sendEmail({
    email: user.email,
    subject: `Booking Confirmation - ${booking.bookingNumber}`,
    message,
  })
}

export const sendBookingCancellationEmail = async (booking, user) => {
  const message = `
    <h1>Booking Cancellation</h1>
    <p>Dear ${user.firstName},</p>
    <p>Your booking has been cancelled.</p>
    <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
    <p>If you have any questions, please contact our support team.</p>
  `

  await sendEmail({
    email: user.email,
    subject: `Booking Cancelled - ${booking.bookingNumber}`,
    message,
  })
}
