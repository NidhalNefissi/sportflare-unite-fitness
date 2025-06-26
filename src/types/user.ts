
export type UserRole = 'client' | 'gym_owner' | 'coach' | 'brand' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  created_at: string;
  phone?: string;
}

export interface Client extends User {
  role: 'client';
  phone?: string;
  subscription_plan?: 'basic' | 'plus' | 'premium';
  body_metrics?: BodyMetrics[];
  ai_generated_metrics?: AIGeneratedMetrics[];
  goals?: FitnessGoal[];
}

export interface GymOwner extends User {
  role: 'gym_owner';
  gym_name: string;
  location: string;
  bio?: string;
  logo_url?: string;
  photos?: string[];
  rating: number;
  studios?: Studio[];
  balance: number;
}

export interface Coach extends User {
  role: 'coach';
  bio?: string;
  coaching_field: string;
  certifications: string[];
  specialties: string[];
  rating: number;
  location?: string;
  classes?: ClassSchedule[];
  training_programs?: TrainingProgram[];
}

export interface Brand extends User {
  role: 'brand';
  company_name: string;
  logo_url?: string;
  bio?: string;
  products?: Product[];
}

export interface BodyMetrics {
  id: string;
  date: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number; // kg
  height: number; // cm
  front_photo?: string;
  side_photo?: string;
}

export interface AIGeneratedMetrics {
  id: string;
  date: string;
  body_fat: number;
  muscle_mass: number;
  waist: number;
  hip: number;
  chest: number;
  arm: number;
  bmi: number;
}

export interface FitnessGoal {
  id: string;
  type: 'lose_fat' | 'muscle_growth' | 'bulking' | 'cutting' | 'endurance' | 'strength';
  target_weight?: number;
  target_date?: string;
  description?: string;
}

export interface Studio {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  schedule: StudioTimeSlot[];
}

export interface StudioTimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'free' | 'reserved' | 'occupied';
  reserved_by?: string; // coach_id
  class_id?: string;
}

export interface ClassSchedule {
  id: string;
  name: string;
  description: string;
  gym_id: string;
  coach_id: string;
  studio_id: string;
  capacity: number;
  current_bookings: number;
  schedule: ClassSession[];
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  photos?: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface ClassSession {
  id: string;
  class_id: string;
  date: string;
  start_time: string;
  end_time: string;
  available_spots: number;
  qr_code?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface TrainingProgram {
  id: string;
  coach_id: string;
  name: string;
  description: string;
  duration_weeks: number;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  workouts: Workout[];
  nutrition_plan?: NutritionPlan;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration_minutes: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  instructions?: string;
}

export interface NutritionPlan {
  id: string;
  calories_per_day: number;
  protein_grams: number;
  carbs_grams: number;
  fat_grams: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
}

export interface Food {
  id: string;
  name: string;
  quantity: string;
  calories: number;
}

export interface Booking {
  id: string;
  client_id: string;
  class_session_id: string;
  status: 'booked' | 'canceled' | 'attended' | 'no_show';
  booking_time: string;
  qr_code?: string;
  payment_method: 'online' | 'gym_payment';
  payment_status: 'pending' | 'paid' | 'failed';
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  photos: string[];
  category: 'equipment' | 'supplements';
  rating: number;
  reviews_count: number;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_type: 'gym' | 'coach' | 'brand' | 'product';
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
  verified: boolean;
  can_review: boolean; // based on interaction history
}

export interface SubscriptionPlan {
  id: string;
  name: 'basic' | 'plus' | 'premium';
  duration_months: number;
  price: number;
  features: string[];
  daily_gym_limit: number;
  class_access: boolean;
  unlimited_access: boolean;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: 'TND';
  method: 'online' | 'gym_payment';
  status: 'pending' | 'completed' | 'failed';
  item_type: 'subscription' | 'class' | 'product' | 'program';
  item_id: string;
  gym_id?: string; // for gym payments
  created_at: string;
}

export interface CoachRequest {
  id: string;
  coach_id: string;
  gym_id: string;
  studio_id: string;
  class_name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
