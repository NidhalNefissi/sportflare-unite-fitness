
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Star, Users, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { ProgramLevel, ProgramType, TrainingProgram } from '@/types/program';
import { toast } from '@/hooks/use-toast';

const CoachPrograms = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([
    {
      id: '1',
      title: 'Beginner Strength Training',
      description: 'Perfect for those new to weight training. Focus on form and basic movements.',
      level: 'Beginner',
      type: 'program',
      duration: '8 weeks',
      price: 120,
      rating: 4.8,
      enrollments: 23,
      sessions: 16,
      createdAt: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      title: 'HIIT Fat Burn',
      description: 'High-intensity interval training for maximum calorie burn.',
      level: 'Intermediate',
      type: 'single',
      duration: '45 min',
      price: 25,
      rating: 4.9,
      enrollments: 45,
      sessions: 1,
      createdAt: '2024-02-01',
      isActive: true
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Beginner' as ProgramLevel,
    type: 'single' as ProgramType,
    duration: '',
    price: 0,
    sessions: 1
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      level: 'Beginner',
      type: 'single',
      duration: '',
      price: 0,
      sessions: 1
    });
    setEditingProgram(null);
  };

  const handleCreate = () => {
    setIsDialogOpen(true);
    resetForm();
  };

  const handleEdit = (program: TrainingProgram) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      description: program.description,
      level: program.level,
      type: program.type,
      duration: program.duration,
      price: program.price,
      sessions: program.sessions
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const programData: TrainingProgram = {
      id: editingProgram?.id || Date.now().toString(),
      ...formData,
      rating: editingProgram?.rating || 0,
      enrollments: editingProgram?.enrollments || 0,
      createdAt: editingProgram?.createdAt || new Date().toISOString().split('T')[0],
      isActive: true
    };

    if (editingProgram) {
      setPrograms(prev => prev.map(p => p.id === editingProgram.id ? programData : p));
      toast({
        title: "Success",
        description: "Program updated successfully!",
      });
    } else {
      setPrograms(prev => [...prev, programData]);
      toast({
        title: "Success", 
        description: "Program created successfully!",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleToggleActive = (programId: string) => {
    setPrograms(prev => 
      prev.map(p => 
        p.id === programId ? { ...p, isActive: !p.isActive } : p
      )
    );
    toast({
      title: "Success",
      description: "Program status updated!",
    });
  };

  const totalRevenue = programs.reduce((sum, p) => sum + (p.price * p.enrollments), 0);
  const totalEnrollments = programs.reduce((sum, p) => sum + p.enrollments, 0);

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Training Programs</h1>
            <p className="text-gray-600">Create and manage your training programs</p>
          </div>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{programs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEnrollments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue} TND</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {programs.length > 0 ? (programs.reduce((sum, p) => sum + p.rating, 0) / programs.length).toFixed(1) : '0'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className={`${!program.isActive ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={program.level === 'Beginner' ? 'secondary' : program.level === 'Intermediate' ? 'default' : 'destructive'}>
                        {program.level}
                      </Badge>
                      <Badge variant="outline">
                        {program.type === 'single' ? 'Single Session' : 'Full Program'}
                      </Badge>
                      {!program.isActive && <Badge variant="destructive">Inactive</Badge>}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(program)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-gray-500" />
                    <span>{program.price} TND</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span>{program.enrollments} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{program.rating}/5</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={program.isActive ? "destructive" : "default"}
                    onClick={() => handleToggleActive(program.id)}
                    className="flex-1"
                  >
                    {program.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create/Edit Program Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for your training program
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Program Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Beginner Strength Training"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your program..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value: ProgramLevel) => setFormData({...formData, level: value})}>
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
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: ProgramType) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Session</SelectItem>
                      <SelectItem value="program">Full Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 8 weeks, 45 min"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (TND)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              {formData.type === 'program' && (
                <div>
                  <Label htmlFor="sessions">Number of Sessions</Label>
                  <Input
                    id="sessions"
                    type="number"
                    min="1"
                    value={formData.sessions}
                    onChange={(e) => setFormData({...formData, sessions: parseInt(e.target.value) || 1})}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {editingProgram ? 'Update' : 'Create'} Program
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CoachPrograms;
