import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { ArrowLeft, Save, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { toast } from '../../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      console.error('Error fetching settings:', error);
    }
  };

  const handleContactChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API}/settings/settings?admin_id=A001`,
        settings
      );
      
      if (response.data.success) {
        toast({ 
          title: 'Success', 
          description: 'Settings updated successfully! Changes will reflect on the website.' 
        });
        // Reload the page to reflect changes
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Site Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="p-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Manage Website Content</h3>
            <p className="text-sm text-blue-800">
              Update contact information and social media links. These changes will reflect across the entire website including footer, contact pages, and headers.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Contact Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={settings.contact_info.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="support@gaddi24x7.com"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={settings.contact_info.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Office Address
                </Label>
                <Textarea
                  value={settings.contact_info.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  placeholder="Enter your office address"
                  rows={3}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  Office Hours
                </Label>
                <Input
                  type="text"
                  value={settings.contact_info.office_hours}
                  onChange={(e) => handleContactChange('office_hours', e.target.value)}
                  placeholder="24/7 Available"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Facebook className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold">Social Media Links</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook Profile URL
                </Label>
                <Input
                  type="url"
                  value={settings.social_media.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/your-page"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter/X Profile URL
                </Label>
                <Input
                  type="url"
                  value={settings.social_media.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/your-handle"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram Profile URL
                </Label>
                <Input
                  type="url"
                  value={settings.social_media.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/your-handle"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  LinkedIn Company URL
                </Label>
                <Input
                  type="url"
                  value={settings.social_media.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/your-company"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube Channel URL
                </Label>
                <Input
                  type="url"
                  value={settings.social_media.youtube}
                  onChange={(e) => handleSocialChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/@your-channel"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" /> 
            {loading ? 'Saving...' : 'Save All Settings'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
