import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m Gaddi24x7 assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'How to book a ride?',
    'Payment methods',
    'Become a driver',
    'Contact support'
  ];

  const botResponses = {
    'how to book': 'To book a ride:\n1. Login to your account\n2. Enter pickup and drop location\n3. Select vehicle type\n4. Confirm booking\n5. Track your driver in real-time!',
    'payment': 'We accept multiple payment methods:\n• Cash\n• Wallet\n• UPI\n• Credit/Debit Cards\n• Cashfree, Razorpay, PayU',
    'driver': 'To become a driver:\n1. Click "Drive with Us" on homepage\n2. Complete registration\n3. Upload KYC documents (License, Vehicle RC, Insurance)\n4. Wait for admin verification\n5. Start earning!',
    'support': 'You can reach our support team at:\n📧 Email: support@gaddi24x7.com\n📞 Phone: +91 9876543210\n⏰ Available 24x7',
    'pricing': 'Our pricing varies by vehicle type and trip type:\n• One Way: Standard fare\n• Round Trip: 1.8x fare\n• Rental: Hourly based\n\nUse our pricing calculator on the homepage!',
    'cancel': 'To cancel a ride:\n1. Go to your bookings\n2. Select active ride\n3. Click Cancel\n\nNote: Cancellation charges may apply if driver is assigned.',
    'default': 'I\'m here to help! You can ask me about:\n• Booking rides\n• Payment methods\n• Becoming a driver\n• Pricing\n• Cancellations\n\nOr contact our support team at support@gaddi24x7.com'
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('book') || msg.includes('ride')) {
      return botResponses['how to book'];
    } else if (msg.includes('payment') || msg.includes('pay')) {
      return botResponses['payment'];
    } else if (msg.includes('driver') || msg.includes('drive')) {
      return botResponses['driver'];
    } else if (msg.includes('support') || msg.includes('help') || msg.includes('contact')) {
      return botResponses['support'];
    } else if (msg.includes('price') || msg.includes('fare') || msg.includes('cost')) {
      return botResponses['pricing'];
    } else if (msg.includes('cancel')) {
      return botResponses['cancel'];
    } else {
      return botResponses['default'];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMsg]);
    setInputMessage('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMsg = {
        type: 'bot',
        text: getBotResponse(inputMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 animate-bounce"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-bold">Gaddi24x7 Support</div>
            <div className="text-xs opacity-90">Online • Replies instantly</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white shadow-md text-gray-800'
              }`}
            >
              <div className="whitespace-pre-line text-sm">{msg.text}</div>
              <div
                className={`text-xs mt-1 ${
                  msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 text-center mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-2 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
