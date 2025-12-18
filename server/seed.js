import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import Hotel from './models/Hotel.js'
import Room from './models/Room.js'
import Review from './models/Review.js'
import Amenity from './models/Amenity.js'
import Booking from './models/Booking.js'

dotenv.config()

// Sample Users Data
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543210',
    isVerified: true,
  },
  {
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543211',
    isVerified: true,
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: 'password123',
    role: 'hotel-owner',
    phone: '+91 9876543212',
    isVerified: true,
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily@example.com',
    password: 'password123',
    role: 'hotel-owner',
    phone: '+91 9876543213',
    isVerified: true,
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 9876543214',
    isVerified: true,
  },
  {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543215',
    isVerified: true,
  },
  {
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'rahul@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543216',
    isVerified: true,
  },
  {
    firstName: 'Anita',
    lastName: 'Patel',
    email: 'anita@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543217',
    isVerified: true,
  },
  {
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543218',
    isVerified: true,
  },
  {
    firstName: 'Neha',
    lastName: 'Kapoor',
    email: 'neha@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543219',
    isVerified: true,
  },
  {
    firstName: 'Amit',
    lastName: 'Gupta',
    email: 'amit@example.com',
    password: 'password123',
    role: 'hotel-owner',
    phone: '+91 9876543220',
    isVerified: true,
  },
  {
    firstName: 'Kavita',
    lastName: 'Reddy',
    email: 'kavita@example.com',
    password: 'password123',
    role: 'hotel-owner',
    phone: '+91 9876543221',
    isVerified: true,
  },
  {
    firstName: 'Arjun',
    lastName: 'Malhotra',
    email: 'arjun@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543222',
    isVerified: true,
  },
  {
    firstName: 'Simran',
    lastName: 'Khanna',
    email: 'simran@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543223',
    isVerified: true,
  },
  {
    firstName: 'Rohan',
    lastName: 'Desai',
    email: 'rohan@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+91 9876543224',
    isVerified: true,
  },
]

