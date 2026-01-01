import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { MapPin, Shield, Clock, CreditCard, Users, TrendingUp, Star, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import PricingCalculator from '../components/PricingCalculator';
import FAQ from '../components/FAQ';
import ChatBot from '../components/ChatBot';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Landing = () => {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Live Tracking',
      description: 'Track your ride in real-time with GPS navigation'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safe & Secure',
      description: 'Verified drivers and secure payment options'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Available',
      description: 'Book rides anytime, anywhere in your city'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Multiple Payments',
      description: 'Cash, Wallet, UPI, Cards - your choice'
    }
  ];

  const vehicleTypes = [
    { name: 'Auto', price: '₹12/km', capacity: '3 seats', icon: '🛺' },
    { name: 'Mini', price: '₹15/km', capacity: '4 seats', icon: '🚗' },
    { name: 'Sedan', price: '₹20/km', capacity: '4 seats', icon: '🚘' },
    { name: 'SUV', price: '₹25/km', capacity: '6 seats', icon: '🚙' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo.jpg" 
                alt="Gaddi24x7 Logo" 
                className="w-14 h-14 rounded-xl object-cover shadow-md"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gaddi24x7
                </span>
                <div className="text-xs text-gray-500 font-medium">Ride with Confidence</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <a href="#driver" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Become Driver</a>
              <Button onClick={() => navigate('/customer/login')} variant="outline" className="border-2">Login</Button>
              <Button onClick={() => navigate('/customer/login')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Book Now</Button>
            </nav>
            <Button variant="ghost" className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-5 py-2.5 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-all">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></span>
              <span className="font-semibold text-sm">🏆 India's Most Trusted Ride Service</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                Your Ride,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Anytime
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Book reliable rides 24/7. Safe, affordable, and always on time. Available in multiple cities across India.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/customer/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-16 px-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Phone className="mr-2 h-6 w-6" />
                Book a Ride Now
                <span className="ml-2 text-xl">→</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/driver/login')}
                className="text-lg h-16 px-8 border-2 border-purple-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 transition-all duration-300 font-semibold"
              >
                <Users className="mr-2 h-6 w-6" />
                Become a Driver
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-700 font-semibold mt-1">😊 Happy Riders</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">2K+</div>
                <div className="text-sm text-gray-700 font-semibold mt-1">🚗 Drivers</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-yellow-600">4.8★</div>
                <div className="text-sm text-gray-700 font-semibold mt-1">⭐ Rating</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">100% Safe</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">24/7 Available</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative z-10 hover:scale-105 transition-transform duration-500">
              <img 
                src="/assets/taxidriver.png" 
                alt="Professional Driver" 
                className="rounded-3xl shadow-2xl w-full h-auto border-4 border-white"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-xs border-2 border-green-100 animate-pulse-glow hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg flex items-center gap-2">✓ 100% Verified</div>
                  <div className="text-sm text-gray-600 font-medium">All Drivers & Safe Rides</div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Gaddi24x7?</h2>
            <p className="text-gray-600 text-lg">Experience the best ride-sharing service in India</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Book your ride in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <img src="/assets/firstimage.png" alt="Enter Location" className="w-full h-48 object-contain mb-4" />
              <h3 className="text-xl font-bold mb-2">1. Enter Location</h3>
              <p className="text-gray-600">Enter your pickup and drop location</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <img src="/assets/secondimage.png" alt="Choose Vehicle" className="w-full h-48 object-contain mb-4" />
              <h3 className="text-xl font-bold mb-2">2. Choose Vehicle</h3>
              <p className="text-gray-600">Select from Auto, Mini, Sedan, or SUV</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <img src="/assets/thirdimage.png" alt="Track Driver" className="w-full h-48 object-contain mb-4" />
              <h3 className="text-xl font-bold mb-2">3. Track Driver</h3>
              <p className="text-gray-600">Track your driver in real-time</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <img src="/assets/fourthimage.png" alt="Enjoy Ride" className="w-full h-48 object-contain mb-4" />
              <h3 className="text-xl font-bold mb-2">4. Enjoy Ride</h3>
              <p className="text-gray-600">Reach your destination safely</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Ride</h2>
            <p className="text-gray-600 text-lg">Affordable prices for every journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4 text-center">{vehicle.icon}</div>
                <h3 className="text-2xl font-bold text-center mb-2">{vehicle.name}</h3>
                <div className="text-center text-gray-600 mb-2">{vehicle.capacity}</div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{vehicle.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Become a Driver Partner Section */}
      <section id="driver" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4 font-semibold">
                Drive & Earn
              </div>
              <h2 className="text-4xl font-bold mb-4">Become a Driver Partner</h2>
              <p className="text-xl text-gray-600 mb-6">
                Join thousands of drivers earning on their own schedule. Drive with Gaddi24x7 and be your own boss.
              </p>
              
              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Earn up to ₹50,000/month</h3>
                    <p className="text-gray-600">Keep 80% of every ride fare</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Flexible Working Hours</h3>
                    <p className="text-gray-600">Work when you want, full-time or part-time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Insurance Coverage Included</h3>
                    <p className="text-gray-600">Complete ride insurance and safety support</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Weekly Performance Bonuses</h3>
                    <p className="text-gray-600">Earn extra with our reward programs</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/driver/login')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg h-14"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Register as Driver
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg h-14 border-2"
                >
                  Learn More
                </Button>
              </div>

              {/* Requirements */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h4 className="font-bold mb-3">Requirements:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Valid Driving License</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Vehicle Registration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Vehicle Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Aadhaar & PAN Card</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="/assets/downloadapprightimage.png" 
                alt="Driver Partner" 
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
              
              {/* Stats Card Overlay */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-green-600">2K+</div>
                  <div className="text-sm text-gray-600">Active Drivers</div>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-blue-600">4.8★</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/assets/logo.jpg" 
                  alt="Gaddi24x7 Logo" 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="text-2xl font-bold">Gaddi24x7</span>
              </div>
              <p className="text-gray-400 mb-4">Your trusted ride partner, available 24x7 across India.</p>
              
              {/* Social Media Links */}
              <div className="flex gap-3">
                <a href={settings.social_media.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={settings.social_media.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={settings.social_media.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={settings.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={settings.social_media.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div><a href="#features" className="text-gray-400 hover:text-white transition-colors">About Us</a></div>
                <div><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></div>
                <div><a href="mailto:support@gaddi24x7.com" className="text-gray-400 hover:text-white transition-colors">Contact</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Users</h4>
              <div className="space-y-2">
                <div><Button variant="link" onClick={() => navigate('/customer/login')} className="text-gray-400 hover:text-white p-0 h-auto">Book a Ride</Button></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Help & Support</a></div>
                <div><Button variant="link" onClick={() => navigate('/privacy-policy')} className="text-gray-400 hover:text-white p-0 h-auto">Privacy Policy</Button></div>
                <div><Button variant="link" onClick={() => navigate('/terms-conditions')} className="text-gray-400 hover:text-white p-0 h-auto">Terms & Conditions</Button></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Drivers</h4>
              <div className="space-y-2">
                <div><Button variant="link" onClick={() => navigate('/driver/login')} className="text-gray-400 hover:text-white p-0 h-auto">Register as Driver</Button></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Driver Benefits</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Requirements</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Driver Support</a></div>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-400">Email Us</div>
                  <a href={`mailto:${settings.contact_info.email}`} className="text-white hover:text-blue-400 transition-colors">
                    {settings.contact_info.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-400">Call Us</div>
                  <a href={`tel:${settings.contact_info.phone}`} className="text-white hover:text-green-400 transition-colors">
                    {settings.contact_info.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-sm text-gray-400">Office</div>
                  <div className="text-white">{settings.contact_info.address}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Gaddi24x7 Pvt Ltd. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <Button variant="link" onClick={() => navigate('/privacy-policy')} className="text-gray-400 hover:text-white p-0 h-auto">Privacy Policy</Button>
              <span className="text-gray-600">•</span>
              <Button variant="link" onClick={() => navigate('/terms-conditions')} className="text-gray-400 hover:text-white p-0 h-auto">Terms & Conditions</Button>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
