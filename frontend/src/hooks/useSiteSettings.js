import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useSiteSettings = () => {
  const [settings, setSettings] = useState({
    contact_info: {
      email: 'support@gaddi24x7.com',
      phone: '+91 9876543210',
      address: 'Connaught Place, New Delhi - 110001, India',
      office_hours: '24/7 Available'
    },
    social_media: {
      facebook: 'https://facebook.com/gaddi24x7',
      twitter: 'https://twitter.com/gaddi24x7',
      instagram: 'https://instagram.com/gaddi24x7',
      linkedin: 'https://linkedin.com/company/gaddi24x7',
      youtube: 'https://youtube.com/@gaddi24x7'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings/settings`);
      if (response.data.success && response.data.settings) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      // Use default settings if API fails
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading };
};