// Sample Hotels Data
const hotels = [
  {
    name: 'Grand Plaza Hotel',
    description: 'Luxury hotel in the heart of the city with world-class amenities and services. Experience the finest hospitality with our elegant rooms and exceptional dining options.',
    address: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400001',
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777,
      },
    },
    contact: {
      email: 'info@grandplaza.com',
      phone: '+91 22 12345678',
    },
    starRating: 5,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'flexible',
    },
    featured: true,
  },
  {
    name: 'Sunrise Beach Resort',
    description: 'Beautiful beachfront resort with stunning ocean views. Perfect for a relaxing getaway with family and friends.',
    address: {
      street: '456 Beach Road',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403001',
      coordinates: {
        latitude: 15.2993,
        longitude: 74.1240,
      },
    },
    contact: {
      email: 'info@sunriseresort.com',
      phone: '+91 832 1234567',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    ],
    policies: {
      checkIn: '15:00',
      checkOut: '12:00',
      cancellation: 'moderate',
    },
    featured: true,
  },
  {
    name: 'Mountain View Lodge',
    description: 'Cozy mountain lodge with breathtaking views of the Himalayas. Ideal for adventure seekers and nature lovers.',
    address: {
      street: '789 Hill Station Road',
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '175131',
      coordinates: {
        latitude: 32.2396,
        longitude: 77.1887,
      },
    },
    contact: {
      email: 'info@mountainview.com',
      phone: '+91 1902 123456',
    },
    starRating: 3,
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e',
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '10:00',
      cancellation: 'flexible',
    },
    featured: false,
  },
  {
    name: 'City Center Business Hotel',
    description: 'Modern business hotel with excellent connectivity and conference facilities. Perfect for business travelers.',
    address: {
      street: '321 Business District',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560001',
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946,
      },
    },
    contact: {
      email: 'info@citycenter.com',
      phone: '+91 80 12345678',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa',
      'https://images.unsplash.com/photo-1534612899740-55c821a90129',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'moderate',
    },
    featured: false,
  },
  {
    name: 'Heritage Palace Hotel',
    description: 'Experience royal luxury in this heritage palace converted into a boutique hotel. Rich history meets modern comfort.',
    address: {
      street: '567 Palace Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302001',
      coordinates: {
        latitude: 26.9124,
        longitude: 75.7873,
      },
    },
    contact: {
      email: 'info@heritagepalace.com',
      phone: '+91 141 1234567',
    },
    starRating: 5,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
      'https://images.unsplash.com/photo-1549294413-26f195200c16',
      'https://images.unsplash.com/photo-1601574968106-b312ac309953',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'strict',
    },
    featured: true,
  },
  {
    name: 'Ocean Paradise Resort',
    description: 'Tropical paradise with pristine beaches and world-class water sports facilities. Perfect for beach lovers and adventure enthusiasts.',
    address: {
      street: '12 Coastal Highway',
      city: 'Kovalam',
      state: 'Kerala',
      country: 'India',
      zipCode: '695527',
      coordinates: {
        latitude: 8.4004,
        longitude: 76.9790,
      },
    },
    contact: {
      email: 'info@oceanparadise.com',
      phone: '+91 471 1234567',
    },
    starRating: 5,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'moderate',
    },
    featured: true,
  },
  {
    name: 'Tech Valley Hotel',
    description: 'Modern hotel in the IT hub with state-of-the-art facilities and excellent connectivity. Ideal for tech professionals.',
    address: {
      street: '789 Electronic City',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      zipCode: '500081',
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867,
      },
    },
    contact: {
      email: 'info@techvalley.com',
      phone: '+91 40 12345678',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1590073844006-33379778ae09',
      'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'flexible',
    },
    featured: false,
  },
  {
    name: 'Desert Oasis Hotel',
    description: 'Experience the magic of the desert with luxurious accommodations and authentic cultural experiences.',
    address: {
      street: '456 Desert Road',
      city: 'Jodhpur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '342001',
      coordinates: {
        latitude: 26.2389,
        longitude: 73.0243,
      },
    },
    contact: {
      email: 'info@desertoasis.com',
      phone: '+91 291 1234567',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
      'https://images.unsplash.com/photo-1549294413-26f195200c16',
      'https://images.unsplash.com/photo-1600011689032-8b628b8a8747',
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '11:00',
      cancellation: 'moderate',
    },
    featured: false,
  },
  {
    name: 'Riverside Retreat',
    description: 'Peaceful riverside hotel with scenic views and yoga facilities. Perfect for spiritual seekers and nature lovers.',
    address: {
      street: '234 Ganga Ghat',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '249201',
      coordinates: {
        latitude: 30.0869,
        longitude: 78.2676,
      },
    },
    contact: {
      email: 'info@riversideretreat.com',
      phone: '+91 135 1234567',
    },
    starRating: 3,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    ],
    policies: {
      checkIn: '12:00',
      checkOut: '10:00',
      cancellation: 'flexible',
    },
    featured: false,
  },
  {
    name: 'Lake View Palace',
    description: 'Majestic palace hotel overlooking beautiful lakes with royal heritage and modern luxury combined.',
    address: {
      street: '789 Lake Palace Road',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '313001',
      coordinates: {
        latitude: 24.5854,
        longitude: 73.7125,
      },
    },
    contact: {
      email: 'info@lakeviewpalace.com',
      phone: '+91 294 1234567',
    },
    starRating: 5,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
      'https://images.unsplash.com/photo-1601574968106-b312ac309953',
      'https://images.unsplash.com/photo-1455587734955-081b22074882',
      'https://images.unsplash.com/photo-1549294413-26f195200c16',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'strict',
    },
    featured: true,
  },
  {
    name: 'Colonial Heritage Hotel',
    description: 'Historic colonial building converted into a charming hotel with old-world elegance and modern comforts.',
    address: {
      street: '567 Park Street',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      zipCode: '700016',
      coordinates: {
        latitude: 22.5726,
        longitude: 88.3639,
      },
    },
    contact: {
      email: 'info@colonialheritage.com',
      phone: '+91 33 12345678',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'moderate',
    },
    featured: false,
  },
  {
    name: 'Hilltop Paradise Resort',
    description: 'Scenic hilltop resort with panoramic mountain views and adventure activities. Perfect for nature enthusiasts.',
    address: {
      street: '123 Hill Road',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '171001',
      coordinates: {
        latitude: 31.1048,
        longitude: 77.1734,
      },
    },
    contact: {
      email: 'info@hilltopparadise.com',
      phone: '+91 177 1234567',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e',
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '11:00',
      cancellation: 'flexible',
    },
    featured: false,
  },
  {
    name: 'Garden City Hotel',
    description: 'Contemporary hotel in the garden city with lush green surroundings and excellent amenities for all travelers.',
    address: {
      street: '890 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560001',
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946,
      },
    },
    contact: {
      email: 'info@gardencity.com',
      phone: '+91 80 87654321',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'moderate',
    },
    featured: false,
  },
  {
    name: 'Backwater Bliss Resort',
    description: 'Tranquil backwater resort offering houseboat experiences and authentic Kerala cuisine. A slice of paradise.',
    address: {
      street: '345 Backwater Lane',
      city: 'Alleppey',
      state: 'Kerala',
      country: 'India',
      zipCode: '688001',
      coordinates: {
        latitude: 9.4981,
        longitude: 76.3388,
      },
    },
    contact: {
      email: 'info@backwaterbliss.com',
      phone: '+91 477 1234567',
    },
    starRating: 4,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    ],
    policies: {
      checkIn: '12:00',
      checkOut: '10:00',
      cancellation: 'moderate',
    },
    featured: true,
  },
  {
    name: 'Royal Fort Hotel',
    description: 'Historic fort converted into a luxury hotel with regal architecture and modern amenities. Experience royalty.',
    address: {
      street: '678 Fort Road',
      city: 'Jaisalmer',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '345001',
      coordinates: {
        latitude: 26.9157,
        longitude: 70.9083,
      },
    },
    contact: {
      email: 'info@royalfort.com',
      phone: '+91 2992 123456',
    },
    starRating: 5,
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
      'https://images.unsplash.com/photo-1601574968106-b312ac309953',
      'https://images.unsplash.com/photo-1549294413-26f195200c16',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'strict',
    },
    featured: true,
  },
]

