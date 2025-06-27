
export type ProgramLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProgramType = 'single' | 'program';
export type ProgramCategory = 'Weight Loss' | 'Muscle Gain' | 'Strength' | 'Cardio' | 'Flexibility';

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: ProgramLevel;
  category: ProgramCategory;
  type: ProgramType;
  image: string;
  rating: number;
  sales: number;
  revenue: number;
  features: string[];
  gym?: string;
  studio?: string;
}
