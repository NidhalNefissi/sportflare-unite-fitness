
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Phone, 
  Mail, 
  Edit, 
  Camera, 
  Calendar,
  Target,
  TrendingUp,
  Share2,
  Activity
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BodyMetrics {
  id: string;
  date: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number;
  height: number;
  frontPhoto?: string;
  sidePhoto?: string;
}

interface AIMetrics {
  id: string;
  date: string;
  bodyFat: number;
  muscleMass: number;
  waist: number;
  hip: number;
  chest: number;
  arm: number;
  bmi: number;
}

const ClientProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);
  
  // Mock data for body metrics
  const [bodyMetrics] = useState<BodyMetrics[]>([
    {
      id: '1',
      date: '2024-01-15',
      gender: 'male',
      age: 28,
      weight: 75,
      height: 175,
      frontPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop',
      sidePhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop'
    }
  ]);

  const [aiMetrics] = useState<AIMetrics[]>([
    {
      id: '1',
      date: '2024-01-15',
      bodyFat: 15.2,
      muscleMass: 42.8,
      waist: 82,
      hip: 95,
      chest: 102,
      arm: 35,
      bmi: 24.5
    }
  ]);

  const [newMetrics, setNewMetrics] = useState({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    frontPhoto: '',
    sidePhoto: ''
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+216 12 345 678'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
    setIsEditing(false);
  };

  const handleAddMetrics = () => {
    if (!newMetrics.age || !newMetrics.weight || !newMetrics.height) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simulate adding new metrics
    toast({
      title: "Métriques ajoutées",
      description: "Vos nouvelles mesures corporelles ont été enregistrées.",
    });
    setMetricsDialogOpen(false);
    setNewMetrics({
      gender: 'male',
      age: '',
      weight: '',
      height: '',
      frontPhoto: '',
      sidePhoto: ''
    });
  };

  const handleShareProgress = () => {
    toast({
      title: "Partage en cours",
      description: "Votre tableau de bord de progression sera partagé sur vos réseaux sociaux.",
    });
  };

  const latestBodyMetrics = bodyMetrics[0];
  const latestAIMetrics = aiMetrics[0];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-blue-100">Membre SportFlare</p>
                <Badge className="bg-purple-500 text-white mt-2">
                  Plan Premium
                </Badge>
              </div>
            </div>
            <Button 
              onClick={handleShareProgress}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager Progrès
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations Personnelles
                  </CardTitle>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom Complet</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveProfile} className="flex-1">
                      Sauvegarder
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Body Metrics Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Dernières Métriques Corporelles</CardTitle>
                  <Dialog open={metricsDialogOpen} onOpenChange={setMetricsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Camera className="w-4 h-4 mr-1" />
                        Ajouter Métriques
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouvelles Métriques Corporelles</DialogTitle>
                        <DialogDescription>
                          Ajoutez vos nouvelles mesures pour un suivi précis
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Genre</Label>
                            <Select value={newMetrics.gender} onValueChange={(value) => setNewMetrics(prev => ({ ...prev, gender: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Homme</SelectItem>
                                <SelectItem value="female">Femme</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Âge</Label>
                            <Input
                              type="number"
                              value={newMetrics.age}
                              onChange={(e) => setNewMetrics(prev => ({ ...prev, age: e.target.value }))}
                              placeholder="Ex: 25"
                            />
                          </div>
                          <div>
                            <Label>Poids (kg)</Label>
                            <Input
                              type="number"
                              value={newMetrics.weight}
                              onChange={(e) => setNewMetrics(prev => ({ ...prev, weight: e.target.value }))}
                              placeholder="Ex: 70"
                            />
                          </div>
                          <div>
                            <Label>Taille (cm)</Label>
                            <Input
                              type="number"
                              value={newMetrics.height}
                              onChange={(e) => setNewMetrics(prev => ({ ...prev, height: e.target.value }))}
                              placeholder="Ex: 175"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setMetricsDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleAddMetrics}>
                          Ajouter
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {latestBodyMetrics ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{new Date(latestBodyMetrics.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Poids</p>
                      <p className="font-semibold">{latestBodyMetrics.weight} kg</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Taille</p>
                      <p className="font-semibold">{latestBodyMetrics.height} cm</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Âge</p>
                      <p className="font-semibold">{latestBodyMetrics.age} ans</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Aucune métrique enregistrée</p>
                )}
              </CardContent>
            </Card>

            {/* AI Generated Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Métriques Générées par l'IA Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                {latestAIMetrics ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Graisse Corporelle</p>
                      <p className="font-semibold">{latestAIMetrics.bodyFat}%</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Masse Musculaire</p>
                      <p className="font-semibold">{latestAIMetrics.muscleMass}%</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Tour de Taille</p>
                      <p className="font-semibold">{latestAIMetrics.waist} cm</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">IMC</p>
                      <p className="font-semibold">{latestAIMetrics.bmi}</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600">Tour de Hanches</p>
                      <p className="font-semibold">{latestAIMetrics.hip} cm</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-gray-600">Tour de Poitrine</p>
                      <p className="font-semibold">{latestAIMetrics.chest} cm</p>
                    </div>
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-600">Tour de Bras</p>
                      <p className="font-semibold">{latestAIMetrics.arm} cm</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Aucune analyse IA disponible</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => window.location.href = '/client/book-classes'}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Planning des Cours
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.location.href = '/client/ai-coach'}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Coach IA
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Objectifs Actuels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Perte de Graisse</p>
                    <p className="text-sm text-blue-700">Objectif: -5kg d'ici Mars 2024</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Gain Musculaire</p>
                    <p className="text-sm text-green-700">+2kg de masse musculaire</p>
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

export default ClientProfile;
