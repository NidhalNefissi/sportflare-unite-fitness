
export type UserRole = 'client' | 'coach' | 'gym_owner' | 'brand' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  isVerified?: boolean;
  subscription?: {
    plan: 'basic' | 'plus' | 'premium';
    expiresAt: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
