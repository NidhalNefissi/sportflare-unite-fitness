
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
import { Plus, Star, Users, TrendingUp, Edit, Trash2, MapPin } from 'lucide-react';

interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  type: 'single' | 'program';
  image: string;
  rating: number;
  sales: number;
  revenue: number;
  features: string[];
  gym?: string;
  studio?: string;
}

const CoachPrograms = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([
    {
      id: '1',
      name: 'Ultimate Fat Loss',
      description: '12-week comprehensive program designed to maximize fat loss while preserving muscle mass.',
      duration: '12 weeks',
      difficulty: 'Intermediate',
      category: 'Weight Loss',
      type: 'program',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      rating: 4.8,
      sales: 34,
      revenue: 3059.66,
      features: ['Workout videos', 'Nutrition plan', '24/7 support', 'Progress tracking'],
      gym: 'FitZone Downtown',
      studio: 'Studio A'
    },
    {
      id: '2',
      name: 'Strength Builder Pro',
      description: '16-week advanced strength training program for serious lifters.',
      duration: '16 weeks',
      difficulty: 'Advanced',
      category: 'Strength',
      type: 'program',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      rating: 4.9,
      sales: 18,
      revenue: 2339.82,
      features: ['Progressive overload', 'Form corrections', 'Supplement guide', 'Weekly check-ins'],
      gym: 'PowerGym',
      studio: 'Studio B'
    },
    {
      id: '3',
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training session for maximum calorie burn.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      category: 'Cardio',
      type: 'single',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      rating: 4.7,
      sales: 45,
      revenue: 1800,
      features: ['High intensity', 'Calorie burning', 'Equipment provided'],
      gym: 'FitZone Downtown',
      studio: 'Studio C'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: 'Beginner' as const,
    category: '',
    type: 'single' as const,
    features: '',
    gym: '',
    studio: ''
  });

  const availableGyms = [
    { id: 'gym1', name: 'FitZone Downtown', studios: ['Studio A', 'Studio B', 'Studio C'] },
    { id: 'gym2', name: 'PowerGym', studios: ['Studio A', 'Studio B'] },
    { id: 'gym3', name: 'Elite Fitness', studios: ['Main Room', 'Private Studio'] }
  ];

  const handleAddProgram = () => {
    if (!newProgram.name || !newProgram.description || !newProgram.duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const program: TrainingProgram = {
      id: editingProgram?.id || Date.now().toString(),
      ...newProgram,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      rating: editingProgram?.rating || 0,
      sales: editingProgram?.sales || 0,
      revenue: editingProgram?.revenue || 0,
      features: newProgram.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (editingProgram) {
      setPrograms(prev => prev.map(p => p.id === editingProgram.id ? program : p));
      toast({
        title: "Program Updated",
        description: `${newProgram.name} has been updated successfully.`
      });
    } else {
      setPrograms(prev => [...prev, program]);
      toast({
        title: "Program Created",
        description: `${newProgram.name} has been added to your programs.`
      });
    }

    setIsDialogOpen(false);
    setEditingProgram(null);
    resetForm();
  };

  const handleEditProgram = (program: TrainingProgram) => {
    setEditingProgram(program);
    setNewProgram({
      name: program.name,
      description: program.description,
      duration: program.duration,
      difficulty: program.difficulty,
      category: program.category,
      type: program.type,
      features: program.features.join(', '),
      gym: program.gym || '',
      studio: program.studio || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Program Deleted",
      description: "Training program has been removed."
    });
  };

  const resetForm = () => {
    setNewProgram({
      name: '',
      description: '',
      duration: '',
      difficulty: 'Beginner',
      category: '',
      type: 'single',
      features: '',
      gym: '',
      studio: ''
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'program': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = programs.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = programs.reduce((sum, p) => sum + p.sales, 0);
  const selectedGym = availableGyms.find(g => g.name === newProgram.gym);

  return (
    <DashboardLayout role="coach">
      <div className="space-y-6">
        {/* Header & Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Training Programs</h1>
            <p className="text-gray-600">Create and manage your personalized programs</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  setEditingProgram(null);
                  resetForm();
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProgram ? 'Edit Training Program' : 'Create Training Program'}
                </DialogTitle>
                <DialogDescription>
                  {editingProgram 
                    ? 'Update your existing training program details.' 
                    : 'Create a new personalized training program.'
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Program Name</Label>
                    <Input
                      id="name"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Ultimate Fat Loss"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newProgram.type} onValueChange={(value) => setNewProgram(prev => ({ ...prev, type: value as any }))}>
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
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of your program"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newProgram.duration}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 8 weeks or 1 hour"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={newProgram.difficulty} onValueChange={(value) => setNewProgram(prev => ({ ...prev, difficulty: value as any }))}>
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newProgram.category} onValueChange={(value) => setNewProgram(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                        <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                        <SelectItem value="Strength">Strength</SelectItem>
                        <SelectItem value="Cardio">Cardio</SelectItem>
                        <SelectItem value="Flexibility">Flexibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gym">Gym</Label>
                    <Select value={newProgram.gym} onValueChange={(value) => setNewProgram(prev => ({ ...prev, gym: value, studio: '' }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gym" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableGyms.map((gym) => (
                          <SelectItem key={gym.id} value={gym.name}>{gym.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedGym && (
                  <div>
                    <Label htmlFor="studio">Studio</Label>
                    <Select value={newProgram.studio} onValueChange={(value) => setNewProgram(prev => ({ ...prev, studio: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a studio" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedGym.studios.map((studio) => (
                          <SelectItem key={studio} value={studio}>{studio}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={newProgram.features}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="e.g., Workout videos, Nutrition plan, 24/7 support"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProgram} className="bg-purple-600 hover:bg-purple-700">
                  {editingProgram ? 'Update Program' : 'Create Program'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{programs.length}</div>
              <p className="text-xs text-muted-foreground">Active programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">Programs sold</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} TND</div>
              <p className="text-xs text-muted-foreground">From programs</p>
            </CardContent>
          </Card>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <CardDescription className="mt-1">{program.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditProgram(program)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteProgram(program.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{program.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{program.duration}</div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(program.difficulty)}>
                    {program.difficulty}
                  </Badge>
                  <Badge className={getTypeColor(program.type)}>
                    {program.type === 'single' ? 'Single Session' : 'Full Program'}
                  </Badge>
                  <Badge variant="outline">{program.category}</Badge>
                </div>

                {program.gym && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{program.gym}</span>
                    {program.studio && (
                      <>
                        <span>•</span>
                        <span>{program.studio}</span>
                      </>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {program.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t">
                  <span>{program.sales} participants</span>
                  <span>{program.revenue.toFixed(2)} TND revenue</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {programs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Programs Created</h3>
              <p className="text-gray-600 mb-4">Create your first training program to start coaching</p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Program
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoachPrograms;
