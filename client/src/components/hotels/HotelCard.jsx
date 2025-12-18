import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import RatingStars from '../reviews/RatingStars'

const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/hotels/${hotel._id}`}>
      <div className="card overflow-hidden h-full hover:scale-105 transition-transform duration-300">
        <div className="relative h-48">
          <img
            src={hotel.coverImage || hotel.images?.[0] || '/images/placeholder.jpg'}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          {hotel.isFeatured && (
            <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-brown-900 mb-2 line-clamp-1">
            {hotel.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            <span className="text-sm">{hotel.address?.city}, {hotel.address?.country}</span>
          </div>
          
          <div className="flex items-center mb-3">
            <RatingStars rating={hotel.rating || 0} size="text-sm" />
            <span className="ml-2 text-sm text-gray-600">
              ({hotel.reviewCount || 0})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600 text-sm">From</span>
              <p className="text-2xl font-bold text-primary">
                ${hotel.rooms?.[0]?.basePrice || 99}
                <span className="text-sm text-gray-600">/night</span>
              </p>
            </div>
            
            <div className="flex">
              {[...Array(hotel.starRating || 3)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
