
import { User } from '@/types/user';

export const mockUsers: User[] = [
  // Clients
  {
    id: 'client-1',
    email: 'client1@test.com',
    name: 'Sarah Ben Mohamed',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    phone: '+216 20 123 456',
    bio: 'Fitness enthusiast looking to stay healthy and strong',
    location: 'Tunis, Tunisia',
    joinDate: '2024-01-15',
    isVerified: true,
    subscription: {
      plan: 'premium',
      expiresAt: '2024-12-31'
    }
  },
  {
    id: 'client-2',
    email: 'client2@test.com',
    name: 'Mohamed Ali Trabelsi',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+216 21 234 567',
    bio: 'Marathon runner and yoga practitioner',
    location: 'Sfax, Tunisia',
    joinDate: '2024-02-20',
    isVerified: true,
    subscription: {
      plan: 'plus',
      expiresAt: '2024-11-30'
    }
  },

  // Coaches
  {
    id: 'coach-1',
    email: 'coach1@test.com',
    name: 'Emma Kallel',
    role: 'coach',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    phone: '+216 22 345 678',
    bio: 'Certified personal trainer specializing in strength training and nutrition',
    location: 'Tunis, Tunisia',
    joinDate: '2024-01-10',
    isVerified: true
  },
  {
    id: 'coach-2',
    email: 'coach2@test.com',
    name: 'Youssef Ben Salah',
    role: 'coach',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
    phone: '+216 23 456 789',
    bio: 'Yoga instructor and mindfulness coach with 8 years experience',
    location: 'Sousse, Tunisia',
    joinDate: '2024-01-25',
    isVerified: true
  },

  // Gym Owners
  {
    id: 'gym-owner-1',
    email: 'gym1@test.com',
    name: 'Ahmed Fitness Center',
    role: 'gym_owner',
    avatar: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop&crop=face',
    phone: '+216 24 567 890',
    bio: 'Premium fitness facility with state-of-the-art equipment',
    location: 'Tunis, Tunisia',
    joinDate: '2024-01-05',
    isVerified: true
  },
  {
    id: 'gym-owner-2',
    email: 'gym2@test.com',
    name: 'Zen Wellness Studio',
    role: 'gym_owner',
    avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=face',
    phone: '+216 25 678 901',
    bio: 'Holistic wellness center focusing on mind-body connection',
    location: 'Hammamet, Tunisia',
    joinDate: '2024-02-01',
    isVerified: true
  },

  // Brands
  {
    id: 'brand-1',
    email: 'brand1@test.com',
    name: 'FitNutrition Tunisia',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=face',
    phone: '+216 26 789 012',
    bio: 'Premium sports nutrition and supplements for athletes',
    location: 'Tunis, Tunisia',
    joinDate: '2024-01-20',
    isVerified: true
  },
  {
    id: 'brand-2',
    email: 'brand2@test.com',
    name: 'ActiveGear Tunisia',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=face',
    phone: '+216 27 890 123',
    bio: 'High-quality fitness equipment and athletic wear',
    location: 'Sousse, Tunisia',
    joinDate: '2024-02-15',
    isVerified: true
  },

  // Admins
  {
    id: 'admin-1',
    email: 'admin@sportflare.tn',
    name: 'SportFlare Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '+216 71 123 456',
    bio: 'Platform administrator and system manager',
    location: 'Tunis, Tunisia',
    joinDate: '2023-12-01',
    isVerified: true
  }
];

// Helper function to get user by credentials
export const getUserByCredentials = (email: string, password: string) => {
  // Mock authentication - in real app, this would be handled by backend
  if (password === 'password123') {
    return mockUsers.find(user => user.email === email) || null;
  }
  return null;
};

// Helper function to check if email exists
export const emailExists = (email: string) => {
  return mockUsers.some(user => user.email === email);
};
