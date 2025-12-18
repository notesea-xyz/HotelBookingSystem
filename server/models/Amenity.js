import mongoose from 'mongoose'

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide amenity name'],
      unique: true,
    },
    icon: {
      type: String,
      default: 'default-icon',
    },
    category: {
      type: String,
      enum: ['hotel', 'room', 'both'],
      required: true,
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Amenity = mongoose.model('Amenity', amenitySchema)

export default Amenity
