
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Calendar, Plus, QrCode, Users, Clock, MapPin, Star } from 'lucide-react';

interface ClassScheduleItem {
  id: string;
  name: string;
  description: string;
  gym: { id: string; name: string; location: string; };
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  qrCode?: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const CoachClassSchedule = () => {
  const [classes, setClasses] = useState<ClassScheduleItem[]>([
    {
      id: '1',
      name: 'HIIT Morning Blast',
      description: 'High-intensity interval training to start your day right',
      gym: { id: '1', name: 'FitZone Downtown', location: 'Downtown, Tunis' },
      date: '2024-12-28',
      startTime: '07:00',
      endTime: '08:00',
      capacity: 15,
      booked: 12,
      difficulty: 'Intermediate',
      category: 'Cardio',
      qrCode: 'QR-HIIT-071224-001',
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'Strength & Power',
      description: 'Build strength with compound movements',
      gym: { id: '2', name: 'PowerGym Elite', location: 'Menzah, Tunis' },
      date: '2024-12-29',
      startTime: '18:30',
      endTime: '19:30',
      capacity: 12,
      booked: 8,
      difficulty: 'Advanced',
      category: 'Strength',
      status: 'scheduled'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    gym: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: 15,
    difficulty: 'Beginner' as const,
    category: ''
  });

  const handleAddClass = () => {
    if (!newClass.name || !newClass.date || !newClass.startTime || !newClass.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const classSchedule: ClassScheduleItem = {
      id: Date.now().toString(),
      ...newClass,
      gym: { id: '1', name: 'FitZone Downtown', location: 'Downtown, Tunis' },
      booked: 0,
      qrCode: `QR-${newClass.name.toUpperCase().slice(0, 4)}-${Date.now()}`,
      status: 'scheduled'
    };

    setClasses(prev => [...prev, classSchedule]);
    setIsDialogOpen(false);
    setNewClass({
      name: '',
      description: '',
      gym: '',
      date: '',
      startTime: '',
      endTime: '',
      capacity: 15,
      difficulty: 'Beginner',
      category: ''
    });

    toast({
      title: "Class Created",
      description: `${newClass.name} has been scheduled successfully.`
    });
  };

  const generateQRCode = (classId: string) => {
    setClasses(prev => prev.map(c => 
      c.id === classId 
        ? { ...c, qrCode: `QR-${c.name.toUpperCase().slice(0, 4)}-${Date.now()}` }
        : c
    ));

    toast({
      title: "QR Code Generated",
      description: "QR code is ready for class check-ins."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Class Schedule</h1>
            <p className="text-gray-600">Manage your classes and generate QR codes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>
                  Schedule a new fitness class for your clients.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning Yoga"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newClass.description}
                    onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the class"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newClass.startTime}
                      onChange={(e) => setNewClass(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newClass.endTime}
                      onChange={(e) => setNewClass(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={newClass.difficulty} onValueChange={(value) => setNewClass(prev => ({ ...prev, difficulty: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newClass.category} onValueChange={(value) => setNewClass(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardio">Cardio</SelectItem>
                        <SelectItem value="Strength">Strength</SelectItem>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Pilates">Pilates</SelectItem>
                        <SelectItem value="HIIT">HIIT</SelectItem>
                        <SelectItem value="Dance">Dance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClass} className="bg-purple-600 hover:bg-purple-700">
                  Create Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription className="mt-1">{classItem.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(classItem.status)}>
                    {classItem.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{classItem.gym.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(classItem.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{classItem.startTime} - {classItem.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{classItem.booked}/{classItem.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(classItem.difficulty)}>
                    {classItem.difficulty}
                  </Badge>
                  <Badge variant="outline">{classItem.category}</Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  {classItem.qrCode ? (
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
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {classes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Classes Scheduled</h3>
              <p className="text-gray-600 mb-4">Create your first class to get started</p>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Class
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoachClassSchedule;
