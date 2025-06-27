
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: June 27, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using SportFlare ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SportFlare is a fitness and wellness platform that connects clients with fitness professionals, gyms, and wellness brands in Tunisia. Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Class booking and scheduling</li>
              <li>Personal training programs</li>
              <li>Gym and studio access</li>
              <li>Fitness product marketplace</li>
              <li>AI-powered fitness coaching</li>
              <li>Community features and social sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features of SportFlare, you must register for an account. When you register, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Subscription Plans and Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SportFlare offers multiple subscription tiers with different features and pricing:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Basic Plan:</strong> 60 TND/month - Gym access and basic features</li>
              <li><strong>Plus Plan:</strong> 90 TND/month - Includes classes and AI coaching</li>
              <li><strong>Premium Plan:</strong> 120 TND/month - Unlimited access to all features</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Payments are processed through Flouci.tn or can be made directly at affiliated gyms. Subscriptions auto-renew unless cancelled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Booking and Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Class bookings and cancellations are subject to the following policies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Bookings can be cancelled up to 24 hours before the class start time</li>
              <li>Late cancellations or no-shows may result in booking restrictions</li>
              <li>Premium members have priority booking access</li>
              <li>Class availability is subject to capacity and instructor availability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use SportFlare to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share inappropriate or offensive content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for commercial purposes without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Health and Safety</h2>
            <p className="text-gray-700 leading-relaxed">
              Before participating in any fitness activities, you should consult with a healthcare provider. SportFlare is not responsible for any injuries or health issues that may occur during the use of our services. Participation in fitness activities is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on SportFlare, including but not limited to text, graphics, logos, images, and software, is the property of SportFlare or its content suppliers and is protected by Tunisian and international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              SportFlare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Email: legal@sportflare.tn</p>
              <p className="text-gray-700">Phone: +216 71 123 456</p>
              <p className="text-gray-700">Address: Avenue Habib Bourguiba, Tunis, Tunisia</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
