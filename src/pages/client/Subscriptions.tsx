
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  Star, 
  CreditCard, 
  MapPin, 
  Users, 
  Dumbbell,
  Calendar,
  Gift,
  Crown,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type PlanType = 'basic' | 'plus' | 'premium';
type DurationType = '1' | '3' | '6' | '12';

const ClientSubscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('plus');
  const [selectedDuration, setSelectedDuration] = useState<DurationType>('1');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic' as PlanType,
      name: 'Basic',
      subtitle: 'Accès Zone Musculation',
      icon: <Dumbbell className="w-8 h-8" />,
      color: 'bg-blue-500',
      features: [
        'Accès aux zones de musculation',
        'Une salle par jour',
        'Tableau de bord personnel',
        'Suivi des progrès',
        'Support client'
      ],
      limitations: [
        'Pas d\'accès aux cours collectifs',
        'Une seule salle par jour'
      ]
    },
    {
      id: 'plus' as PlanType,
      name: 'Plus',
      subtitle: 'Musculation + Cours',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-500',
      popular: true,
      features: [
        'Accès aux zones de musculation',
        'Cours collectifs inclus',
        'Une activité par jour',
        'Réservation de cours',
        'Feedback des coaches',
        'Statistiques avancées',
        'Support prioritaire'
      ],
      limitations: [
        'Une activité par jour (salle OU cours)'
      ]
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium',
      subtitle: 'Accès Illimité',
      icon: <Crown className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      features: [
        'Accès illimité à toutes les salles',
        'Cours collectifs illimités',
        'Plusieurs activités par jour',
        'Réservation prioritaire',
        'Accès aux activités premium',
        'Coach IA avancé',
        'Défis communautaires',
        'Concierge booking',
        'Support VIP 24/7'
      ],
      limitations: []
    }
  ];

  const durations = [
    {
      value: '1' as DurationType,
      label: '1 Mois',
      discount: 0,
      bonus: 0
    },
    {
      value: '3' as DurationType,
      label: '3 Mois',
      discount: 0,
      bonus: 1,
      popular: true,
      description: 'Payez 3, obtenez 4 mois'
    },
    {
      value: '6' as DurationType,
      label: '6 Mois',
      discount: 0,
      bonus: 2,
      description: 'Payez 6, obtenez 8 mois'
    },
    {
      value: '12' as DurationType,
      label: '12 Mois',
      discount: 0,
      bonus: 4,
      description: 'Payez 12, obtenez 16 mois + Avantages Premium'
    }
  ];

  const pricing: Record<PlanType, Record<DurationType, number>> = {
    basic: { '1': 45, '3': 40, '6': 38, '12': 35 },
    plus: { '1': 65, '3': 60, '6': 55, '12': 50 },
    premium: { '1': 95, '3': 85, '6': 80, '12': 75 }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const selectedDurationData = durations.find(d => d.value === selectedDuration);
  const monthlyPrice = pricing[selectedPlan][selectedDuration];
  const totalMonths = parseInt(selectedDuration) + (selectedDurationData?.bonus || 0);
  const totalPrice = monthlyPrice * parseInt(selectedDuration);

  const handleSubscribe = () => {
    toast({
      title: "Redirection vers le paiement",
      description: `Abonnement ${selectedPlanData?.name} - ${totalPrice} TND`,
    });
    
    if (paymentMethod === 'gym') {
      navigate('/client/payment/gym-selection');
    } else {
      navigate('/client/payment/checkout');
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Plans d'Abonnement</h1>
          <p className="text-indigo-100">Choisissez le plan qui correspond à vos objectifs fitness</p>
        </div>

        {/* Current Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Votre Abonnement Actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-purple-100 text-purple-800 mb-2">Plan Plus Actif</Badge>
                <p className="text-gray-600">Expire le 15 janvier 2025</p>
                <p className="text-sm text-gray-500">23 jours restants</p>
              </div>
              <Button variant="outline">
                Gérer l'abonnement
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choisir un Plan</CardTitle>
                <CardDescription>Sélectionnez le plan qui vous convient le mieux</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as PlanType)} className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-start space-x-4">
                          <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                          <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center text-white`}>
                            {plan.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Label htmlFor={plan.id} className="text-lg font-semibold cursor-pointer">
                                {plan.name}
                              </Label>
                              {plan.popular && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  Populaire
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{plan.subtitle}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-green-700 mb-2">✓ Inclus</h4>
                                <ul className="space-y-1">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center space-x-2 text-sm">
                                      <Check className="w-3 h-3 text-green-500" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {plan.limitations.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-orange-700 mb-2">⚠ Limitations</h4>
                                  <ul className="space-y-1">
                                    {plan.limitations.map((limitation, index) => (
                                      <li key={index} className="text-sm text-orange-600">
                                        • {limitation}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Duration Selection */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Durée d'Abonnement</CardTitle>
                <CardDescription>Plus long = plus d'économies et de mois bonus</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedDuration} onValueChange={(value) => setSelectedDuration(value as DurationType)} className="grid grid-cols-2 gap-4">
                  {durations.map((duration) => (
                    <div key={duration.value} className="relative">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDuration === duration.value 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={duration.value} id={duration.value} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Label htmlFor={duration.value} className="font-semibold cursor-pointer">
                                {duration.label}
                              </Label>
                              {duration.popular && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  Recommandé
                                </Badge>
                              )}
                            </div>
                            <p className="text-lg font-bold text-indigo-600">
                              {monthlyPrice} TND/mois
                            </p>
                            {duration.bonus > 0 && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Gift className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600 font-medium">
                                  +{duration.bonus} mois gratuit{duration.bonus > 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                            {duration.description && (
                              <p className="text-xs text-gray-600 mt-1">{duration.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Plan sélectionné</span>
                    <span className="font-medium">{selectedPlanData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée</span>
                    <span className="font-medium">{selectedDurationData?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix mensuel</span>
                    <span className="font-medium">{monthlyPrice} TND</span>
                  </div>
                  {selectedDurationData?.bonus && selectedDurationData.bonus > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Mois bonus</span>
                      <span className="font-medium">+{selectedDurationData.bonus}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total à payer</span>
                    <span>{totalPrice} TND</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Pour {totalMonths} mois d'accès
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Mode de paiement</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="cursor-pointer flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Paiement en ligne (Flouci.tn)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gym" id="gym" />
                      <Label htmlFor="gym" className="cursor-pointer flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Paiement en salle</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  S'abonner maintenant
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>Résiliation possible à tout moment</p>
                  <p>Paiement sécurisé • Sans engagement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientSubscriptions;
