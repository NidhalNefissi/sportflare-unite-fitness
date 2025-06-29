
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Star, X, QrCode, MessageSquare } from 'lucide-react';

interface Booking {
  id: string;
  className: string;
  instructor: string;
  gym: string;
  studio: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  canCancel: boolean;
  image: string;
  rating?: number;
  review?: string;
  qrCode?: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      className: 'Morning Yoga Flow',
      instructor: 'Emma Kallel',
      gym: 'Zen Wellness Studio',
      studio: 'Studio A',
      date: '2024-12-30',
      time: '08:00',
      duration: 60,
      status: 'upcoming',
      canCancel: true,
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop',
      qrCode: 'QR_YOGA_001'
    },
    {
      id: '2',
      className: 'HIIT Training',
      instructor: 'Sami Cherif',
      gym: 'FitZone Gym',
      studio: 'Studio B',
      date: '2024-12-28',
      time: '18:00',
      duration: 45,
      status: 'completed',
      canCancel: false,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
      rating: 5
    },
    {
      id: '3',
      className: 'Pilates Core',
      instructor: 'Lisa Ben Ali',
      gym: 'Wellness Center',
      studio: 'Studio C',
      date: '2024-12-25',
      time: '10:00',
      duration: 50,
      status: 'cancelled',
      canCancel: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ]);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const, canCancel: false }
        : booking
    ));
    
    toast({
      title: "Booking cancelled",
      description: "Your class booking has been cancelled successfully.",
    });
  };

  const handleGenerateQR = (bookingId: string) => {
    toast({
      title: "QR Code Ready",
      description: "Your check-in QR code is ready to scan at the gym.",
    });
  };

  const handleRateClass = (bookingId: string, rating: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, rating }
        : booking
    ));
    
    toast({
      title: "Rating submitted",
      description: "Thank you for rating this class!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <img
            src={booking.image}
            alt={booking.className}
            className="w-24 h-24 object-cover rounded-l-lg"
          />
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{booking.className}</h3>
                <p className="text-sm text-gray-600">with {booking.instructor}</p>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{booking.gym} - {booking.studio}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{booking.time} ({booking.duration}min)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {booking.status === 'upcoming' && booking.canCancel && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGenerateQR(booking.id)}
                  >
                    <QrCode className="w-4 h-4 mr-1" />
                    QR Code
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              )}
              
              {booking.status === 'completed' && (
                <div className="flex items-center gap-2">
                  {booking.rating ? (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 text-gray-300 cursor-pointer hover:text-yellow-400"
                          onClick={() => handleRateClass(booking.id, star)}
                        />
                      ))}
                    </div>
                  )}
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p className="text-green-100">Manage your fitness class bookings and check-ins</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="text-sm">
              <span className="font-medium">{upcomingBookings.length}</span> upcoming classes
            </div>
            <div className="text-sm">
              <span className="font-medium">{completedBookings.length}</span> completed classes
            </div>
          </div>
        </div>

        {/* Booking Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600">Book your next fitness class to get started!</p>
                  <Button className="mt-4">Browse Classes</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed classes</h3>
                  <p className="text-gray-600">Your completed classes will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <X className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled bookings</h3>
                  <p className="text-gray-600">Your cancelled bookings will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
