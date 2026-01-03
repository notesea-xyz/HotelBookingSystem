# Hotel Booking System - Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HotelBookingSystem
```

### 2. Setup Backend (Server)

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your credentials:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

CLIENT_URL=http://localhost:5173
```

### 3. Setup Frontend (Client)

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file:
```env
VITE_API_URL=https://hotelbookingsystem-1.onrender.com/api
VITE_SOCKET_URL=https://hotelbookingsystem-1.onrender.com
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 5. Run the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

The server will start on https://hotelbookingsystem-1.onrender.com

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

The client will start on http://localhost:5173

## Configuration Guide

### Cloudinary Setup
1. Create account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add credentials to server `.env` file

### Stripe Setup
1. Create account at https://stripe.com
2. Get test API keys from the dashboard
3. Add secret key to server `.env` and public key to client `.env`

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in your `.env` file

## Testing the Application

### Create Admin User

Open MongoDB Compass or MongoDB shell and run:
```javascript
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@hotelbook.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash
  phone: "1234567890",
  role: "admin",
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or register through the application and manually update the role in the database.

### Test Credentials for Development

**Admin:**
- Email: admin@hotelbook.com
- Password: admin123

**Hotel Owner:**
- Email: owner@hotelbook.com
- Password: owner123

**Guest:**
- Email: guest@hotelbook.com
- Password: guest123

## Available Scripts

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (Mac/Linux)
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in platform dashboard
2. Update `MONGO_URI` to production MongoDB Atlas URI
3. Set `NODE_ENV=production`
4. Deploy using Git or platform CLI

### Frontend Deployment (Vercel/Netlify)
1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

## Project Structure

```
HotelBookingSystem/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
│
└── server/                # Node.js backend
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── middleware/        # Express middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── services/          # Business logic
    ├── socket/            # Socket.io handlers
    └── utils/             # Utility functions
```

## Support

For issues and questions:
- Create an issue in the repository
- Email: support@hotelbook.com

## License

MIT License - See LICENSE file for details
