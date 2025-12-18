const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id)

    // Join user room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`)
      console.log(`User ${userId} joined their room`)
    })

    // Join hotel owner room
    socket.on('join-owner', (ownerId) => {
      socket.join(`owner_${ownerId}`)
      console.log(`Owner ${ownerId} joined their room`)
    })

    // Booking updates
    socket.on('booking-created', (data) => {
      io.to(`owner_${data.ownerId}`).emit('new-booking', data)
      io.to(`user_${data.userId}`).emit('booking-confirmed', data)
    })

    socket.on('booking-cancelled', (data) => {
      io.to(`owner_${data.ownerId}`).emit('booking-cancelled', data)
      io.to(`user_${data.userId}`).emit('booking-cancelled', data)
    })

    // Notifications
    socket.on('send-notification', (data) => {
      io.to(`user_${data.userId}`).emit('notification', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}

export default socketHandler
