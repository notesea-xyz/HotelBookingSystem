import Amenity from '../models/Amenity.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
export const getAmenities = asyncHandler(async (req, res) => {
  const amenities = await Amenity.find({ isActive: true })

  res.status(200).json({
    success: true,
    count: amenities.length,
    data: amenities,
  })
})

// @desc    Create amenity
// @route   POST /api/amenities
// @access  Private/Admin
export const createAmenity = asyncHandler(async (req, res) => {
  const amenity = await Amenity.create(req.body)

  res.status(201).json({
    success: true,
    data: amenity,
  })
})
