import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHotel } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brown-900 text-cream-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHotel className="text-primary text-2xl" />
              <span className="text-xl font-display font-bold">HotelBook</span>
            </div>
            <p className="text-cream-200 text-sm">
              Your trusted partner for finding and booking the perfect hotel stay.
              Discover amazing properties worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hotels" className="text-cream-200 hover:text-primary transition">
                  Browse Hotels
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-200 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-200 hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-cream-200 hover:text-primary transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-cream-200 hover:text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-cream-200 hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-cream-200 hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-cream-200 hover:text-primary transition">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-cream-200 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg text-gray-900 flex-1"
              />
              <button className="bg-primary hover:bg-primary-700 px-4 py-2 rounded-r-lg transition">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-cream-200 hover:text-primary text-xl transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-cream-200 hover:text-primary text-xl transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-cream-200 hover:text-primary text-xl transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-cream-200 hover:text-primary text-xl transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-300 pt-6 text-center text-cream-200 text-sm">
          <p>&copy; {currentYear} HotelBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
