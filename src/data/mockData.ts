
import { Gym, ClassSchedule, Booking } from '@/types/booking';
import { Product } from '@/types/marketplace';

export const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'FitZone Downtown',
    location: 'Downtown, Tunis',
    rating: 4.8,
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    description: 'Premium fitness center with state-of-the-art equipment and expert trainers.',
    amenities: ['Swimming Pool', 'Sauna', 'Personal Training', 'Group Classes', 'Parking'],
    priceRange: '$$',
    distance: 2.3
  },
  {
    id: '2',
    name: 'PowerGym Elite',
    location: 'Menzah, Tunis',
    rating: 4.6,
    photos: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618047-dd5175a2c79d?w=800&h=600&fit=crop'
    ],
    description: 'Strength training focused gym with Olympic equipment and powerlifting platforms.',
    amenities: ['Olympic Lifting', 'Powerlifting', '24/7 Access', 'Nutrition Counseling'],
    priceRange: '$$$',
    distance: 5.1
  },
  {
    id: '3',
    name: 'Zen Fitness & Wellness',
    location: 'Lac, Tunis',
    rating: 4.9,
    photos: [
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=800&h=600&fit=crop'
    ],
    description: 'Holistic wellness center focusing on yoga, pilates, and mindful fitness.',
    amenities: ['Yoga Studio', 'Pilates', 'Meditation Room', 'Spa Services', 'Healthy Cafe'],
    priceRange: '$$',
    distance: 3.7
  }
];

export const mockClasses: ClassSchedule[] = [
  {
    id: '1',
    name: 'HIIT Cardio Blast',
    coach: {
      id: '3',
      name: 'Mike Wilson',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    gym: {
      id: '1',
      name: 'FitZone Downtown',
      location: 'Downtown, Tunis'
    },
    date: '2024-12-28',
    startTime: '18:00',
    endTime: '19:00',
    duration: 60,
    capacity: 20,
    booked: 15,
    price: 25,
    difficulty: 'Intermediate',
    category: 'Cardio',
    description: 'High-intensity interval training to boost your cardiovascular fitness and burn calories.'
  },
  {
    id: '2',
    name: 'Morning Yoga Flow',
    coach: {
      id: '4',
      name: 'Sarah Chen',
      rating: 4.8,
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    gym: {
      id: '3',
      name: 'Zen Fitness & Wellness',
      location: 'Lac, Tunis'
    },
    date: '2024-12-29',
    startTime: '07:30',
    endTime: '08:30',
    duration: 60,
    capacity: 15,
    booked: 12,
    price: 30,
    difficulty: 'Beginner',
    category: 'Yoga',
    description: 'Start your day with a gentle yoga flow to improve flexibility and mental clarity.'
  },
  {
    id: '3',
    name: 'Strength & Power',
    coach: {
      id: '5',
      name: 'Ahmed Sassi',
      rating: 4.7,
      photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop&crop=face'
    },
    gym: {
      id: '2',
      name: 'PowerGym Elite',
      location: 'Menzah, Tunis'
    },
    date: '2024-12-28',
    startTime: '19:30',
    endTime: '20:30',
    duration: 60,
    capacity: 12,
    booked: 8,
    price: 35,
    difficulty: 'Advanced',
    category: 'Strength',
    description: 'Advanced strength training focusing on compound movements and progressive overload.'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Whey Protein',
    brand: 'FitNutrition',
    price: 89.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 124,
    category: 'Supplements',
    description: 'High-quality whey protein isolate for muscle building and recovery.',
    inStock: true,
    features: ['25g Protein per serving', 'Fast absorption', 'Great taste', 'Third-party tested']
  },
  {
    id: '2',
    name: 'Adjustable Dumbbells Set',
    brand: 'FitEquip',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 89,
    category: 'Equipment',
    description: 'Space-saving adjustable dumbbells from 5-50 lbs per dumbbell.',
    inStock: true,
    features: ['Space-saving design', '5-50 lbs range', 'Quick weight changes', 'Durable construction']
  },
  {
    id: '3',
    name: 'Performance Athletic Wear Set',
    brand: 'SportStyle',
    price: 79.99,
    originalPrice: 95.99,
    image: 'https://images.unsplash.com/photo-1506629905607-83d682b2b05d?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 67,
    category: 'Apparel',
    description: 'Moisture-wicking athletic wear set perfect for intense workouts.',
    inStock: true,
    features: ['Moisture-wicking fabric', 'Flexible fit', 'Breathable material', 'Machine washable']
  }
];

export const generateQRCode = (bookingId: string): string => {
  return `SF-${bookingId}-${Date.now()}`;
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    classSchedule: mockClasses[0],
    status: 'booked',
    bookingTime: '2024-12-27T10:30:00Z',
    qrCode: generateQRCode('1'),
    canCancel: true
  }
];
