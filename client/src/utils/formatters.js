import { format, parseISO, differenceInDays } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr)
  } catch (error) {
    console.error('Date formatting error:', error)
    return ''
  }
}

export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phoneNumber
}

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  try {
    const checkInDate = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn
    const checkOutDate = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut
    return differenceInDays(checkOutDate, checkInDate)
  } catch (error) {
    console.error('Date calculation error:', error)
    return 0
  }
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

export const formatRating = (rating) => {
  return Number(rating).toFixed(1)
}
