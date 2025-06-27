
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I sign up for SportFlare?',
          answer: 'Simply click on the "Sign Up" button and choose your role (Client, Coach, Gym Owner, or Brand). Fill in your details and verify your email to get started.'
        },
        {
          question: 'What subscription plans are available?',
          answer: 'We offer three plans: Basic (60 TND/month) for gym access, Plus (90 TND/month) for classes and AI coach, and Premium (120 TND/month) for unlimited access. Longer subscriptions get 5 TND off per month.'
        },
        {
          question: 'Can I try SportFlare before subscribing?',
          answer: 'Yes! Basic plan users get one free class trial to experience our platform. You can also browse gyms, coaches, and products without a subscription.'
        }
      ]
    },
    {
      title: 'Subscriptions & Payments',
      items: [
        {
          question: 'How does the payment system work?',
          answer: 'We use Flouci.tn for secure online payments. You can also pay in cash at partner gyms. Subscriptions auto-renew monthly unless cancelled.'
        },
        {
          question: 'What\'s included in each subscription plan?',
          answer: 'Basic: Gym access only. Plus: Unlimited classes (1/day), AI coach, all gyms. Premium: Unlimited daily classes, personal training, priority booking, all features.'
        },
        {
          question: 'Can I change my subscription plan?',
          answer: 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer pro-rated refunds for unused subscription periods if cancelled within 7 days of billing. Class cancellations must be made 24 hours in advance.'
        }
      ]
    },
    {
      title: 'Classes & Bookings',
      items: [
        {
          question: 'How do I book a class?',
          answer: 'Browse available classes, select your preferred time and gym, then click "Book Now". Plus/Premium subscribers can book directly. Basic users will be prompted to upgrade.'
        },
        {
          question: 'What is the QR code check-in system?',
          answer: 'After booking, you\'ll receive a unique QR code. Present it at the gym to confirm attendance. QR codes are valid only on the class day and single-use.'
        },
        {
          question: 'Can I cancel a booked class?',
          answer: 'Yes, you can cancel up to 24 hours before the class starts. Late cancellations may incur fees depending on the gym\'s policy.'
        },
        {
          question: 'What if a class is full?',
          answer: 'You can join the waitlist and we\'ll notify you if spots become available. Premium members get priority booking access.'
        }
      ]
    },
    {
      title: 'For Coaches',
      items: [
        {
          question: 'How do I become a coach on SportFlare?',
          answer: 'Register as a coach, upload your certifications, create your profile, and submit for verification. Once approved, you can create programs and offer classes.'
        },
        {
          question: 'How do I create and manage training programs?',
          answer: 'Go to your coach dashboard, click "Training Programs", then "Add Program". Choose single sessions or full programs, set gym/studio, and manage bookings.'
        },
        {
          question: 'How do studio reservations work?',
          answer: 'Request studio time from partner gyms through your dashboard. Gym owners will approve/decline requests. Once approved, your class becomes bookable.'
        },
        {
          question: 'How do I get paid for private coaching?',
          answer: 'Private coaching payments go through SportFlare to ensure security and build your credibility score. This helps gyms trust you and builds your client base.'
        }
      ]
    },
    {
      title: 'For Gym Owners',
      items: [
        {
          question: 'How do I list my gym on SportFlare?',
          answer: 'Register as a gym owner, complete your gym profile with photos and amenities, set up studios, and submit for partnership approval.'
        },
        {
          question: 'How do I manage coach requests for studio time?',
          answer: 'View pending requests in your dashboard, review coach profiles and class details, then approve or decline. Approved classes become available for booking.'
        },
        {
          question: 'What analytics do I get as a gym owner?',
          answer: 'Track member attendance, class popularity, revenue from SportFlare bookings, peak hours, and studio utilization rates.'
        }
      ]
    },
    {
      title: 'For Brands',
      items: [
        {
          question: 'How do I sell products on SportFlare?',
          answer: 'Register as a brand partner, upload product catalog with photos and descriptions, set pricing, and manage inventory through your dashboard.'
        },
        {
          question: 'What types of products can I sell?',
          answer: 'We accept supplements, fitness equipment, apparel, and accessories related to health and fitness. All products undergo quality review.'
        },
        {
          question: 'How do promotions and discounts work?',
          answer: 'Create promotional campaigns with percentage or fixed discounts, set duration and eligible products, and track performance through analytics.'
        }
      ]
    },
    {
      title: 'Technical Support',
      items: [
        {
          question: 'The app is not working properly, what should I do?',
          answer: 'Try refreshing the page or clearing your browser cache. If issues persist, contact our support team with details about the problem.'
        },
        {
          question: 'I forgot my password, how do I reset it?',
          answer: 'Click "Forgot Password" on the login page, enter your email, and follow the reset instructions sent to your inbox.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your dashboard, click on your profile section, make changes, and save. Some changes may require verification.'
        },
        {
          question: 'Is my personal data secure?',
          answer: 'Yes, we use industry-standard encryption and follow strict privacy policies. We never share personal data without consent.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-indigo-100 mb-8">Find answers to common questions about SportFlare</p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem 
                      key={itemIndex} 
                      value={`${categoryIndex}-${itemIndex}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-2">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && searchTerm && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any questions matching "{searchTerm}"
              </p>
              <Button 
                onClick={() => setSearchTerm('')}
                variant="outline"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
                <Button size="sm" variant="outline">Start Chat</Button>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-3">Get help via email</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  Send Email
                </Button>
              </div>
              <div className="text-center">
                <Phone className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-medium mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-3">Call us directly</p>
                <Button size="sm" variant="outline">
                  +216 70 123 456
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
