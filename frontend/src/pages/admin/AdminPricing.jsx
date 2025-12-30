import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { pricingConfig } from '../../mock/mockData';
import { toast } from '../../hooks/use-toast';

const AdminPricing = () => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState(pricingConfig);

  const handleSave = () => {
    localStorage.setItem('gaddi24x7_pricing', JSON.stringify(pricing));
    toast({ title: 'Success', description: 'Pricing configuration saved successfully!' });
  };

  const handleUpdate = (vehicleType, field, value) => {
    setPricing(prev => ({
      ...prev,
      [vehicleType]: {
        ...prev[vehicleType],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const vehicleTypes = [
    { id: 'auto', name: 'Auto', icon: '🛺' },
    { id: 'mini', name: 'Mini', icon: '🚗' },
    { id: 'sedan', name: 'Sedan', icon: '🚘' },
    { id: 'suv', name: 'SUV', icon: '🚙' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Pricing Configuration</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="p-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Pricing Structure</h3>
            <p className="text-sm text-blue-800">
              Configure fare calculation for each vehicle type. Final fare = Base Price + (Distance × Price per KM) + (Duration × Price per Min)
            </p>
          </div>

          {vehicleTypes.map((vehicle) => (
            <div key={vehicle.id} className="mb-8 pb-8 border-b last:border-b-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{vehicle.icon}</span>
                <h3 className="text-2xl font-bold">{vehicle.name}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Base Price (₹)</Label>
                  <Input
                    type="number"
                    value={pricing[vehicle.id].basePrice}
                    onChange={(e) => handleUpdate(vehicle.id, 'basePrice', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Fixed charge for booking</p>
                </div>

                <div>
                  <Label>Price per KM (₹)</Label>
                  <Input
                    type="number"
                    value={pricing[vehicle.id].pricePerKm}
                    onChange={(e) => handleUpdate(vehicle.id, 'pricePerKm', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Charge per kilometer</p>
                </div>

                <div>
                  <Label>Price per Minute (₹)</Label>
                  <Input
                    type="number"
                    value={pricing[vehicle.id].pricePerMin}
                    onChange={(e) => handleUpdate(vehicle.id, 'pricePerMin', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Charge per minute</p>
                </div>

                <div>
                  <Label>Minimum Fare (₹)</Label>
                  <Input
                    type="number"
                    value={pricing[vehicle.id].minimumFare}
                    onChange={(e) => handleUpdate(vehicle.id, 'minimumFare', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum charge per ride</p>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold mb-2">Example: 10 km ride taking 20 minutes</div>
                <div className="text-sm text-gray-600">
                  Fare = ₹{pricing[vehicle.id].basePrice} + (10 × ₹{pricing[vehicle.id].pricePerKm}) + (20 × ₹{pricing[vehicle.id].pricePerMin})
                  = <span className="font-bold text-green-600">
                    ₹{pricing[vehicle.id].basePrice + (10 * pricing[vehicle.id].pricePerKm) + (20 * pricing[vehicle.id].pricePerMin)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Button 
            onClick={handleSave}
            className="w-full h-12 bg-gray-800 hover:bg-gray-900"
          >
            <Save className="w-4 h-4 mr-2" /> Save Pricing Configuration
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminPricing;
