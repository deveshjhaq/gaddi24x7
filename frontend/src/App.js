import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Pages
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

// Customer Pages
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerBooking from "./pages/customer/CustomerBooking";
import CustomerRating from "./pages/customer/CustomerRating";
import CustomerWallet from "./pages/customer/CustomerWallet";

// Driver Pages
import DriverLogin from "./pages/driver/DriverLogin";
import DriverHome from "./pages/driver/DriverHome";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAPIKeys from "./pages/admin/AdminAPIKeys";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Public Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* Customer Routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/booking" element={<CustomerBooking />} />
          <Route path="/customer/rating" element={<CustomerRating />} />
          <Route path="/customer/wallet" element={<CustomerWallet />} />

          {/* Driver Routes */}
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/home" element={<DriverHome />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/api-keys" element={<AdminAPIKeys />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
