import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <span className="text-xl font-bold">Gaddi24x7</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Terms & Conditions</h1>
              <p className="text-gray-600">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Gaddi24x7's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and Gaddi24x7 Pvt Ltd.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>"Platform"</strong> refers to Gaddi24x7 mobile application and website</li>
                <li><strong>"Rider"</strong> refers to users who book rides</li>
                <li><strong>"Driver"</strong> refers to independent contractors who provide transportation services</li>
                <li><strong>"Services"</strong> refers to the ride-sharing and related services provided through our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Eligibility</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You must be at least 18 years old to use our services</li>
                <li>You must have a valid phone number and email address</li>
                <li>You must provide accurate and complete information during registration</li>
                <li>Drivers must possess valid driving license, vehicle registration, and insurance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Maintain the security of your account credentials</li>
                <li>Not share your account with others</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
                <li>Provide accurate and up-to-date information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Booking and Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Booking</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Ride bookings are subject to driver availability</li>
                    <li>Estimated fares are indicative and may vary based on actual distance and time</li>
                    <li>You agree to be present at the pickup location at the scheduled time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cancellation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Free cancellation within 2 minutes of booking</li>
                    <li>Cancellation charges apply after driver is assigned</li>
                    <li>Repeated cancellations may result in account suspension</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payments and Pricing</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fares are calculated based on distance, time, and vehicle type</li>
                <li>Dynamic pricing may apply during peak hours or high demand</li>
                <li>All payments are processed securely through certified payment gateways</li>
                <li>Invoices will be generated automatically for each ride</li>
                <li>Refunds will be processed within 7-10 business days</li>
                <li>Platform charges 20% commission from drivers on each ride</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Driver Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Drivers on our platform agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Operate as independent contractors, not employees</li>
                <li>Maintain valid licenses, insurance, and vehicle documents</li>
                <li>Undergo KYC verification and background checks</li>
                <li>Maintain vehicle in good condition and cleanliness</li>
                <li>Follow traffic rules and provide safe transportation</li>
                <li>Treat riders with respect and professionalism</li>
                <li>Not discriminate based on race, religion, gender, or destination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Rider Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Riders must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Treat drivers with respect</li>
                <li>Not engage in illegal activities during the ride</li>
                <li>Not consume alcohol or drugs in the vehicle</li>
                <li>Be responsible for any damage caused to the vehicle</li>
                <li>Not harass or threaten the driver</li>
                <li>Follow driver's reasonable requests regarding vehicle usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Safety and Insurance</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All rides are covered by driver's vehicle insurance</li>
                <li>Platform provides additional ride insurance coverage</li>
                <li>Emergency support is available 24/7</li>
                <li>Users can share ride details with emergency contacts</li>
                <li>Report any safety concerns immediately to support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Gaddi24x7 acts as a technology platform connecting riders with drivers. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Actions or negligence of drivers or riders</li>
                <li>Quality or safety of transportation services</li>
                <li>Loss, damage, or injury during rides</li>
                <li>Delays due to traffic, weather, or other factors beyond our control</li>
                <li>Service interruptions or technical issues</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our total liability is limited to the amount paid for the specific ride in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, trademarks, logos, and intellectual property on our platform are owned by Gaddi24x7. You may not use, copy, or distribute any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to terminate or suspend accounts for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violation of these terms and conditions</li>
                <li>Fraudulent or illegal activities</li>
                <li>Repeated cancellations or no-shows</li>
                <li>Abusive behavior towards drivers or support staff</li>
                <li>Non-payment of dues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these terms will be resolved through arbitration in accordance with Indian law. The courts in New Delhi, India shall have exclusive jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of services after changes constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions regarding these Terms and Conditions, please contact:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-800"><strong>Email:</strong> legal@gaddi24x7.com</p>
                <p className="text-gray-800 mt-2"><strong>Phone:</strong> +91 9876543210</p>
                <p className="text-gray-800 mt-2"><strong>Address:</strong> Gaddi24x7 Pvt Ltd, Connaught Place, New Delhi - 110001, India</p>
              </div>
            </section>

            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-gray-800 font-semibold">
                By using Gaddi24x7, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
