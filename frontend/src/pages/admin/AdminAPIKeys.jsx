import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { apiKeys } from '../../mock/mockData';
import { toast } from '../../hooks/use-toast';

const AdminAPIKeys = () => {
  const navigate = useNavigate();
  const [keys, setKeys] = useState(apiKeys);
  const [showKeys, setShowKeys] = useState({});

  const handleSave = () => {
    // Mock save
    localStorage.setItem('gaddi24x7_api_keys', JSON.stringify(keys));
    toast({ title: 'Success', description: 'API keys saved successfully!' });
  };

  const handleUpdateKey = (service, field, value) => {
    setKeys(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value,
        status: value ? 'configured' : 'not_configured'
      }
    }));
  };

  const toggleShowKey = (key) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">API Key Configuration</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="p-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
            <p className="text-sm text-blue-800">
              Configure third-party API keys here. These keys will be used for OTP verification, maps, and payment processing.
              All keys are stored securely and encrypted.
            </p>
          </div>

          {/* Fast2SMS */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">Fast2SMS (OTP Service)</h3>
            <div className="space-y-3">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['fast2sms'] ? 'text' : 'password'}
                    placeholder="Enter Fast2SMS API key"
                    value={keys.fast2sms.key}
                    onChange={(e) => handleUpdateKey('fast2sms', 'key', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('fast2sms')}
                  >
                    {showKeys['fast2sms'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  keys.fast2sms.status === 'configured' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {keys.fast2sms.status === 'configured' ? 'Configured' : 'Not Configured'}
                </span>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">Google Maps</h3>
            <div className="space-y-3">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['googleMaps'] ? 'text' : 'password'}
                    placeholder="Enter Google Maps API key"
                    value={keys.googleMaps.key}
                    onChange={(e) => handleUpdateKey('googleMaps', 'key', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('googleMaps')}
                  >
                    {showKeys['googleMaps'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Geoapify */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">Geoapify (Alternative Maps)</h3>
            <div className="space-y-3">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['geoapify'] ? 'text' : 'password'}
                    placeholder="Enter Geoapify API key"
                    value={keys.geoapify.key}
                    onChange={(e) => handleUpdateKey('geoapify', 'key', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('geoapify')}
                  >
                    {showKeys['geoapify'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cashfree */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">Cashfree</h3>
            <div className="space-y-3">
              <div>
                <Label>App ID</Label>
                <Input
                  type="text"
                  placeholder="Enter Cashfree App ID"
                  value={keys.cashfree.appId}
                  onChange={(e) => handleUpdateKey('cashfree', 'appId', e.target.value)}
                />
              </div>
              <div>
                <Label>Secret Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['cashfree'] ? 'text' : 'password'}
                    placeholder="Enter Cashfree Secret Key"
                    value={keys.cashfree.secretKey}
                    onChange={(e) => handleUpdateKey('cashfree', 'secretKey', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('cashfree')}
                  >
                    {showKeys['cashfree'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Razorpay */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="text-lg font-bold mb-4">Razorpay</h3>
            <div className="space-y-3">
              <div>
                <Label>Key ID</Label>
                <Input
                  type="text"
                  placeholder="Enter Razorpay Key ID"
                  value={keys.razorpay.keyId}
                  onChange={(e) => handleUpdateKey('razorpay', 'keyId', e.target.value)}
                />
              </div>
              <div>
                <Label>Key Secret</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['razorpay'] ? 'text' : 'password'}
                    placeholder="Enter Razorpay Key Secret"
                    value={keys.razorpay.keySecret}
                    onChange={(e) => handleUpdateKey('razorpay', 'keySecret', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('razorpay')}
                  >
                    {showKeys['razorpay'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PayU */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">PayU</h3>
            <div className="space-y-3">
              <div>
                <Label>Merchant Key</Label>
                <Input
                  type="text"
                  placeholder="Enter PayU Merchant Key"
                  value={keys.payu.merchantKey}
                  onChange={(e) => handleUpdateKey('payu', 'merchantKey', e.target.value)}
                />
              </div>
              <div>
                <Label>Merchant Salt</Label>
                <div className="flex gap-2">
                  <Input
                    type={showKeys['payu'] ? 'text' : 'password'}
                    placeholder="Enter PayU Merchant Salt"
                    value={keys.payu.merchantSalt}
                    onChange={(e) => handleUpdateKey('payu', 'merchantSalt', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleShowKey('payu')}
                  >
                    {showKeys['payu'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full h-12 bg-gray-800 hover:bg-gray-900"
          >
            <Save className="w-4 h-4 mr-2" /> Save All API Keys
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminAPIKeys;
