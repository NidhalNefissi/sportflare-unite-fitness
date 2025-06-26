
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Edit, 
  Calendar,
  Weight,
  Ruler,
  Camera,
  Share2,
  Activity,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClientProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  // Mock body metrics data
  const latestBodyMetrics = {
    date: '2024-12-26',
    gender: 'male',
    age: 28,
    weight: 75,
    height: 180,
    front_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
    side_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop'
  };

  const latestAIMetrics = {
    date: '2024-12-26',
    body_fat: 15.2,
    muscle_mass: 65.5,
    waist: 82,
    hip: 95,
    chest: 102,
    arm: 35,
    bmi: 23.1
  };

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
    setIsEditing(false);
  };

  const handleShare = () => {
    // Mock share functionality
    toast({
      title: "Tableau de bord partagé",
      description: "Votre progression a été partagée sur les réseaux sociaux.",
    });
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">Client Premium</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </Button>
                <Button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Partager</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user?.email}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user?.phone || 'Non renseigné'}</span>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex items-end">
                  <Button onClick={handleSave} className="w-full">
                    Sauvegarder
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Planning des Cours</h3>
                  <p className="text-sm text-gray-600">Gérez vos réservations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Coach IA</h3>
                  <p className="text-sm text-gray-600">Plan personnalisé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Body Metrics Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Body Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Weight className="w-5 h-5" />
                Dernières Mesures Corporelles
              </CardTitle>
              <CardDescription>Saisies le {latestBodyMetrics.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Genre</Label>
                    <p className="font-medium capitalize">{latestBodyMetrics.gender === 'male' ? 'Homme' : 'Femme'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Âge</Label>
                    <p className="font-medium">{latestBodyMetrics.age} ans</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Poids</Label>
                    <p className="font-medium">{latestBodyMetrics.weight} kg</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Taille</Label>
                    <p className="font-medium">{latestBodyMetrics.height} cm</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Photo Face</Label>
                    <div className="relative">
                      <img 
                        src={latestBodyMetrics.front_photo} 
                        alt="Photo face"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Photo Profil</Label>
                    <div className="relative">
                      <img 
                        src={latestBodyMetrics.side_photo} 
                        alt="Photo profil"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Analyse IA du Corps
              </CardTitle>
              <CardDescription>Générées le {latestAIMetrics.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Masse grasse</Label>
                    <p className="font-medium text-orange-600">{latestAIMetrics.body_fat}%</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Masse musculaire</Label>
                    <p className="font-medium text-green-600">{latestAIMetrics.muscle_mass}%</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Tour de taille</Label>
                    <p className="font-medium">{latestAIMetrics.waist} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Tour de hanche</Label>
                    <p className="font-medium">{latestAIMetrics.hip} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Tour de poitrine</Label>
                    <p className="font-medium">{latestAIMetrics.chest} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Tour de bras</Label>
                    <p className="font-medium">{latestAIMetrics.arm} cm</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-gray-600">IMC (BMI)</Label>
                      <p className="text-2xl font-bold text-blue-600">{latestAIMetrics.bmi}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">Normal</Badge>
                      <p className="text-xs text-gray-600 mt-1">Excellent état</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;
