
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Wifi, 
  Car, 
  Users, 
  Phone,
  Globe,
  Map
} from 'lucide-react';

interface Gym {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  openingHours: string;
  phone: string;
  website?: string;
  priceRange: string;
  memberCount: number;
  studios: string[];
  equipment: string[];
  coaches: string[];
  distance: number;
}

const ClientGyms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [gyms] = useState<Gym[]>([
    {
      id: '1',
      name: 'FitZone Premium',
      description: 'Modern fitness center with state-of-the-art equipment and expert trainers.',
      location: 'Centre-ville, Tunis',
      address: 'Avenue Habib Bourguiba, Tunis 1000',
      rating: 4.8,
      reviews: 124,
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      ],
      amenities: ['WiFi', 'Parking', 'Showers', 'Lockers', 'Sauna', 'AC'],
      openingHours: '6:00 AM - 11:00 PM',
      phone: '+216 71 123 456',
      website: 'www.fitzone.tn',
      priceRange: '60-120 TND/month',
      memberCount: 450,
      studios: ['Studio A', 'Studio B', 'Cardio Zone', 'Weight Room'],
      equipment: ['Treadmills', 'Free Weights', 'Machines', 'Yoga Mats'],
      coaches: ['Emma Kallel', 'Sami Cherif'],
      distance: 1.2
    },
    {
      id: '2',
      name: 'Zen Wellness Studio',
      description: 'Holistic wellness center focusing on yoga, pilates and meditation.',
      location: 'Lac, Tunis',
      address: 'Les Berges du Lac, Tunis 1053',
      rating: 4.9,
      reviews: 89,
      images: [
        'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=400&h=300&fit=crop'
      ],
      amenities: ['WiFi', 'Parking', 'Tea Bar', 'Meditation Room', 'AC'],
      openingHours: '7:00 AM - 9:00 PM',
      phone: '+216 71 234 567',
      priceRange: '40-80 TND/month',
      memberCount: 180,
      studios: ['Yoga Studio', 'Pilates Room', 'Meditation Space'],
      equipment: ['Yoga Mats', 'Blocks', 'Straps', 'Bolsters'],
      coaches: ['Alex Trabelsi', 'Lisa Ben Ali'],
      distance: 2.8
    },
    {
      id: '3',
      name: 'PowerHouse Gym',
      description: 'Serious training facility for bodybuilding and powerlifting enthusiasts.',
      location: 'Menzah, Tunis',
      address: 'Menzah 6, Tunis 2091',
      rating: 4.6,
      reviews: 67,
      images: [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=400&h=300&fit=crop'
      ],
      amenities: ['Parking', 'Showers', 'Lockers', 'Supplements Store'],
      openingHours: '5:00 AM - 12:00 AM',
      phone: '+216 71 345 678',
      priceRange: '80-150 TND/month',
      memberCount: 320,
      studios: ['Main Floor', 'Free Weight Area', 'Cardio Section'],
      equipment: ['Olympic Bars', 'Dumbbells', 'Squat Racks', 'Bench Press'],
      coaches: ['Ahmed Fitness', 'Karim Strong'],
      distance: 5.1
    }
  ]);

  const locations = ['all', 'Centre-ville', 'Lac', 'Menzah', 'Ariana', 'Sfax'];

  const filteredGyms = gyms
    .filter(gym => {
      const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gym.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === 'all' || 
                             gym.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'distance': return a.distance - b.distance;
        case 'members': return b.memberCount - a.memberCount;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const GymCard = ({ gym }: { gym: Gym }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={gym.images[0]}
          alt={gym.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-black/50 text-white">
          {gym.distance}km away
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{gym.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{gym.rating}</span>
                <span className="text-gray-600">({gym.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600">{gym.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{gym.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{gym.openingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{gym.memberCount} members</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {gym.amenities.slice(0, 4).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {gym.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{gym.amenities.length - 4}
              </Badge>
            )}
          </div>

          <div className="pt-2 space-y-2">
            <div className="text-sm font-medium text-green-600">
              {gym.priceRange}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Visit Gym
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Partner Gyms</h1>
          <p className="text-green-100">Discover fitness facilities near you</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="members">Members</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="flex-1"
                >
                  <Map className="w-4 h-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'map')}>
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card className="h-96">
              <CardContent className="p-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
                  <p className="text-gray-600">Interactive map showing gym locations</p>
                  <p className="text-sm text-gray-500 mt-2">(Google Maps integration placeholder)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredGyms.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No gyms found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientGyms;
