import { body, param } from 'express-validator'

export const validateObjectId = (field) => {
  return param(field).isMongoId().withMessage(`Invalid ${field} ID`)
}

export const validateEmail = () => {
  return body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
}

export const validatePassword = () => {
  return body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
}

export const validatePhone = () => {
  return body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number')
}

export const validateDate = (field) => {
  return body(field)
    .isISO8601()
    .toDate()
    .withMessage(`${field} must be a valid date`)
}

export const validatePrice = (field) => {
  return body(field)
    .isFloat({ min: 0 })
    .withMessage(`${field} must be a positive number`)
}

export const validateRating = (field = 'rating') => {
  return body(field)
    .isInt({ min: 1, max: 5 })
    .withMessage(`${field} must be between 1 and 5`)
}
