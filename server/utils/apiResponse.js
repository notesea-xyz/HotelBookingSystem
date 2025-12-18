export const sendSuccess = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    success: true,
    message: message || 'Success',
    data,
  })
}

export const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message: message || 'Error',
  })
}

export const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  })
}
