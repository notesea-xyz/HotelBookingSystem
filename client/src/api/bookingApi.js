import axios from './axiosConfig'

export const getAllBookings = async (params) => {
  const response = await axios.get('/bookings', { params })
  return response.data
}

export const getBookingById = async (id) => {
  const response = await axios.get(`/bookings/${id}`)
  return response.data
}

export const getUserBookings = async (userId) => {
  const response = await axios.get(`/bookings/user/${userId}`)
  return response.data
}

export const createBooking = async (bookingData) => {
  const response = await axios.post('/bookings', bookingData)
  return response.data
}

export const updateBooking = async (id, bookingData) => {
  const response = await axios.put(`/bookings/${id}`, bookingData)
  return response.data
}

export const cancelBooking = async (id) => {
  const response = await axios.post(`/bookings/${id}/cancel`)
  return response.data
}

export const deleteBooking = async (id) => {
  const response = await axios.delete(`/bookings/${id}`)
  return response.data
}
