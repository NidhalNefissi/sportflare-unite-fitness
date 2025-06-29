
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Building,
  Star,
  DollarSign,
  Activity,
  Bell,
  Settings,
  Eye,
  Ban,
  Check
} from 'lucide-react';
import { useState } from 'react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const [platformStats] = useState({
    totalUsers: 1245,
    activeUsers: 892,
    totalGyms: 45,
    totalCoaches: 123,
    totalBrands: 28,
    monthlyRevenue: 125430,
    totalBookings: 5670,
    pendingApprovals: 12,
    reportedIssues: 8,
    systemHealth: 98.5
  });

  const [recentUsers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'client',
      status: 'active',
      joinDate: '2024-12-28',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Ahmed Fitness',
      email: 'ahmed@gym.com',
      role: 'gym_owner',
      status: 'pending',
      joinDate: '2024-12-27',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'FitSupplements',
      email: 'contact@fitsupplements.tn',
      role: 'brand',
      status: 'active',
      joinDate: '2024-12-26',
      lastActive: '3 hours ago'
    }
  ]);

  const [pendingApprovals] = useState([
    {
      id: '1',
      type: 'gym',
      name: 'New Fitness Center',
      submittedBy: 'Ahmed Fitness',
      date: '2024-12-28',
      status: 'pending'
    },
    {
      id: '2',
      type: 'coach',
      name: 'Personal Training Certification',
      submittedBy: 'Emma Trainer',
      date: '2024-12-27',
      status: 'pending'
    },
    {
      id: '3',
      type: 'brand',
      name: 'Protein Supplements Store',
      submittedBy: 'NutriTech',
      date: '2024-12-26',
      status: 'pending'
    }
  ]);

  const [transactions] = useState([
    {
      id: 'TXN-001',
      user: 'Sarah Johnson',
      type: 'subscription',
      amount: 120,
      status: 'completed',
      date: '2024-12-28'
    },
    {
      id: 'TXN-002',
      user: 'Mike Wilson',
      type: 'product',
      amount: 85,
      status: 'completed',
      date: '2024-12-28'
    },
    {
      id: 'TXN-003',
      user: 'Lisa Chen',
      type: 'subscription',
      amount: 90,
      status: 'pending',
      date: '2024-12-27'
    }
  ]);

  const handleApproveUser = (userId: string) => {
    console.log('Approving user:', userId);
  };

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
  };

  const handleApproveContent = (contentId: string) => {
    console.log('Approving content:', contentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'client': return <Users className="w-4 h-4" />;
      case 'coach': return <Star className="w-4 h-4" />;
      case 'gym_owner': return <Building className="w-4 h-4" />;
      case 'brand': return <CreditCard className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-red-100">Manage and monitor the SportFlare platform</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className="text-sm">System Health: {platformStats.systemHealth}%</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{platformStats.pendingApprovals} pending approvals</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center gap-1">
            <Users className="w-5 h-5" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-1">
            <Check className="w-5 h-5" />
            <span className="text-sm">Approvals</span>
            {platformStats.pendingApprovals > 0 && (
              <Badge variant="destructive" className="text-xs">
                {platformStats.pendingApprovals}
              </Badge>
            )}
          </Button>
          <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center gap-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button className="h-16 bg-orange-600 hover:bg-orange-700 flex flex-col items-center justify-center gap-1">
            <Bell className="w-5 h-5" />
            <span className="text-sm">Notifications</span>
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
              <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {platformStats.activeUsers} active users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.monthlyRevenue.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="approvals">
              Approvals ({platformStats.pendingApprovals})
            </TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(user.role)}
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined {user.joinDate} • Last active {user.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproveUser(user.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Content and user verifications awaiting review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <h4 className="font-medium">{approval.name}</h4>
                      <p className="text-sm text-gray-600">
                        {approval.type.charAt(0).toUpperCase() + approval.type.slice(1)} • Submitted by {approval.submittedBy}
                      </p>
                      <p className="text-xs text-gray-500">Submitted on {approval.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveContent(approval.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Payment and subscription activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{transaction.id}</h4>
                      <p className="text-sm text-gray-600">
                        {transaction.user} • {transaction.type}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-semibold">{transaction.amount} TND</div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Clients</span>
                      <span className="text-sm font-medium">892</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Coaches</span>
                      <span className="text-sm font-medium">123</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Gyms</span>
                      <span className="text-sm font-medium">45</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Subscriptions</span>
                      <span className="text-sm font-medium">85,430 TND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Products</span>
                      <span className="text-sm font-medium">25,600 TND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Commissions</span>
                      <span className="text-sm font-medium">14,400 TND</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>125,430 TND</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API Status</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment Gateway</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage</span>
                      <Badge className="bg-yellow-100 text-yellow-800">85% Full</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
