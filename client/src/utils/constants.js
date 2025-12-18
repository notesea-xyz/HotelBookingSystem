// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

// User Roles
export const USER_ROLES = {
  GUEST: 'guest',
  HOTEL_OWNER: 'hotel-owner',
  ADMIN: 'admin',
}

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
}

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  STRIPE: 'stripe',
}

// Room Types
export const ROOM_TYPES = {
  STANDARD: 'Standard',
  DELUXE: 'Deluxe',
  SUITE: 'Suite',
  PRESIDENTIAL: 'Presidential Suite',
}

// Hotel Amenities
export const HOTEL_AMENITIES = [
  'Free WiFi',
  'Swimming Pool',
  'Gym',
  'Restaurant',
  'Bar',
  'Spa',
  'Parking',
  '24/7 Reception',
  'Room Service',
  'Airport Shuttle',
  'Conference Room',
  'Laundry Service',
]

// Room Amenities
export const ROOM_AMENITIES = [
  'Air Conditioning',
  'Mini Bar',
  'Safe',
  'TV',
  'Work Desk',
  'Coffee Maker',
  'Hair Dryer',
  'Iron',
  'Balcony',
  'City View',
  'Sea View',
]

// Star Ratings
export const STAR_RATINGS = [1, 2, 3, 4, 5]

// Price Ranges
export const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: 'Over $500', min: 500, max: 10000 },
]

// Date Format
export const DATE_FORMAT = 'MMM dd, yyyy'
export const DATE_TIME_FORMAT = 'MMM dd, yyyy HH:mm'

// Pagination
export const ITEMS_PER_PAGE = 12
export const REVIEWS_PER_PAGE = 5

// Image Placeholder
export const IMAGE_PLACEHOLDER = '/images/placeholder.jpg'

// Social Login Providers
export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}
