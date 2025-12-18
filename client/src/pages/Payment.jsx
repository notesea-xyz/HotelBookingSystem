import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { createPaymentOrder, verifyPayment } from '@api/paymentApi'
import { useAuth } from '@context/AuthContext'
import toast from 'react-hot-toast'

const Payment = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const amount = location.state?.amount || 0

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error('Invalid payment amount. Please try booking again.')
      return
    }

    setLoading(true)
    try {
      // Create Razorpay order
      const { data } = await createPaymentOrder(bookingId, amount)
      
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Hotel Booking System',
        description: 'Hotel Room Booking Payment',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            })
            toast.success('Payment successful!')
            navigate(`/booking-confirmation/${bookingId}`)
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: user?.firstName + ' ' + user?.lastName,
          email: user?.email,
          contact: user?.phone || '',
        },
        theme: {
          color: '#C05621',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        toast.error('Payment failed: ' + response.error.description)
      })
      rzp.open()
    } catch (error) {
      toast.error('Failed to initiate payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1 className="section-title">Payment</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            Complete Your Payment
          </h2>
          
          <div className="bg-cream p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-semibold text-brown-900">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount to Pay:</span>
              <span className="text-2xl font-bold text-primary">
                ₹{amount?.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Click below to proceed with secure payment via Razorpay
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>✓ Supports UPI, Cards, NetBanking & Wallets</li>
              <li>✓ Secure & encrypted payment gateway</li>
              <li>✓ Instant booking confirmation</li>
            </ul>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn-primary w-full text-lg py-3"
          >
            {loading ? 'Loading...' : 'Pay with Razorpay'}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payment
