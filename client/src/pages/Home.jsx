import { Link } from 'react-router-dom'
import { FaSearch, FaCalendar, FaStar, FaUsers, FaMapMarkerAlt, FaHotel, FaUmbrellaBeach, FaMountain, FaBuilding, FaCheckCircle, FaCrown, FaTag, FaPercent, FaShieldAlt, FaGlobe, FaMobileAlt, FaEnvelope } from 'react-icons/fa'

const Home = () => {
  const popularDestinations = [
    {
      name: 'Mumbai',
      hotels: 150,
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500',
      description: 'The City of Dreams'
    },
    {
      name: 'Goa',
      hotels: 200,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500',
      description: 'Beach Paradise'
    },
    {
      name: 'Manali',
      hotels: 120,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500',
      description: 'Mountain Retreat'
    },
    {
      name: 'Jaipur',
      hotels: 180,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500',
      description: 'The Pink City'
    }
  ]

  const featuredHotels = [
    {
      name: 'Grand Plaza Hotel',
      location: 'Mumbai',
      rating: 5,
      price: 3500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
    },
    {
      name: 'Heritage Palace Hotel',
      location: 'Jaipur',
      rating: 5,
      price: 6500,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500'
    },
    {
      name: 'Sunrise Beach Resort',
      location: 'Goa',
      rating: 4,
      price: 4500,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-primary text-white py-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background Images */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-brown-600/90 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200" 
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          />
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200" 
            alt="Hero background 2"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom animation-delay-5000 opacity-0"
          />
        </div>
        {/* Floating Images */}
       
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl mb-8 text-cream-100 animate-slide-up">
              Discover and book amazing hotels worldwide with the best prices
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-6 shadow-2xl animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                  />
                </div>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                  />
                </div>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                  />
                </div>
                <button className="btn-primary w-full">
                  Search Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Image Banner */}
      <section className="py-8 bg-gradient-to-r from-cream-50 to-white overflow-hidden">
        <div className="flex gap-4 animate-scroll">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250" alt="Hotel" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250" alt="Beach" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250" alt="Suite" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=250" alt="Palace" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250" alt="Resort" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250" alt="Mountain" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          {/* Duplicate for seamless loop */}
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250" alt="Hotel" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250" alt="Beach" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250" alt="Suite" className="h-40 w-64 object-cover rounded-xl shadow-md flex-shrink-0" />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Explore the most loved destinations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Link
                key={index}
                to="/hotels"
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{destination.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <FaHotel />
                      <span>{destination.hotels}+ Hotels</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200" 
            alt="Stats background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-brown-600/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-110 transition">
              <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHotel className="text-4xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">500+</div>
              <div className="text-cream-200">Hotels Worldwide</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">50K+</div>
              <div className="text-cream-200">Happy Customers</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-4xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">100K+</div>
              <div className="text-cream-200">Bookings</div>
            </div>
            <div className="text-center transform hover:scale-110 transition">
              <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-4xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">4.8★</div>
              <div className="text-cream-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Special Offers</h2>
            <p className="section-subtitle">Exclusive deals you don't want to miss</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500"
                alt="Early Bird Offer"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full inline-block w-fit mb-3">
                  <span className="font-bold">30% OFF</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Early Bird Special</h3>
                <p className="text-cream-200 text-sm mb-3">Book 30 days in advance and save big</p>
                <Link to="/hotels" className="btn-secondary w-fit">
                  Claim Offer
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500"
                alt="Weekend Getaway"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full inline-block w-fit mb-3">
                  <span className="font-bold">25% OFF</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Weekend Escape</h3>
                <p className="text-cream-200 text-sm mb-3">Special rates on weekend bookings</p>
                <Link to="/hotels" className="btn-secondary w-fit">
                  Claim Offer
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500"
                alt="Long Stay"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full inline-block w-fit mb-3">
                  <span className="font-bold">40% OFF</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Long Stay Discount</h3>
                <p className="text-cream-200 text-sm mb-3">Stay 7+ nights and get amazing deals</p>
                <Link to="/hotels" className="btn-secondary w-fit">
                  Claim Offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Categories */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find hotels that match your style</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/hotels" className="group">
              <div className="card p-6 text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FaCrown className="text-3xl text-white" />
                </div>
                <h3 className="font-bold text-brown-900 mb-1">Luxury</h3>
                <p className="text-sm text-gray-600">5-Star Hotels</p>
              </div>
            </Link>
            <Link to="/hotels" className="group">
              <div className="card p-6 text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FaUmbrellaBeach className="text-3xl text-white" />
                </div>
                <h3 className="font-bold text-brown-900 mb-1">Beach</h3>
                <p className="text-sm text-gray-600">Coastal Resorts</p>
              </div>
            </Link>
            <Link to="/hotels" className="group">
              <div className="card p-6 text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FaMountain className="text-3xl text-white" />
                </div>
                <h3 className="font-bold text-brown-900 mb-1">Mountain</h3>
                <p className="text-sm text-gray-600">Hill Stations</p>
              </div>
            </Link>
            <Link to="/hotels" className="group">
              <div className="card p-6 text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FaBuilding className="text-3xl text-white" />
                </div>
                <h3 className="font-bold text-brown-900 mb-1">Business</h3>
                <p className="text-sm text-gray-600">City Centers</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Hotels</h2>
            <p className="section-subtitle">Handpicked luxury stays for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="font-bold text-sm">{hotel.rating}.0</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown-900 mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{hotel.price}</span>
                      <span className="text-sm text-gray-500">/night</span>
                    </div>
                    <Link to="/hotels" className="btn-primary py-2 px-4">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/hotels" className="btn-outline">
              View All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="card p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                We guarantee the best prices for your hotel bookings
              </p>
            </div>
            <div className="card p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Trusted Service</h3>
              <p className="text-gray-600 text-sm">
                Over 1 million satisfied customers worldwide
              </p>
            </div>
            <div className="card p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendar className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600 text-sm">
                Book your stay in just a few clicks
              </p>
            </div>
            <div className="card p-6 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHotel className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Best Selection</h3>
              <p className="text-gray-600 text-sm">
                Choose from thousands of verified hotels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Mosaic Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Discover Amazing Places</h2>
            <p className="section-subtitle">A visual journey through our finest properties</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" 
                alt="Luxury Hotel" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Luxury Hotels</h3>
                  <p className="text-sm">Experience 5-star comfort</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" 
                alt="Beach Resort" 
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">Beach Resorts</h3>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400" 
                alt="Pool View" 
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">Pool & Spa</h3>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400" 
                alt="Heritage" 
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">Heritage</h3>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" 
                alt="Suite" 
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">Suites</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section with Images */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-brown-900 mb-6">
                Experience Luxury & Comfort
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                From beachfront resorts to mountain retreats, heritage palaces to modern business hotels - 
                find your perfect stay with us. Every property is handpicked and verified to ensure the 
                highest standards of comfort and service.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <FaUmbrellaBeach className="text-primary text-2xl mt-1" />
                  <div>
                    <h4 className="font-bold text-brown-900 mb-1">Beach Resorts</h4>
                    <p className="text-gray-600 text-sm">Relax by pristine beaches with world-class amenities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMountain className="text-primary text-2xl mt-1" />
                  <div>
                    <h4 className="font-bold text-brown-900 mb-1">Mountain Lodges</h4>
                    <p className="text-gray-600 text-sm">Experience breathtaking views and adventure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaBuilding className="text-primary text-2xl mt-1" />
                  <div>
                    <h4 className="font-bold text-brown-900 mb-1">City Hotels</h4>
                    <p className="text-gray-600 text-sm">Stay connected with modern business facilities</p>
                  </div>
                </div>
              </div>
              <Link to="/hotels" className="btn-primary inline-block">
                Explore All Hotels
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"
                  alt="Luxury room"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
                  alt="Beach view"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"
                  alt="Resort pool"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
                  alt="Hotel lobby"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Guests Say</h2>
            <p className="section-subtitle">Real experiences from real travelers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Amazing experience! The booking was smooth and the hotel exceeded our expectations. 
                Will definitely use this platform again."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  alt="Guest"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-brown-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Traveled to Goa</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Best prices guaranteed! Found an incredible deal on a luxury resort. 
                The entire process was hassle-free."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Guest"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-brown-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Traveled to Mumbai</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Love how easy it is to find and book hotels. The selection is amazing and 
                customer service is top-notch!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                  alt="Guest"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-brown-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Traveled to Jaipur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Your Safety is Our Priority</h2>
            <p className="section-subtitle">Book with confidence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-3xl text-green-600" />
              </div>
              <h3 className="font-bold text-brown-900 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">100% secure transactions with encryption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-3xl text-blue-600" />
              </div>
              <h3 className="font-bold text-brown-900 mb-2">Verified Hotels</h3>
              <p className="text-sm text-gray-600">All properties verified & inspected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-3xl text-purple-600" />
              </div>
              <h3 className="font-bold text-brown-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock customer assistance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPercent className="text-3xl text-orange-600" />
              </div>
              <h3 className="font-bold text-brown-900 mb-2">Best Price</h3>
              <p className="text-sm text-gray-600">Guaranteed lowest rates available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-brown-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex justify-center md:justify-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300"
                  alt="Mobile app"
                  className="w-48 h-96 object-cover rounded-3xl shadow-2xl transform rotate-6"
                />
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300"
                  alt="Mobile app"
                  className="w-48 h-96 object-cover rounded-3xl shadow-2xl transform -rotate-6 mt-8"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <FaMobileAlt className="text-6xl mb-6" />
              <h2 className="text-4xl font-display font-bold mb-6">
                Book On The Go
              </h2>
              <p className="text-xl mb-6 text-cream-100">
                Download our mobile app for exclusive deals, faster bookings, and seamless travel planning.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />
                  <span>Exclusive mobile-only deals</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />
                  <span>Easy booking in 3 simple steps</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />
                  <span>Get instant booking confirmations</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-300" />
                  <span>Access your bookings offline</span>
                </li>
              </ul>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
                  <FaMobileAlt />
                  <span>App Store</span>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
                  <FaMobileAlt />
                  <span>Play Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 text-center bg-gradient-to-r from-primary/5 to-brown-600/5">
              <FaEnvelope className="text-5xl text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-display font-bold text-brown-900 mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Get exclusive deals, travel tips, and special offers delivered to your inbox
              </p>
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
                <button className="btn-primary px-8 py-4 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Join 50,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram-style Image Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Captured Moments</h2>
            <p className="section-subtitle">Share your travel stories with #StayWithUs</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300" alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300" alt="View" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300" alt="Bed" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300" alt="Family" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=300" alt="Luxury" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300" alt="Living" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200" 
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-brown-700/90"></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200" 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-cream-100">
            Join thousands of travelers who trust us with their bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hotels" className="btn-secondary inline-block px-8 py-4 text-lg">
              Browse Hotels
            </Link>
            <Link to="/register" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-cream-100 transition inline-block text-lg">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
