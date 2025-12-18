import { useParams, Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const BookingConfirmation = () => {
  const { bookingId } = useParams()

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-display font-bold text-brown-900 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your booking has been successfully confirmed.
        </p>

        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-brown-900 mb-4">
            Booking Details
          </h2>
          <div className="space-y-2 text-left">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Status:</strong> Confirmed</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/my-bookings" className="btn-primary">
            View My Bookings
          </Link>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