// Sample Amenities Data
const amenities = [
  { name: 'WiFi', icon: 'wifi', category: 'both', description: 'High-speed internet access' },
  { name: 'Swimming Pool', icon: 'pool', category: 'hotel', description: 'Outdoor swimming pool' },
  { name: 'Gym', icon: 'fitness', category: 'hotel', description: '24/7 fitness center' },
  { name: 'Spa', icon: 'spa', category: 'hotel', description: 'Full-service spa and wellness center' },
  { name: 'Restaurant', icon: 'restaurant', category: 'hotel', description: 'On-site dining restaurant' },
  { name: 'Bar', icon: 'bar', category: 'hotel', description: 'Bar and lounge area' },
  { name: 'Parking', icon: 'parking', category: 'hotel', description: 'Free parking facility' },
  { name: 'Room Service', icon: 'room-service', category: 'room', description: '24-hour room service' },
  { name: 'Air Conditioning', icon: 'ac', category: 'room', description: 'Climate control AC' },
  { name: 'TV', icon: 'tv', category: 'room', description: 'Flat-screen TV with cable channels' },
  { name: 'Conference Room', icon: 'meeting', category: 'hotel', description: 'Business meeting facilities' },
  { name: 'Laundry Service', icon: 'laundry', category: 'both', description: 'Professional laundry service' },
  { name: 'Airport Shuttle', icon: 'shuttle', category: 'hotel', description: 'Complimentary airport transfers' },
  { name: 'Mini Bar', icon: 'minibar', category: 'room', description: 'In-room mini bar' },
  { name: 'Balcony', icon: 'balcony', category: 'room', description: 'Private balcony or terrace' },
]

