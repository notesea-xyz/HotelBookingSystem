import Notification from '../models/Notification.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50)

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications,
  })
})

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found',
    })
  }

  notification.read = true
  await notification.save()

  res.status(200).json({
    success: true,
    data: notification,
  })
})
