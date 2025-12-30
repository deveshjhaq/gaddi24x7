import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { User as UserIcon, Wallet, TrendingUp, Clock, LogOut, MapPin, Phone, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from '../../hooks/use-toast';

const DriverHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [newRideRequest, setNewRideRequest] = useState(null);

  const todayEarnings = 1250;
  const todayRides = 8;

  const mockRideRequest = {
    id: 'R' + Date.now(),
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerRating: 4.7,
    pickup: 'Connaught Place, New Delhi',
    drop: 'Indira Gandhi International Airport',
    distance: 18.5,
    fare: 450,
    otp: '4567'
  };

  const handleToggleOnline = (checked) => {
    setIsOnline(checked);
    if (checked) {
      toast({ title: 'You are Online', description: 'Waiting for ride requests...' });
      // Simulate ride request after 5 seconds
      setTimeout(() => {
        if (isOnline) {
          setNewRideRequest(mockRideRequest);
        }
      }, 5000);
    } else {
      toast({ title: 'You are Offline', description: 'You will not receive ride requests' });
    }
  };

  const handleAcceptRide = () => {
    setCurrentRide(newRideRequest);
    setNewRideRequest(null);
    toast({ title: 'Ride Accepted', description: 'Navigate to pickup location' });
  };

  const handleRejectRide = () => {
    setNewRideRequest(null);
    toast({ title: 'Ride Rejected', description: 'Looking for more rides...' });
  };

  const handleStartRide = () => {
    toast({ title: 'Ride Started', description: 'Drive safely!' });
  };

  const handleCompleteRide = () => {
    const earnings = currentRide.fare;
    toast({ title: 'Ride Completed', description: `You earned ₹${earnings}` });
    setCurrentRide(null);
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
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <span className="text-xl font-bold">Driver</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
              <Switch checked={isOnline} onCheckedChange={handleToggleOnline} />
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)}>
              <UserIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="relative h-[300px] bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto text-green-600 mb-2" />
          <p className="text-gray-600 font-semibold">Your Location</p>
          <p className="text-sm text-gray-500">GPS tracking enabled</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-8">
        {/* Today's Stats */}
        <Card className="p-6 shadow-xl mb-4">
          <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">₹{todayEarnings}</div>
              <div className="text-sm text-gray-600">Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{todayRides}</div>
              <div className="text-sm text-gray-600">Rides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{user?.rating || 4.8}★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </Card>

        {/* Current Ride */}
        {currentRide && (
          <Card className="p-6 shadow-xl mb-4 border-2 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Current Ride</h2>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                In Progress
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentRide.customerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold">{currentRide.customerName}</div>
                  <div className="text-sm text-gray-600">{currentRide.customerRating}★ rating</div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Pickup</div>
                    <div className="font-semibold">{currentRide.pickup}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Drop</div>
                    <div className="font-semibold">{currentRide.drop}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 bg-gray-50 rounded-lg px-4">
                <div>
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-bold">{currentRide.distance} km</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fare</div>
                  <div className="font-bold text-green-600 text-xl">₹{currentRide.fare}</div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Customer OTP</div>
                <div className="text-3xl font-bold tracking-widest text-blue-600">{currentRide.otp}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleStartRide} variant="outline">
                  Start Ride
                </Button>
                <Button onClick={handleCompleteRide} className="bg-green-600 hover:bg-green-700">
                  Complete
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Waiting Status */}
        {!currentRide && isOnline && (
          <Card className="p-8 shadow-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Waiting for Rides</h2>
            <p className="text-gray-600">You'll be notified when a customer books a ride nearby</p>
          </Card>
        )}

        {/* Offline Status */}
        {!currentRide && !isOnline && (
          <Card className="p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">😴</div>
            <h2 className="text-2xl font-bold mb-2">You're Offline</h2>
            <p className="text-gray-600 mb-4">Toggle online to start receiving ride requests</p>
            <Button 
              onClick={() => handleToggleOnline(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              Go Online
            </Button>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="p-4" onClick={() => navigate('/driver/earnings')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Wallet</div>
                <div className="font-bold text-lg">₹{user?.wallet || 0}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4" onClick={() => navigate('/driver/earnings')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Earnings</div>
                <div className="font-bold text-lg">₹{user?.totalEarnings || 0}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New Ride Request Dialog */}
      <Dialog open={!!newRideRequest} onOpenChange={(open) => !open && setNewRideRequest(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">New Ride Request!</DialogTitle>
          </DialogHeader>
          {newRideRequest && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {newRideRequest.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-lg">{newRideRequest.customerName}</div>
                  <div className="text-sm text-gray-600">{newRideRequest.customerRating}★ rating</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Pickup</div>
                    <div className="font-semibold">{newRideRequest.pickup}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Drop</div>
                    <div className="font-semibold">{newRideRequest.drop}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 bg-green-50 rounded-lg px-4">
                <div>
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-bold text-lg">{newRideRequest.distance} km</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">You'll Earn</div>
                  <div className="font-bold text-green-600 text-2xl">₹{newRideRequest.fare}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleRejectRide}
                  variant="outline"
                  className="h-14 border-2"
                >
                  <X className="w-5 h-5 mr-2" /> Reject
                </Button>
                <Button 
                  onClick={handleAcceptRide}
                  className="h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Check className="w-5 h-5 mr-2" /> Accept
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500">
                Auto-reject in 30 seconds
              </div>
            </div>
          )}
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'D'}
              </div>
              <div>
                <div className="font-bold text-lg">{user?.name}</div>
                <div className="text-sm text-gray-600">{user?.phone}</div>
                <div className="text-sm text-gray-600">{user?.vehicleNumber}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user?.totalRides || 0}</div>
                <div className="text-xs text-gray-600">Total Rides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{user?.rating || 0}★</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹{user?.totalEarnings || 0}</div>
                <div className="text-xs text-gray-600">Earned</div>
              </div>
            </div>
            <Button onClick={() => navigate('/driver/earnings')} className="w-full" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" /> View Earnings
            </Button>
            <Button onClick={() => navigate('/driver/rides')} className="w-full" variant="outline">
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

export default DriverHome;
