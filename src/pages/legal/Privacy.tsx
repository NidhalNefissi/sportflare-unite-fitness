
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy = () => {
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
              <Shield className="w-8 h-8 text-green-600" />
              Privacy Policy
            </CardTitle>
            <CardDescription className="text-lg">
              Last updated: December 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Personal Information:</strong> Name, email address, phone number, and profile photos.</p>
                <p><strong>Health Data:</strong> BMI, fitness goals, workout preferences, and progress tracking data.</p>
                <p><strong>Usage Data:</strong> Class bookings, attendance records, marketplace purchases, and app interactions.</p>
                <p><strong>Payment Information:</strong> Payment method details processed securely through Flouci.tn.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-3 text-gray-700">
                <p>• Provide and maintain our fitness platform services</p>
                <p>• Process bookings, payments, and marketplace transactions</p>
                <p>• Generate personalized AI coach recommendations</p>
                <p>• Facilitate QR code check-ins and attendance tracking</p>
                <p>• Send important notifications about bookings and account updates</p>
                <p>• Improve our services through analytics and user feedback</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>With Gyms:</strong> Booking information and attendance records for classes you book.</p>
                <p><strong>With Coaches:</strong> Class attendance and basic profile information for booked sessions.</p>
                <p><strong>With Brands:</strong> Purchase history for products you buy through our marketplace.</p>
                <p><strong>Service Providers:</strong> Trusted third parties who assist in platform operations.</p>
                <p>We never sell your personal information to third parties.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <div className="space-y-3 text-gray-700">
                <p>We implement appropriate technical and organizational measures to protect your data:</p>
                <p>• Encryption of sensitive data in transit and at rest</p>
                <p>• Regular security audits and vulnerability assessments</p>
                <p>• Access controls limiting who can view your information</p>
                <p>• Secure payment processing through certified payment gateways</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Access:</strong> Request a copy of the personal data we hold about you.</p>
                <p><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</p>
                <p><strong>Erasure:</strong> Request deletion of your personal data under certain conditions.</p>
                <p><strong>Portability:</strong> Request transfer of your data to another service provider.</p>
                <p><strong>Objection:</strong> Object to processing of your data for certain purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data only as long as necessary to provide our services and comply with legal obligations. 
                Account data is deleted within 30 days of account closure, unless required for legal or business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect personal information from 
                children under 13. If you are a parent and believe your child has provided us with personal information, 
                please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <div className="space-y-2 text-gray-700">
                <p>For privacy-related questions or to exercise your rights, contact us:</p>
                <p>Email: privacy@sportflare.tn</p>
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

export default Privacy;
