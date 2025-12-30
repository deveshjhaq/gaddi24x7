import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCustomers, mockDrivers } from '../mock/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'customer', 'driver', 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem('gaddi24x7_user');
    const savedUserType = localStorage.getItem('gaddi24x7_userType');
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
    }
    setLoading(false);
  }, []);

  const login = (phone, otp, type) => {
    // Mock OTP verification - accept any 4 digit OTP
    if (otp.length !== 4) {
      return { success: false, message: 'Invalid OTP' };
    }

    let userData;
    if (type === 'customer') {
      userData = mockCustomers.find(c => c.phone === phone) || mockCustomers[0];
    } else if (type === 'driver') {
      userData = mockDrivers.find(d => d.phone === phone) || mockDrivers[0];
    } else if (type === 'admin') {
      userData = { id: 'A001', name: 'Admin', email: 'admin@gaddi24x7.com', phone };
    }

    setUser(userData);
    setUserType(type);
    localStorage.setItem('gaddi24x7_user', JSON.stringify(userData));
    localStorage.setItem('gaddi24x7_userType', type);

    return { success: true, user: userData, userType: type };
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('gaddi24x7_user');
    localStorage.removeItem('gaddi24x7_userType');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('gaddi24x7_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    userType,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
