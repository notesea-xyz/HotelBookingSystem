import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin/Owner
export const getBookings = asyncHandler(async (req, res) => {
  let query = {}

  // If user is hotel owner, show only their hotel bookings
  if (req.user.role === 'hotel-owner') {
    const hotels = await Hotel.find({ owner: req.user.id })
    const hotelIds = hotels.map((hotel) => hotel._id)
    query.hotel = { $in: hotelIds }
  }

  const bookings = await Booking.find(query)
    .populate('user', 'firstName lastName email')
    .populate('hotel', 'name')
    .populate('room', 'name type')
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  })
})

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user')
    .populate('hotel')
    .populate('room')
    .populate('payment')

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found',
    })
  }

  // Check ownership
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to view this booking',
    })
  }

  res.status(200).json({
    success: true,
    data: booking,
  })
})

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res) => {
  const { room, checkIn, checkOut, guests } = req.body

  // Check if room exists and is available
  const roomData = await Room.findById(room)
  if (!roomData) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    })
  }

  // Calculate nights and total price
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  const totalPrice = roomData.basePrice * nights

  // Generate unique booking number
  const bookingNumber = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`

  // Create booking
  const booking = await Booking.create({
    ...req.body,
    bookingNumber,
    user: req.user.id,
    hotel: roomData.hotel,
    nights,
    totalPrice,
    priceBreakdown: {
      basePrice: roomData.basePrice * nights,
      taxes: totalPrice * 0.1,
      serviceFee: totalPrice * 0.05,
      cleaningFee: 25,
    },
  })

  res.status(201).json({
    success: true,
    data: booking,
  })
})

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = asyncHandler(async (req, res) => {
  let booking = await Booking.findById(req.params.id)

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found',
    })
  }

  // Check ownership
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this booking',
    })
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: booking,
  })
})

// @desc    Cancel booking
// @route   POST /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found',
    })
  }

  // Check ownership
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to cancel this booking',
    })
  }

  booking.status = 'cancelled'
  booking.cancellationReason = req.body.reason
  booking.cancelledAt = Date.now()
  await booking.save()

  res.status(200).json({
    success: true,
    data: booking,
  })
})

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access  Private
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId })
    .populate('hotel', 'name address')
    .populate('room', 'name type')
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  })
})
