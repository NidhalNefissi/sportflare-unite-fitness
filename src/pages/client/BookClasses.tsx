
import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBooking } from '@/contexts/BookingContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { mockClasses } from '@/data/mockClasses';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Calendar,
  Dumbbell,
  Crown,
  Lock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BookClasses = () => {
  const { bookClass } = useBooking();
  const { currentPlan, canAccessClasses, getBookingLimit } = useSubscriptionAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGym, setSelectedGym] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const filteredClasses = useMemo(() => {
    return mockClasses.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.coach.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGym = selectedGym === 'all' || cls.gym.id === selectedGym;
      const matchesDate = !selectedDate || cls.date === selectedDate;
      const matchesDifficulty = selectedDifficulty === 'all' || cls.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesGym && matchesDate && matchesDifficulty;
    });
  }, [searchTerm, selectedGym, selectedDate, selectedDifficulty]);

  const handleBookClass = async () => {
    if (!canAccessClasses()) {
      toast({
        title: "Access Restricted",
        description: "You need a Plus or Premium plan to book classes.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedClass) return;

    const success = await bookClass(selectedClass);
    if (success) {
      setBookingDialogOpen(false);
      setSelectedClass(null);
      toast({
        title: "Class Booked!",
        description: `Your spot for ${selectedClass.name} has been confirmed.`,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'program': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!canAccessClasses()) {
    return (
      <DashboardLayout role="client">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Access Restricted</h1>
            <p className="text-gray-600 max-w-md">
              You need a Plus or Premium plan to access class schedules and book sessions.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200 max-w-md">
            <h3 className="font-semibold text-orange-900 mb-2">Current Plan: {currentPlan?.charAt(0).toUpperCase() + currentPlan?.slice(1)}</h3>
            <p className="text-sm text-orange-700 mb-4">
              Unlock access to group classes, coaches, and AI Coach with our premium plans.
            </p>
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => window.location.href = '/client/subscriptions'}
            >
              <Crown className="w-4 h-4 mr-2" />
              Choose a Plan
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Book Classes</h1>
          <p className="text-red-100">Discover and book your favorite fitness classes</p>
          
          {currentPlan !== 'premium' && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm">
                <Calendar className="w-4 h-4 inline mr-1" />
                {currentPlan} plan: {getBookingLimit()} booking per day
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search classes, gym, or coach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedGym} onValueChange={setSelectedGym}>
                <SelectTrigger>
                  <SelectValue placeholder="Gym" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gyms</SelectItem>
                  <SelectItem value="gym-1">FitZone Tunis</SelectItem>
                  <SelectItem value="gym-2">Zen Wellness</SelectItem>
                  <SelectItem value="gym-3">PowerGym</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />

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
            </div>
          </CardContent>
        </Card>

        {/* Classes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {classItem.gym.name}
                    </CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getTypeColor(classItem.type)}>
                        {classItem.type === 'single' ? 'Single Session' : 'Full Program'}
                      </Badge>
                      <Badge className={getDifficultyColor(classItem.difficulty)}>
                        {classItem.difficulty.charAt(0).toUpperCase() + classItem.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Class Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    Coach: {classItem.coach.name}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(classItem.date)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {classItem.startTime} - {classItem.endTime}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {classItem.booked}/{classItem.capacity} spots
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(classItem.coach.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {classItem.coach.rating}/5
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Spots Reserved</span>
                    <span>{Math.round((classItem.booked / classItem.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(classItem.booked / classItem.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Book Button */}
                <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={classItem.booked >= classItem.capacity}
                      onClick={() => setSelectedClass(classItem)}
                    >
                      {classItem.booked >= classItem.capacity ? 'Full' : 'Book Now'}
                      <Dumbbell className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Confirmation</DialogTitle>
                      <DialogDescription>
                        Confirm your booking for {selectedClass?.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedClass && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <h4 className="font-medium">{selectedClass.name}</h4>
                          <p className="text-sm text-gray-600">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {selectedClass.gym.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(selectedClass.date)} at {selectedClass.startTime}
                          </p>
                          <p className="text-sm text-gray-600">
                            <Users className="w-3 h-3 inline mr-1" />
                            Coach: {selectedClass.coach.name}
                          </p>
                          <Badge className={getTypeColor(selectedClass.type)}>
                            {selectedClass.type === 'single' ? 'Single Session' : 'Full Program'}
                          </Badge>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            💡 <strong>Included in your subscription</strong> - No additional fees
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Cancellation allowed up to 24 hours before class starts
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setBookingDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleBookClass}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookClasses;