// Sample Rooms Data (will be created for each hotel)
const roomTypes = [
  {
    name: 'Deluxe King Room',
    type: 'Deluxe',
    description: 'Spacious room with modern amenities and city view',
    capacity: {
      adults: 2,
      children: 1,
    },
    beds: [{ type: 'King', count: 1 }],
    basePrice: 3500,
    size: 300,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
    ],
  },
  {
    name: 'Executive Suite',
    type: 'Suite',
    description: 'Luxurious suite with separate living area and premium facilities',
    capacity: {
      adults: 3,
      children: 1,
    },
    beds: [{ type: 'King', count: 1 }],
    basePrice: 6500,
    size: 500,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    ],
  },
  {
    name: 'Standard Queen Room',
    type: 'Standard',
    description: 'Comfortable room with essential amenities',
    capacity: {
      adults: 2,
      children: 0,
    },
    beds: [{ type: 'Queen', count: 1 }],
    basePrice: 2500,
    size: 250,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      'https://images.unsplash.com/photo-1631049035182-249067d7618e',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    ],
  },
  {
    name: 'Deluxe Family Room',
    type: 'Deluxe',
    description: 'Spacious room perfect for families with children',
    capacity: {
      adults: 2,
      children: 2,
    },
    beds: [{ type: 'Queen', count: 2 }],
    basePrice: 5000,
    size: 450,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
      'https://images.unsplash.com/photo-1616594266837-5b8f9240a4f8',
    ],
  },
  {
    name: 'Presidential Suite',
    type: 'Presidential Suite',
    description: 'Ultimate luxury with panoramic views and premium services',
    capacity: {
      adults: 4,
      children: 2,
    },
    beds: [{ type: 'King', count: 1 }, { type: 'Queen', count: 1 }],
    basePrice: 12000,
    size: 800,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843',
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9',
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
    ],
  },
]

// Sample Reviews Data
const reviewsData = [
  {
    rating: 5,
    title: 'Absolutely Amazing Experience!',
    comment: 'Absolutely amazing experience! The staff was incredibly helpful and the rooms were spotless. Would definitely recommend to anyone visiting the city.',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Great Hotel with Excellent Facilities',
    comment: 'Great hotel with excellent facilities. The only minor issue was the breakfast variety could be better. Overall, a wonderful stay!',
    categories: {
      cleanliness: 5,
      service: 4,
      location: 5,
      value: 4,
    },
    isApproved: true,
  },
  {
    rating: 5,
    title: 'Perfect Location and Beautiful Property',
    comment: 'Perfect location and beautiful property. The view from our room was breathtaking. Staff went above and beyond to make our stay comfortable.',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 3,
    title: 'Decent Hotel for the Price',
    comment: 'Decent hotel for the price. Rooms were clean but a bit dated. Service was good but could be faster. Location is convenient.',
    categories: {
      cleanliness: 4,
      service: 3,
      location: 4,
      value: 3,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Lovely Hotel with Great Ambiance',
    comment: 'Lovely hotel with great ambiance. The spa services were excellent. Would have given 5 stars if the WiFi was more reliable.',
    categories: {
      cleanliness: 5,
      service: 4,
      location: 4,
      value: 4,
    },
    isApproved: true,
  },
  {
    rating: 5,
    title: 'Exceptional Service and Comfort',
    comment: 'From check-in to check-out, everything was perfect! The room was spacious, clean, and well-appointed. The concierge helped us plan our entire trip. Highly recommend!',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Wonderful Stay with Minor Issues',
    comment: 'Overall a wonderful stay. The hotel has beautiful architecture and comfortable rooms. Only issue was some noise from the hallway at night. Still would come back!',
    categories: {
      cleanliness: 5,
      service: 4,
      location: 5,
      value: 4,
    },
    isApproved: true,
  },
  {
    rating: 5,
    title: 'Best Hotel Experience Ever!',
    comment: 'This is by far the best hotel I have stayed at! Every detail was carefully thought out. The restaurant served amazing food, and the pool area was pristine. Will definitely return!',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 3,
    title: 'Average Experience',
    comment: 'The hotel is okay for a short stay. Rooms are basic but functional. Location is good but parking is limited. Staff could be more attentive.',
    categories: {
      cleanliness: 3,
      service: 3,
      location: 4,
      value: 3,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Great Value for Money',
    comment: 'Got a great deal for this hotel. Rooms are clean and spacious. The breakfast buffet was impressive with lots of variety. Pool and gym facilities are excellent.',
    categories: {
      cleanliness: 4,
      service: 4,
      location: 4,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 5,
    title: 'Paradise Found!',
    comment: 'This hotel is absolutely stunning! The views are incredible, rooms are luxurious, and the staff treats you like royalty. Worth every penny!',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Comfortable and Convenient',
    comment: 'Very comfortable hotel with great amenities. Close to all major attractions. Room service was prompt. Would recommend for business or leisure travel.',
    categories: {
      cleanliness: 4,
      service: 4,
      location: 5,
      value: 4,
    },
    isApproved: true,
  },
  {
    rating: 2,
    title: 'Disappointed',
    comment: 'Expected much better for the price. Room was not properly cleaned, and AC was not working. Had to wait long for room service. Not recommended.',
    categories: {
      cleanliness: 2,
      service: 2,
      location: 3,
      value: 2,
    },
    isApproved: true,
  },
  {
    rating: 5,
    title: 'Memorable Anniversary Stay',
    comment: 'Celebrated our anniversary here and it was magical! The hotel arranged a special dinner, decorated our room, and the staff was so attentive. Unforgettable experience!',
    categories: {
      cleanliness: 5,
      service: 5,
      location: 5,
      value: 5,
    },
    isApproved: true,
  },
  {
    rating: 4,
    title: 'Good Business Hotel',
    comment: 'Perfect for business trips. Conference facilities are excellent, fast WiFi, and good work desk in the room. Restaurant serves quality food. Will stay again on my next visit.',
    categories: {
      cleanliness: 4,
      service: 4,
      location: 5,
      value: 4,
    },
    isApproved: true,
  },
]

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany()
    await Hotel.deleteMany()
    await Room.deleteMany()
    await Review.deleteMany()
    await Booking.deleteMany()
    await Amenity.deleteMany()
    console.log('🗑️  Existing data cleared')
  } catch (error) {
    console.error('❌ Error clearing data:', error)
    throw error
  }
}

// Seed Users
const seedUsers = async () => {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    )
    const createdUsers = await User.insertMany(hashedUsers)
    console.log('✅ Users seeded:', createdUsers.length)
    return createdUsers
  } catch (error) {
    console.error('❌ Error seeding users:', error)
    throw error
  }
}

