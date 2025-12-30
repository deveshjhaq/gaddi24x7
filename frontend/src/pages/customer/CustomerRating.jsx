import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Star, ThumbsUp, Award } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const CustomerRating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser, user } = useAuth();
  const { driver, fare, rideId } = location.state || {};
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast({ title: 'Error', description: 'Please select a rating', variant: 'destructive' });
      return;
    }

    // Update user wallet if payment was from wallet
    if (user?.wallet >= fare) {
      updateUser({ wallet: user.wallet - fare });
    }

    toast({ title: 'Success', description: 'Thank you for your feedback!' });
    navigate('/customer/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Trip Completed!</h1>
          <p className="text-gray-600">How was your ride?</p>
        </div>

        {driver && (
          <div className="text-center mb-6 pb-6 border-b">
            <div className="font-bold text-lg">{driver.name}</div>
            <div className="text-gray-600 text-sm">{driver.vehicleNumber}</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">₹{fare}</div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-center font-semibold mb-3">Rate your driver</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-12 h-12 ${
                      star <= rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Additional Feedback (Optional)</label>
            <Textarea
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => setFeedback(feedback + ' Clean vehicle ')}>
              📍 Clean
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFeedback(feedback + ' Polite driver ')}>
              😊 Polite
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFeedback(feedback + ' Safe ride ')}>
              🛡️ Safe
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Submit Rating
          </Button>

          <Button 
            onClick={() => navigate('/customer/home')}
            variant="ghost"
            className="w-full"
          >
            Skip
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CustomerRating;
