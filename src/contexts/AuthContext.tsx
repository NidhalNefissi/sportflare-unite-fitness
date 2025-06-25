
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@test.com',
    role: 'client',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'gym@test.com',
    role: 'gym_owner',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'coach@test.com',
    role: 'coach',
    name: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'brand@test.com',
    role: 'brand',
    name: 'FitGear Inc',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('sportflare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('sportflare_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      role: userData.role,
      name: userData.name,
      created_at: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('sportflare_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportflare_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
