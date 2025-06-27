
export type SubscriptionTier = 'basic' | 'plus' | 'premium';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  features: string[];
  classBookingLimit: number;
  gymAccess: boolean;
  aiCoach: boolean;
  personalTraining: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 60,
    features: ['Access to gym facilities', 'Basic workout tracking', '1 free trial class'],
    classBookingLimit: 0,
    gymAccess: true,
    aiCoach: false,
    personalTraining: false
  },
  {
    id: 'plus',
    name: 'Plus',
    tier: 'plus', 
    price: 90,
    features: ['Everything in Basic', 'Unlimited classes', 'AI Coach', '1 class per day'],
    classBookingLimit: 1,
    gymAccess: true,
    aiCoach: true,
    personalTraining: false
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 120,
    features: ['Everything in Plus', 'Unlimited daily classes', 'Personal training', 'Priority booking'],
    classBookingLimit: -1, // -1 means unlimited
    gymAccess: true,
    aiCoach: true,
    personalTraining: true
  }
];
