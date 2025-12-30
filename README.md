# Gaddi24x7 🚗

A comprehensive ride booking platform connecting passengers with drivers in real-time. Built with modern web technologies for a seamless booking experience.

## Overview

Gaddi24x7 is a full-stack ride booking application that enables users to book rides, track drivers, manage wallets, and rate their experiences. The platform includes separate interfaces for customers, drivers, and administrators.

## Features

### For Customers
- **Quick Booking**: Book rides with just a few taps
- **Real-time Tracking**: Track your driver's location in real-time
- **Digital Wallet**: Manage your balance and transactions
- **Rating System**: Rate and review your ride experience
- **Pricing Calculator**: Get fare estimates before booking

### For Drivers
- **Ride Management**: Accept and manage ride requests
- **Earnings Dashboard**: Track your daily and monthly earnings
- **Route Navigation**: Get optimal routes to pickup and drop locations
- **Profile Management**: Update your vehicle and contact details

### For Admins
- **Dashboard Analytics**: Monitor platform performance and metrics
- **User Management**: Manage customers and drivers
- **Pricing Control**: Configure dynamic pricing rules
- **Settings**: Customize platform settings and configurations
- **API Key Management**: Secure API integrations

## Tech Stack

### Frontend
- **React**: Modern UI library for building interactive interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **React Router**: Client-side routing
- **Context API**: State management

### Backend
- **FastAPI**: High-performance Python web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Motor**: Async MongoDB driver for Python
- **N8N Integration**: Workflow automation

## Project Structure

```
gaddi24x7/
├── backend/
│   ├── models.py           # Database models
│   ├── server.py           # FastAPI application entry
│   ├── requirements.txt    # Python dependencies
│   ├── routes/             # API route handlers
│   │   ├── admin.py
│   │   ├── auth.py
│   │   ├── drivers.py
│   │   ├── rides.py
│   │   └── settings.py
│   └── services/           # Business logic
│       ├── bill_service.py
│       └── n8n_service.py
└── frontend/
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   │   ├── admin/
    │   │   ├── customer/
    │   │   └── driver/
    │   ├── context/        # React context providers
    │   ├── hooks/          # Custom React hooks
    │   └── lib/            # Utility functions
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gaddi24x7
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=gaddi24x7
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your-secret-key
```

Start the backend server:
```bash
uvicorn server:app --reload --port 8000
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Key Components

### Authentication
- JWT-based authentication for secure user sessions
- Role-based access control (Customer, Driver, Admin)
- Social login integration

### Ride Management
- Real-time ride matching algorithm
- Location-based driver search
- Automated billing and invoicing

### Payment System
- Integrated wallet system
- Transaction history
- Multiple payment methods support

## Configuration

### Admin Settings
Administrators can configure:
- Base fare and per-kilometer rates
- Service fees and taxes
- Driver commission rates
- Operational hours
- Service areas

### API Keys
Manage third-party integrations:
- Map services
- Payment gateways
- SMS notifications
- Email services

## Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend deployment
cd backend
# Use gunicorn or similar ASGI server
gunicorn -w 4 -k uvicorn.workers.UvicornWorker server:app
```

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support and queries:
- Email: support@gaddi24x7.com
- Documentation: [docs.gaddi24x7.com](https://docs.gaddi24x7.com)

---

Built with passion by the Gaddi24x7 team 🚀
