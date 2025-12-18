import { differenceInDays, parseISO, isAfter, isBefore, isWithinInterval } from 'date-fns'

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  const start = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn
  const end = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut
  return differenceInDays(end, start)
}

export const isDateInPast = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isBefore(dateObj, new Date())
}

export const isDateInFuture = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isAfter(dateObj, new Date())
}

export const isDateBetween = (date, startDate, endDate) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
  
  return isWithinInterval(dateObj, { start, end })
}

export const getMinCheckoutDate = (checkInDate) => {
  if (!checkInDate) return new Date()
  const date = typeof checkInDate === 'string' ? parseISO(checkInDate) : checkInDate
  const minDate = new Date(date)
  minDate.setDate(minDate.getDate() + 1)
  return minDate
}

export const formatDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return ''
  const start = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn
  const end = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut
  
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
}
