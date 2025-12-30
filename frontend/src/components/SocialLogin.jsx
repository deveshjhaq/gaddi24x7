import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Chrome, Facebook } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const SocialLogin = ({ onSuccess, userType = 'customer' }) => {
  const handleGoogleLogin = () => {
    // Mock Google OAuth - In real implementation, use Firebase or OAuth library
    toast({ 
      title: 'Google Login', 
      description: 'Google OAuth will be integrated with backend' 
    });
    
    // Simulate successful login
    setTimeout(() => {
      const mockUser = {
        id: 'G' + Date.now(),
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: '+91 9876543210',
        loginMethod: 'google',
        profilePicture: 'https://ui-avatars.com/api/?name=John+Doe'
      };
      onSuccess && onSuccess(mockUser);
    }, 1500);
  };

  const handleFacebookLogin = () => {
    // Mock Facebook OAuth
    toast({ 
      title: 'Facebook Login', 
      description: 'Facebook OAuth will be integrated with backend' 
    });
    
    setTimeout(() => {
      const mockUser = {
        id: 'F' + Date.now(),
        name: 'Jane Smith',
        email: 'jane@facebook.com',
        phone: '+91 9876543211',
        loginMethod: 'facebook',
        profilePicture: 'https://ui-avatars.com/api/?name=Jane+Smith'
      };
      onSuccess && onSuccess(mockUser);
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full"
        >
          <Chrome className="w-4 h-4 mr-2" />
          Google
        </Button>
        
        <Button
          variant="outline"
          onClick={handleFacebookLogin}
          className="w-full"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
      </div>
      
      <p className="text-xs text-center text-gray-500">
        Social login currently mocked. Will be integrated with backend.
      </p>
    </div>
  );
};

export default SocialLogin;
