
export type UserRole = 'client' | 'gym_owner' | 'coach' | 'brand';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  created_at: string;
}

export interface Client extends User {
  role: 'client';
  phone?: string;
  subscription_plan?: 'basic' | 'plus' | 'premium';
  body_metrics?: BodyMetrics;
}

export interface GymOwner extends User {
  role: 'gym_owner';
  gym_name: string;
  location: string;
  bio?: string;
  logo_url?: string;
  photos?: string[];
  rating: number;
}

export interface Coach extends User {
  role: 'coach';
  bio?: string;
  certifications: string[];
  specialties: string[];
  rating: number;
  location?: string;
}

export interface Brand extends User {
  role: 'brand';
  company_name: string;
  logo_url?: string;
  bio?: string;
}

export interface BodyMetrics {
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number; // kg
  height: number; // cm
  body_fat?: number;
  muscle_mass?: number;
  waist?: number;
  hip?: number;
  chest?: number;
  arm?: number;
  bmi: number;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  gym_id: string;
  coach_id: string;
  capacity: number;
  current_bookings: number;
  schedule: ClassSchedule[];
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface ClassSchedule {
  id: string;
  class_id: string;
  date: string;
  start_time: string;
  end_time: string;
  available_spots: number;
}

export interface Booking {
  id: string;
  client_id: string;
  class_schedule_id: string;
  status: 'booked' | 'canceled' | 'attended' | 'no_show';
  booking_time: string;
  qr_code?: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  photos: string[];
  category: 'equipment' | 'supplements' | 'apparel' | 'accessories';
  rating: number;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_type: 'gym' | 'coach' | 'brand';
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
  verified: boolean;
}
