
import { ClassSchedule } from '@/types/classes';

export const mockClasses: ClassSchedule[] = [
  {
    id: 'class-1',
    name: 'HIIT Cardio',
    type: 'single',
    date: '2024-01-15',
    startTime: '18:00',
    endTime: '19:00',
    capacity: 20,
    booked: 15,
    difficulty: 'intermediate',
    gym: {
      id: 'gym-1',
      name: 'FitZone Tunis',
      location: 'Tunis Centre'
    },
    coach: {
      id: 'coach-1',
      name: 'Ahmed Ben Ali',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
    },
    studio: {
      id: 'studio-1',
      name: 'Cardio Room A',
      equipment: ['Treadmills', 'Rowing Machines', 'Bikes']
    },
    description: 'High-intensity interval training for maximum calorie burn'
  },
  {
    id: 'class-2',
    name: 'Yoga Flow',
    type: 'single',
    date: '2024-01-16',
    startTime: '08:00',
    endTime: '09:30',
    capacity: 15,
    booked: 8,
    difficulty: 'beginner',
    gym: {
      id: 'gym-2',
      name: 'Zen Wellness',
      location: 'Sfax'
    },
    coach: {
      id: 'coach-2',
      name: 'Fatma Trabelsi',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face'
    },
    studio: {
      id: 'studio-2',
      name: 'Yoga Studio',
      equipment: ['Yoga Mats', 'Blocks', 'Straps']
    },
    description: 'Gentle flow yoga perfect for beginners'
  },
  {
    id: 'class-3',
    name: 'Weight Training Program',
    type: 'program',
    date: '2024-01-17',
    startTime: '19:00',
    endTime: '20:30',
    capacity: 12,
    booked: 10,
    difficulty: 'advanced',
    gym: {
      id: 'gym-3',
      name: 'PowerGym',
      location: 'Sousse'
    },
    coach: {
      id: 'coach-3',
      name: 'Mohamed Kassem',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=100&h=100&fit=crop&crop=face'
    },
    studio: {
      id: 'studio-3',
      name: 'Weight Room',
      equipment: ['Free Weights', 'Machines', 'Barbells']
    },
    description: '8-week progressive strength training program'
  }
];
