import * as Yup from 'yup'

export const loginValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const registerValidation = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
})

export const hotelValidation = Yup.object({
  name: Yup.string()
    .min(3, 'Hotel name must be at least 3 characters')
    .required('Hotel name is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip code is required'),
  }),
  contact: Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
  }),
  starRating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Star rating is required'),
})

export const roomValidation = Yup.object({
  name: Yup.string()
    .min(3, 'Room name must be at least 3 characters')
    .required('Room name is required'),
  type: Yup.string().required('Room type is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  basePrice: Yup.number()
    .min(0, 'Price must be greater than 0')
    .required('Base price is required'),
  capacity: Yup.object({
    adults: Yup.number()
      .min(1, 'At least 1 adult')
      .required('Adult capacity is required'),
    children: Yup.number().min(0, 'Cannot be negative'),
  }),
})

export const bookingValidation = Yup.object({
  guestDetails: Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone is required'),
  }),
  checkIn: Yup.date()
    .min(new Date(), 'Check-in date must be in the future')
    .required('Check-in date is required'),
  checkOut: Yup.date()
    .min(Yup.ref('checkIn'), 'Check-out must be after check-in')
    .required('Check-out date is required'),
})

export const reviewValidation = Yup.object({
  rating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .required('Title is required'),
  comment: Yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .required('Comment is required'),
})
