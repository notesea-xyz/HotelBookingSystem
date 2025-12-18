import axios from './axiosConfig'

export const getAllRooms = async (params) => {
  const response = await axios.get('/rooms', { params })
  return response.data
}

export const getRoomById = async (id) => {
  const response = await axios.get(`/rooms/${id}`)
  return response.data
}

export const getRoomAvailability = async (id, checkIn, checkOut) => {
  const response = await axios.get(`/rooms/${id}/availability`, {
    params: { checkIn, checkOut },
  })
  return response.data
}

export const createRoom = async (roomData) => {
  const response = await axios.post('/rooms', roomData)
  return response.data
}

export const updateRoom = async (id, roomData) => {
  const response = await axios.put(`/rooms/${id}`, roomData)
  return response.data
}

export const deleteRoom = async (id) => {
  const response = await axios.delete(`/rooms/${id}`)
  return response.data
}

export const uploadRoomImages = async (id, formData) => {
  const response = await axios.post(`/rooms/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
