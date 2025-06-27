
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, MapPin, Clock, Star, Plus, TrendingUp, Calendar, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockClasses } from '@/data/mockClasses';

const GymOwnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([
    { id: '1', coach: 'Alex Thompson', studio: 'Studio A', date: 'Tomorrow', time: '10:00 AM', type: 'Personal Training' },
    { id: '2', coach: 'Lisa Chen', studio: 'Studio B', date: 'Dec 28', time: '2:00 PM', type: 'Pilates Class' },
  ]);

  const gymStats = {
    totalMembers: 347,
    activeToday: 89,
    monthlyRevenue: 15420,
    classesRunning: 12
  };

  const todaysClasses = mockClasses.filter(c => c.date === new Date().toISOString().split('T')[0]);

  const recentBookings = [
    { member: 'John Smith', class: 'HIIT Training', time: '2 hours ago', status: 'confirmed' },
    { member: 'Sarah Wilson', class: 'Yoga Flow', time: '4 hours ago', status: 'confirmed' },
    { member: 'Mike Jones', class: 'Spin Class', time: '6 hours ago', status: 'waitlist' },
  ];

  const handleApproveRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    // In real app, this would sync with backend and notify users
  };

  const handleDeclineRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
  };

  return (
    <DashboardLayout role="gym_owner">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-green-100">FitZone Downtown • Manage your gym operations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/gym-owner/studio-management')}
            className="h-16 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-3"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-lg">Studio Requests</span>
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/class-schedule')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-lg">Class Schedule</span>
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/analytics')}
            className="h-16 bg-teal-600 hover:bg-teal-700 flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-lg">Analytics</span>
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/settings')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
          >
            <Settings className="w-6 h-6" />
            <span className="text-lg">Gym Settings</span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <MapPin className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.activeToday}</div>
              <p className="text-xs text-muted-foreground">Members checked in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.monthlyRevenue.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.classesRunning}</div>
              <p className="text-xs text-muted-foreground">Running today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Classes
                  </CardTitle>
                  <CardDescription>Active classes and occupancy</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/gym-owner/add-class')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Class
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysClasses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No classes scheduled for today</p>
              ) : (
                todaysClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{classItem.name}</h4>
                        {classItem.booked === classItem.capacity && (
                          <Badge variant="destructive">Full</Badge>
                        )}
                        <Badge variant="outline">{classItem.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{classItem.startTime}</span>
                        <span>•</span>
                        <span>{classItem.coach.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {classItem.booked}/{classItem.capacity}
                      </div>
                      <div className="text-xs text-gray-500">capacity</div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Pending Studio Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Requests
              </CardTitle>
              <CardDescription>Coach studio reservation requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending requests</p>
              ) : (
                pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{request.coach}</h4>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        Pending
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{request.studio} • {request.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{request.date} at {request.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest member activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{booking.member}</p>
                      <p className="text-sm text-gray-600">{booking.class} • {booking.time}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                    className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GymOwnerDashboard;
