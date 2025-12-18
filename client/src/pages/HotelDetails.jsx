import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getHotelById } from '@api/hotelApi'
import { getAllRooms } from '@api/roomApi'
import Loader from '@components/common/Loader'
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUsers, FaBed } from 'react-icons/fa'

const HotelDetails = () => {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHotel()
    fetchRooms()
  }, [id])

  const fetchHotel = async () => {
    try {
      const data = await getHotelById(id)
      setHotel(data.data)
    } catch (error) {
      console.error('Error fetching hotel:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRooms = async () => {
    try {
      const data = await getAllRooms({ hotel: id })
      setRooms(data.data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }

  if (loading) return <Loader fullScreen />
  if (!hotel) return <div>Hotel not found</div>

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-4xl font-display font-bold text-brown-900">
          {hotel.name}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt />
            <span>
              {hotel.address.city}, {hotel.address.country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span>{hotel.rating || 'New'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-6">
            <img
              src={hotel.images?.[0] || hotel.coverImage || '/images/placeholder.jpg'}
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-xl mb-3"
            />
            {hotel.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {hotel.images.slice(1, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${hotel.name} - ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">About</h2>
            <p className="text-gray-600">{hotel.description}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {hotel.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms Section */}
          <div className="card p-6 mt-6">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">Available Rooms</h2>
            {rooms.length > 0 ? (
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room._id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary transition">
                    {room.images?.[0] && (
                      <div className="relative">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-48 object-cover"
                        />
                        {room.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            +{room.images.length - 1} photos
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-brown-900">{room.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{room.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{room.basePrice}</p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaUsers />
                          <span>{room.capacity?.adults || 2} Adults</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaBed />
                          <span>{room.beds?.length || 1} Bed(s)</span>
                        </div>
                        <div>
                          <span>{room.size} sq ft</span>
                        </div>
                      </div>
                      <Link 
                        to={`/booking/${room._id}`} 
                        className="btn-primary w-full block text-center"
                      >
                        Book This Room
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No rooms available at the moment</p>
            )}
          </div>
        </div>

        <div>
          <div className="card p-6 sticky top-24">
            <h3 className="text-xl font-bold text-brown-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <span>{hotel.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>{hotel.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetails
