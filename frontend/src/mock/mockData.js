// Mock data for Gaddi24x7

export const vehicleTypes = [
  {
    id: 'auto',
    name: 'Auto',
    icon: '🛺',
    capacity: '3 seats',
    pricePerKm: 12,
    basePrice: 30,
    eta: '2 min',
    image: 'https://images.unsplash.com/photo-1642331395578-62fc20996c2a?w=400'
  },
  {
    id: 'mini',
    name: 'Mini',
    icon: '🚗',
    capacity: '4 seats',
    pricePerKm: 15,
    basePrice: 50,
    eta: '3 min',
    image: 'https://images.unsplash.com/photo-1564294913443-70baba520b36?w=400'
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: '🚘',
    capacity: '4 seats',
    pricePerKm: 20,
    basePrice: 80,
    eta: '5 min',
    image: 'https://images.unsplash.com/photo-1767022705480-1266a3865c03?w=400'
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: '🚙',
    capacity: '6 seats',
    pricePerKm: 25,
    basePrice: 120,
    eta: '7 min',
    image: 'https://images.pexels.com/photos/35387549/pexels-photo-35387549.jpeg?w=400'
  }
];

export const mockRides = [
  {
    id: 'R001',
    customerId: 'C001',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    driverId: 'D001',
    driverName: 'Amit Kumar',
    driverPhone: '+91 98765 11111',
    vehicleType: 'sedan',
    vehicleNumber: 'DL 01 AB 1234',
    pickupLocation: 'Connaught Place, New Delhi',
    dropLocation: 'Indira Gandhi International Airport',
    pickupCoords: { lat: 28.6315, lng: 77.2167 },
    dropCoords: { lat: 28.5562, lng: 77.1000 },
    distance: 18.5,
    duration: 35,
    fare: 450,
    paymentMethod: 'wallet',
    status: 'completed',
    rating: 4.5,
    timestamp: new Date('2025-01-15T10:30:00'),
    otp: '4567'
  },
  {
    id: 'R002',
    customerId: 'C002',
    customerName: 'Priya Singh',
    customerPhone: '+91 98765 43211',
    driverId: 'D002',
    driverName: 'Rajesh Verma',
    driverPhone: '+91 98765 22222',
    vehicleType: 'auto',
    vehicleNumber: 'DL 02 CD 5678',
    pickupLocation: 'Karol Bagh, Delhi',
    dropLocation: 'Rajouri Garden Metro Station',
    pickupCoords: { lat: 28.6519, lng: 77.1909 },
    dropCoords: { lat: 28.6410, lng: 77.1200 },
    distance: 5.2,
    duration: 15,
    fare: 92,
    paymentMethod: 'cash',
    status: 'ongoing',
    rating: null,
    timestamp: new Date(),
    otp: '1234'
  }
];

export const mockDrivers = [
  {
    id: 'D001',
    name: 'Amit Kumar',
    phone: '+91 98765 11111',
    email: 'amit@gaddi24x7.com',
    vehicleType: 'sedan',
    vehicleNumber: 'DL 01 AB 1234',
    vehicleModel: 'Maruti Suzuki Dzire',
    licenseNumber: 'DL1234567890',
    rating: 4.8,
    totalRides: 1250,
    totalEarnings: 125000,
    status: 'available',
    currentLocation: { lat: 28.6315, lng: 77.2167 },
    documents: {
      license: 'verified',
      registration: 'verified',
      insurance: 'verified',
      photo: 'verified'
    },
    joiningDate: '2023-01-15',
    wallet: 5240
  },
  {
    id: 'D002',
    name: 'Rajesh Verma',
    phone: '+91 98765 22222',
    email: 'rajesh@gaddi24x7.com',
    vehicleType: 'auto',
    vehicleNumber: 'DL 02 CD 5678',
    vehicleModel: 'Bajaj Auto',
    licenseNumber: 'DL9876543210',
    rating: 4.6,
    totalRides: 2100,
    totalEarnings: 189000,
    status: 'busy',
    currentLocation: { lat: 28.6519, lng: 77.1909 },
    documents: {
      license: 'verified',
      registration: 'verified',
      insurance: 'verified',
      photo: 'verified'
    },
    joiningDate: '2022-08-20',
    wallet: 8950
  }
];

export const mockCustomers = [
  {
    id: 'C001',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@example.com',
    wallet: 250,
    totalRides: 45,
    rating: 4.7,
    joiningDate: '2024-06-10',
    savedLocations: [
      { id: 'home', label: 'Home', address: 'Sector 18, Noida', coords: { lat: 28.5706, lng: 77.3272 } },
      { id: 'work', label: 'Work', address: 'Cyber City, Gurgaon', coords: { lat: 28.4950, lng: 77.0890 } }
    ]
  },
  {
    id: 'C002',
    name: 'Priya Singh',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    wallet: 500,
    totalRides: 78,
    rating: 4.9,
    joiningDate: '2024-03-15',
    savedLocations: []
  }
];

export const paymentMethods = [
  { id: 'cash', name: 'Cash', icon: '💵', available: true },
  { id: 'wallet', name: 'Wallet', icon: '👛', available: true },
  { id: 'upi', name: 'UPI', icon: '📱', available: true },
  { id: 'card', name: 'Card', icon: '💳', available: true },
  { id: 'cashfree', name: 'Cashfree', icon: '💰', available: true },
  { id: 'razorpay', name: 'Razorpay', icon: '⚡', available: true },
  { id: 'payu', name: 'PayU', icon: '🏦', available: true }
];

export const mockNotifications = [
  { id: 1, type: 'ride', message: 'Your ride is arriving in 2 minutes', time: '2 min ago', read: false },
  { id: 2, type: 'promo', message: 'Get 50% off on your next ride!', time: '1 hour ago', read: false },
  { id: 3, type: 'wallet', message: 'Wallet recharged successfully', time: '2 hours ago', read: true }
];

export const pricingConfig = {
  auto: { basePrice: 30, pricePerKm: 12, pricePerMin: 2, minimumFare: 40 },
  mini: { basePrice: 50, pricePerKm: 15, pricePerMin: 2.5, minimumFare: 60 },
  sedan: { basePrice: 80, pricePerKm: 20, pricePerMin: 3, minimumFare: 100 },
  suv: { basePrice: 120, pricePerKm: 25, pricePerMin: 4, minimumFare: 150 }
};

export const apiKeys = {
  fast2sms: { key: '', status: 'not_configured' },
  googleMaps: { key: '', status: 'not_configured' },
  geoapify: { key: '', status: 'not_configured' },
  cashfree: { appId: '', secretKey: '', status: 'not_configured' },
  razorpay: { keyId: '', keySecret: '', status: 'not_configured' },
  payu: { merchantKey: '', merchantSalt: '', status: 'not_configured' }
};

export const calculateFare = (vehicleType, distance, duration) => {
  const config = pricingConfig[vehicleType];
  if (!config) return 0;
  
  const fare = config.basePrice + (distance * config.pricePerKm) + (duration * config.pricePerMin);
  return Math.max(fare, config.minimumFare);
};
