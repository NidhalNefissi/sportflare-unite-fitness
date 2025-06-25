
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBooking } from '@/contexts/BookingContext';
import { Calendar, Clock, MapPin, QrCode, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MyBookings = () => {
  const { bookings, cancelBooking, generateCheckInQR } = useBooking();
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const handleCancelBooking = async (bookingId: string) => {
    const success = await cancelBooking(bookingId);
    if (success) {
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    }
  };

  const handleShowQR = (bookingId: string) => {
    const qrCode = generateCheckInQR(bookingId);
    if (qrCode) {
      setSelectedQR(qrCode);
      setQrCodeDialogOpen(true);
    } else {
      toast({
        title: "QR Code Unavailable",
        description: "QR code is only available for confirmed bookings.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'attended': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const upcomingBookings = bookings.filter(b => 
    b.status === 'booked' && 
    new Date(`${b.classSchedule.date}T${b.classSchedule.startTime}`) > new Date()
  );

  const pastBookings = bookings.filter(b => 
    b.status !== 'booked' || 
    new Date(`${b.classSchedule.date}T${b.classSchedule.startTime}`) <= new Date()
  );

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p className="text-purple-100">Manage your class bookings and check-ins</p>
        </div>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Classes
            </CardTitle>
            <CardDescription>Your scheduled workouts</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                <p className="text-gray-600 mb-4">Book a class to start your fitness journey!</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Classes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{booking.classSchedule.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.classSchedule.gym.name}</span>
                          <span>•</span>
                          <span>{booking.classSchedule.coach.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(booking.classSchedule.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.classSchedule.startTime} - {booking.classSchedule.endTime}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleShowQR(booking.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <QrCode className="w-4 h-4 mr-1" />
                        Show QR Code
                      </Button>
                      
                      {booking.canCancel && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Booking</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel your booking for {booking.classSchedule.name}? 
                                This action cannot be undone and you may be charged a cancellation fee.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 mt-4">
                              <Button
                                onClick={() => handleCancelBooking(booking.id)}
                                variant="destructive"
                                className="flex-1"
                              >
                                Yes, Cancel Booking
                              </Button>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                  Keep Booking
                                </Button>
                              </DialogTrigger>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>Your past classes and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{booking.classSchedule.name}</p>
                      <p className="text-sm text-gray-600">
                        {booking.classSchedule.gym.name} • {formatDate(booking.classSchedule.date)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* QR Code Dialog */}
        <Dialog open={qrCodeDialogOpen} onOpenChange={setQrCodeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Check-in QR Code</DialogTitle>
              <DialogDescription>
                Show this QR code at the gym to check in to your class
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500 font-mono">{selectedQR}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                This QR code is valid for today only and can only be used once.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
