
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, MapPin, Clock, Star, Plus, TrendingUp, Calendar, Settings, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface StudioRequest {
  id: string;
  coach: string;
  coachId: string;
  studio: string;
  date: string;
  time: string;
  type: string;
  duration: string;
  status: 'pending' | 'approved' | 'declined';
  requestDate: string;
}

const GymOwnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [studioRequests, setStudioRequests] = useState<StudioRequest[]>([
    { 
      id: '1', 
      coach: 'Alex Thompson', 
      coachId: 'coach-1',
      studio: 'Studio A', 
      date: 'Tomorrow', 
      time: '10:00 AM', 
      type: 'Personal Training',
      duration: '1 hour',
      status: 'pending',
      requestDate: '2 hours ago'
    },
    { 
      id: '2', 
      coach: 'Lisa Chen', 
      coachId: 'coach-2',
      studio: 'Studio B', 
      date: 'Dec 28', 
      time: '2:00 PM', 
      type: 'Pilates Class',
      duration: '45 minutes',
      status: 'pending',
      requestDate: '5 hours ago'
    },
  ]);

  const gymStats = {
    totalMembers: 347,
    activeToday: 89,
    monthlyRevenue: 15420,
    classesRunning: 12,
    pendingRequests: studioRequests.filter(r => r.status === 'pending').length,
    occupancyRate: 78
  };

  const todaysClasses = [
    { id: '1', name: 'Morning Yoga', coach: 'Sarah Wilson', time: '8:00 AM', studio: 'Studio A', attendees: 12, capacity: 15 },
    { id: '2', name: 'HIIT Training', coach: 'Mike Jones', time: '6:00 PM', studio: 'Studio B', attendees: 8, capacity: 10 },
  ];

  const recentActivity = [
    { type: 'booking', message: 'New member John Smith joined', time: '2 hours ago' },
    { type: 'payment', message: 'Monthly subscription payment received', time: '4 hours ago' },
    { type: 'request', message: 'Studio reservation request from Alex Thompson', time: '6 hours ago' },
  ];

  const handleApproveRequest = (requestId: string) => {
    setStudioRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'approved' as const } : req
      )
    );
    toast({
      title: "Request Approved",
      description: "Studio reservation has been approved.",
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    setStudioRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'declined' as const } : req
      )
    );
    toast({
      title: "Request Declined",
      description: "Studio reservation has been declined.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout role="gym_owner">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-green-100">FitZone Downtown • Manage your gym operations</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{gymStats.totalMembers} members</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{gymStats.occupancyRate}% occupancy</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => navigate('/gym-owner/studio-management')}
            className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-1"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm">Studio Requests</span>
            {gymStats.pendingRequests > 0 && (
              <Badge variant="destructive" className="text-xs">
                {gymStats.pendingRequests}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/classes')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center gap-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Classes</span>
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/analytics')}
            className="h-16 bg-teal-600 hover:bg-teal-700 flex flex-col items-center justify-center gap-1"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button 
            onClick={() => navigate('/gym-owner/settings')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center gap-1"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>

        {/* Stats Grid */}
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
          {/* Pending Studio Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Requests
                {gymStats.pendingRequests > 0 && (
                  <Badge variant="destructive">{gymStats.pendingRequests}</Badge>
                )}
              </CardTitle>
              <CardDescription>Coach studio reservation requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studioRequests.filter(r => r.status === 'pending').length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending requests</p>
              ) : (
                studioRequests
                  .filter(r => r.status === 'pending')
                  .map((request) => (
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
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Duration: {request.duration}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Requested {request.requestDate}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <X className="w-3 h-3" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>

          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>Active classes and occupancy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{classItem.name}</h4>
                      {classItem.attendees === classItem.capacity && (
                        <Badge variant="destructive">Full</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{classItem.time}</span>
                      <span>•</span>
                      <span>{classItem.coach}</span>
                      <span>•</span>
                      <span>{classItem.studio}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {classItem.attendees}/{classItem.capacity}
                    </div>
                    <div className="text-xs text-gray-500">capacity</div>
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
            <CardDescription>Latest gym operations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'booking' ? 'bg-green-500' : 
                      activity.type === 'payment' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
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

export default GymOwnerDashboard;
