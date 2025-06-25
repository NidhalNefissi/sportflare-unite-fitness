
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, ClassSchedule } from '@/types/booking';
import { mockBookings, mockClasses, generateQRCode } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface BookingContextType {
  bookings: Booking[];
  availableClasses: ClassSchedule[];
  bookClass: (classSchedule: ClassSchedule) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  generateCheckInQR: (bookingId: string) => string | null;
  getBookingById: (bookingId: string) => Booking | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [availableClasses] = useState<ClassSchedule[]>(mockClasses);

  const bookClass = async (classSchedule: ClassSchedule): Promise<boolean> => {
    try {
      // Check if class is full
      if (classSchedule.booked >= classSchedule.capacity) {
        toast({
          title: "Class Full",
          description: "This class is already at full capacity.",
          variant: "destructive",
        });
        return false;
      }

      // Check if already booked
      const existingBooking = bookings.find(
        b => b.classSchedule.id === classSchedule.id && b.status === 'booked'
      );

      if (existingBooking) {
        toast({
          title: "Already Booked",
          description: "You have already booked this class.",
          variant: "destructive",
        });
        return false;
      }

      // Create new booking
      const newBooking: Booking = {
        id: Date.now().toString(),
        classSchedule,
        status: 'booked',
        bookingTime: new Date().toISOString(),
        qrCode: generateQRCode(Date.now().toString()),
        canCancel: true
      };

      setBookings(prev => [...prev, newBooking]);

      toast({
        title: "Class Booked!",
        description: `You've successfully booked ${classSchedule.name}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to book class. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return false;

      // Check if cancellation is allowed (24+ hours before class)
      const classDateTime = new Date(`${booking.classSchedule.date}T${booking.classSchedule.startTime}`);
      const hoursUntilClass = (classDateTime.getTime() - Date.now()) / (1000 * 60 * 60);

      if (hoursUntilClass < 24) {
        toast({
          title: "Cannot Cancel",
          description: "Bookings can only be cancelled 24+ hours before the class.",
          variant: "destructive",
        });
        return false;
      }

      setBookings(prev => 
        prev.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'cancelled' as const, canCancel: false }
            : b
        )
      );

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel booking. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateCheckInQR = (bookingId: string): string | null => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || booking.status !== 'booked') return null;

    return booking.qrCode || generateQRCode(bookingId);
  };

  const getBookingById = (bookingId: string): Booking | null => {
    return bookings.find(b => b.id === bookingId) || null;
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      availableClasses,
      bookClass,
      cancelBooking,
      generateCheckInQR,
      getBookingById
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
