import axios from './axiosConfig'

export const createPaymentOrder = async (bookingId, amount) => {
  const response = await axios.post('/payments/create-order', {
    bookingId,
    amount,
  })
  return response.data
}

export const verifyPayment = async (paymentData) => {
  const response = await axios.post('/payments/verify', paymentData)
  return response.data
}

export const getPaymentById = async (id) => {
  const response = await axios.get(`/payments/${id}`)
  return response.data
}

export const refundPayment = async (id, reason) => {
  const response = await axios.post(`/payments/${id}/refund`, { reason })
  return response.data
}
