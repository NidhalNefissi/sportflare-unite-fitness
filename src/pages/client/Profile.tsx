import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Calendar, Brain, Plus, Camera, Share, Lock } from 'lucide-react';
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
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    avatar: user?.avatar || ''
  });

  const [bodyMetrics, setBodyMetrics] = useState<BodyMetric[]>([
    {
      id: '1',
      date: '2023-01-01',
      gender: 'male',
      age: 30,
      weight: 80,
      height: 180,
      front_photo: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=100&fit=crop&crop=face',
      side_photo: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      date: '2023-02-01',
      gender: 'male',
      age: 30,
      weight: 79,
      height: 180,
      front_photo: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=100&fit=crop&crop=face',
      side_photo: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const [aiGeneratedMetrics, setAiGeneratedMetrics] = useState<AIGeneratedMetric[]>([
    {
      id: '1',
      date: '2023-01-01',
      body_fat: 20,
      muscle_mass: 40,
      waist: 80,
      hip: 90,
      chest: 100,
      arm: 30,
      bmi: 25
    },
    {
      id: '2',
      date: '2023-02-01',
      body_fat: 19,
      muscle_mass: 41,
      waist: 79,
      hip: 89,
      chest: 99,
      arm: 31,
      bmi: 24
    }
  ]);

  const handleSaveProfile = () => {
    // Mock save functionality
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleAddMetrics = () => {
    // Mock add metrics functionality
    toast({
      title: "Metrics Added",
      description: "New body metrics have been recorded.",
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
                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input 
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Full Name"
                      />
                      <Input 
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        type="email"
                      />
                      <Input 
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Phone Number"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold">{editForm.name}</h1>
                      <p className="text-gray-600">{editForm.email}</p>
                      {editForm.phone && <p className="text-gray-600">{editForm.phone}</p>}
                    </>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/client/book-classes')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Class Schedule
              </CardTitle>
              <CardDescription>View and book your fitness classes</CardDescription>
            </CardHeader>
          </Card>

          {canAccessAICoach() ? (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/client/ai-coach')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Coach
                </CardTitle>
                <CardDescription>Get personalized fitness guidance</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  AI Coach
                </CardTitle>
                <CardDescription>Upgrade to Plus or Premium to access</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Body Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Latest Body Metrics</CardTitle>
                <CardDescription>Your most recent measurements</CardDescription>
              </div>
              <Button onClick={handleAddMetrics}>
                <Plus className="w-4 h-4 mr-2" />
                Add Metrics
              </Button>
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
                    <th className="text-left p-2">Photos</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyMetrics.map((metric) => (
                    <tr key={metric.id} className="border-b">
                      <td className="p-2">{new Date(metric.date).toLocaleDateString()}</td>
                      <td className="p-2 capitalize">{metric.gender}</td>
                      <td className="p-2">{metric.age}</td>
                      <td className="p-2">{metric.weight}</td>
                      <td className="p-2">{metric.height}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          {metric.front_photo && (
                            <img src={metric.front_photo} alt="Front" className="w-8 h-8 rounded object-cover" />
                          )}
                          {metric.side_photo && (
                            <img src={metric.side_photo} alt="Side" className="w-8 h-8 rounded object-cover" />
                          )}
                        </div>
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
            <CardTitle>AI Generated Metrics</CardTitle>
            <CardDescription>Insights from your body metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Body Fat</th>
                    <th className="text-left p-2">Muscle Mass</th>
                    <th className="text-left p-2">Waist</th>
                    <th className="text-left p-2">Hip</th>
                    <th className="text-left p-2">Chest</th>
                    <th className="text-left p-2">Arm</th>
                    <th className="text-left p-2">BMI</th>
                  </tr>
                </thead>
                <tbody>
                  {aiGeneratedMetrics.map((metric) => (
                    <tr key={metric.id} className="border-b">
                      <td className="p-2">{new Date(metric.date).toLocaleDateString()}</td>
                      <td className="p-2">{metric.body_fat}</td>
                      <td className="p-2">{metric.muscle_mass}</td>
                      <td className="p-2">{metric.waist}</td>
                      <td className="p-2">{metric.hip}</td>
                      <td className="p-2">{metric.chest}</td>
                      <td className="p-2">{metric.arm}</td>
                      <td className="p-2">{metric.bmi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Social Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Share Progress
            </CardTitle>
            <CardDescription>Share your fitness journey on social media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Progress Dashboard Ready!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your fitness progress is ready to be shared. This includes your achievements without sensitive data.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Share className="w-4 h-4 mr-2" />
                  Share on Instagram
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share on Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;
