
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Users, Star, Clock, TrendingUp, QrCode, Plus, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CoachDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [todaysClasses] = useState([
    { id: '1', name: 'Morning Yoga', time: '8:00 AM', studio: 'Studio A', attendees: 12, capacity: 15, status: 'upcoming' },
    { id: '2', name: 'HIIT Training', time: '6:00 PM', studio: 'Studio B', attendees: 8, capacity: 10, status: 'upcoming' },
  ]);

  const [upcomingBookings] = useState([
    { id: '1', client: 'Sarah Johnson', service: 'Personal Training', date: 'Tomorrow', time: '10:00 AM', status: 'confirmed' },
    { id: '2', client: 'Mike Wilson', service: 'Nutrition Consult', date: 'Dec 28', time: '2:00 PM', status: 'pending' },
  ]);

  const coachStats = {
    totalClients: 45,
    monthlyRevenue: 3240,
    classesThisWeek: 12,
    rating: 4.8,
    attendanceRate: 92
  };

  const handleGenerateQR = (classId: string) => {
    // Mock QR generation
    alert(`QR Code generated for class ${classId}`);
  };

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-green-100">Ready to inspire your clients today?</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">{coachStats.rating}/5 • {coachStats.totalClients} active clients</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => navigate('/coach/programs')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center gap-1"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create Program</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/schedule')}
            className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Schedule</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/profile')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center gap-1"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">My Profile</span>
          </Button>
          <Button 
            onClick={() => navigate('/coach/analytics')}
            className="h-16 bg-orange-600 hover:bg-orange-700 flex flex-col items-center justify-center gap-1"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Analytics</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.totalClients}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.monthlyRevenue} TND</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.classesThisWeek}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.rating}/5</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">Show-up rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>Your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{classItem.name}</h4>
                      <Badge variant="outline">{classItem.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{classItem.time}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{classItem.studio}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <div className="text-sm font-semibold">{classItem.attendees}/{classItem.capacity}</div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleGenerateQR(classItem.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Upcoming Bookings
              </CardTitle>
              <CardDescription>Personal training sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{booking.client}</h4>
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{booking.service}</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Contact</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Confirm</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">New client Sarah Johnson booked a personal training session</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Received 5-star review from Mike Wilson</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Completed HIIT Training class with 10 attendees</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard;
