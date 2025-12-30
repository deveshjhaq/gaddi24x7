import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, MapPin, ArrowRight } from 'lucide-react';
import { calculateFare, vehicleTypes } from '../mock/mockData';

const PricingCalculator = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [distance, setDistance] = useState(10);
  const [tripType, setTripType] = useState('one-way');
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');
  const [showResults, setShowResults] = useState(false);

  const tripTypes = [
    { id: 'one-way', name: 'One Way', multiplier: 1 },
    { id: 'round-trip', name: 'Round Trip', multiplier: 1.8 },
    { id: 'rental-4hr', name: 'Rental (4 Hours)', multiplier: 1.5 },
    { id: 'rental-8hr', name: 'Rental (8 Hours)', multiplier: 2.5 },
    { id: 'rental-12hr', name: 'Rental (12 Hours)', multiplier: 3.5 }
  ];

  const handleCalculate = () => {
    setShowResults(true);
  };

  const calculatePrice = (vehicleId) => {
    const baseFare = calculateFare(vehicleId, distance, 20);
    const tripMultiplier = tripTypes.find(t => t.id === tripType)?.multiplier || 1;
    return Math.round(baseFare * tripMultiplier);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Calculator className="w-5 h-5" />
            <span className="font-semibold">Fare Calculator</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Calculate Your Fare</h2>
          <p className="text-gray-600 text-lg">Get instant pricing for your journey without login</p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">From Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                <Input
                  placeholder="Enter pickup location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">To Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-600" />
                <Input
                  placeholder="Enter drop location"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Distance (KM)</label>
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trip Type</label>
              <Select value={tripType} onValueChange={setTripType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tripTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.icon} {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleCalculate}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Fare
          </Button>

          {showResults && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6 text-center">Estimated Fares</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {vehicleTypes.map(vehicle => {
                  const price = calculatePrice(vehicle.id);
                  return (
                    <Card 
                      key={vehicle.id}
                      className={`p-4 cursor-pointer transition-all ${
                        vehicle.id === selectedVehicle 
                          ? 'border-2 border-blue-600 bg-blue-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{vehicle.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{vehicle.name}</div>
                            <div className="text-sm text-gray-600">{vehicle.capacity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">₹{price}</div>
                          <div className="text-xs text-gray-500">
                            {tripTypes.find(t => t.id === tripType)?.name}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">{fromLocation || 'Pickup Location'}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="font-semibold">{toLocation || 'Drop Location'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{distance} km</div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {tripTypes.find(t => t.id === tripType)?.name}
                    </div>
                    <div className="text-sm text-gray-600">Trip Type</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹{calculatePrice(selectedVehicle)}</div>
                    <div className="text-sm text-gray-600">Estimated Fare</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Service Type Comparison */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Service Types</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🚗</div>
              <h4 className="font-bold text-xl mb-2">One Way</h4>
              <p className="text-gray-600 mb-4">Book a ride from point A to B</p>
              <div className="text-3xl font-bold text-blue-600">₹{calculateFare('sedan', 10, 20)}</div>
              <div className="text-sm text-gray-500">Starting from</div>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-shadow border-2 border-blue-600">
              <div className="text-4xl mb-4">🔄</div>
              <h4 className="font-bold text-xl mb-2">Round Trip</h4>
              <p className="text-gray-600 mb-4">Go and return back same day</p>
              <div className="text-3xl font-bold text-purple-600">₹{Math.round(calculateFare('sedan', 10, 20) * 1.8)}</div>
              <div className="text-sm text-gray-500">Starting from</div>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⏱️</div>
              <h4 className="font-bold text-xl mb-2">Rental</h4>
              <p className="text-gray-600 mb-4">Hourly rental with driver</p>
              <div className="text-3xl font-bold text-green-600">₹{Math.round(calculateFare('sedan', 10, 20) * 1.5)}</div>
              <div className="text-sm text-gray-500">4 hrs starting</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
