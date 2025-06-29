
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Building, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Check, 
  X, 
  Plus, 
  Edit,
  MapPin
} from 'lucide-react';

interface Studio {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  description: string;
  hourlyRate: number;
  isAvailable: boolean;
  image: string;
}

interface StudioRequest {
  id: string;
  coachName: string;
  coachEmail: string;
  studioId: string;
  studioName: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  expectedParticipants: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  notes?: string;
}

const StudioManagement = () => {
  const [studios, setStudios] = useState<Studio[]>([
    {
      id: '1',
      name: 'Studio A - Yoga & Pilates',
      capacity: 20,
      equipment: ['Yoga Mats', 'Blocks', 'Straps', 'Sound System'],
      description: 'Spacious studio perfect for yoga, pilates, and meditation classes.',
      hourlyRate: 80,
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Studio B - HIIT & Cardio',
      capacity: 15,
      equipment: ['Battle Ropes', 'Kettlebells', 'TRX', 'Sound System', 'Mirrors'],
      description: 'High-energy studio designed for HIIT, cardio, and strength training.',
      hourlyRate: 100,
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Studio C - Dance & Movement',
      capacity: 25,
      equipment: ['Mirrors', 'Sound System', 'Ballet Bars', 'Dance Floor'],
      description: 'Large studio with mirrors and professional dance flooring.',
      hourlyRate: 90,
      isAvailable: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ]);

  const [requests, setRequests] = useState<StudioRequest[]>([
    {
      id: '1',
      coachName: 'Emma Kallel',
      coachEmail: 'emma@example.com',
      studioId: '1',
      studioName: 'Studio A - Yoga & Pilates',
      className: 'Morning Vinyasa Flow',
      date: '2024-12-30',
      startTime: '08:00',
      endTime: '09:30',
      expectedParticipants: 15,
      status: 'pending',
      requestDate: '2024-12-28',
      notes: 'Regular weekly class, need access 15 minutes early for setup.'
    },
    {
      id: '2',
      coachName: 'Sami Cherif',
      coachEmail: 'sami@example.com',
      studioId: '2',
      studioName: 'Studio B - HIIT & Cardio',
      className: 'High Intensity Bootcamp',
      date: '2024-12-30',
      startTime: '18:00',
      endTime: '19:00',
      expectedParticipants: 12,
      status: 'pending',
      requestDate: '2024-12-27',
      notes: 'Will bring additional equipment for this special session.'
    },
    {
      id: '3',
      coachName: 'Lisa Ben Ali',
      coachEmail: 'lisa@example.com',
      studioId: '3',
      studioName: 'Studio C - Dance & Movement',
      className: 'Zumba Fitness',
      date: '2024-12-29',
      startTime: '19:00',
      endTime: '20:00',
      expectedParticipants: 20,
      status: 'approved',
      requestDate: '2024-12-25'
    }
  ]);

  const [isCreateStudioOpen, setIsCreateStudioOpen] = useState(false);
  const [newStudio, setNewStudio] = useState({
    name: '',
    capacity: 0,
    equipment: '',
    description: '',
    hourlyRate: 0
  });

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const }
        : req
    ));
    
    toast({
      title: "Request Approved",
      description: "Studio booking request has been approved.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const }
        : req
    ));
    
    toast({
      title: "Request Rejected",
      description: "Studio booking request has been rejected.",
      variant: "destructive",
    });
  };

  const handleCreateStudio = () => {
    if (!newStudio.name || !newStudio.capacity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const studio: Studio = {
      id: Date.now().toString(),
      name: newStudio.name,
      capacity: newStudio.capacity,
      equipment: newStudio.equipment.split(',').map(item => item.trim()).filter(Boolean),
      description: newStudio.description,
      hourlyRate: newStudio.hourlyRate,
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    };

    setStudios(prev => [...prev, studio]);
    setNewStudio({ name: '', capacity: 0, equipment: '', description: '', hourlyRate: 0 });
    setIsCreateStudioOpen(false);
    
    toast({
      title: "Studio Created",
      description: "New studio has been added successfully.",
    });
  };

  const toggleStudioAvailability = (studioId: string) => {
    setStudios(prev => prev.map(studio => 
      studio.id === studioId 
        ? { ...studio, isAvailable: !studio.isAvailable }
        : studio
    ));
    
    toast({
      title: "Studio Updated",
      description: "Studio availability has been updated.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');

  return (
    <DashboardLayout role="gym_owner">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Studio Management</h1>
              <p className="text-green-100">Manage your studios and booking requests</p>
            </div>
            <Dialog open={isCreateStudioOpen} onOpenChange={setIsCreateStudioOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Studio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Studio</DialogTitle>
                  <DialogDescription>
                    Add a new studio space to your gym
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Studio Name *</Label>
                    <Input
                      id="name"
                      value={newStudio.name}
                      onChange={(e) => setNewStudio({...newStudio, name: e.target.value})}
                      placeholder="e.g., Studio A - Yoga & Pilates"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newStudio.capacity || ''}
                      onChange={(e) => setNewStudio({...newStudio, capacity: parseInt(e.target.value) || 0})}
                      placeholder="Maximum number of people"
                    />
                  </div>
                  <div>
                    <Label htmlFor="equipment">Equipment (comma-separated)</Label>
                    <Input
                      id="equipment"
                      value={newStudio.equipment}
                      onChange={(e) => setNewStudio({...newStudio, equipment: e.target.value})}
                      placeholder="Yoga Mats, Sound System, Mirrors"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newStudio.description}
                      onChange={(e) => setNewStudio({...newStudio, description: e.target.value})}
                      placeholder="Describe the studio space..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (TND)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={newStudio.hourlyRate || ''}
                      onChange={(e) => setNewStudio({...newStudio, hourlyRate: parseInt(e.target.value) || 0})}
                      placeholder="Price per hour"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateStudioOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateStudio}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Create Studio
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{studios.length}</div>
              <p className="text-sm text-gray-600">Total Studios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {studios.filter(s => s.isAvailable).length}
              </div>
              <p className="text-sm text-gray-600">Available Studios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{approvedRequests.length}</div>
              <p className="text-sm text-gray-600">Approved Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Studio Requests
              </CardTitle>
              <CardDescription>Coach requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{request.className}</h4>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3" />
                        <span>Coach: {request.coachName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{request.studioName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{request.date} • {request.startTime} - {request.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>{request.expectedParticipants} expected participants</span>
                      </div>
                      {request.notes && (
                        <div className="text-xs text-gray-500 mt-1">
                          Note: {request.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Studios Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Studio Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <Card key={studio.id} className={`hover:shadow-lg transition-shadow ${!studio.isAvailable ? 'opacity-75' : ''}`}>
                <div className="relative">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      studio.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {studio.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">{studio.name}</h3>
                      <p className="text-sm text-gray-600">{studio.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Capacity: {studio.capacity} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span>{studio.hourlyRate} TND/hour</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {studio.equipment.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {studio.equipment.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{studio.equipment.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleStudioAvailability(studio.id)}
                        className="flex-1"
                      >
                        {studio.isAvailable ? 'Disable' : 'Enable'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudioManagement;
