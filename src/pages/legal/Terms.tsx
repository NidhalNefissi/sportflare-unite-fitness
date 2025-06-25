
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Scale } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SportFlare
              </span>
            </Link>
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Scale className="w-8 h-8 text-blue-600" />
              Terms of Use
            </CardTitle>
            <CardDescription className="text-lg">
              Last updated: December 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using SportFlare, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
              <div className="space-y-3 text-gray-700">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for maintaining the security of your account.</p>
                <p>We support multiple user roles: Client, Coach, Gym Owner, Brand, and Admin, each with specific privileges and responsibilities.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Cancellation Policy</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Class Bookings:</strong> All class bookings are subject to availability and gym-specific policies.</p>
                <p><strong>Cancellation:</strong> Classes can be cancelled up to 24 hours before the scheduled time without penalty.</p>
                <p><strong>No-Show Policy:</strong> Failure to attend a booked class may result in booking restrictions.</p>
                <p><strong>QR Check-in:</strong> Attendance is verified through QR code scanning at the venue.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p>All payments are processed in Tunisian Dinar (TND) through our secure payment gateway Flouci.tn.</p>
                <p>Payment options include online payment or in-person payment at participating gyms.</p>
                <p>Subscription fees are non-refundable unless specified otherwise.</p>
                <p>Prices are subject to change with 30 days notice.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Conduct</h2>
              <div className="space-y-3 text-gray-700">
                <p>Users must not engage in any activity that disrupts or interferes with the service.</p>
                <p>Reviews and ratings must be honest and based on actual experiences.</p>
                <p>Inappropriate content, harassment, or abuse will result in account suspension.</p>
                <p>Commercial solicitation outside of designated brand accounts is prohibited.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive property of 
                SportFlare and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall SportFlare, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <div className="space-y-2 text-gray-700">
                <p>If you have any questions about these Terms of Use, please contact us:</p>
                <p>Email: legal@sportflare.tn</p>
                <p>Phone: +216 XX XXX XXX</p>
                <p>Address: Tunis, Tunisia</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
