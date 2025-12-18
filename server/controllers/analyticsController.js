import Booking from '../models/Booking.js'
import Payment from '../models/Payment.js'
import Hotel from '../models/Hotel.js'
import User from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get dashboard stats
// @route   GET /api/analytics/dashboard
// @access  Private/Admin/Owner
export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = {}

  if (req.user.role === 'admin') {
    stats.totalBookings = await Booking.countDocuments()
    stats.totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
    stats.totalHotels = await Hotel.countDocuments()
    stats.totalUsers = await User.countDocuments()
  } else if (req.user.role === 'hotel-owner') {
    const hotels = await Hotel.find({ owner: req.user.id })
    const hotelIds = hotels.map((h) => h._id)

    stats.totalHotels = hotels.length
    stats.totalBookings = await Booking.countDocuments({
      hotel: { $in: hotelIds },
    })
    stats.totalRevenue = await Payment.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: 'booking',
          foreignField: '_id',
          as: 'bookingData',
        },
      },
      { $unwind: '$bookingData' },
      { $match: { 'bookingData.hotel': { $in: hotelIds }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
  }

  res.status(200).json({
    success: true,
    data: stats,
  })
})

// @desc    Get revenue analytics
// @route   GET /api/analytics/revenue
// @access  Private/Admin/Owner
export const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query

  let matchQuery = { status: 'completed' }

  if (startDate && endDate) {
    matchQuery.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    }
  }

  const revenue = await Payment.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ])

  res.status(200).json({
    success: true,
    data: revenue,
  })
})

// @desc    Get booking analytics
// @route   GET /api/analytics/bookings
// @access  Private/Admin/Owner
export const getBookingAnalytics = asyncHandler(async (req, res) => {
  const bookings = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])

  res.status(200).json({
    success: true,
    data: bookings,
  })
})
