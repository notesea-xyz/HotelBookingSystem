import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="page-container">
      <h1 className="section-title">Contact Us</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="label-text">Name</label>
              <input type="text" className="input-field" />
            </div>
            <div>
              <label className="label-text">Email</label>
              <input type="email" className="input-field" />
            </div>
            <div>
              <label className="label-text">Message</label>
              <textarea className="input-field" rows="4"></textarea>
            </div>
            <button className="btn-primary w-full">Send Message</button>
          </form>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-xl" />
              <span>support@hotelbooking.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-primary text-xl" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span>123 Main St, City, Country</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
