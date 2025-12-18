import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import connectDB from './config/database.js'
import socketHandler from './socket/socketHandler.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Create HTTP server
const httpServer = createServer(app)

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
})

// Socket.io connection
socketHandler(io)

// Start server
const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  console.log(`API URL: http://localhost:${PORT}/api`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`)
  httpServer.close(() => process.exit(1))
})
