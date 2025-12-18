import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, 'Please provide a review title'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
    },
    categories: {
      cleanliness: {
        type: Number,
        min: 1,
        max: 5,
      },
      service: {
        type: Number,
        min: 1,
        max: 5,
      },
      location: {
        type: Number,
        min: 1,
        max: 5,
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    images: [String],
    response: {
      text: String,
      date: Date,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Index
reviewSchema.index({ hotel: 1, isApproved: 1 })
reviewSchema.index({ user: 1 })

// Update hotel rating after review is saved
reviewSchema.post('save', async function () {
  const Review = this.constructor
  const hotel = await mongoose.model('Hotel').findById(this.hotel)
  
  if (hotel) {
    const stats = await Review.aggregate([
      { $match: { hotel: this.hotel, isApproved: true } },
      {
        $group: {
          _id: '$hotel',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ])
    
    if (stats.length > 0) {
      await mongoose.model('Hotel').findByIdAndUpdate(this.hotel, {
        rating: stats[0].avgRating,
        reviewCount: stats[0].count,
      })
    }
  }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
