
import { useAuth } from '@/contexts/AuthContext';

export type SubscriptionPlan = 'basic' | 'plus' | 'premium' | null;

export const useSubscriptionAccess = () => {
  const { user } = useAuth();
  
  // Mock subscription data - in real app this would come from user profile
  const currentPlan: SubscriptionPlan = 'premium'; // Mock premium for demo
  
  const canAccessClasses = () => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessAICoach = () => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessGyms = () => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessCoaches = () => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canBookMultiplePerDay = () => {
    return currentPlan === 'premium';
  };
  
  const getBookingLimit = () => {
    switch (currentPlan) {
      case 'basic':
        return 0; // No class bookings
      case 'plus':
        return 1; // One per day
      case 'premium':
        return -1; // Unlimited
      default:
        return 0;
    }
  };
  
  const needsUpgrade = (feature: string) => {
    switch (feature) {
      case 'classes':
        return !canAccessClasses();
      case 'ai-coach':
        return !canAccessAICoach();
      case 'gyms':
        return !canAccessGyms();
      case 'coaches':
        return !canAccessCoaches();
      default:
        return false;
    }
  };
  
  return {
    currentPlan,
    canAccessClasses,
    canAccessAICoach,
    canAccessGyms,
    canAccessCoaches,
    canBookMultiplePerDay,
    getBookingLimit,
    needsUpgrade
  };
};
