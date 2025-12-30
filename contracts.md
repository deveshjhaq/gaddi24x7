# Gaddi24x7 - Full Stack Ride-Sharing Platform Contracts

## Overview
Complete ride-sharing platform with Customer, Driver, and Admin interfaces including advanced features.

## Tech Stack
- **Frontend**: React + React Router + Shadcn UI Components
- **Backend**: FastAPI + Python
- **Database**: MongoDB
- **Integration**: n8n (WhatsApp booking support)

---

## API Contracts

### Base URL: `/api`

### 1. Authentication APIs (`/api/auth`)

#### POST `/auth/send-otp`
```json
Request:
{
  "phone": "9876543210",
  "user_type": "customer|driver|admin"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "1234"  // Mock - will be removed in production
}
```

#### POST `/auth/verify-otp`
```json
Request:
{
  "phone": "9876543210",
  "otp": "1234",
  "user_type": "customer|driver|admin",
  "name": "John Doe"  // optional, for new users
}

Response:
{
  "success": true,
  "user": {...},
  "message": "Login successful"
}
```

#### POST `/auth/social-login`
```json
Request:
{
  "provider": "google|facebook",
  "access_token": "token_from_provider",
  "user_type": "customer|driver"
}

Response:
{
  "success": true,
  "user": {...},
  "message": "Login successful"
}
```

---

### 2. Rides APIs (`/api/rides`)

#### POST `/rides/create`
```json
Request:
{
  "customer_id": "C001",
  "pickup_location": {
    "address": "Connaught Place",
    "latitude": 28.6315,
    "longitude": 77.2167
  },
  "drop_location": {
    "address": "IGI Airport",
    "latitude": 28.5562,
    "longitude": 77.1000
  },
  "vehicle_type": "sedan",
  "trip_type": "one-way|round-trip|rental-4hr|rental-8hr|rental-12hr",
  "distance": 18.5,
  "estimated_duration": 35,
  "estimated_fare": 450
}

Response:
{
  "success": true,
  "ride": {
    "id": "R1234567890",
    "otp": "4567",
    "status": "requested",
    ...
  }
}
```

#### POST `/rides/{ride_id}/accept`
```json
Request:
{
  "driver_id": "D001"
}

Response:
{
  "success": true,
  "message": "Ride accepted successfully"
}
```

#### POST `/rides/{ride_id}/complete`
```json
Request:
{
  "actual_distance": 18.5,
  "actual_duration": 35,
  "payment_method": "wallet|cash|upi|card"
}

Response:
{
  "success": true,
  "bill": {
    "id": "BILL1234567890",
    "total": 450,
    "items": [...]
  }
}
```

#### GET `/rides/customer/{customer_id}`
Returns all rides for a customer

#### GET `/rides/driver/{driver_id}`
Returns all rides for a driver

#### GET `/rides/{ride_id}/bill`
Returns detailed bill for a ride

---

### 3. Drivers APIs (`/api/drivers`)

#### POST `/drivers/register`
```json
Request:
{
  "user_id": "U001",
  "vehicle_type": "auto|mini|sedan|suv",
  "vehicle_number": "DL 01 AB 1234",
  "vehicle_model": "Maruti Suzuki Dzire",
  "vehicle_color": "White",
  "kyc_documents": {
    "license_number": "DL1234567890",
    "vehicle_registration": "DL01AB1234",
    "insurance_number": "INS123456",
    "aadhaar_number": "1234 5678 9012",
    "pan_number": "ABCDE1234F"
  }
}

Response:
{
  "success": true,
  "driver": {...},
  "message": "Driver registered. KYC verification pending."
}
```

#### POST `/drivers/{driver_id}/verify-kyc`
```json
Request:
{
  "admin_id": "A001",
  "approved": true|false,
  "rejection_reason": "Reason if rejected"
}

Response:
{
  "success": true,
  "message": "KYC verified successfully",
  "driver": {...}
}
```

#### POST `/drivers/{driver_id}/toggle-online`
```json
Request:
{
  "is_online": true|false
}
```

#### GET `/drivers/nearby/search`
```
Query Params:
- latitude
- longitude
- vehicle_type (optional)
- radius_km (default: 5.0)
```

---

### 4. Admin APIs (`/api/admin`)

