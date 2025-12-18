# Hotel Management & Booking System

A comprehensive hotel booking platform built with MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 🏨 **Hotel Management**: Complete CRUD operations for hotels with image uploads
- 🛏️ **Room Management**: Room types, availability calendar, dynamic pricing
- 🔍 **Advanced Search**: Filter by location, dates, price, amenities, and ratings
- 📅 **Booking System**: Real-time availability checking and seamless booking flow
- 💳 **Payment Integration**: Secure payments via Stripe
- ⭐ **Review System**: Ratings, comments, and photo uploads
- 👤 **User Profiles**: Guest, Hotel Owner, and Admin roles
- 📊 **Admin Dashboard**: Analytics, user management, and content moderation
- 🏢 **Owner Dashboard**: Property management, bookings, and revenue tracking
- 🔔 **Notifications**: Email and in-app notifications
- ⚡ **Real-time Updates**: Socket.io for instant booking updates
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Stripe (Payments)
- Socket.io
- Nodemailer

## Project Structure

```
hotel-management-system/
├── client/          # React Frontend
├── server/          # Node.js Backend
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HotelBookingSystem
   ```

2. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure Environment Variables**
   
   Create `.env` files in both client and server directories (see `.env.example` files)

5. **Run the Application**

   **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

   **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```

   **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Environment Variables

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Server (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password

CLIENT_URL=http://localhost:5173
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create new hotel (Owner/Admin)
- `PUT /api/hotels/:id` - Update hotel (Owner/Admin)
- `DELETE /api/hotels/:id` - Delete hotel (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking

## User Roles

1. **Guest**: Browse hotels, make bookings, write reviews
2. **Hotel Owner**: Manage properties, rooms, view analytics
3. **Admin**: Full system access, user management, analytics

## Color Theme

- 🟧 Terracotta: #C05621
- 🤍 Cream: #FFF7ED
- 🟫 Brown: #7C2D12

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@hotelbooking.com or create an issue in the repository.
