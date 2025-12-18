import axios from './axiosConfig'

export const getAllHotels = async (params) => {
  const response = await axios.get('/hotels', { params })
  return response.data
}

export const getHotelById = async (id) => {
  const response = await axios.get(`/hotels/${id}`)
  return response.data
}

export const searchHotels = async (searchParams) => {
  const response = await axios.get('/hotels/search', { params: searchParams })
  return response.data
}

export const getFeaturedHotels = async () => {
  const response = await axios.get('/hotels/featured')
  return response.data
}

export const getHotelRooms = async (hotelId) => {
  const response = await axios.get(`/hotels/${hotelId}/rooms`)
  return response.data
}

export const createHotel = async (hotelData) => {
  const response = await axios.post('/hotels', hotelData)
  return response.data
}

export const updateHotel = async (id, hotelData) => {
  const response = await axios.put(`/hotels/${id}`, hotelData)
  return response.data
}

export const deleteHotel = async (id) => {
  const response = await axios.delete(`/hotels/${id}`)
  return response.data
}

export const uploadHotelImages = async (id, formData) => {
  const response = await axios.post(`/hotels/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
