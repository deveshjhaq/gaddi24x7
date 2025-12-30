import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { MapPin, User as UserIcon, Phone, Star, Clock, Shield, ArrowLeft } from 'lucide-react';
import { paymentMethods, calculateFare } from '../../mock/mockData';

const CustomerBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { pickup, drop, vehicle } = location.state || {};
  
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [bookingStep, setBookingStep] = useState('confirm'); // confirm, searching, found, ongoing
  const [driver, setDriver] = useState(null);
  const [otp, setOtp] = useState('4567');
  
  const distance = 12.5;
  const duration = 25;
  const fare = vehicle ? calculateFare(vehicle.id, distance, duration) : 0;

  const handleConfirmBooking = () => {
    setBookingStep('searching');
    setTimeout(() => {
      setDriver({
        name: 'Amit Kumar',
        phone: '+91 98765 11111',
        rating: 4.8,
        vehicleNumber: 'DL 01 AB 1234',
        vehicleModel: 'Maruti Suzuki Dzire',
        photo: 'https://images.unsplash.com/photo-1759429025886-74fc0ea762e5?w=200'
      });
      setBookingStep('found');
    }, 3000);
  };

  const handleStartRide = () => {
    setBookingStep('ongoing');
  };

  const handleCompleteRide = () => {
    navigate('/customer/rating', { state: { driver, fare, rideId: 'R' + Date.now() } });
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/customer/home')}>Go Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/customer/home')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-xl font-bold">Booking</span>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="relative h-[300px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto text-blue-600 mb-2 animate-bounce" />
          <p className="text-gray-600 font-semibold">Live Tracking</p>
          {bookingStep === 'ongoing' && (
            <p className="text-sm text-gray-500 mt-2">Driver is on the way</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-8">
        {/* Confirm Booking */}
        {bookingStep === 'confirm' && (
          <>
            <Card className="p-6 shadow-xl mb-4">
              <h2 className="text-xl font-bold mb-4">Trip Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Pickup</div>
                    <div className="font-semibold">{pickup}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Drop</div>
                    <div className="font-semibold">{drop}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-xl mb-4">
              <h2 className="text-xl font-bold mb-4">Selected Vehicle</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{vehicle.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg">{vehicle.name}</div>
                  <div className="text-sm text-gray-600">{vehicle.capacity}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl">₹{fare}</div>
                  <div className="text-sm text-gray-500">{distance} km</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" /> Insured
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-xl mb-4">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedPayment === method.id ? 'default' : 'outline'}
                    className={selectedPayment === method.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <span className="mr-2">{method.icon}</span>
                    {method.name}
                  </Button>
                ))}
              </div>
            </Card>

            <Button 
              onClick={handleConfirmBooking}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Confirm Booking - ₹{fare}
            </Button>
          </>
        )}

        {/* Searching for Driver */}
        {bookingStep === 'searching' && (
          <Card className="p-8 shadow-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Finding Driver</h2>
            <p className="text-gray-600">Please wait while we connect you with a nearby driver...</p>
          </Card>
        )}

        {/* Driver Found */}
        {bookingStep === 'found' && driver && (
          <>
            <Card className="p-6 shadow-xl mb-4">
              <div className="text-center mb-4">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                  Driver Found!
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={driver.photo} 
                  alt={driver.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-bold text-xl">{driver.name}</div>
                  <div className="text-gray-600">{driver.vehicleModel}</div>
                  <div className="font-semibold text-lg">{driver.vehicleNumber}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold text-lg">{driver.rating}</span>
                  </div>
                  <a href={`tel:${driver.phone}`} className="text-blue-600 text-sm">Call</a>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Your OTP</div>
                <div className="text-3xl font-bold tracking-widest text-blue-600">{otp}</div>
                <div className="text-xs text-gray-500 mt-1">Share with driver to start ride</div>
              </div>
            </Card>

            <Button 
              onClick={handleStartRide}
              className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-green-700"
            >
              Start Ride
            </Button>
          </>
        )}

        {/* Ongoing Ride */}
        {bookingStep === 'ongoing' && driver && (
          <>
            <Card className="p-6 shadow-xl mb-4">
              <div className="text-center mb-4">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold animate-pulse">
                  Ride in Progress
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={driver.photo} 
                  alt={driver.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-bold text-lg">{driver.name}</div>
                  <div className="text-sm text-gray-600">{driver.vehicleNumber}</div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Destination</div>
                    <div className="font-semibold">{drop}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{distance} km</div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{duration} min</div>
                    <div className="text-sm text-gray-600">Time Left</div>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleCompleteRide}
              className="w-full h-14 text-lg bg-gradient-to-r from-red-600 to-red-700"
            >
              Complete Ride - Pay ₹{fare}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerBooking;
