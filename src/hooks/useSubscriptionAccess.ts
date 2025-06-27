
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionTier, SUBSCRIPTION_PLANS } from '@/types/subscription';

export const useSubscriptionAccess = () => {
  const { user } = useAuth();
  
  // Get current plan from user subscription or default to basic
  const currentPlan: SubscriptionTier = user?.subscription?.plan || 'basic';
  
  const canAccessClasses = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessAICoach = (): boolean => {
    return currentPlan === 'plus' || currentPlan === 'premium';
  };
  
  const canAccessGyms = (): boolean => {
    return true; // All plans can access gyms
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
        return 0; // No class bookings (except 1 free trial)
      case 'plus':
        return 1; // One per day
      case 'premium':
        return -1; // Unlimited
      default:
        return 0;
    }
  };
  
  const hasFreeTrial = (): boolean => {
    // Mock logic - in real app this would check if user has used free trial
    return currentPlan === 'basic';
  };
  
  const needsUpgrade = (feature: string): boolean => {
    switch (feature) {
      case 'classes':
        return !canAccessClasses();
      case 'ai-coach':
        return !canAccessAICoach();
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
    hasFreeTrial,
    needsUpgrade,
    getCurrentPlanDetails
  };
};
