import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBooking } from '@/contexts/BookingContext';
import { Calendar, Clock, MapPin, QrCode, AlertTriangle, Users, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const { bookings, cancelBooking, generateCheckInQR } = useBooking();
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCancelBooking = async (bookingId: string) => {
    const success = await cancelBooking(bookingId);
    if (success) {
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
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
        title: "QR Code indisponible",
        description: "Le QR code n'est disponible que pour les réservations confirmées.",
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'booked': return 'Réservé';
      case 'attended': return 'Présent';
      case 'cancelled': return 'Annulé';
      case 'no-show': return 'Absent';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain';
    } else {
      return date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' });
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
          <h1 className="text-2xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-purple-100">Gérez vos réservations de cours et vos check-ins</p>
        </div>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Cours à Venir
            </CardTitle>
            <CardDescription>Vos séances programmées</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation à venir</h3>
                <p className="text-gray-600 mb-4">Réservez un cours pour commencer votre parcours fitness !</p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/client/book-classes')}
                >
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
                          <Users className="w-3 h-3" />
                          <span>Coach: {booking.classSchedule.coach.name}</span>
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
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(booking.classSchedule.coach.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {booking.classSchedule.coach.rating}/5
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleShowQR(booking.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Code Check-in
                      </Button>
                      
                      {booking.canCancel && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Annuler
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Annuler la Réservation</DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir annuler votre réservation pour {booking.classSchedule.name} ? 
                                Cette action est irréversible et peut entraîner des frais d'annulation.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 mt-4">
                              <Button
                                onClick={() => handleCancelBooking(booking.id)}
                                variant="destructive"
                                className="flex-1"
                              >
                                Oui, Annuler
                              </Button>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                  Garder la Réservation
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
              <CardTitle>Historique des Réservations</CardTitle>
              <CardDescription>Vos cours passés et activités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastBookings.slice(0, 10).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{booking.classSchedule.name}</p>
                        <Badge className={getStatusColor(booking.status)} variant="outline">
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {booking.classSchedule.gym.name} • {formatDate(booking.classSchedule.date)}
                        <span>•</span>
                        <Users className="w-3 h-3" />
                        {booking.classSchedule.coach.name}
                      </p>
                      {booking.status === 'attended' && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1">Évalué</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {pastBookings.length > 10 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" size="sm">
                      Voir plus d'historique
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* QR Code Dialog */}
        <Dialog open={qrCodeDialogOpen} onOpenChange={setQrCodeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>QR Code Check-in</DialogTitle>
              <DialogDescription>
                Présentez ce QR code à la salle pour confirmer votre présence au cours
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500 font-mono break-all">{selectedQR}</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Ce QR code est valide uniquement le jour du cours et ne peut être utilisé qu'une seule fois.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 <strong>Conseil:</strong> Arrivez 10 minutes avant le début du cours pour le check-in.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
