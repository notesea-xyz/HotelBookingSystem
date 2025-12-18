import axios from './axiosConfig'

export const getHotelReviews = async (hotelId, params) => {
  const response = await axios.get(`/reviews/hotel/${hotelId}`, { params })
  return response.data
}

export const createReview = async (reviewData) => {
  const response = await axios.post('/reviews', reviewData)
  return response.data
}

export const updateReview = async (id, reviewData) => {
  const response = await axios.put(`/reviews/${id}`, reviewData)
  return response.data
}

export const deleteReview = async (id) => {
  const response = await axios.delete(`/reviews/${id}`)
  return response.data
}

export const addReviewResponse = async (id, response) => {
  const res = await axios.post(`/reviews/${id}/response`, { response })
  return res.data
}

export const uploadReviewImages = async (id, formData) => {
  const response = await axios.post(`/reviews/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
