
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, QrCode, Edit, X, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScheduledClass {
  id: string;
  name: string;
  gym: string;
  studio: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  type: 'single' | 'course';
  qrCode?: string;
}

const ClassSchedule = () => {
  const [classes, setClasses] = useState<ScheduledClass[]>([
    {
      id: '1',
      name: 'Morning Yoga Flow',
      gym: 'Zen Wellness Studio',
      studio: 'Studio A',
      date: '2024-12-30',
      time: '08:00',
      duration: 60,
      capacity: 15,
      enrolled: 8,
      status: 'scheduled',
      type: 'single'
    },
    {
      id: '2',
      name: 'HIIT Training',
      gym: 'FitZone Gym',
      studio: 'Studio B',
      date: '2024-12-30',
      time: '18:00',
      duration: 45,
      capacity: 12,
      enrolled: 10,
      status: 'scheduled',
      type: 'single'
    },
    {
      id: '3',
      name: 'Strength Fundamentals - Week 1',
      gym: 'PowerHouse Gym',
      studio: 'Main Floor',
      date: '2024-12-29',
      time: '10:00',
      duration: 90,
      capacity: 8,
      enrolled: 6,
      status: 'completed',
      type: 'course'
    }
  ]);

  const handleGenerateQR = (classId: string) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? { ...cls, qrCode: `QR_${cls.name}_${classId}` }
        : cls
    ));
    
    toast({
      title: "QR Code Generated",
      description: "Students can now scan to check in to your class.",
    });
  };

  const handleStartClass = (classId: string) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? { ...cls, status: 'in_progress' as const }
        : cls
    ));
    
    toast({
      title: "Class Started",
      description: "Class is now in progress.",
    });
  };

  const handleCompleteClass = (classId: string) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? { ...cls, status: 'completed' as const }
        : cls
    ));
    
    toast({
      title: "Class Completed",
      description: "Class has been marked as completed.",
    });
  };

  const handleCancelClass = (classId: string) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? { ...cls, status: 'cancelled' as const }
        : cls
    ));
    
    toast({
      title: "Class Cancelled",
      description: "Class has been cancelled. Students will be notified.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingClasses = classes.filter(cls => cls.status === 'scheduled');
  const activeClasses = classes.filter(cls => cls.status === 'in_progress');
  const completedClasses = classes.filter(cls => cls.status === 'completed');

  const ClassCard = ({ classItem }: { classItem: ScheduledClass }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{classItem.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(classItem.status)}>
                {classItem.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline">
                {classItem.type === 'single' ? 'Single Class' : 'Course'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4">
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

        <div className="flex gap-2">
          {classItem.status === 'scheduled' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleGenerateQR(classItem.id)}
              >
                <QrCode className="w-4 h-4 mr-1" />
                QR Code
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleStartClass(classItem.id)}
              >
                Start Class
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleCancelClass(classItem.id)}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </>
          )}
          
          {classItem.status === 'in_progress' && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleCompleteClass(classItem.id)}
            >
              Complete Class
            </Button>
          )}
          
          {classItem.status === 'completed' && (
            <Button size="sm" variant="outline">
              View Feedback
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Class Schedule</h1>
              <p className="text-blue-100">Manage your upcoming and ongoing classes</p>
            </div>
            <Button className="bg-white/20 hover:bg-white/30 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Class
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{upcomingClasses.length}</div>
              <p className="text-sm text-gray-600">Upcoming Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{activeClasses.length}</div>
              <p className="text-sm text-gray-600">Active Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{completedClasses.length}</div>
              <p className="text-sm text-gray-600">Completed Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {classes.reduce((sum, cls) => sum + cls.enrolled, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Students</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Classes */}
        {activeClasses.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Active Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeClasses.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Classes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Classes</h2>
          {upcomingClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingClasses.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming classes</h3>
                <p className="text-gray-600">Schedule your next class to get started!</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Class
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Completed Classes */}
        {completedClasses.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Completed Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedClasses.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClassSchedule;
