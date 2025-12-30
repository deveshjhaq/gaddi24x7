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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <span className="text-xl font-bold">Gaddi24x7</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Wallet className="w-4 h-4" />
              ₹{user?.wallet || 0}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="relative h-[300px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto text-blue-600 mb-2" />
          <p className="text-gray-600">Map View (Mocked)</p>
          <p className="text-sm text-gray-500">Google Maps / Geoapify integration pending</p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Where to?</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
              <Input
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-600" />
              <Input
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            
            <Button 
              onClick={handleSearchRide}
              disabled={!pickup || !drop}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Rides
            </Button>
          </div>

          {/* Saved Locations */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Saved Locations</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start gap-2">
                <Home className="w-4 h-4" /> Home
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Briefcase className="w-4 h-4" /> Work
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Rides */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Recent Rides</h3>
          <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <div className="font-semibold">Connaught Place → IGI Airport</div>
                <div className="text-sm text-gray-600 mt-1">Sedan • 18.5 km</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">₹450</div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
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
            <DialogTitle>Choose Your Ride</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {vehicleTypes.map((vehicle) => (
              <Card 
                key={vehicle.id}
                className="p-4 cursor-pointer hover:shadow-lg hover:border-blue-600 transition-all"
                onClick={() => handleSelectVehicle(vehicle)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{vehicle.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{vehicle.name}</div>
                    <div className="text-sm text-gray-600">{vehicle.capacity} • {vehicle.eta} away</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">₹{Math.floor(Math.random() * 200 + 100)}</div>
                    <div className="text-sm text-gray-500">₹{vehicle.pricePerKm}/km</div>
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
