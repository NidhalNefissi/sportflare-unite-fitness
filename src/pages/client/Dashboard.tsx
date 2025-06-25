
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, Star, Users, Plus } from 'lucide-react';

const ClientDashboard = () => {
  const { user } = useAuth();

  const upcomingClasses = [
    {
      id: 1,
      name: 'HIIT Cardio Blast',
      gym: 'FitZone Downtown',
      coach: 'Sarah Johnson',
      time: '6:00 PM',
      date: 'Today',
      duration: '45 min',
      intensity: 'High'
    },
    {
      id: 2,
      name: 'Yoga Flow',
      gym: 'Zen Fitness',
      coach: 'Mike Wilson',
      time: '7:30 AM',
      date: 'Tomorrow',
      duration: '60 min',
      intensity: 'Low'
    }
  ];

  const weeklyGoals = {
    workouts: { current: 4, target: 6 },
    calories: { current: 2100, target: 2500 },
    steps: { current: 8500, target: 10000 }
  };

  const recentActivity = [
    { type: 'workout', name: 'Strength Training', date: 'Yesterday', rating: 5 },
    { type: 'class', name: 'Spin Class', date: '2 days ago', rating: 4 },
    { type: 'workout', name: 'Morning Run', date: '3 days ago', rating: 5 }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100">Ready to crush your fitness goals today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Workouts</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyGoals.workouts.current}/{weeklyGoals.workouts.target}</div>
              <Progress 
                value={(weeklyGoals.workouts.current / weeklyGoals.workouts.target) * 100} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {weeklyGoals.workouts.target - weeklyGoals.workouts.current} more to reach your goal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <Star className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyGoals.calories.current}</div>
              <Progress 
                value={(weeklyGoals.calories.current / weeklyGoals.calories.target) * 100} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {weeklyGoals.calories.target - weeklyGoals.calories.current} more calories to goal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyGoals.steps.current.toLocaleString()}</div>
              <Progress 
                value={(weeklyGoals.steps.current / weeklyGoals.steps.target) * 100} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(weeklyGoals.steps.target - weeklyGoals.steps.current).toLocaleString()} steps to go
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Classes
                  </CardTitle>
                  <CardDescription>Your scheduled workouts</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Book Class
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{classItem.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{classItem.gym}</span>
                      <span>•</span>
                      <span>{classItem.coach}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{classItem.date} at {classItem.time}</span>
                      <span>•</span>
                      <span>{classItem.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={classItem.intensity === 'High' ? 'destructive' : 
                              classItem.intensity === 'Low' ? 'secondary' : 'default'}
                    >
                      {classItem.intensity}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Coach Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                AI Coach Recommendations
              </CardTitle>
              <CardDescription>Personalized suggestions for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">🎯 Focus on Cardio</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Based on your goals, try adding 2 more cardio sessions this week.
                </p>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                  View Cardio Classes
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">💪 Strength Training</h4>
                <p className="text-sm text-green-700 mb-3">
                  Great progress! Consider increasing weights by 5% next session.
                </p>
                <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                  Log Workout
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">🥗 Nutrition Tip</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Add 20g more protein to support your muscle building goals.
                </p>
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                  Meal Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your fitness journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < activity.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
