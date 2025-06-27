
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { Calendar, MapPin, Users, Star, Brain, Crown, Dumbbell, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useAuth();
  const { currentPlan, canAccessClasses, canAccessAICoach } = useSubscriptionAccess();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "My Profile",
      description: "Edit profile & track progress",
      icon: Users,
      action: () => navigate('/client/profile'),
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Find Gyms",
      description: "Explore fitness facilities",
      icon: MapPin,
      action: () => navigate('/client/gyms'),
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Browse Coaches",
      description: "Find certified trainers",
      icon: Star,
      action: () => navigate('/client/coaches'),
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Marketplace",
      description: "Equipment & supplements",
      icon: ShoppingBag,
      action: () => navigate('/client/marketplace'),
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      title: canAccessClasses() ? "Book Classes" : "Upgrade Plan",
      description: canAccessClasses() ? "Reserve fitness sessions" : "Access classes & more",
      icon: canAccessClasses() ? Calendar : Crown,
      action: () => navigate(canAccessClasses() ? '/client/book-classes' : '/client/subscriptions'),
      color: canAccessClasses() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-yellow-600 hover:bg-yellow-700"
    },
    {
      title: "Subscription Plans",
      description: "Manage your membership",
      icon: Crown,
      action: () => navigate('/client/subscriptions'),
      color: "bg-pink-600 hover:bg-pink-700"
    }
  ];

  const stats = {
    classesAttended: 23,
    hoursSpent: 45,
    caloriesBurned: 12500,
    currentStreak: 7
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100">Your fitness journey continues here</p>
            </div>
            <Badge className="bg-white/20 text-white">
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
            </Badge>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              className={`h-24 flex flex-col items-center justify-center gap-2 ${action.color}`}
              onClick={action.action}
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <span className="block text-sm font-medium">{action.title}</span>
                <span className="block text-xs opacity-90">{action.description}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.classesAttended}</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hours Trained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hoursSpent}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.caloriesBurned.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total estimated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Coach Feature */}
        {canAccessAICoach() && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Coach Insights
              </CardTitle>
              <CardDescription>Personalized recommendations for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Today's Recommendation</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your recent activity, try focusing on upper body strength training today. 
                  Your cardio performance has been excellent!
                </p>
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate('/client/ai-coach')}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Open AI Coach
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Upgrade CTA */}
        {currentPlan === 'basic' && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Crown className="w-5 h-5" />
                Unlock Premium Features
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Upgrade to Plus or Premium to access classes, AI coach, and more!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => navigate('/client/subscriptions')}
              >
                View Plans
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
