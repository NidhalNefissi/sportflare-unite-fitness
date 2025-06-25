
export interface Gym {
  id: string;
  name: string;
  location: string;
  rating: number;
  photos: string[];
  description: string;
  amenities: string[];
  priceRange: string;
  distance?: number;
}

export interface ClassSchedule {
  id: string;
  name: string;
  coach: {
    id: string;
    name: string;
    rating: number;
    photo: string;
  };
  gym: {
    id: string;
    name: string;
    location: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  capacity: number;
  booked: number;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
}

export interface Booking {
  id: string;
  classSchedule: ClassSchedule;
  status: 'booked' | 'attended' | 'cancelled' | 'no-show';
  bookingTime: string;
  qrCode?: string;
  canCancel: boolean;
}

export interface QRCheckIn {
  id: string;
  bookingId: string;
  qrCode: string;
  generatedAt: string;
  usedAt?: string;
  isValid: boolean;
}
