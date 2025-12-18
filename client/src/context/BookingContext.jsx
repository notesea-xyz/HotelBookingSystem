import { createContext, useState, useReducer } from 'react'

export const BookingContext = createContext()

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: action.payload }
    case 'SET_SELECTED_ROOM':
      return { ...state, selectedRoom: action.payload }
    case 'SET_GUEST_DETAILS':
      return { ...state, guestDetails: action.payload }
    case 'SET_BOOKING_DATES':
      return { ...state, bookingDates: action.payload }
    case 'SET_SPECIAL_REQUESTS':
      return { ...state, specialRequests: action.payload }
    case 'RESET_BOOKING':
      return initialState
    default:
      return state
  }
}

const initialState = {
  searchParams: {
    location: '',
    checkIn: null,
    checkOut: null,
    guests: { adults: 2, children: 0 },
  },
  selectedRoom: null,
  guestDetails: null,
  bookingDates: { checkIn: null, checkOut: null },
  specialRequests: '',
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)
  const [bookingHistory, setBookingHistory] = useState([])

  const setSearchParams = (params) => {
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: params })
  }

  const setSelectedRoom = (room) => {
    dispatch({ type: 'SET_SELECTED_ROOM', payload: room })
  }

  const setGuestDetails = (details) => {
    dispatch({ type: 'SET_GUEST_DETAILS', payload: details })
  }

  const setBookingDates = (dates) => {
    dispatch({ type: 'SET_BOOKING_DATES', payload: dates })
  }

  const setSpecialRequests = (requests) => {
    dispatch({ type: 'SET_SPECIAL_REQUESTS', payload: requests })
  }

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' })
  }

  const addToBookingHistory = (booking) => {
    setBookingHistory([...bookingHistory, booking])
  }

  const value = {
    ...state,
    setSearchParams,
    setSelectedRoom,
    setGuestDetails,
    setBookingDates,
    setSpecialRequests,
    resetBooking,
    bookingHistory,
    addToBookingHistory,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
