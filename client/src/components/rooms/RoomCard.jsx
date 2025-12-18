import { FaBed, FaUsers, FaExpand } from 'react-icons/fa'

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="card overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={room.images?.[0] || '/images/placeholder.jpg'}
            alt={room.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-brown-900 mb-2">{room.name}</h3>
              <span className="inline-block bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                {room.type}
              </span>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">
                ${room.basePrice}
              </p>
              <p className="text-sm text-gray-600">per night</p>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <FaUsers className="mr-2 text-primary" />
              <span className="text-sm">
                {room.capacity?.adults} Adults, {room.capacity?.children} Children
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaBed className="mr-2 text-primary" />
              <span className="text-sm">
                {room.beds?.length || 1} {room.beds?.length === 1 ? 'Bed' : 'Beds'}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaExpand className="mr-2 text-primary" />
              <span className="text-sm">{room.size} sq ft</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {room.amenities?.slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="bg-cream text-brown-800 px-3 py-1 rounded-lg text-xs"
              >
                {amenity.name || amenity}
              </span>
            ))}
            {room.amenities?.length > 4 && (
              <span className="text-primary text-xs py-1">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>

          <button
            onClick={() => onBook(room)}
            className="btn-primary w-full md:w-auto"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
