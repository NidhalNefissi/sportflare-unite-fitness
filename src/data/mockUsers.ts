
export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'client' | 'coach' | 'gym_owner' | 'brand' | 'admin';
  avatar?: string;
  phone?: string;
  coaching_field?: string;
  gym_name?: string;
  location?: string;
  company_name?: string;
}

export const mockUsers: MockUser[] = [
  // Clients
  {
    id: 'client-1',
    email: 'client1@test.com',
    password: 'password123',
    name: 'Sarah Ben Mohamed',
    role: 'client',
    phone: '+216 20 123 456',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'client-2',
    email: 'client2@test.com',
    password: 'password123',
    name: 'Mohamed Ali Cherif',
    role: 'client',
    phone: '+216 25 789 012',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  // Coaches
  {
    id: 'coach-1',
    email: 'coach1@test.com',
    password: 'password123',
    name: 'Emma Kallel',
    role: 'coach',
    phone: '+216 22 345 678',
    coaching_field: 'Musculation',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'coach-2',
    email: 'coach2@test.com',
    password: 'password123',
    name: 'Alex Trabelsi',
    role: 'coach',
    phone: '+216 26 901 234',
    coaching_field: 'Yoga',
    avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop&crop=face'
  },
  // Gym Owners
  {
    id: 'gym-1',
    email: 'gym1@test.com',
    password: 'password123',
    name: 'Karim Mansouri',
    role: 'gym_owner',
    phone: '+216 71 234 567',
    gym_name: 'FitZone Tunis',
    location: 'Centre-ville, Tunis',
    avatar: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'gym-2',
    email: 'gym2@test.com',
    password: 'password123',
    name: 'Leila Bouazizi',
    role: 'gym_owner',
    phone: '+216 70 345 678',
    gym_name: 'PowerGym Elite',
    location: 'Menzah, Tunis',
    avatar: 'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=100&h=100&fit=crop&crop=face'
  },
  // Brands
  {
    id: 'brand-1',
    email: 'brand1@test.com',
    password: 'password123',
    name: 'Ahmed Gharbi',
    role: 'brand',
    phone: '+216 28 456 789',
    company_name: 'FitNutrition Tunisia',
    avatar: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'brand-2',
    email: 'brand2@test.com',
    password: 'password123',
    name: 'Nour Khelifi',
    role: 'brand',
    phone: '+216 29 567 890',
    company_name: 'SportStyle Tunisia',
    avatar: 'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=100&h=100&fit=crop&crop=face'
  },
  // Admins
  {
    id: 'admin-1',
    email: 'admin1@test.com',
    password: 'password123',
    name: 'Administrateur SportFlare',
    role: 'admin',
    phone: '+216 70 000 000',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'admin-2',
    email: 'admin2@test.com',
    password: 'password123',
    name: 'Support Technique',
    role: 'admin',
    phone: '+216 70 000 001',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  }
];
