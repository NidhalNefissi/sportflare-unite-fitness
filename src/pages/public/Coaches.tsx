
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Users, Clock, Search, Filter, Award, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Coach {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  certifications: string[];
  location: string;
  languages: string[];
  clientCount: number;
  programs: number;
}

const PublicCoaches = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const [coaches] = useState<Coach[]>([
    {
      id: 'coach1',
      name: 'Emma Kallel',
      title: 'Certified Personal Trainer & Nutritionist',
      bio: 'Passionate fitness coach with 8+ years of experience helping clients achieve their health and wellness goals.',
      specialties: ['Weight Loss', 'Strength Training', 'Nutrition Coaching', 'HIIT'],
      experience: 8,
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
      certifications: ['ACSM-CPT', 'Precision Nutrition Level 1', 'TRX Certified'],
      location: 'Tunis',
      languages: ['Arabic', 'French', 'English'],
      clientCount: 45,
      programs: 12
    },
    {
      id: 'coach2',
      name: 'Mohamed Trabelsi',
      title: 'Strength & Conditioning Specialist',
      bio: 'Former athlete turned coach, specializing in strength training and athletic performance enhancement.',
      specialties: ['Strength Training', 'Athletic Performance', 'Powerlifting', 'Sports Conditioning'],
      experience: 10,
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop&crop=face',
      certifications: ['CSCS', 'NSCA-CPT', 'Olympic Weightlifting Level 2'],
      location: 'Tunis',
      languages: ['Arabic', 'French'],
      clientCount: 38,
      programs: 8
    },
    {
      id: 'coach3',
      name: 'Fatma Ben Salem',
      title: 'Yoga & Pilates Instructor',
      bio: 'Holistic wellness coach focusing on mind-body connection through yoga, pilates, and mindfulness practices.',
      specialties: ['Yoga', 'Pilates', 'Flexibility', 'Mindfulness', 'Stress Management'],
      experience: 6,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      certifications: ['RYT-500', 'Pilates Method Alliance', 'Mindfulness-Based Stress Reduction'],
      location: 'Sousse',
      languages: ['Arabic', 'French', 'English'],
      clientCount: 52,
      programs: 15
    },
    {
      id: 'coach4',
      name: 'Karim Mansouri',
      title: 'CrossFit & Functional Training Coach',
      bio: 'High-energy coach specializing in functional fitness and group training methodologies.',
      specialties: ['CrossFit', 'Functional Training', 'Group Fitness', 'HIIT', 'Mobility'],
      experience: 7,
      rating: 4.6,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      certifications: ['CrossFit Level 2', 'FMS Level 2', 'Mobility Specialist'],
      location: 'Sfax',
      languages: ['Arabic', 'French'],
      clientCount: 41,
      programs: 10
    }
  ]);

  const filteredCoaches = coaches.filter(coach => 
    (searchTerm === '' || coach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     coach.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
     coach.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedSpecialty === 'all' || coach.specialties.includes(selectedSpecialty)) &&
    (selectedLocation === 'all' || coach.location === selectedLocation)
  );

  const specialties = Array.from(new Set(coaches.flatMap(coach => coach.specialties)));
  const locations = Array.from(new Set(coaches.map(coach => coach.location)));

  const handleCoachClick = (coachId: string) => {
    navigate(`/coach/${coachId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Ideal Coach</h1>
            <p className="text-xl text-purple-100 mb-8">Connect with certified fitness professionals</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search coaches by name, specialty, or expertise..."
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
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
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
            Showing {filteredCoaches.length} of {coaches.length} coaches
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCoaches.map((coach) => (
            <Card key={coach.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCoachClick(coach.id)}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img 
                    src={coach.image} 
                    alt={coach.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{coach.name}</CardTitle>
                        <CardDescription className="mt-1">{coach.title}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{coach.rating}</span>
                        <span className="text-sm text-gray-500">({coach.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{coach.bio}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{coach.experience}+ years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{coach.clientCount} clients</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{coach.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {coach.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Certifications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {coach.certifications.slice(0, 3).map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                    {coach.certifications.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{coach.certifications.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Languages:</h4>
                  <div className="flex flex-wrap gap-1">
                    {coach.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    {coach.programs} programs available
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCoachClick(coach.id);
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCoaches.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Coaches Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('all');
                  setSelectedLocation('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Fitness?</h2>
            <p className="text-gray-600 mb-6">Join SportFlare and connect with certified coaches who will guide your journey</p>
            <div className="flex gap-4 justify-center">
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/register')}
              >
                Start Training
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

export default PublicCoaches;
