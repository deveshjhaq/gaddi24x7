import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { 
  Users, Car, TrendingUp, DollarSign, Settings, LogOut, 
  MapPin, CreditCard, Key, Menu, X
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);

  const stats = [
    { label: 'Total Users', value: '50,234', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Drivers', value: '2,145', change: '+8%', icon: Car, color: 'green' },
    { label: 'Total Rides', value: '125,450', change: '+15%', icon: TrendingUp, color: 'purple' },
    { label: 'Revenue', value: '₹12.5L', change: '+18%', icon: DollarSign, color: 'yellow' }
  ];

  const recentRides = [
    { id: 'R001', customer: 'Rahul Sharma', driver: 'Amit Kumar', fare: 450, status: 'completed' },
    { id: 'R002', customer: 'Priya Singh', driver: 'Rajesh Verma', fare: 92, status: 'ongoing' },
    { id: 'R003', customer: 'Amit Patel', driver: 'Suresh Kumar', fare: 320, status: 'completed' },
    { id: 'R004', customer: 'Neha Gupta', driver: 'Vikram Singh', fare: 180, status: 'completed' }
  ];

  const menuItems = [
    { label: 'Dashboard', icon: TrendingUp, path: '/admin/dashboard', active: true },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Drivers', icon: Car, path: '/admin/drivers' },
    { label: 'Rides', icon: MapPin, path: '/admin/rides' },
    { label: 'Pricing', icon: DollarSign, path: '/admin/pricing' },
    { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { label: 'API Keys', icon: Key, path: '/admin/api-keys' },
    { label: 'Site Settings', icon: Settings, path: '/admin/settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${
        showSidebar ? 'w-64' : 'w-0'
      } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Recent Rides */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Rides</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Ride ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold">Driver</th>
                    <th className="text-left py-3 px-4 font-semibold">Fare</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map((ride) => (
                    <tr key={ride.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{ride.id}</td>
                      <td className="py-3 px-4">{ride.customer}</td>
                      <td className="py-3 px-4">{ride.driver}</td>
                      <td className="py-3 px-4 font-semibold">₹{ride.fare}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ride.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
