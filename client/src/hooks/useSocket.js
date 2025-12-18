import { useEffect, useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'

export const useSocket = () => {
  const { socket } = useContext(NotificationContext)

  useEffect(() => {
    if (!socket) return

    return () => {
      // Cleanup if needed
    }
  }, [socket])

  const emit = (event, data) => {
    if (socket) {
      socket.emit(event, data)
    }
  }

  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback)
    }
  }

  const off = (event, callback) => {
    if (socket) {
      socket.off(event, callback)
    }
  }

  return { socket, emit, on, off }
}
