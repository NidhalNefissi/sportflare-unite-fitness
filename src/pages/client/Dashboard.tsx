import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { Calendar, Clock, MapPin, Users, Star, Brain, Crown, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  title: string;
  description: string;
  icon: any;
  action: () => void;
  color: string;
}

interface Activity {
  title: string;
  gym: string;
  time: string;
  type: 'class' | 'gym';
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const { currentPlan, canAccessClasses, canAccessAICoach, canAccessGyms } = useSubscriptionAccess();
  const navigate = useNavigate();

  const gymStats = {
    classesAttended: 23,
    hoursSpent: 45,
    caloriesBurned: 12500,
    nextClass: 'Yoga Flow',
    nextClassTime: 'Tomorrow at 6:00 PM'
  };

  const recentActivities: Activity[] = [
    { title: 'HIIT Cardio', gym: 'FitZone Downtown', time: 'Yesterday at 6:00 PM', type: 'class' },
    { title: 'Visited Weight Area', gym: 'PowerGym', time: '2 days ago', type: 'gym' },
    { title: 'Yoga Flow', gym: 'Zen Wellness', time: '4 days ago', type: 'class' },
  ];

  const getQuickActions = () => {
    const actions = [];
    
    if (canAccessClasses()) {
      actions.push({
        title: "Book Classes",
        description: "Reserve your fitness sessions",
        icon: Calendar,
        action: () => navigate('/client/book-classes'),
        color: "bg-blue-600 hover:bg-blue-700"
      });
    } else {
      actions.push({
        title: "Upgrade Plan",
        description: "Access classes & more features",
        icon: Crown,
        action: () => navigate('/client/subscriptions'),
        color: "bg-orange-600 hover:bg-orange-700"
      });
    }
    
    if (canAccessAICoach()) {
      actions.push({
        title: "AI Coach",
        description: "Get personalized guidance",
        icon: Brain,
        action: () => navigate('/client/ai-coach'),
        color: "bg-purple-600 hover:bg-purple-700"
      });
    }
    
    if (canAccessGyms()) {
      actions.push({
        title: "Find Gyms",
        description: "Discover partner locations",
        icon: MapPin,
        action: () => navigate('/client/gyms'),
        color: "bg-green-600 hover:bg-green-700"
      });
    }
    
    return actions;
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100">Your fitness journey starts here</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getQuickActions().map((action, index) => (
            <Button
              key={index}
              className={`h-24 flex flex-col items-center justify-center gap-2 ${action.color}`}
              onClick={action.action}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-lg font-medium">{action.title}</span>
              <span className="text-sm">{action.description}</span>
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.classesAttended}</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gymStats.hoursSpent}</div>
              <p className="text-xs text-muted-foreground">In the gym this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Next Class */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Next Class
              </CardTitle>
              <CardDescription>Your upcoming session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{gymStats.nextClass}</h3>
                <p className="text-sm text-gray-600">
                  {gymStats.nextClassTime}
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700">View Details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/client/my-bookings')}
                >
                  View History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'class' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.gym} • {activity.time}</p>
                    </div>
                    <Badge variant="outline">
                      {activity.type === 'class' ? 'Class' : 'Gym'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fitness Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Fitness Tip</CardTitle>
            <CardDescription>Boost your workout routine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Stay Hydrated</h3>
              <p className="text-sm text-gray-600">
                Drinking water during workouts can improve performance and prevent dehydration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
