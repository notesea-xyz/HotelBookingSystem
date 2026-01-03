import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import connectDB from './config/database.js'
import socketHandler from './socket/socketHandler.js'

dotenv.config()

connectDB()

if (!process.env.CLIENT_URL) {
  throw new Error('CLIENT_URL is not defined');
}

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST'],
  },
})

socketHandler(io)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Safety
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`)
  httpServer.close(() => process.exit(1))
})
