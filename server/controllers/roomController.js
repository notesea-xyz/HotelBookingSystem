import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({ isActive: true })
    .populate('hotel')
    .populate('amenities')

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms,
  })
})

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
export const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)
    .populate('hotel')
    .populate('amenities')

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    })
  }

  res.status(200).json({
    success: true,
    data: room,
  })
})

// @desc    Create room
// @route   POST /api/rooms
// @access  Private/Owner/Admin
export const createRoom = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.body.hotel)

  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: 'Hotel not found',
    })
  }

  // Check if user owns the hotel
  if (hotel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to add rooms to this hotel',
    })
  }

  const room = await Room.create(req.body)

  // Add room to hotel's rooms array
  hotel.rooms.push(room._id)
  await hotel.save()

  res.status(201).json({
    success: true,
    data: room,
  })
})

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Owner/Admin
export const updateRoom = asyncHandler(async (req, res) => {
  let room = await Room.findById(req.params.id).populate('hotel')

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    })
  }

  // Check ownership
  if (room.hotel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this room',
    })
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: room,
  })
})

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Owner/Admin
export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate('hotel')

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    })
  }

  // Check ownership
  if (room.hotel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to delete this room',
    })
  }

  await room.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Room deleted successfully',
  })
})

// @desc    Get room availability
// @route   GET /api/rooms/:id/availability
// @access  Public
export const getRoomAvailability = asyncHandler(async (req, res) => {
  const { checkIn, checkOut } = req.query
  const room = await Room.findById(req.params.id)

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    })
  }

  // Check if room is available (simplified logic)
  const isAvailable = room.availability.status === 'available'

  res.status(200).json({
    success: true,
    data: {
      isAvailable,
      room: room,
    },
  })
})