// Seed Amenities
const seedAmenities = async () => {
  try {
    const createdAmenities = await Amenity.insertMany(amenities)
    console.log('✅ Amenities seeded:', createdAmenities.length)
    return createdAmenities
  } catch (error) {
    console.error('❌ Error seeding amenities:', error)
    throw error
  }
}

// Seed Hotels
const seedHotels = async (users, amenitiesList) => {
  try {
    // Get hotel owners
    const hotelOwners = users.filter((u) => u.role === 'hotel-owner')
    
    const hotelsWithOwners = hotels.map((hotel, index) => ({
      ...hotel,
      owner: hotelOwners[index % hotelOwners.length]._id,
      amenities: amenitiesList
        .slice(0, 5 + (index % 5))
        .map((a) => a._id),
    }))

    const createdHotels = await Hotel.insertMany(hotelsWithOwners)
    console.log('✅ Hotels seeded:', createdHotels.length)
    return createdHotels
  } catch (error) {
    console.error('❌ Error seeding hotels:', error)
    throw error
  }
}

// Seed Rooms
const seedRooms = async (hotels, amenitiesList) => {
  try {
    const rooms = []
    
    hotels.forEach((hotel, hotelIndex) => {
      roomTypes.forEach((roomType, index) => {
        rooms.push({
          hotel: hotel._id,
          name: roomType.name,
          type: roomType.type,
          description: roomType.description,
          capacity: roomType.capacity,
          beds: roomType.beds,
          size: roomType.size,
          basePrice: roomType.basePrice,
          images: roomType.images,
          floor: Math.floor(Math.random() * 10) + 1,
          amenities: amenitiesList
            .filter(a => a.category === 'room' || a.category === 'both')
            .slice(0, 5)
            .map((a) => a._id),
          pricing: {
            weekday: roomType.basePrice,
            weekend: roomType.basePrice * 1.2,
            seasonal: [
              {
                startDate: new Date('2025-12-20'),
                endDate: new Date('2026-01-10'),
                price: roomType.basePrice * 1.5,
              },
            ],
          },
          availability: {
            status: 'available',
          },
        })
      })
    })

    const createdRooms = await Room.insertMany(rooms)
    console.log('✅ Rooms seeded:', createdRooms.length)
    return createdRooms
  } catch (error) {
    console.error('❌ Error seeding rooms:', error)
    throw error
  }
}

