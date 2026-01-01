import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { MapPin, Search, Clock, Wallet, User, LogOut, Home, Briefcase, Star } from 'lucide-react';
import { vehicleTypes } from '../../mock/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const CustomerHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [showVehicles, setShowVehicles] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchRide = () => {
    if (!pickup || !drop) {
      return;
    }
    setShowVehicles(true);
  };

  const handleSelectVehicle = (vehicle) => {
    navigate('/customer/booking', { state: { pickup, drop, vehicle } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              G
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">Gaddi24x7</span>
              <div className="text-xs text-gray-500 font-medium">Welcome, {user?.name?.split(' ')[0] || 'User'}!</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 font-semibold border-2 hover:border-green-500 hover:bg-green-50 transition-all">
              <Wallet className="w-4 h-4 text-green-600" />
              ₹{user?.wallet || 0}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)} className="hover:bg-blue-50 transition-all">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="relative h-[350px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center relative z-10 animate-float">
          <MapPin className="w-20 h-20 mx-auto text-blue-600 mb-3 drop-shadow-lg" />
          <p className="text-gray-700 font-semibold text-lg">Map View</p>
          <p className="text-sm text-gray-600 mt-1">🗺️ Google Maps integration pending</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Live Tracking Available</span>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="container mx-auto px-4 -mt-24 relative z-10 animate-slide-up">
        <Card className="p-8 shadow-2xl border-2 border-white bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Where to?</h2>
          </div>
          
          <div className="space-y-5">
            <div className="relative group">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-green-600 z-10 group-hover:scale-110 transition-transform" />
              <Input
                placeholder="📍 Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-12 h-14 text-lg border-2 hover:border-green-400 focus:border-green-500 transition-all bg-gradient-to-r from-green-50 to-white"
              />
            </div>
            
            <div className="relative group">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-red-600 z-10 group-hover:scale-110 transition-transform" />
              <Input
                placeholder="🎯 Enter drop location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="pl-12 h-14 text-lg border-2 hover:border-red-400 focus:border-red-500 transition-all bg-gradient-to-r from-red-50 to-white"
              />
            </div>
            
            <Button 
              onClick={handleSearchRide}
              disabled={!pickup || !drop}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Available Rides
              <span className="ml-2">🚗</span>
            </Button>
          </div>

          {/* Saved Locations */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-bold mb-4 text-gray-700 flex items-center gap-2">
              <span>📍</span> Saved Locations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start gap-3 h-12 border-2 hover:border-blue-400 hover:bg-blue-50 transition-all">
                <Home className="w-5 h-5 text-blue-600" /> 
                <span className="font-semibold">Home</span>
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-12 border-2 hover:border-purple-400 hover:bg-purple-50 transition-all">
                <Briefcase className="w-5 h-5 text-purple-600" /> 
                <span className="font-semibold">Work</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Rides */}
        <div className="mt-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="text-2xl font-bold mb-4 gradient-text flex items-center gap-2">
            <Clock className="w-6 h-6" /> Recent Rides
          </h3>
          <Card className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50 hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">2 days ago</span>
                </div>
                <div className="font-bold text-lg mb-2">📍 Connaught Place → ✈️ IGI Airport</div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <span>🚗</span> Sedan
                  </span>
                  <span>•</span>
                  <span>18.5 km</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-green-600 mb-1">₹450</div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" /> 4.5
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Vehicle Selection Dialog */}
      <Dialog open={showVehicles} onOpenChange={setShowVehicles}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
              <span>🚗</span> Choose Your Ride
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {vehicleTypes.map((vehicle) => (
              <Card 
                key={vehicle.id}
                className="p-6 cursor-pointer hover:shadow-2xl hover:border-blue-500 transition-all duration-300 border-2 hover:-translate-y-1 bg-gradient-to-r from-white to-blue-50"
                onClick={() => handleSelectVehicle(vehicle)}
              >
                <div className="flex items-center gap-6">
                  <div className="text-6xl animate-float" style={{animationDelay: `${Math.random()}s`}}>{vehicle.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-xl mb-2 flex items-center gap-2">
                      {vehicle.name}
                      {vehicle.id === 'sedan' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">Popular</span>}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-3">
                      <span>👥 {vehicle.capacity}</span>
                      <span>•</span>
                      <span>⏱️ {vehicle.eta} away</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-green-600">₹{Math.floor(Math.random() * 200 + 100)}</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">₹{vehicle.pricePerKm}/km</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="font-bold text-lg">{user?.name}</div>
                <div className="text-sm text-gray-600">{user?.phone}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user?.totalRides || 0}</div>
                <div className="text-sm text-gray-600">Total Rides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{user?.rating || 0}★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
            <Button onClick={() => navigate('/customer/wallet')} className="w-full" variant="outline">
              <Wallet className="w-4 h-4 mr-2" /> My Wallet (₹{user?.wallet || 0})
            </Button>
            <Button onClick={() => navigate('/customer/rides')} className="w-full" variant="outline">
              <Clock className="w-4 h-4 mr-2" /> Ride History
            </Button>
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerHome;
