import Hotel from '../models/Hotel.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
export const getHotels = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, city, minPrice, maxPrice, rating } = req.query

  let query = { isActive: true }

  if (city) {
    query['address.city'] = new RegExp(city, 'i')
  }

  if (rating) {
    query.rating = { $gte: Number(rating) }
  }

  const hotels = await Hotel.find(query)
    .populate('amenities')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })

  const count = await Hotel.countDocuments(query)

  res.status(200).json({
    success: true,
    count: hotels.length,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    data: hotels,
  })
})

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
export const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
    .populate('amenities')
    .populate('rooms')

  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: 'Hotel not found',
    })
  }

  res.status(200).json({
    success: true,
    data: hotel,
  })
})

// @desc    Create hotel
// @route   POST /api/hotels
// @access  Private/Owner/Admin
export const createHotel = asyncHandler(async (req, res) => {
  req.body.owner = req.user.id

  const hotel = await Hotel.create(req.body)

  res.status(201).json({
    success: true,
    data: hotel,
  })
})

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private/Owner/Admin
export const updateHotel = asyncHandler(async (req, res) => {
  let hotel = await Hotel.findById(req.params.id)

  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: 'Hotel not found',
    })
  }

  // Make sure user is hotel owner
  if (hotel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this hotel',
    })
  }

  hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: hotel,
  })
})

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
export const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)

  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: 'Hotel not found',
    })
  }

  await hotel.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Hotel deleted successfully',
  })
})

// @desc    Search hotels
// @route   GET /api/hotels/search
// @access  Public
export const searchHotels = asyncHandler(async (req, res) => {
  const { query, city, checkIn, checkOut } = req.query

  let searchQuery = { isActive: true }

  if (query) {
    searchQuery.$text = { $search: query }
  }

  if (city) {
    searchQuery['address.city'] = new RegExp(city, 'i')
  }

  const hotels = await Hotel.find(searchQuery).populate('amenities')

  res.status(200).json({
    success: true,
    count: hotels.length,
    data: hotels,
  })
})

// @desc    Get featured hotels
// @route   GET /api/hotels/featured
// @access  Public
export const getFeaturedHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ isFeatured: true, isActive: true })
    .limit(6)
    .populate('amenities')

  res.status(200).json({
    success: true,
    count: hotels.length,
    data: hotels,
  })
})

// @desc    Get hotel rooms
// @route   GET /api/hotels/:id/rooms
// @access  Public
export const getHotelRooms = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).populate({
    path: 'rooms',
    match: { isActive: true },
  })

  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: 'Hotel not found',
    })
  }

  res.status(200).json({
    success: true,
    count: hotel.rooms.length,
    data: hotel.rooms,
  })
})
