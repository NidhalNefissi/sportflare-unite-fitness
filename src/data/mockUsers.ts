
export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'client' | 'coach' | 'gym_owner' | 'brand' | 'admin';
  avatar?: string;
}

export const mockUsers: MockUser[] = [
  // Clients
  {
    id: 'client-1',
    email: 'client1@test.com',
    password: 'password123',
    name: 'Sarah Wilson',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'client-2',
    email: 'client2@test.com',
    password: 'password123',
    name: 'Mike Johnson',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  // Coaches
  {
    id: 'coach-1',
    email: 'coach1@test.com',
    password: 'password123',
    name: 'Emma Davis',
    role: 'coach',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'coach-2',
    email: 'coach2@test.com',
    password: 'password123',
    name: 'Alex Thompson',
    role: 'coach',
    avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop&crop=face'
  },
  // Gym Owners
  {
    id: 'gym-1',
    email: 'gym1@test.com',
    password: 'password123',
    name: 'FitZone Management',
    role: 'gym_owner',
    avatar: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'gym-2',
    email: 'gym2@test.com',
    password: 'password123',
    name: 'PowerGym Elite',
    role: 'gym_owner',
    avatar: 'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=100&h=100&fit=crop&crop=face'
  },
  // Brands
  {
    id: 'brand-1',
    email: 'brand1@test.com',
    password: 'password123',
    name: 'FitNutrition',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'brand-2',
    email: 'brand2@test.com',
    password: 'password123',
    name: 'SportStyle',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=100&h=100&fit=crop&crop=face'
  },
  // Admins
  {
    id: 'admin-1',
    email: 'admin1@test.com',
    password: 'password123',
    name: 'SportFlare Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'admin-2',
    email: 'admin2@test.com',
    password: 'password123',
    name: 'System Administrator',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  }
];
