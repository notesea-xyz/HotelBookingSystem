import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { FaHotel, FaUser, FaBars, FaTimes, FaBell, FaHeart } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin/dashboard'
    if (user?.role === 'hotel-owner') return '/owner/dashboard'
    return '/profile'
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaHotel className="text-primary text-3xl" />
            <span className="text-2xl font-display font-bold text-brown-900">
              HotelBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/hotels" className="nav-link">
              Hotels
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="nav-link">
                  <FaHeart className="text-xl" />
                </Link>
                <Link to="/my-bookings" className="btn-primary py-2">
                  My Bookings
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-brown-900 hover:text-primary"
                  >
                    <FaUser className="text-xl" />
                    <span>{user?.firstName}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-gray-800 hover:bg-cream"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-cream"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-cream"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brown-900 text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/hotels" className="block nav-link">
              Hotels
            </Link>
            <Link to="/about" className="block nav-link">
              About
            </Link>
            <Link to="/contact" className="block nav-link">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="block nav-link">
                  Favorites
                </Link>
                <Link to="/my-bookings" className="block nav-link">
                  My Bookings
                </Link>
                <Link to={getDashboardLink()} className="block nav-link">
                  Dashboard
                </Link>
                <Link to="/profile" className="block nav-link">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block nav-link">
                  Login
                </Link>
                <Link to="/register" className="block nav-link">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
