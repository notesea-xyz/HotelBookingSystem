import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide room name'],
    },
    type: {
      type: String,
      required: [true, 'Please provide room type'],
      enum: ['Standard', 'Deluxe', 'Suite', 'Presidential Suite'],
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
    capacity: {
      adults: {
        type: Number,
        required: true,
        min: 1,
      },
      children: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    beds: [
      {
        type: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    size: {
      type: Number, // in square feet
      required: true,
    },
    floor: Number,
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity',
      },
    ],
    basePrice: {
      type: Number,
      required: [true, 'Please provide base price'],
      min: 0,
    },
    pricing: {
      weekday: Number,
      weekend: Number,
      seasonal: [
        {
          startDate: Date,
          endDate: Date,
          price: Number,
        },
      ],
    },
    availability: {
      status: {
        type: String,
        enum: ['available', 'booked', 'maintenance'],
        default: 'available',
      },
      calendar: [
        {
          date: Date,
          isAvailable: Boolean,
          price: Number,
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for search
roomSchema.index({ hotel: 1, isActive: 1 })
roomSchema.index({ basePrice: 1 })

const Room = mongoose.model('Room', roomSchema)

export default Room
