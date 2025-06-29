
export type ProgramLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProgramType = 'single' | 'program';
export type ProgramCategory = 'Weight Loss' | 'Muscle Gain' | 'Strength' | 'Cardio' | 'Flexibility';

export interface TrainingProgram {
  id: string;
  title: string; // Changed from 'name' to 'title'
  description: string;
  duration: string;
  level: ProgramLevel; // Changed from 'difficulty' to 'level'
  category: ProgramCategory;
  type: ProgramType;
  image?: string;
  rating: number;
  price: number; // Added price field
  enrollments: number; // Changed from 'sales' to 'enrollments'
  sessions: number; // Added sessions field
  revenue: number;
  features: string[];
  gym?: string;
  studio?: string;
  createdAt: string; // Added createdAt field
  isActive: boolean; // Added isActive field
}
