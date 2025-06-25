import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBooking } from '@/contexts/BookingContext';
import { mockGyms } from '@/data/mockData';
import { Calendar, Clock, MapPin, Users, Star, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BookClasses = () => {
  const { availableClasses, bookClass } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'in_person'>('online');

  const filteredClasses = useMemo(() => {
    let filtered = availableClasses.filter(classItem => {
      const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           classItem.coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           classItem.gym.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || classItem.category.toLowerCase() === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || classItem.difficulty.toLowerCase() === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort classes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.coach.rating - a.coach.rating;
        case 'date':
        default:
          return new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime();
      }
    });

    return filtered;
  }, [availableClasses, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const handleBookClass = async (classSchedule: any) => {
    setSelectedClass(classSchedule);
    setBookingDialogOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
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

  const confirmBooking = async () => {
    if (selectedClass) {
      const bookingData = {
        ...selectedClass,
        paymentMethod,
        paymentStatus: paymentMethod === 'online' ? 'pending' : 'pay_at_gym'
      };
      
      await bookClass(bookingData);
      setBookingDialogOpen(false);
      setSelectedClass(null);
      
      toast({
        title: "Class Booked!",
        description: paymentMethod === 'online' 
          ? "Payment will be processed shortly." 
          : "Please pay at the gym before your class.",
      });
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Book a Class</h1>
          <p className="text-blue-100">Find and book the perfect workout for you</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search classes, coaches, or gyms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date & Time</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Coach Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Class Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3" />
                      {classItem.gym.name} • {classItem.gym.location}
                    </CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(classItem.difficulty)}>
                    {classItem.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coach Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={classItem.coach.photo}
                    alt={classItem.coach.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{classItem.coach.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{classItem.coach.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Class Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(classItem.date)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {classItem.startTime} - {classItem.endTime}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    {classItem.booked}/{classItem.capacity} spots
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {classItem.price} TND
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">{classItem.description}</p>

                {/* Book Button */}
                <Button
                  onClick={() => handleBookClass(classItem)}
                  disabled={classItem.booked >= classItem.capacity}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {classItem.booked >= classItem.capacity ? 'Class Full' : 'Book Class'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Confirmation Dialog */}
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                Choose your payment method for {selectedClass?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{selectedClass?.name}</h4>
                <p className="text-sm text-gray-600">{selectedClass?.gym.name}</p>
                <p className="text-sm text-gray-600">
                  {selectedClass && formatDate(selectedClass.date)} at {selectedClass?.startTime}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">{selectedClass?.price} TND</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Payment Method:</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'online')}
                      className="text-blue-600"
                    />
                    <span>Pay Online (Flouci.tn)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="in_person"
                      checked={paymentMethod === 'in_person'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'in_person')}
                      className="text-blue-600"
                    />
                    <span>Pay at Gym</span>
                  </label>
                </div>
                
                {paymentMethod === 'in_person' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please arrive 15 minutes early to complete payment at the gym reception.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmBooking} className="bg-blue-600 hover:bg-blue-700">
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {filteredClasses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookClasses;
