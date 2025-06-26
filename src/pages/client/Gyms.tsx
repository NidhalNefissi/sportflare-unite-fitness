
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Car,
  Wifi,
  Dumbbell,
  Waves
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientGyms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock gyms data
  const gyms = [
    {
      id: '1',
      name: 'FitZone Tunis',
      location: 'Centre-ville, Tunis',
      rating: 4.8,
      reviews: 124,
      distance: '2.3 km',
      logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      ],
      amenities: ['Piscine', 'Sauna', 'Parking', 'WiFi', 'Climatisation'],
      hours: '06:00 - 23:00',
      priceRange: '$$',
      description: 'Salle de sport moderne avec équipements de pointe et coaches qualifiés.'
    },
    {
      id: '2',
      name: 'PowerGym Elite',
      location: 'Menzah, Tunis',
      rating: 4.6,
      reviews: 89,
      distance: '5.1 km',
      logo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=100&h=100&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=400&h=300&fit=crop'
      ],
      amenities: ['Musculation', 'CrossFit', 'Accès 24/7', 'Parking'],
      hours: '24/7',
      priceRange: '$$$',
      description: 'Salle spécialisée en musculation avec plateau technique complet.'
    },
    {
      id: '3',
      name: 'Zen Fitness & Wellness',
      location: 'Lac, Tunis',
      rating: 4.9,
      reviews: 156,
      distance: '3.7 km',
      logo: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=100&h=100&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=400&h=300&fit=crop'
      ],
      amenities: ['Yoga', 'Pilates', 'Spa', 'Meditation', 'Café'],
      hours: '07:00 - 21:00',
      priceRange: '$$',
      description: 'Centre de bien-être holistique alliant fitness et relaxation.'
    }
  ];

  const filteredGyms = gyms.filter(gym =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'piscine':
        return <Waves className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'musculation':
      case 'crossfit':
        return <Dumbbell className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Salles de Sport</h1>
          <p className="text-green-100">Découvrez les meilleures salles partenaires</p>
        </div>

        {/* Search and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher par nom ou emplacement..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Carte
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gyms List */}
            <div className="space-y-4">
              {filteredGyms.map((gym) => (
                <Card key={gym.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Images */}
                      <div className="relative">
                        <img
                          src={gym.photos[0]}
                          alt={gym.name}
                          className="w-full h-48 md:h-32 object-cover rounded-l-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          {gym.distance}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <img
                              src={gym.logo}
                              alt={`${gym.name} logo`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{gym.name}</h3>
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <MapPin className="w-3 h-3" />
                                <span>{gym.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{gym.rating}</span>
                            </div>
                            <p className="text-xs text-gray-600">({gym.reviews} avis)</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{gym.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {gym.amenities.slice(0, 4).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getAmenityIcon(amenity)}
                              <span className="ml-1">{amenity}</span>
                            </Badge>
                          ))}
                          {gym.amenities.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{gym.amenities.length - 4}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{gym.hours}</span>
                            </div>
                            <Badge variant="secondary">
                              {gym.priceRange}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => navigate(`/client/gym/${gym.id}`)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Voir le profil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Distance</label>
                  <div className="space-y-2">
                    {['< 2 km', '2-5 km', '5-10 km', '> 10 km'].map((range) => (
                      <label key={range} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Équipements</label>
                  <div className="space-y-2">
                    {['Piscine', 'Sauna', 'Parking', 'CrossFit', 'Yoga'].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Prix</label>
                  <div className="space-y-2">
                    {['$', '$$', '$$$'].map((price) => (
                      <label key={price} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conseils</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">💡 Astuce</p>
                    <p className="text-blue-700">Consultez les avis avant de visiter une nouvelle salle.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">⭐ Premium</p>
                    <p className="text-green-700">Accès illimité à toutes les salles partenaires.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientGyms;
