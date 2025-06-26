
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { 
  User, 
  MapPin, 
  Users, 
  ShoppingBag, 
  Calendar, 
  CreditCard,
  Star,
  Dumbbell,
  Target,
  Activity,
  Lock,
  Crown
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClientDashboard = () => {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const { getCartItemCount } = useMarketplace();
  const { currentPlan, needsUpgrade } = useSubscriptionAccess();
  const navigate = useNavigate();

  const upcomingBookings = bookings.filter(b => 
    b.status === 'booked' && 
    new Date(`${b.classSchedule.date}T${b.classSchedule.startTime}`) > new Date()
  ).length;

  const handleNavigation = (route: string, feature?: string) => {
    if (feature && needsUpgrade(feature)) {
      toast({
        title: "Mise à niveau requise",
        description: `Vous devez avoir un plan Plus ou Premium pour accéder à cette fonctionnalité.`,
        variant: "destructive"
      });
      navigate('/client/subscriptions');
      return;
    }
    navigate(route);
  };

  const handleViewHistory = () => {
    navigate('/client/my-bookings');
  };

  const quickActions = [
    {
      title: 'Profil Client',
      description: 'Gérez vos informations personnelles',
      icon: <User className="w-8 h-8" />,
      color: 'bg-blue-500',
      route: '/client/profile',
      locked: false
    },
    {
      title: 'Salles de Sport',
      description: 'Découvrez les salles partenaires',
      icon: <MapPin className="w-8 h-8" />,
      color: 'bg-green-500',
      route: '/client/gyms',
      locked: needsUpgrade('gyms'),
      feature: 'gyms'
    },
    {
      title: 'Coaches',
      description: 'Trouvez votre coach idéal',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-500',
      route: '/client/coaches',
      locked: needsUpgrade('coaches'),
      feature: 'coaches'
    },
    {
      title: 'Marketplace',
      description: 'Boutique équipements & suppléments',
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'bg-orange-500',
      route: '/client/marketplace',
      locked: false,
      badge: getCartItemCount() > 0 ? getCartItemCount().toString() : null
    },
    {
      title: 'Planning des Cours',
      description: 'Réservez vos séances',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-red-500',
      route: '/client/book-classes',
      locked: needsUpgrade('classes'),
      feature: 'classes',
      badge: upcomingBookings > 0 ? upcomingBookings.toString() : null
    },
    {
      title: 'Abonnements',
      description: 'Gérez votre plan',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'bg-indigo-500',
      route: '/client/subscriptions',
      locked: false
    }
  ];

  const getPlanBadgeColor = () => {
    switch (currentPlan) {
      case 'basic':
        return 'bg-gray-500';
      case 'plus':
        return 'bg-purple-500';
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bienvenue, {user?.name}!</h1>
                <p className="text-blue-100 text-lg">Prêt pour votre prochaine séance ?</p>
              </div>
            </div>
            <Badge className={`${getPlanBadgeColor()} text-white px-4 py-2 text-lg font-bold`}>
              {currentPlan === 'premium' && <Crown className="w-4 h-4 mr-1" />}
              Plan {currentPlan?.charAt(0).toUpperCase() + currentPlan?.slice(1)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Activity className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{upcomingBookings}</div>
              <div className="text-sm text-blue-100">Cours à venir</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">4/6</div>
              <div className="text-sm text-blue-100">Objectif semaine</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">Gold</div>
              <div className="text-sm text-blue-100">Niveau</div>
            </div>
          </div>
        </div>

        {/* Upgrade Prompt for Basic Users */}
        {currentPlan === 'basic' && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-900">Débloquez plus de fonctionnalités!</h3>
                    <p className="text-orange-700 text-sm">Passez au plan Plus ou Premium pour accéder aux cours et coaches.</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/client/subscriptions')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Voir les Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Accès rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  action.locked ? 'opacity-60' : ''
                }`}
                onClick={() => handleNavigation(action.route, action.feature)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg relative`}>
                      {action.icon}
                      {action.locked && (
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    {action.badge && !action.locked && (
                      <Badge className="bg-red-500 text-white font-bold">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {action.title}
                    {action.locked && <Lock className="w-4 h-4 text-gray-400" />}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                  {action.locked && (
                    <p className="text-orange-600 text-xs mt-2 font-medium">
                      Plan Plus/Premium requis
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity & AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activité récente
              </CardTitle>
              <CardDescription>Vos dernières séances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Musculation</p>
                    <p className="text-sm text-gray-600">FitZone Tunis • Hier 18:00</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Yoga Flow</p>
                    <p className="text-sm text-gray-600">Zen Wellness • 2 jours</p>
                  </div>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleViewHistory}
                >
                  Voir l'historique complet
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Recommandations IA
              </CardTitle>
              <CardDescription>Suggestions personnalisées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 Objectif de la semaine</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    Ajoutez 2 séances de cardio pour atteindre votre objectif.
                  </p>
                  {needsUpgrade('classes') ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Débloquer les Cours
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Accès aux Cours</DialogTitle>
                          <DialogDescription>
                            Vous avez besoin d'un plan Plus ou Premium pour réserver des cours.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            onClick={() => navigate('/client/subscriptions')}
                            className="flex-1"
                          >
                            Voir les Plans
                          </Button>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              Plus tard
                            </Button>
                          </DialogTrigger>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => navigate('/client/book-classes')}
                    >
                      Réserver un cours
                    </Button>
                  )}
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">💪 Coach IA</h4>
                  <p className="text-sm text-green-700 mb-3">
                    Découvrez votre plan personnalisé basé sur vos objectifs.
                  </p>
                  {needsUpgrade('ai-coach') ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-green-300 text-green-700"
                      onClick={() => navigate('/client/subscriptions')}
                    >
                      Débloquer l'IA Coach
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-green-300 text-green-700"
                      onClick={() => navigate('/client/ai-coach')}
                    >
                      Voir le plan
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