// Seed Bookings
const seedBookings = async (users, hotels, rooms) => {
  try {
    const guests = users.filter((u) => u.role === 'guest')
    const bookings = []
    let bookingCounter = 1

    hotels.forEach((hotel, hotelIndex) => {
      const hotelRooms = rooms.filter((r) => r.hotel.toString() === hotel._id.toString())
      
      reviewsData.forEach((_, reviewIndex) => {
        const guest = guests[reviewIndex % guests.length]
        const checkIn = new Date(Date.now() - ((reviewIndex + 1) * 30 * 24 * 60 * 60 * 1000))
        const checkOut = new Date(checkIn.getTime() + (3 * 24 * 60 * 60 * 1000))
        const room = hotelRooms[reviewIndex % hotelRooms.length]
        const nights = 3
        const totalPrice = room.basePrice * nights
        
        bookings.push({
          bookingNumber: `BK${Date.now()}${bookingCounter++}`,
          user: guest._id,
          hotel: hotel._id,
          room: room._id,
          checkIn,
          checkOut,
          nights,
          guests: {
            adults: 2,
            children: 0,
          },
          totalPrice,
          priceBreakdown: {
            basePrice: room.basePrice * nights,
            taxes: room.basePrice * nights * 0.12,
            serviceFee: 500,
            cleaningFee: 300,
            discount: 0,
          },
          status: 'completed',
          guestDetails: {
            name: `${guest.firstName} ${guest.lastName}`,
            email: guest.email,
            phone: guest.phone,
          },
        })
      })
    })

    const createdBookings = await Booking.insertMany(bookings)
    console.log('✅ Bookings seeded:', createdBookings.length)
    return createdBookings
  } catch (error) {
    console.error('❌ Error seeding bookings:', error)
    throw error
  }
}

// Seed Reviews
const seedReviews = async (users, hotels, bookings) => {
  try {
    const reviews = []

    hotels.forEach((hotel, hotelIndex) => {
      const hotelBookings = bookings.filter(
        (b) => b.hotel.toString() === hotel._id.toString()
      )
      
      hotelBookings.forEach((booking, reviewIndex) => {
        if (reviewIndex < reviewsData.length) {
          reviews.push({
            ...reviewsData[reviewIndex],
            hotel: hotel._id,
            user: booking.user,
            booking: booking._id,
            createdAt: new Date(Date.now() - (reviewIndex * 7 * 24 * 60 * 60 * 1000)),
          })
        }
      })
    })

    const createdReviews = await Review.insertMany(reviews)
    console.log('✅ Reviews seeded:', createdReviews.length)
    
    // Update hotel ratings
    for (const hotel of hotels) {
      const hotelReviews = createdReviews.filter(
        (r) => r.hotel.toString() === hotel._id.toString()
      )
      
      if (hotelReviews.length > 0) {
        const avgRating =
          hotelReviews.reduce((sum, r) => sum + r.rating, 0) / hotelReviews.length
        
        hotel.rating = Math.round(avgRating * 10) / 10
        hotel.reviewCount = hotelReviews.length
        await hotel.save()
      }
    }
    
    console.log('✅ Hotel ratings updated')
    return createdReviews
  } catch (error) {
    console.error('❌ Error seeding reviews:', error)
    throw error
  }
}

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n')

    await connectDB()
    await clearData()

    const createdUsers = await seedUsers()
    const createdAmenities = await seedAmenities()
    const createdHotels = await seedHotels(createdUsers, createdAmenities)
    const createdRooms = await seedRooms(createdHotels, createdAmenities)
    const createdBookings = await seedBookings(createdUsers, createdHotels, createdRooms)
    const createdReviews = await seedReviews(createdUsers, createdHotels, createdBookings)

    console.log('\n✅ Database seeding completed successfully!')
    console.log(`
📊 Summary:
   - Users: ${createdUsers.length}
   - Hotels: ${createdHotels.length}
   - Rooms: ${createdRooms.length}
   - Bookings: ${createdBookings.length}
   - Reviews: ${createdReviews.length}
   - Amenities: ${createdAmenities.length}

🔑 Test Credentials:
   Guest: john@example.com / password123
   Owner: mike@example.com / password123
   Admin: admin@example.com / admin123
`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run seeding
seedDatabase()
