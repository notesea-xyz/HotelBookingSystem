import { useState, useEffect } from 'react'
import { getUserBookings } from '@api/bookingApi'
import { useAuth } from '@hooks/useAuth'
import Loader from '@components/common/Loader'

const MyBookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings(user.id)
      setBookings(data.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader fullScreen />

  return (
    <div className="page-container">
      <h1 className="section-title">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-brown-900">
                    {booking.hotel?.name}
                  </h3>
                  <p className="text-gray-600">{booking.room?.name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Booking ID: {booking.bookingNumber}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
