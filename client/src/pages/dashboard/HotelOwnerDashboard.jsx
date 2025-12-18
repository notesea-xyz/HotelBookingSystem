const HotelOwnerDashboard = () => {
  return (
    <div className="page-container">
      <h1 className="section-title">Hotel Owner Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">My Hotels</h3>
          <p className="text-3xl font-bold text-brown-900">0</p>
        </div>
        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-brown-900">0</p>
        </div>
        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-brown-900">$0</p>
        </div>
      </div>
    </div>
  )
}

export default HotelOwnerDashboard
