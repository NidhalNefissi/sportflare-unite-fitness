
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionTier, SUBSCRIPTION_PLANS } from '@/types/subscription';

export const useSubscriptionAccess = () => {
  const { user } = useAuth();
  
  // Mock subscription data - in real app this would come from user profile
  const currentPlan: SubscriptionTier = 'premium'; // Mock premium for demo
  
  const canAccessClasses = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessAICoach = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessGyms = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessCoaches = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canBookMultiplePerDay = (): boolean => {
    return currentPlan === 'premium';
  };
  
  const getBookingLimit = (): number => {
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
  
  const needsUpgrade = (feature: string): boolean => {
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
  
  const getCurrentPlanDetails = () => {
    return SUBSCRIPTION_PLANS.find(plan => plan.tier === currentPlan);
  };
  
  return {
    currentPlan,
    canAccessClasses,
    canAccessAICoach,
    canAccessGyms,
    canAccessCoaches,
    canBookMultiplePerDay,
    getBookingLimit,
    needsUpgrade,
    getCurrentPlanDetails
  };
};
