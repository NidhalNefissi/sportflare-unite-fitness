
export interface ClassSchedule {
  id: string;
  name: string;
  type: 'single' | 'program'; // single session or full program
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  gym: {
    id: string;
    name: string;
    location: string;
  };
  coach: {
    id: string;
    name: string;
    rating: number;
    avatar?: string;
  };
  studio?: {
    id: string;
    name: string;
    equipment: string[];
  };
  description?: string;
}

export interface Booking {
  id: string;
  classSchedule: ClassSchedule;
  status: 'booked' | 'attended' | 'cancelled' | 'no-show';
  bookingDate: string;
  canCancel: boolean;
  qrCode?: string;
}
