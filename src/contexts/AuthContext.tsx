
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUsers } from '@/data/mockUsers';
import { UserRole } from '@/types/user';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
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
    phone: string;
    role: UserRole;
    coaching_field?: string;
    gym_name?: string;
    location?: string;
    company_name?: string;
  }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('sportflare_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Attempting login with:', email, password);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: mockUser.avatar,
        phone: mockUser.phone
      };
      
      setUser(userData);
      localStorage.setItem('sportflare_user', JSON.stringify(userData));
      console.log('Login successful:', userData);
      setIsLoading(false);
      
      // Navigate based on role
      setTimeout(() => {
        const dashboardPath = `/${userData.role.replace('_', '-')}/dashboard`;
        window.location.href = dashboardPath;
      }, 100);
      
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
    window.location.href = '/';
  };

  const register = async (formData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: UserRole;
    coaching_field?: string;
    gym_name?: string;
    location?: string;
    company_name?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    console.log('Mock registration:', formData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
      role: formData.role,
      phone: formData.phone,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    setUser(newUser);
    localStorage.setItem('sportflare_user', JSON.stringify(newUser));
    setIsLoading(false);
    
    // Navigate based on role
    setTimeout(() => {
      const dashboardPath = `/${newUser.role.replace('_', '-')}/dashboard`;
      window.location.href = dashboardPath;
    }, 100);
    
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
