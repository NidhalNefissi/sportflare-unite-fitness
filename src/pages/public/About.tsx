
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Ahmed Ben Ali',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Fitness enthusiast with 10+ years in tech and wellness industry.'
    },
    {
      name: 'Fatma Gharbi',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'Software architect passionate about creating seamless user experiences.'
    },
    {
      name: 'Karim Mansouri',
      role: 'Head of Fitness',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Certified personal trainer and nutrition specialist with 15+ years experience.'
    },
    {
      name: 'Leila Trabelsi',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
      bio: 'UI/UX designer focused on creating beautiful and functional interfaces.'
    }
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Community First',
      description: 'Building a supportive fitness community where everyone can thrive and achieve their goals together.'
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: 'Goal-Oriented',
      description: 'Helping users set, track, and achieve their fitness goals with personalized guidance and support.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Excellence',
      description: 'Providing the highest quality fitness services, equipment, and coaching to our community.'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Wellness',
      description: 'Promoting holistic wellness that encompasses physical, mental, and emotional health.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          About SportFlare
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Tunisia's premier fitness and wellness platform connecting fitness enthusiasts with gyms, coaches, 
          and premium equipment. We're revolutionizing how people discover, book, and experience fitness.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To democratize access to quality fitness experiences across Tunisia by creating a comprehensive 
              platform that connects clients, coaches, gym owners, and fitness brands in one seamless ecosystem.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that fitness should be accessible, enjoyable, and personalized for everyone, 
              regardless of their experience level or location.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-blue-800">Active Users</div>
            </div>
            <div className="bg-green-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-green-800">Partner Gyms</div>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-purple-800">Certified Coaches</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-orange-800">Fitness Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have transformed their fitness experience with SportFlare.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
