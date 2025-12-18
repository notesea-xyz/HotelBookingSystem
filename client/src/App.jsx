import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Hotels from './pages/Hotels'
import HotelDetails from './pages/HotelDetails'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import BookingConfirmation from './pages/BookingConfirmation'
import Profile from './pages/Profile'
import MyBookings from './pages/MyBookings'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard'
import HotelOwnerDashboard from './pages/dashboard/HotelOwnerDashboard'
import ManageUsers from './pages/dashboard/ManageUsers'
import ManageHotels from './pages/dashboard/ManageHotels'
import ManageRooms from './pages/dashboard/ManageRooms'
import ManageBookings from './pages/dashboard/ManageBookings'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/booking/:roomId" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/payment/:bookingId" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/booking-confirmation/:bookingId" element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/hotels" element={
            <ProtectedRoute role="admin">
              <ManageHotels />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute role="admin">
              <ManageBookings />
            </ProtectedRoute>
          } />

          {/* Hotel Owner Routes */}
          <Route path="/owner/dashboard" element={
            <ProtectedRoute role="hotel-owner">
              <HotelOwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/owner/hotels" element={
            <ProtectedRoute role="hotel-owner">
              <ManageHotels />
            </ProtectedRoute>
          } />
          <Route path="/owner/rooms" element={
            <ProtectedRoute role="hotel-owner">
              <ManageRooms />
            </ProtectedRoute>
          } />
          <Route path="/owner/bookings" element={
            <ProtectedRoute role="hotel-owner">
              <ManageBookings />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFF7ED',
            color: '#7C2D12',
            border: '2px solid #C05621',
          },
          success: {
            iconTheme: {
              primary: '#C05621',
              secondary: '#FFF7ED',
            },
          },
        }}
      />
    </div>
  )
}

export default App
