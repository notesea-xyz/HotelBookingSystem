export const SOCKET_EVENTS = {
  // Connection events
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  
  // User events
  JOIN_ROOM: 'join',
  LEAVE_ROOM: 'leave',
  
  // Booking events
  BOOKING_CREATED: 'booking-created',
  BOOKING_UPDATED: 'booking-updated',
  BOOKING_CANCELLED: 'booking-cancelled',
  NEW_BOOKING: 'new-booking',
  
  // Notification events
  NOTIFICATION: 'notification',
  SEND_NOTIFICATION: 'send-notification',
  
  // Payment events
  PAYMENT_SUCCESS: 'payment-success',
  PAYMENT_FAILED: 'payment-failed',
  
  // Review events
  NEW_REVIEW: 'new-review',
  REVIEW_RESPONSE: 'review-response',
}
