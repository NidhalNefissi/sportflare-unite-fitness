
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Calendar, Brain, Plus, Camera, Share, User, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';

interface BodyMetric {
  id: string;
  date: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number;
  height: number;
  front_photo?: string;
  side_photo?: string;
}

interface AIGeneratedMetric {
  id: string;
  date: string;
  body_fat: number;
  muscle_mass: number;
  waist: number;
  hip: number;
  chest: number;
  arm: number;
  bmi: number;
}

const ClientProfile = () => {
  const { user } = useAuth();
  const { canAccessAICoach } = useSubscriptionAccess();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingMetrics, setIsAddingMetrics] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: '',
    fitnessGoals: '',
    avatar: user?.avatar || ''
  });

  const [newMetric, setNewMetric] = useState({
    gender: 'male' as const,
    age: 25,
    weight: 70,
    height: 170
  });

  const [bodyMetrics, setBodyMetrics] = useState<BodyMetric[]>([
    {
      id: '1',
      date: '2024-01-01',
      gender: 'male',
      age: 30,
      weight: 80,
      height: 180,
      front_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
      side_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      date: '2024-02-01',
      gender: 'male',
      age: 30,
      weight: 78,
      height: 180,
      front_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
      side_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const [aiGeneratedMetrics, setAiGeneratedMetrics] = useState<AIGeneratedMetric[]>([
    {
      id: '1',
      date: '2024-01-01',
      body_fat: 18,
      muscle_mass: 42,
      waist: 80,
      hip: 90,
      chest: 100,
      arm: 32,
      bmi: 24.7
    },
    {
      id: '2',
      date: '2024-02-01',
      body_fat: 16,
      muscle_mass: 44,
      waist: 78,
      hip: 89,
      chest: 102,
      arm: 33,
      bmi: 24.1
    }
  ]);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleAddMetrics = () => {
    const metric: BodyMetric = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newMetric,
      front_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
      side_photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
    };

    setBodyMetrics(prev => [metric, ...prev]);
    
    // Generate AI metrics (mock)
    const bmi = newMetric.weight / ((newMetric.height / 100) ** 2);
    const aiMetric: AIGeneratedMetric = {
      id: Date.now().toString(),
      date: metric.date,
      body_fat: Math.round(15 + Math.random() * 10),
      muscle_mass: Math.round(35 + Math.random() * 15),
      waist: Math.round(newMetric.height * 0.45),
      hip: Math.round(newMetric.height * 0.52),
      chest: Math.round(newMetric.height * 0.58),
      arm: Math.round(newMetric.height * 0.18),
      bmi: Math.round(bmi * 10) / 10
    };
    
    setAiGeneratedMetrics(prev => [aiMetric, ...prev]);
    setIsAddingMetrics(false);
    
    toast({
      title: "Metrics Added",
      description: "New body metrics recorded and AI analysis generated.",
    });
  };

  const handleShareProgress = () => {
    toast({
      title: "Progress Shared!",
      description: "Your fitness progress has been shared to social media.",
    });
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={editForm.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Full Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself..."
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="goals">Fitness Goals</Label>
                        <Textarea 
                          id="goals"
                          value={editForm.fitnessGoals}
                          onChange={(e) => setEditForm(prev => ({ ...prev, fitnessGoals: e.target.value }))}
                          placeholder="What are your fitness goals?"
                          rows={2}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl font-bold">{editForm.name}</h1>
                      <p className="text-gray-600">{editForm.email}</p>
                      {editForm.phone && <p className="text-gray-600">{editForm.phone}</p>}
                      {editForm.bio && <p className="text-sm text-gray-700 mt-2">{editForm.bio}</p>}
                      {editForm.fitnessGoals && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-700">Goals: </span>
                          <span className="text-sm text-gray-600">{editForm.fitnessGoals}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
            onClick={() => navigate('/client/book-classes')}
          >
            <Calendar className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Book Classes</div>
              <div className="text-sm opacity-90">Schedule workouts</div>
            </div>
          </Button>

          <Button 
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
            onClick={() => navigate('/client/ai-coach')}
            disabled={!canAccessAICoach()}
          >
            <Brain className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">AI Coach</div>
              <div className="text-sm opacity-90">Get guidance</div>
            </div>
          </Button>

          <Button 
            className="h-16 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-3"
            onClick={handleShareProgress}
          >
            <Share className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Share Progress</div>
              <div className="text-sm opacity-90">Social media</div>
            </div>
          </Button>
        </div>

        {/* Body Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Body Metrics
                </CardTitle>
                <CardDescription>Track your physical measurements</CardDescription>
              </div>
              <Dialog open={isAddingMetrics} onOpenChange={setIsAddingMetrics}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Metrics
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Body Metrics</DialogTitle>
                    <DialogDescription>
                      Record your current measurements for tracking progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={newMetric.age}
                          onChange={(e) => setNewMetric(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={newMetric.gender} onValueChange={(value) => setNewMetric(prev => ({ ...prev, gender: value as any }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={newMetric.weight}
                          onChange={(e) => setNewMetric(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={newMetric.height}
                          onChange={(e) => setNewMetric(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingMetrics(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMetrics}>
                      Add Metrics
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Gender</th>
                    <th className="text-left p-2">Age</th>
                    <th className="text-left p-2">Weight (kg)</th>
                    <th className="text-left p-2">Height (cm)</th>
                    <th className="text-left p-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyMetrics.map((metric, index) => (
                    <tr key={metric.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{new Date(metric.date).toLocaleDateString()}</td>
                      <td className="p-2 capitalize">{metric.gender}</td>
                      <td className="p-2">{metric.age}</td>
                      <td className="p-2 font-medium">{metric.weight}</td>
                      <td className="p-2">{metric.height}</td>
                      <td className="p-2">
                        {index > 0 && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className={`w-4 h-4 ${metric.weight < bodyMetrics[index - 1].weight ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={`text-sm ${metric.weight < bodyMetrics[index - 1].weight ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.weight < bodyMetrics[index - 1].weight ? '-' : '+'}{Math.abs(metric.weight - bodyMetrics[index - 1].weight).toFixed(1)}kg
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Generated Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Body Composition Analysis
            </CardTitle>
            <CardDescription>AI-generated insights from your body metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">BMI</th>
                    <th className="text-left p-2">Body Fat %</th>
                    <th className="text-left p-2">Muscle Mass</th>
                    <th className="text-left p-2">Waist</th>
                    <th className="text-left p-2">Hip</th>
                    <th className="text-left p-2">Chest</th>
                    <th className="text-left p-2">Arm</th>
                  </tr>
                </thead>
                <tbody>
                  {aiGeneratedMetrics.map((metric) => (
                    <tr key={metric.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{new Date(metric.date).toLocaleDateString()}</td>
                      <td className="p-2 font-medium">{metric.bmi}</td>
                      <td className="p-2">{metric.body_fat}%</td>
                      <td className="p-2">{metric.muscle_mass}%</td>
                      <td className="p-2">{metric.waist}cm</td>
                      <td className="p-2">{metric.hip}cm</td>
                      <td className="p-2">{metric.chest}cm</td>
                      <td className="p-2">{metric.arm}cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;
