import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSubscriptionAccess, SubscriptionPlan } from '@/hooks/useSubscriptionAccess';
import { Check, CreditCard, MapPin } from 'lucide-react';

interface Plan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const ClientSubscriptions = () => {
  const { currentPlan } = useSubscriptionAccess();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('basic');
  const [selectedDuration, setSelectedDuration] = useState<1 | 3 | 6 | 12>(1);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'gym'>('online');
  const [showPayment, setShowPayment] = useState(false);

  const basePrices = {
    basic: 60,
    plus: 90,
    premium: 120
  };

  const getPrice = (plan: SubscriptionPlan, duration: number) => {
    if (!plan) return 0;
    const basePrice = basePrices[plan];
    const discount = duration > 1 ? 5 : 0; // 5 TND discount for multi-month
    return (basePrice - discount) * duration;
  };

  const getPricePerMonth = (plan: SubscriptionPlan, duration: number) => {
    if (!plan) return 0;
    const basePrice = basePrices[plan];
    return duration > 1 ? basePrice - 5 : basePrice;
  };

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: basePrices.basic,
      features: [
        'Access to basic workout routines',
        'Limited access to community features',
        'Standard customer support'
      ]
    },
    {
      id: 'plus',
      name: 'Plus',
      price: basePrices.plus,
      popular: true,
      features: [
        'Everything in Basic, plus:',
        'Access to all group fitness classes',
        'Unlimited access to gym facilities',
        'Priority customer support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: basePrices.premium,
      features: [
        'Everything in Plus, plus:',
        'Personalized workout plans',
        'One-on-one coaching sessions',
        'Exclusive events and workshops',
        '24/7 premium support'
      ]
    }
  ];

  const handleSubscribe = () => {
    // Mock subscribe functionality
    alert(`Subscribing to ${selectedPlan} for ${selectedDuration} months via ${paymentMethod}`);
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
          <p className="text-purple-100">Choose the plan that fits your fitness goals</p>
          {currentPlan && (
            <Badge className="mt-2 bg-white/20">
              Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </Badge>
          )}
        </div>

        {/* Duration Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Duration</CardTitle>
            <CardDescription>Choose your subscription period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 3, 6, 12].map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  onClick={() => setSelectedDuration(duration as any)}
                  className="h-16 flex flex-col"
                >
                  <span className="font-bold">{duration} Month{duration > 1 ? 's' : ''}</span>
                  {duration > 1 && (
                    <span className="text-xs">5 TND/month discount</span>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`cursor-pointer transition-all ${selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge className="bg-purple-600">Popular</Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {getPricePerMonth(plan.id, selectedDuration)} TND
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                  {selectedDuration > 1 && (
                    <p className="text-sm text-green-600">
                      Total: {getPrice(plan.id, selectedDuration)} TND for {selectedDuration} months
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="cursor-pointer flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Online Payment (Flouci.tn)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gym" id="gym" />
                <Label htmlFor="gym" className="cursor-pointer flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Pay at Gym</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Subscribe Button */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={() => setShowPayment(true)}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              Subscribe to {selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)} Plan
              <span className="ml-2">
                {getPrice(selectedPlan, selectedDuration)} TND
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Current Subscription Management */}
        {currentPlan && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Subscription</CardTitle>
              <CardDescription>Current subscription settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</p>
                    <p className="text-sm text-gray-600">Active subscription</p>
                  </div>
                  <Button variant="outline">
                    Manage Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientSubscriptions;
