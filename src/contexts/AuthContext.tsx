
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUsers } from '@/data/mockUsers';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'coach' | 'gym_owner' | 'brand' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (formData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('sportflare_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Attempting login with:', email, password);
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: mockUser.avatar
      };
      
      setUser(userData);
      localStorage.setItem('sportflare_user', JSON.stringify(userData));
      console.log('Login successful:', userData);
      setIsLoading(false);
      return true;
    }
    
    console.log('Login failed: Invalid credentials');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportflare_user');
    console.log('User logged out');
  };

  const register = async (formData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    console.log('Mock registration:', formData);
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === formData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `${formData.role}-${Date.now()}`,
      email: formData.email,
      name: formData.name,
      role: formData.role as User['role'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    setUser(newUser);
    localStorage.setItem('sportflare_user', JSON.stringify(newUser));
    setIsLoading(false);
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
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
