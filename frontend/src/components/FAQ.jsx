import React, { useState } from 'react';
import { Card } from './ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is Gaddi24x7?',
          a: 'Gaddi24x7 is a reliable ride-sharing platform available 24/7 across multiple cities in India. We connect riders with verified drivers for safe and affordable transportation.'
        },
        {
          q: 'In which cities is Gaddi24x7 available?',
          a: 'We are currently operational in major cities including Delhi NCR, Mumbai, Bangalore, Hyderabad, Pune, and expanding to more cities soon.'
        },
        {
          q: 'How do I contact customer support?',
          a: 'You can reach us at support@gaddi24x7.com, call +91 9876543210, or use our in-app chat support available 24/7.'
        }
      ]
    },
    {
      category: 'Booking & Rides',
      questions: [
        {
          q: 'How do I book a ride?',
          a: 'Simply login to your account, enter your pickup and drop locations, select your preferred vehicle type, and confirm your booking. You\'ll get a driver assigned within minutes.'
        },
        {
          q: 'Can I schedule a ride in advance?',
          a: 'Yes! You can schedule rides up to 7 days in advance. Just select the date and time while booking.'
        },
        {
          q: 'What if I need to cancel my ride?',
          a: 'You can cancel your ride from the app. Free cancellation is available within 2 minutes of booking. After that, minimal cancellation charges may apply.'
        },
        {
          q: 'What is the OTP for?',
          a: 'The OTP is shared with you for security. Share it with your driver only when you\'re ready to start your ride. This ensures you get in the right vehicle.'
        }
      ]
    },
    {
      category: 'Pricing & Payments',
      questions: [
        {
          q: 'How is the fare calculated?',
          a: 'Fare is calculated based on base fare + distance traveled + time taken. Different rates apply for different vehicle types and trip types (one-way, round trip, rental).'
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept Cash, Wallet, UPI, Credit/Debit Cards, and all major payment gateways including Cashfree, Razorpay, and PayU.'
        },
        {
          q: 'How does the wallet work?',
          a: 'Add money to your Gaddi24x7 wallet and use it for quick payments. You can also get cashback and offers on wallet recharges.'
        },
        {
          q: 'Are there any hidden charges?',
          a: 'No! We believe in transparent pricing. You\'ll see the estimated fare before booking, and the final bill with all details after the ride.'
        }
      ]
    },
    {
      category: 'For Drivers',
      questions: [
        {
          q: 'How can I become a driver?',
          a: 'Click "Drive with Us" on our homepage, complete registration, upload your KYC documents (License, Vehicle RC, Insurance), and wait for verification. Once approved, you can start earning!'
        },
        {
          q: 'What documents do I need?',
          a: 'You need a valid Driving License, Vehicle Registration Certificate (RC), Vehicle Insurance, Aadhaar Card, and PAN Card.'
        },
        {
          q: 'How much can I earn as a driver?',
          a: 'Drivers typically earn ₹30,000-₹50,000 per month depending on hours worked. You keep 80% of the ride fare, and we charge 20% platform fee.'
        },
        {
          q: 'How long does KYC verification take?',
          a: 'KYC verification usually takes 24-48 hours. Our team reviews all documents carefully to ensure safety for all users.'
        },
        {
          q: 'Can I work flexible hours?',
          a: 'Absolutely! You are your own boss. Work whenever you want - full-time, part-time, or just weekends.'
        }
      ]
    },
    {
      category: 'Safety & Security',
      questions: [
        {
          q: 'Are all drivers verified?',
          a: 'Yes! All drivers undergo thorough background verification and document checks before they can accept rides on our platform.'
        },
        {
          q: 'Can I share my ride details with family?',
          a: 'Yes! You can share your live ride tracking link with family and friends directly from the app for added safety.'
        },
        {
          q: 'What safety features do you have?',
          a: 'We have 24/7 support, live ride tracking, SOS button, driver rating system, and all rides are insured.'
        },
        {
          q: 'What if I forget something in the car?',
          a: 'Contact customer support immediately with your ride details. We\'ll help you connect with the driver to retrieve your belongings.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find answers to common questions about Gaddi24x7</p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const isOpen = openIndex === `${catIndex}-${qIndex}`;
                  return (
                    <Card
                      key={qIndex}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => toggleFAQ(catIndex, qIndex)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-lg pr-4">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:support@gaddi24x7.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
