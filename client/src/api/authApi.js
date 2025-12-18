import axios from './axiosConfig'

export const loginUser = async (credentials) => {
  const response = await axios.post('/auth/login', credentials)
  return response.data
}

export const registerUser = async (userData) => {
  const response = await axios.post('/auth/register', userData)
  return response.data
}

export const logoutUser = async () => {
  const response = await axios.post('/auth/logout')
  return response.data
}

export const getCurrentUser = async () => {
  const response = await axios.get('/auth/me')
  return response.data
}

export const forgotPassword = async (email) => {
  const response = await axios.post('/auth/forgot-password', { email })
  return response.data
}

export const resetPassword = async (token, password) => {
  const response = await axios.post(`/auth/reset-password/${token}`, { password })
  return response.data
}

export const verifyEmail = async (token) => {
  const response = await axios.post(`/auth/verify-email/${token}`)
  return response.data
}

export const refreshToken = async () => {
  const response = await axios.post('/auth/refresh-token')
  return response.data
}
