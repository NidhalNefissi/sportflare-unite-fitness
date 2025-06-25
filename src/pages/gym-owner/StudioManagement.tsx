
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Check, X, Clock, MapPin, Calendar, User } from 'lucide-react';

interface StudioRequest {
  id: string;
  coach: {
    id: string;
    name: string;
    photo: string;
    rating: number;
  };
  studio: {
    id: string;
    name: string;
    capacity: number;
  };
  date: string;
  startTime: string;
  endTime: string;
  classType: string;
  expectedAttendees: number;
  status: 'pending' | 'approved' | 'declined';
  requestedAt: string;
}

const GymStudioManagement = () => {
  const [requests, setRequests] = useState<StudioRequest[]>([
    {
      id: '1',
      coach: {
        id: '3',
        name: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9
      },
      studio: {
        id: 'studio-a',
        name: 'Studio A',
        capacity: 25
      },
      date: '2024-12-30',
      startTime: '18:00',
      endTime: '19:00',
      classType: 'Yoga Flow',
      expectedAttendees: 18,
      status: 'pending',
      requestedAt: '2024-12-27T10:30:00Z'
    },
    {
      id: '2',
      coach: {
        id: '4',
        name: 'Mike Thompson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7
      },
      studio: {
        id: 'studio-b',
        name: 'Studio B',
        capacity: 15
      },
      date: '2024-12-31',
      startTime: '07:00',
      endTime: '08:00',
      classType: 'HIIT Training',
      expectedAttendees: 12,
      status: 'pending',
      requestedAt: '2024-12-27T14:20:00Z'
    }
  ]);

  const studios = [
    { id: 'studio-a', name: 'Studio A', capacity: 25, equipment: ['Yoga mats', 'Mirrors', 'Sound system'] },
    { id: 'studio-b', name: 'Studio B', capacity: 15, equipment: ['Free weights', 'Kettlebells', 'TRX'] },
    { id: 'studio-c', name: 'Studio C', capacity: 30, equipment: ['Cardio machines', 'Sound system', 'Mirrors'] }
  ];

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const }
        : req
    ));

    const request = requests.find(r => r.id === requestId);
    toast({
      title: "Request Approved",
      description: `${request?.coach.name}'s ${request?.classType} class has been approved.`
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'declined' as const }
        : req
    ));

    const request = requests.find(r => r.id === requestId);
    toast({
      title: "Request Declined",
      description: `${request?.coach.name}'s request has been declined.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');

  return (
    <DashboardLayout role="gym_owner">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Studio Management</h1>
          <p className="text-gray-600">Manage coach studio reservation requests and schedules</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Studios</CardTitle>
              <MapPin className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studios.length}</div>
              <p className="text-xs text-muted-foreground">Available studios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedRequests.length}</div>
              <p className="text-xs text-muted-foreground">Classes approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Studio Utilization</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Requests
              </CardTitle>
              <CardDescription>Coach studio reservation requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No pending requests</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={request.coach.photo} 
                          alt={request.coach.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{request.coach.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">Rating:</span>
                            <span className="text-sm font-medium">{request.coach.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{request.studio.name} • {request.classType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(request.date).toLocaleDateString()} at {request.startTime} - {request.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{request.expectedAttendees} expected attendees (Studio capacity: {request.studio.capacity})</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineRequest(request.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Studio Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Studio Overview
              </CardTitle>
              <CardDescription>Available studios and their equipment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studios.map((studio) => (
                <div key={studio.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{studio.name}</h4>
                    <Badge variant="outline">
                      Capacity: {studio.capacity}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {studio.equipment.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Approved Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Recent Approvals
            </CardTitle>
            <CardDescription>Recently approved studio reservations</CardDescription>
          </CardHeader>
          <CardContent>
            {approvedRequests.length === 0 ? (
              <div className="text-center py-8">
                <Check className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No recent approvals</p>
              </div>
            ) : (
              <div className="space-y-3">
                {approvedRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={request.coach.photo} 
                        alt={request.coach.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{request.coach.name}</p>
                        <p className="text-sm text-gray-600">
                          {request.studio.name} • {request.classType} • {new Date(request.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      Approved
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GymStudioManagement;
