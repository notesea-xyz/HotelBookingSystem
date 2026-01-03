import { createContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'https://hotelbookingsystem-1.onrender.com'
    const newSocket = io(socketUrl, {
      auth: {
        token: localStorage.getItem('token'),
      },
    })

    newSocket.on('connect', () => {
      console.log('Socket connected')
    })

    newSocket.on('notification', (notification) => {
      addNotification(notification)
      toast(notification.message, {
        icon: '🔔',
      })
    })

    newSocket.on('booking-update', (data) => {
      toast.success(`Booking ${data.status}: ${data.message}`)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    )
    setUnreadCount(0)
  }

  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    socket,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
