import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createBooking } from '@api/bookingApi'
import { getRoomById } from '@api/roomApi'
import toast from 'react-hot-toast'

const Booking = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [room, setRoom] = useState(null)
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 2,
      children: 0,
    },
    guestDetails: {
      name: '',
      email: '',
      phone: '',
    },
    specialRequests: '',
  })

  useEffect(() => {
    fetchRoom()
  }, [roomId])

  const fetchRoom = async () => {
    try {
      const response = await getRoomById(roomId)
      setRoom(response.data)
    } catch (error) {
      toast.error('Failed to fetch room details')
    }
  }

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut || !room) return 0
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    if (nights <= 0) return 0
    const basePrice = room.basePrice * nights
    const taxes = basePrice * 0.1
    const serviceFee = basePrice * 0.05
    const cleaningFee = 25
    return basePrice + taxes + serviceFee + cleaningFee
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const booking = await createBooking({
        room: roomId,
        ...formData,
      })
      const totalPrice = calculateTotalPrice()
      toast.success('Booking created successfully!')
      navigate(`/payment/${booking.data._id}`, {
        state: { amount: totalPrice }
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1 className="section-title">Complete Your Booking</h1>
      
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label-text">Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Adults</label>
              <input
                type="number"
                name="guests.adults"
                value={formData.guests.adults}
                onChange={handleChange}
                className="input-field"
                min="1"
                required
              />
            </div>
            <div>
              <label className="label-text">Children</label>
              <input
                type="number"
                name="guests.children"
                value={formData.guests.children}
                onChange={handleChange}
                className="input-field"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Full Name</label>
            <input
              type="text"
              name="guestDetails.name"
              value={formData.guestDetails.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Email</label>
              <input
                type="email"
                name="guestDetails.email"
                value={formData.guestDetails.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label-text">Phone</label>
              <input
                type="tel"
                name="guestDetails.phone"
                value={formData.guestDetails.phone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="label-text">Special Requests (Optional)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="input-field"
              rows="4"
            />
          </div>

          {room && formData.checkIn && formData.checkOut && (
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="text-lg font-bold text-brown-900 mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Room: {room.name}</span>
                  <span className="font-semibold">₹{room.basePrice}/night</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Nights:</span>
                  <span className="font-semibold">
                    {Math.max(0, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>₹{(room.basePrice * Math.max(0, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (10%):</span>
                  <span>₹{(room.basePrice * Math.max(0, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))) * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee (5%):</span>
                  <span>₹{(room.basePrice * Math.max(0, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))) * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning Fee:</span>
                  <span>₹25.00</span>
                </div>
                <div className="border-t border-brown-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !room || !formData.checkIn || !formData.checkOut}
            className="btn-primary w-full"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
