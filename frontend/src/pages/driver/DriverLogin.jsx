import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Phone, ArrowLeft } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const DriverLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      toast({ title: 'Error', description: 'Please enter valid 10-digit phone number', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast({ title: 'OTP Sent', description: 'Enter any 4-digit OTP to continue (Mock)' });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    setTimeout(() => {
      const result = login(`+91 ${phone}`, otp, 'driver');
      setLoading(false);
      if (result.success) {
        toast({ title: 'Success', description: 'Login successful!' });
        navigate('/driver/home');
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
        
        <Card className="p-8 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              D
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Driver Login</h1>
          <p className="text-center text-gray-600 mb-8">Enter your registered phone number</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-100 rounded-lg text-gray-600 font-medium">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={otpSent}
                  className="flex-1"
                />
              </div>
            </div>
            
            {otpSent && (
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <Input
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-2">Mock: Enter any 4-digit code</p>
              </div>
            )}
            
            {!otpSent ? (
              <Button 
                onClick={handleSendOTP} 
                disabled={loading || phone.length !== 10}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={loading || otp.length !== 4}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Button>
                <Button 
                  onClick={() => { setOtpSent(false); setOtp(''); }} 
                  variant="outline"
                  className="w-full"
                >
                  Change Number
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t text-center space-y-2">
            <p className="text-sm text-gray-600">Not a driver yet?</p>
            <Button 
              variant="link" 
              onClick={() => navigate('/driver/register')}
              className="text-green-600"
            >
              Register as Driver
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;
