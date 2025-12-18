import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllHotels } from '@api/hotelApi'
import { FaSearch, FaFilter } from 'react-icons/fa'
import Loader from '@components/common/Loader'
import Pagination from '@components/common/Pagination'

const HotelCard = ({ hotel }) => (
  <div className="card overflow-hidden">
    <div className="relative">
      <img
        src={hotel.images?.[0] || hotel.coverImage || '/images/placeholder.jpg'}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      {hotel.images?.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          +{hotel.images.length - 1} photos
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-xl font-bold text-brown-900 mb-2">{hotel.name}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {hotel.address.city}, {hotel.address.country}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm">{hotel.rating || 'New'}</span>
        </div>
        <Link to={`/hotels/${hotel._id}`} className="btn-primary py-2 px-4">
          View Details
        </Link>
      </div>
    </div>
  </div>
)

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchHotels()
  }, [currentPage])

  const fetchHotels = async () => {
    try {
      setLoading(true)
      const data = await getAllHotels({ page: currentPage, limit: 12 })
      setHotels(data.data)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader fullScreen />

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title">Browse Hotels</h1>
        <p className="section-subtitle">Find your perfect stay</p>

        <div className="flex gap-4 mt-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-outline flex items-center gap-2">
            <FaFilter />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default Hotels
