
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Clock, Star, TrendingUp, Plus, QrCode, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockClasses } from '@/data/mockClasses';

const CoachDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const coachStats = {
    totalClients: 89,
    thisWeekClasses: 12,
    monthlyEarnings: 3450,
    rating: 4.8
  };

  const [upcomingClasses, setUpcomingClasses] = useState([
    { 
      id: 1, 
      name: 'HIIT Cardio', 
      time: '6:00 PM', 
      date: 'Today',
      gym: 'FitZone Downtown', 
      studio: 'Studio A',
      participants: 14, 
      capacity: 15,
      qrGenerated: true,
      type: 'single'
    },
    { 
      id: 2, 
      name: 'Strength Training', 
      time: '7:30 AM', 
      date: 'Tomorrow',
      gym: 'PowerGym', 
      studio: 'Studio B',
      participants: 8, 
      capacity: 12,
      qrGenerated: false,
      type: 'program'
    },
  ]);

  const trainingPrograms = [
    { name: 'Beginner Weight Loss', clients: 23, revenue: 1150, rating: 4.9, type: 'program' },
    { name: 'Advanced Strength', clients: 15, revenue: 900, rating: 4.7, type: 'program' },
    { name: 'Flexibility & Mobility', clients: 8, revenue: 320, rating: 4.8, type: 'single' },
  ];

  const recentFeedback = [
    { client: 'Sarah Wilson', class: 'HIIT Cardio', rating: 5, comment: 'Amazing energy and motivation!' },
    { client: 'Mike Jones', class: 'Strength Training', rating: 5, comment: 'Perfect form corrections' },
    { client: 'Emma Davis', class: 'Yoga Flow', rating: 4, comment: 'Very relaxing session' },
  ];

  const generateQRCode = (classId: number) => {
    setUpcomingClasses(prev => prev.map(c => 
      c.id === classId ? { ...c, qrGenerated: true } : c
    ));
    console.log(`QR code generated for class ${classId}`);
  };

  const handleViewClassDetails = (classId: number) => {
    navigate(`/coach/class/${classId}`);
  };

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Coach {user?.name}!</h1>
          <p className="text-purple-100">Ready to inspire and train today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/coach/class-schedule')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-lg">Manage Classes</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/programs')}
            className="h-16 bg-pink-600 hover:bg-pink-700 flex items-center justify-center gap-3"
          >
            <Star className="w-6 h-6" />
            <span className="text-lg">My Programs</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/clients')}
            className="h-16 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            <span className="text-lg">My Clients</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/profile')}
            className="h-16 bg-teal-600 hover:bg-teal-700 flex items-center justify-center gap-3"
          >
            <Star className="w-6 h-6" />
            <span className="text-lg">Profile</span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.totalClients}</div>
              <p className="text-xs text-muted-foreground">+5 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.thisWeekClasses}</div>
              <p className="text-xs text-muted-foreground">Classes scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.monthlyEarnings.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.rating}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Classes
                  </CardTitle>
                  <CardDescription>Your scheduled sessions</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate('/coach/create-class')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Create Class
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{classItem.name}</h4>
                        <Badge variant="outline">{classItem.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{classItem.gym} • {classItem.studio}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {classItem.date} at {classItem.time}
                      </p>
                    </div>
                    <Badge 
                      variant={classItem.participants === classItem.capacity ? 'destructive' : 'default'}
                    >
                      {classItem.participants}/{classItem.capacity}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    {classItem.qrGenerated ? (
                      <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Ready
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => generateQRCode(classItem.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <QrCode className="w-4 h-4 mr-1" />
                        Generate QR
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewClassDetails(classItem.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Training Programs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-600" />
                    Training Programs
                  </CardTitle>
                  <CardDescription>Your custom programs</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/coach/programs')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Program
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingPrograms.map((program, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{program.name}</h4>
                      <Badge variant="outline">{program.type}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{program.clients} clients</span>
                    <span className="font-medium text-green-700">{program.revenue} TND</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Client Feedback</CardTitle>
            <CardDescription>What your clients are saying</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{feedback.client}</p>
                      <span className="text-sm text-gray-500">•</span>
                      <p className="text-sm text-gray-600">{feedback.class}</p>
                    </div>
                    <p className="text-sm text-gray-700 italic">"{feedback.comment}"</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard;
