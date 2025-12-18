import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// Create a write stream for logging
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
)

// Custom token for user ID
morgan.token('userId', (req) => {
  return req.user ? req.user.id : 'anonymous'
})

// Logger middleware
export const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :userId',
  { stream: accessLogStream }
)

export const devLogger = morgan('dev')
