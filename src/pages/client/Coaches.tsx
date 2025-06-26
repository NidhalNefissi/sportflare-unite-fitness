
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientCoaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const navigate = useNavigate();

  // Mock coaches data
  const coaches = [
    {
      id: '1',
      name: 'Emma Kallel',
      specialty: 'Musculation',
      rating: 4.9,
      reviews: 87,
      location: 'Centre-ville, Tunis',
      experience: '5 ans',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
      bio: 'Coach certifiée spécialisée en musculation et préparation physique. Passionnée par la transformation corporelle.',
      certifications: ['NASM-CPT', 'Nutrition Sportive', 'CrossFit Level 1'],
      specialties: ['Musculation', 'Perte de poids', 'Préparation physique'],
      price: 80,
      availability: 'Disponible',
      classPhotos: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
      ]
    },
    {
      id: '2',
      name: 'Alex Trabelsi',
      specialty: 'Yoga',
      rating: 4.8,
      reviews: 124,
      location: 'Lac, Tunis',
      experience: '7 ans',
      avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop&crop=face',
      bio: 'Instructeur de yoga certifié, expert en méditation et bien-être. Approche holistique du fitness.',
      certifications: ['RYT-500', 'Meditation Teacher', 'Pilates Mat'],
      specialties: ['Hatha Yoga', 'Vinyasa', 'Méditation', 'Pilates'],
      price: 60,
      availability: 'Disponible',
      classPhotos: [
        'https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=300&h=200&fit=crop'
      ]
    },
    {
      id: '3',
      name: 'Sami Cherif',
      specialty: 'CrossFit',
      rating: 4.7,
      reviews: 95,
      location: 'Menzah, Tunis',
      experience: '4 ans',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Coach CrossFit passionné, spécialisé en entraînement fonctionnel haute intensité.',
      certifications: ['CrossFit Level 2', 'Olympic Lifting', 'Mobility Specialist'],
      specialties: ['CrossFit', 'Haltérophilie', 'Mobilité', 'HIIT'],
      price: 90,
      availability: 'Complet',
      classPhotos: [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=300&h=200&fit=crop'
      ]
    }
  ];

  const specialties = ['all', 'Musculation', 'Yoga', 'CrossFit', 'Pilates', 'Cardio', 'Nutrition'];

  const filteredCoaches = coaches
    .filter(coach => {
      const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coach.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coach.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === 'all' || 
                              coach.specialty.toLowerCase() === selectedSpecialty.toLowerCase() ||
                              coach.specialties.some(s => s.toLowerCase() === selectedSpecialty.toLowerCase());
      
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'musculation':
        return <Zap className="w-4 h-4 text-orange-500" />;
      case 'yoga':
        return <Heart className="w-4 h-4 text-purple-500" />;
      case 'crossfit':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <Star className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Coaches Certifiés</h1>
          <p className="text-purple-100">Trouvez le coach parfait pour atteindre vos objectifs</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un coach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Spécialité" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === 'all' ? 'Toutes les spécialités' : specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="reviews">Avis</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-purple-600 hover:bg-purple-700">
                Appliquer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCoaches.map((coach) => (
            <Card key={coach.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {/* Photos slider */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={coach.classPhotos[0]}
                    alt={`${coach.name} classes`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${coach.availability === 'Disponible' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {coach.availability}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Coach Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={coach.avatar}
                      alt={coach.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{coach.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                        {getSpecialtyIcon(coach.specialty)}
                        <span>{coach.specialty}</span>
                        <span>•</span>
                        <span>{coach.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-sm text-gray-600">{coach.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{coach.rating}</span>
                      </div>
                      <p className="text-xs text-gray-600">({coach.reviews} avis)</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4">{coach.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {coach.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {coach.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{coach.specialties.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Certifications */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Certifications:</span>
                    <span className="text-sm text-gray-600">
                      {coach.certifications.slice(0, 2).join(', ')}
                      {coach.certifications.length > 2 && '...'}
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">{coach.price} TND</span>
                      <span className="text-sm text-gray-600">/séance</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/client/coach/${coach.id}`)}
                      >
                        Voir le profil
                      </Button>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={coach.availability !== 'Disponible'}
                        onClick={() => navigate(`/client/coach/${coach.id}/book`)}
                      >
                        Réserver
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun coach trouvé</h3>
              <p className="text-gray-600">Essayez d'ajuster vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientCoaches;
