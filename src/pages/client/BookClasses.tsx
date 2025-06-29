
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Zap } from 'lucide-react';

interface FitnessClass {
  id: string;
  name: string;
  instructor: string;
  gym: string;
  studio: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  image: string;
  isOngoing: boolean;
  sessions?: number;
  currentSession?: number;
}

const BookClasses = () => {
  const { user } = useAuth();
  const { currentPlan, canAccessClasses, hasFreeTrial, getBookingLimit } = useSubscriptionAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [bookingsToday] = useState(0); // Mock: track daily bookings

  const [classes] = useState<FitnessClass[]>([
    {
      id: '1',
      name: 'Morning Yoga Flow',
      instructor: 'Emma Kallel',
      gym: 'Zen Wellness Studio',
      studio: 'Studio A',
      date: '2024-12-30',
      time: '08:00',
      duration: 60,
      capacity: 15,
      enrolled: 8,
      level: 'Beginner',
      category: 'Yoga',
      description: 'Start your day with gentle yoga flow to energize your body and mind.',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop',
      isOngoing: false
    },
    {
      id: '2',
      name: 'HIIT Training',
      instructor: 'Sami Cherif',
      gym: 'FitZone Gym',
      studio: 'Studio B',
      date: '2024-12-30',
      time: '18:00',
      duration: 45,
      capacity: 12,
      enrolled: 10,
      level: 'Intermediate',
      category: 'HIIT',
      description: 'High-intensity interval training for maximum calorie burn.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
      isOngoing: false
    },
    {
      id: '3',
      name: 'Strength Training Fundamentals',
      instructor: 'Alex Trabelsi',
      gym: 'PowerHouse Gym',
      studio: 'Main Floor',
      date: '2024-12-31',
      time: '10:00',
      duration: 90,
      capacity: 8,
      enrolled: 3,
      level: 'Beginner',
      category: 'Strength',
      description: '8-week program covering basic strength training principles.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
      isOngoing: true,
      sessions: 8,
      currentSession: 1
    }
  ]);

  const categories = ['all', 'Yoga', 'HIIT', 'Strength', 'Cardio', 'Pilates', 'CrossFit'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.gym.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || cls.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || cls.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const canBookClass = (): { canBook: boolean; reason?: string } => {
    if (!canAccessClasses() && !hasFreeTrial()) {
      return { canBook: false, reason: 'Upgrade to Plus or Premium to book classes' };
    }
    
    if (currentPlan === 'basic' && hasFreeTrial()) {
      return { canBook: true, reason: 'Using your free trial' };
    }
    
    const dailyLimit = getBookingLimit();
    if (dailyLimit > 0 && bookingsToday >= dailyLimit) {
      return { canBook: false, reason: `Daily limit reached (${dailyLimit} booking${dailyLimit > 1 ? 's' : ''} per day)` };
    }
    
    return { canBook: true };
  };

  const handleBookClass = (classItem: FitnessClass) => {
    const bookingCheck = canBookClass();
    
    if (!bookingCheck.canBook) {
      toast({
        title: "Cannot book class",
        description: bookingCheck.reason,
        variant: "destructive",
      });
      return;
    }

    // Mock booking logic
    toast({
      title: "Class booked successfully!",
      description: `You're registered for ${classItem.name} on ${classItem.date} at ${classItem.time}`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Book Fitness Classes</h1>
          <p className="text-blue-100">Discover and book fitness classes at partner gyms</p>
          <div className="flex items-center gap-4 mt-3">
            <Badge className="bg-white/20 text-white">
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
            </Badge>
            {currentPlan !== 'basic' && (
              <span className="text-sm">
                {getBookingLimit() === -1 ? 'Unlimited' : `${getBookingLimit() - bookingsToday} remaining`} bookings today
              </span>
            )}
          </div>
        </div>

        {/* Subscription Notice */}
        {!canAccessClasses() && !hasFreeTrial() && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-yellow-800">Upgrade Required</h4>
                  <p className="text-sm text-yellow-700">
                    Upgrade to Plus or Premium to book unlimited fitness classes
                  </p>
                </div>
                <Button size="sm" className="ml-auto bg-yellow-600 hover:bg-yellow-700">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search classes..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {classItem.isOngoing && (
                  <Badge className="absolute top-2 left-2 bg-blue-600">
                    Course {classItem.currentSession}/{classItem.sessions}
                  </Badge>
                )}
                <Badge className={`absolute top-2 right-2 ${getLevelColor(classItem.level)}`}>
                  {classItem.level}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">{classItem.description}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-orange-500" />
                      <span>{classItem.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{classItem.gym} - {classItem.studio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{classItem.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{classItem.time} ({classItem.duration}min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      className="w-full"
                      onClick={() => handleBookClass(classItem)}
                      disabled={classItem.enrolled >= classItem.capacity || (!canAccessClasses() && !hasFreeTrial())}
                    >
                      {classItem.enrolled >= classItem.capacity ? 'Full' : 'Book Class'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