#### GET `/admin/stats`
Returns dashboard statistics
```json
Response:
{
  "success": true,
  "stats": {
    "total_customers": 50234,
    "total_drivers": 2145,
    "active_drivers": 850,
    "total_rides": 125450,
    "completed_rides": 120000,
    "total_revenue": 1250000,
    "today_rides": 450,
    "today_revenue": 12500
  }
}
```

#### GET `/admin/users`
Query Params: `role`, `page`, `limit`
Returns paginated users list

#### GET `/admin/users/{user_id}/activity`
Returns complete activity log including:
- Login/logout history
- All rides (as customer or driver)
- All transactions
- Registration date
- Last login

#### GET `/admin/drivers/pending-kyc`
Returns all drivers pending KYC verification

#### GET `/admin/rides`
Query Params: `status`, `start_date`, `end_date`, `page`, `limit`

#### GET/POST `/admin/pricing`
Get or update pricing configuration

#### GET/POST `/admin/api-keys`
Get or update API keys (masked for GET)

#### GET `/admin/analytics/revenue`
Query Params: `days` (default: 30)
Returns day-wise revenue analytics

---

## Data Models

### User
```javascript
{
  id: string,
  name: string,
  phone: string,
  email: string (optional),
  role: "customer" | "driver" | "admin",
  login_method: "phone" | "google" | "facebook",
  profile_picture: string (optional),
  wallet_balance: number,
  total_rides: number,
  rating: number,
  is_active: boolean,
  created_at: datetime,
  last_login: datetime,
  login_history: [
    {
      timestamp: datetime,
      ip_address: string,
      device_info: string
    }
  ]
}
```

### Driver
```javascript
{
  id: string,
  user_id: string,
  vehicle_type: string,
  vehicle_number: string,
  vehicle_model: string,
  vehicle_color: string,
  kyc_documents: {
    license_number: string,
    vehicle_registration: string,
    insurance_number: string,
    status: "pending" | "verified" | "rejected",
    verified_by: string,
    verified_at: datetime,
    rejection_reason: string
  },
  is_online: boolean,
  current_location: { latitude, longitude },
  total_earnings: number,
  total_rides: number,
  rating: number,
  is_verified: boolean,
  created_at: datetime
}
```

### Ride
```javascript
{
  id: string,
  customer_id: string,
  driver_id: string,
  pickup_location: { address, latitude, longitude },
  drop_location: { address, latitude, longitude },
  vehicle_type: string,
  trip_type: "one-way" | "round-trip" | "rental-4hr" | "rental-8hr" | "rental-12hr",
  distance: number,
  estimated_duration: number,
  estimated_fare: number,
  actual_fare: number,
  status: "requested" | "accepted" | "ongoing" | "completed" | "cancelled",
  otp: string,
  payment_method: string,
  started_at: datetime,
  completed_at: datetime,
  created_at: datetime,
  rating: number,
  feedback: string
}
```

### Bill
```javascript
{
  id: string,
  ride_id: string,
  customer_id: string,
  driver_id: string,
  items: [
    { description: string, amount: number }
  ],
  subtotal: number,
  tax: number,
  discount: number,
  total: number,
  generated_at: datetime
}
```

### Activity Log
```javascript
{
  id: string,
  user_id: string,
  activity_type: "registration" | "login" | "logout" | "ride_booked" | "ride_completed" | "wallet_recharged" | "kyc_submitted" | "kyc_verified" | "kyc_rejected",
  description: string,
  ip_address: string,
  device_info: string,
  metadata: object,
  created_at: datetime
}
```

---

## Frontend Routes

### Public Routes
- `/` - Landing page with pricing calculator
- `/customer/login` - Customer login (OTP + Social)
- `/driver/login` - Driver login (OTP + Social)
- `/admin/login` - Admin login (Email/Password)

### Customer Routes
- `/customer/home` - Home with booking interface
- `/customer/booking` - Ride booking flow
- `/customer/rating` - Rate completed ride
- `/customer/wallet` - Wallet management
- `/customer/rides` - Ride history

### Driver Routes
- `/driver/home` - Driver dashboard
- `/driver/earnings` - Earnings details
- `/driver/rides` - Ride history

### Admin Routes
- `/admin/dashboard` - Main dashboard with stats
- `/admin/users` - User management
- `/admin/drivers` - Driver management & KYC verification
- `/admin/rides` - All rides
- `/admin/pricing` - Pricing configuration
- `/admin/api-keys` - API keys management
- `/admin/payments` - Payment gateway config

