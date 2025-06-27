
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  Building2, 
  Package, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  UserCheck,
  UserX,
  MessageSquare,
  Settings,
  FileText,
  Shield,
  Activity
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'coach' | 'gym_owner' | 'brand';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'subscription' | 'product' | 'class';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'client-1',
      name: 'Sarah Ben Mohamed',
      email: 'client1@test.com', 
      role: 'client',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-06-26'
    },
    {
      id: 'coach-1',
      name: 'Emma Kallel',
      email: 'coach1@test.com',
      role: 'coach', 
      status: 'active',
      joinDate: '2024-02-10',
      lastActive: '2024-06-25'
    },
    {
      id: 'gym-1',
      name: 'Ahmed Fitness Center',
      email: 'gym1@test.com',
      role: 'gym_owner',
      status: 'pending',
      joinDate: '2024-06-20',
      lastActive: '2024-06-24'
    },
    {
      id: 'brand-1',
      name: 'FitNutrition Tunisia',
      email: 'brand1@test.com',
      role: 'brand',
      status: 'active',
      joinDate: '2024-03-05',
      lastActive: '2024-06-26'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'txn-1',
      userId: 'client-1',
      userName: 'Sarah Ben Mohamed',
      type: 'subscription',
      amount: 90,
      status: 'completed',
      date: '2024-06-25'
    },
    {
      id: 'txn-2', 
      userId: 'client-1',
      userName: 'Sarah Ben Mohamed',
      type: 'product',
      amount: 89.99,
      status: 'completed',
      date: '2024-06-24'
    },
    {
      id: 'txn-3',
      userId: 'client-2',
      userName: 'Mohamed Ali',
      type: 'subscription',
      amount: 120,
      status: 'pending',
      date: '2024-06-26'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);

  const handleUserStatusChange = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "User Status Updated",
      description: `User has been ${newStatus === 'suspended' ? 'suspended' : 'activated'}.`
    });
  };

  const handleApproveUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' } : user
    ));
    
    toast({
      title: "User Approved",
      description: "User account has been approved and activated."
    });
  };

  const sendGlobalNotification = () => {
    if (!notificationMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a notification message.",
        variant: "destructive"
      });
      return;
    }

    // Mock send notification
    toast({
      title: "Notification Sent",
      description: `Global notification sent to all ${users.length} users.`
    });
    
    setNotificationMessage('');
    setIsNotificationDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'coach': return 'bg-purple-100 text-purple-800';
      case 'gym_owner': return 'bg-orange-100 text-orange-800';
      case 'brand': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    totalRevenue: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: transactions.filter(t => t.status === 'pending').length,
    completedTransactions: transactions.filter(t => t.status === 'completed').length
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-slate-300">Manage users, content, and system analytics</p>
            </div>
            <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Global Notification
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Global Notification</DialogTitle>
                  <DialogDescription>
                    Send a notification to all users on the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <textarea
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={4}
                    placeholder="Enter your notification message..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={sendGlobalNotification}>
                    Send Notification
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active, {stats.pendingUsers} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} TND</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedTransactions} completed transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingUsers}</div>
              <p className="text-xs text-muted-foreground">
                User accounts awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">99.2%</div>
              <p className="text-xs text-muted-foreground">
                Platform uptime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="content">Content Approval</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveUser(user.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        {user.status === 'active' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUserStatusChange(user.id, 'suspended')}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {user.status === 'suspended' && (
                          <Button
                            size="sm"
                            onClick={() => handleUserStatusChange(user.id, 'active')}
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Reactivate
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUserDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Monitor all platform transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{transaction.userName}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} - {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{transaction.amount} TND</p>
                        <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review and approve user-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Pending Content</h3>
                  <p className="text-gray-600">All content has been reviewed and approved.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>System performance and usage metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">User Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Clients</span>
                        <span>{users.filter(u => u.role === 'client').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coaches</span>
                        <span>{users.filter(u => u.role === 'coach').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gym Owners</span>
                        <span>{users.filter(u => u.role === 'gym_owner').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Brands</span>
                        <span>{users.filter(u => u.role === 'brand').length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Revenue Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subscriptions</span>
                        <span>{transactions.filter(t => t.type === 'subscription' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)} TND</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Products</span>
                        <span>{transactions.filter(t => t.type === 'product' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)} TND</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Classes</span>
                        <span>{transactions.filter(t => t.type === 'class' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)} TND</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Details Dialog */}
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View and manage user account information
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span>
                    <p>{selectedUser.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Role:</span>
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Join Date:</span>
                    <p>{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <span className="font-medium">Last Active:</span>
                    <p>{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
