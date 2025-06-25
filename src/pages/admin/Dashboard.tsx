
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Activity, TrendingUp, AlertTriangle, Shield, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const platformStats = {
    totalUsers: 1247,
    activeUsers: 892,
    monthlyRevenue: 45780,
    reportedIssues: 7
  };

  const recentActivity = [
    { type: 'user_registration', user: 'Sarah Wilson', time: '2 minutes ago', status: 'success' },
    { type: 'booking_created', user: 'Mike Johnson', time: '5 minutes ago', status: 'success' },
    { type: 'payment_failed', user: 'Emma Davis', time: '12 minutes ago', status: 'error' },
    { type: 'report_submitted', user: 'Alex Thompson', time: '18 minutes ago', status: 'warning' }
  ];

  const userGrowth = [
    { role: 'Clients', count: 847, growth: '+12%' },
    { role: 'Coaches', count: 156, growth: '+8%' },
    { role: 'Gym Owners', count: 89, growth: '+15%' },
    { role: 'Brands', count: 43, growth: '+23%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-300">Monitor and manage the SportFlare platform</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/admin/users')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            <span className="text-lg">Manage Users</span>
          </Button>
          <Button 
            onClick={() => navigate('/admin/reports')}
            className="h-16 bg-red-600 hover:bg-red-700 flex items-center justify-center gap-3"
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="text-lg">Reports</span>
          </Button>
          <Button 
            onClick={() => navigate('/admin/analytics')}
            className="h-16 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-lg">Analytics</span>
          </Button>
          <Button 
            onClick={() => navigate('/admin/settings')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
          >
            <Settings className="w-6 h-6" />
            <span className="text-lg">Settings</span>
          </Button>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.monthlyRevenue.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.reportedIssues}</div>
              <p className="text-xs text-muted-foreground">-3 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Growth by Role
              </CardTitle>
              <CardDescription>Monthly user registration statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userGrowth.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.role}</p>
                    <p className="text-sm text-gray-600">{item.count} total users</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {item.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Platform Activity
              </CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.type.replace('_', ' ')}</p>
                      <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              System Health & Security
            </CardTitle>
            <CardDescription>Platform performance and security status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-900">Server Status</span>
                </div>
                <p className="text-sm text-green-700">All systems operational</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-900">Database</span>
                </div>
                <p className="text-sm text-blue-700">98.9% uptime this month</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-yellow-900">Security</span>
                </div>
                <p className="text-sm text-yellow-700">2 failed login attempts today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
