import Review from '../models/Review.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get hotel reviews
// @route   GET /api/reviews/hotel/:hotelId
// @access  Public
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    hotel: req.params.hotelId,
    isApproved: true,
  })
    .populate('user', 'firstName lastName avatar')
    .sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  })
})

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    ...req.body,
    user: req.user.id,
  })

  res.status(201).json({
    success: true,
    data: review,
  })
})

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  let review = await Review.findById(req.params.id)

  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found',
    })
  }

  // Check ownership
  if (review.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to update this review',
    })
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found',
    })
  }

  // Check ownership or admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to delete this review',
    })
  }

  await review.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  })
})

// @desc    Add review response
// @route   POST /api/reviews/:id/response
// @access  Private/Owner/Admin
export const addReviewResponse = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return res.status(404).json({
      success: false,
      message: 'Review not found',
    })
  }

  review.response = {
    text: req.body.response,
    date: Date.now(),
    respondedBy: req.user.id,
  }

  await review.save()

  res.status(200).json({
    success: true,
    data: review,
  })
})
