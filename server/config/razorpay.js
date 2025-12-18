import Razorpay from 'razorpay'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

let razorpay = null

// Only initialize Razorpay if credentials are provided
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && 
    process.env.RAZORPAY_KEY_ID !== 'your_razorpay_key_id') {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
  console.log('✅ Razorpay initialized successfully')
} else {
  console.warn('⚠️  Razorpay credentials not configured. Payment features will be disabled.')
}

export default razorpay
