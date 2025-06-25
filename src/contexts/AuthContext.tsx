
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUsers } from '@/data/mockUsers';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'coach' | 'gym_owner' | 'brand';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('sportflare_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
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
      return true;
    }
    
    console.log('Login failed: Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportflare_user');
    console.log('User logged out');
  };

  const register = async (email: string, password: string, name: string, role: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    console.log('Mock registration:', { email, name, role });
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role: role as User['role'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    setUser(newUser);
    localStorage.setItem('sportflare_user', JSON.stringify(newUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
