
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/user';
import { Users, MapPin, Clock, Star } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      role: 'client' as UserRole,
      title: 'Client',
      description: 'Book classes, get AI coaching, track your fitness journey',
      icon: Users,
      features: ['AI Personal Coach', 'Class Booking', 'Progress Tracking', 'Social Sharing']
    },
    {
      role: 'gym_owner' as UserRole,
      title: 'Gym Owner',
      description: 'Manage your gym, track revenue, engage with members',
      icon: MapPin,
      features: ['Revenue Dashboard', 'Class Management', 'Member Analytics', 'Review Management']
    },
    {
      role: 'coach' as UserRole,
      title: 'Coach',
      description: 'Create classes, build programs, grow your coaching business',
      icon: Clock,
      features: ['Class Creation', 'QR Check-ins', 'Training Programs', 'Revenue Tracking']
    },
    {
      role: 'brand' as UserRole,
      title: 'Brand',
      description: 'Sell fitness products, reach active customers',
      icon: Star,
      features: ['Product Catalog', 'Sales Analytics', 'Promotions', 'Customer Reviews']
    }
  ];

  const handleGetStarted = () => {
    if (selectedRole) {
      navigate('/register', { state: { role: selectedRole } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SportFlare
          </span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/login')}
          className="hover:bg-blue-50"
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Fitness Universe
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Connect with gyms, coaches, and brands. Get AI-powered coaching. 
          Book classes seamlessly. All in one powerful platform.
        </p>

        {/* Role Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((roleData) => {
              const IconComponent = roleData.icon;
              return (
                <Card 
                  key={roleData.role}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedRole === roleData.role 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRole(roleData.role)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedRole === roleData.role 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent size={32} />
                    </div>
                    <CardTitle className="text-xl">{roleData.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {roleData.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-left">
                      {roleData.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Get Started Button */}
        <Button 
          size="lg" 
          className={`px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
            selectedRole 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleGetStarted}
          disabled={!selectedRole}
        >
          Get Started as {selectedRole ? roles.find(r => r.role === selectedRole)?.title : 'User'}
        </Button>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Gyms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">1K+</div>
            <div className="text-gray-600">Certified Coaches</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Partner Brands</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