---

## Features Implemented

### Core Features
✅ Multi-role authentication (Customer, Driver, Admin)
✅ OTP-based login (Fast2SMS integration ready)
✅ Social login (Google, Facebook) - Structure ready
✅ Complete ride booking flow
✅ Real-time ride tracking (Mock GPS)
✅ Multiple vehicle types (Auto, Mini, Sedan, SUV)
✅ Multiple trip types (One Way, Round Trip, Rental 4/8/12 hrs)
✅ Automatic fare calculation
✅ Automatic bill generation
✅ Wallet system
✅ Multiple payment methods (Cash, Wallet, UPI, Card, Cashfree, Razorpay, PayU)
✅ Driver earnings & commission system (80% driver, 20% platform)
✅ Rating & review system
✅ Driver KYC verification with admin approval/rejection

### Admin Features
✅ Complete user activity tracking
✅ Login/logout history
✅ All user actions logged
✅ Dashboard with real-time stats
✅ Revenue analytics
✅ Driver KYC verification portal
✅ Pricing configuration
✅ API keys management
✅ User management

### Advanced Features
✅ Public pricing calculator (no login required)
✅ Different pricing for trip types
✅ n8n integration structure for WhatsApp booking
✅ Automatic bill generation with GST
✅ Transaction history
✅ Activity logs for audit trail

### Mock Data (To be replaced with real APIs)
🔶 OTP sending (Fast2SMS)
🔶 Social login tokens (Google/Facebook OAuth)
🔶 Google Maps / Geoapify for live tracking
🔶 Payment gateway processing
🔶 n8n WhatsApp notifications

---

## Next Steps for Production

1. **Fast2SMS Integration**
   - Add real API key in admin panel
   - Implement OTP sending in `/api/auth/send-otp`

2. **Google Maps / Geoapify**
   - Add API keys
   - Replace mock location with real GPS
   - Implement route calculation
   - Add live driver tracking

3. **Payment Gateways**
   - Integrate Cashfree/Razorpay/PayU
   - Handle payment callbacks
   - Implement refund system

4. **Social Login**
   - Complete Google OAuth flow
   - Complete Facebook OAuth flow
   - Token validation

5. **n8n Integration**
   - Set up n8n workflows
   - WhatsApp business API integration
   - Automated notifications
   - WhatsApp booking bot

6. **Push Notifications**
   - Firebase Cloud Messaging
   - Real-time ride updates

7. **Driver App Enhancements**
   - Navigation integration
   - Offline mode
   - Real-time location updates

---

## Database Collections

- `users` - All users (customers, drivers, admins)
- `drivers` - Driver-specific data and KYC
- `rides` - All ride records
- `bills` - Generated bills
- `transactions` - Wallet transactions
- `activity_logs` - Complete activity tracking
- `pricing_config` - Pricing configuration
- `api_keys_config` - API keys storage
- `reviews` - Ratings and reviews

---

## Environment Variables

### Backend (.env)
```
MONGO_URL=<MongoDB connection string>
DB_NAME=gaddi24x7
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<Backend URL>
```

---

## Bill Generation Flow

1. Ride completed
2. Calculate base fare + distance fare + time fare
3. Apply trip type multiplier
4. Add GST (5%)
5. Apply discounts (if any)
6. Ensure minimum fare
7. Generate detailed bill with line items
8. Send via WhatsApp (n8n)
9. Store in database

---

## n8n Integration Points

### Webhooks to send:
1. **Booking Confirmation** - Customer gets OTP & ride details
2. **Driver Notification** - New ride request
3. **Bill** - After ride completion
4. **KYC Status** - Driver gets verification result
5. **Promotional** - Offers and updates

### Webhooks to receive:
1. **WhatsApp Booking** - "Book ride from X to Y"
2. **Status Queries** - "Where is my ride?"
3. **Cancel Request** - "Cancel my ride"

---

## Admin Tracking Capabilities

Admin can view for any user:
- Registration date & method
- All login/logout events with IP & device
- Every ride booked/completed
- All wallet transactions
- KYC submission & verification status
- Current wallet balance
- Total rides & earnings
- Last activity timestamp
- Rating history

This complete audit trail ensures full transparency and compliance.
