
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Users, Clock, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Gym {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  specialties: string[];
  openHours: string;
  memberCount: number;
  studios: string[];
  coaches: number;
}

const PublicGyms = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const [gyms] = useState<Gym[]>([
    {
      id: 'gym1',
      name: 'FitZone Downtown',
      description: 'Premium fitness center with state-of-the-art equipment and professional trainers.',
      address: 'Avenue Habib Bourguiba, Centre Ville',
      city: 'Tunis',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
      amenities: ['Swimming Pool', 'Sauna', 'Parking', 'Locker Rooms', 'Nutrition Bar'],
      specialties: ['Weight Training', 'Cardio', 'Group Classes', 'Personal Training'],
      openHours: '6:00 AM - 11:00 PM',
      memberCount: 850,
      studios: ['Studio A', 'Studio B', 'Studio C'],
      coaches: 12
    },
    {
      id: 'gym2',
      name: 'PowerGym Elite',
      description: 'Hardcore training facility for serious athletes and bodybuilders.',
      address: 'Route de la Marsa, Les Berges du Lac',
      city: 'Tunis',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      amenities: ['Heavy Equipment', 'Competition Platform', 'Supplement Store', 'Recovery Zone'],
      specialties: ['Powerlifting', 'Bodybuilding', 'Strength Training', 'Athletic Performance'],
      openHours: '5:00 AM - 12:00 AM',
      memberCount: 420,
      studios: ['Studio A', 'Studio B'],
      coaches: 8
    },
    {
      id: 'gym3',
      name: 'Wellness Center Sousse',
      description: 'Holistic approach to fitness with yoga, pilates, and wellness programs.',
      address: 'Avenue Tahar Sfar, Sousse Ville',
      city: 'Sousse',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop',
      amenities: ['Yoga Studio', 'Meditation Room', 'Juice Bar', 'Massage Therapy'],
      specialties: ['Yoga', 'Pilates', 'Meditation', 'Wellness Programs'],
      openHours: '7:00 AM - 10:00 PM',
      memberCount: 320,
      studios: ['Main Room', 'Private Studio', 'Yoga Hall'],
      coaches: 15
    }
  ]);

  const filteredGyms = gyms.filter(gym => 
    (searchTerm === '' || gym.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     gym.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCity === 'all' || gym.city === selectedCity) &&
    (selectedSpecialty === 'all' || gym.specialties.includes(selectedSpecialty))
  );

  const cities = Array.from(new Set(gyms.map(gym => gym.city)));
  const specialties = Array.from(new Set(gyms.flatMap(gym => gym.specialties)));

  const handleGymClick = (gymId: string) => {
    navigate(`/gym/${gymId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Discover Partner Gyms</h1>
            <p className="text-xl text-blue-100 mb-8">Find the perfect gym for your fitness journey</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search gyms by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredGyms.length} of {gyms.length} gyms
          </p>
        </div>

        {/* Gyms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleGymClick(gym.id)}>
              <div className="aspect-video w-full bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={gym.image} 
                  alt={gym.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{gym.name}</CardTitle>
                    <CardDescription className="mt-2">{gym.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{gym.rating}</span>
                    <span className="text-sm text-gray-500">({gym.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{gym.address}, {gym.city}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{gym.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{gym.openHours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {gym.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Amenities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {gym.amenities.slice(0, 4).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {gym.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{gym.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    {gym.studios.length} studios • {gym.coaches} coaches
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGymClick(gym.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredGyms.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Gyms Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                  setSelectedSpecialty('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-gray-600 mb-6">Join SportFlare and get access to all partner gyms with your subscription</p>
            <div className="flex gap-4 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/register')}
              >
                Sign Up Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/subscriptions')}
              >
                View Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicGyms;
