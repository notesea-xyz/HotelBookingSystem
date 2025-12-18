import { body, validationResult } from 'express-validator'

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
}

// User validation
export const userValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
]

// Hotel validation
export const hotelValidation = [
  body('name').trim().notEmpty().withMessage('Hotel name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('address.country').trim().notEmpty().withMessage('Country is required'),
]

// Room validation
export const roomValidation = [
  body('name').trim().notEmpty().withMessage('Room name is required'),
  body('type').trim().notEmpty().withMessage('Room type is required'),
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
]

// Booking validation
export const bookingValidation = [
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guestDetails.name').trim().notEmpty().withMessage('Guest name is required'),
  body('guestDetails.email').isEmail().withMessage('Valid email is required'),
]
