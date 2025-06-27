
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Package, ShoppingCart, TrendingUp, Star, Users, DollarSign, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BrandDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recentOrders] = useState([
    { 
      id: 'ORD-001', 
      customer: 'Sarah Johnson', 
      product: 'Whey Protein Premium', 
      amount: 85, 
      status: 'delivered',
      date: '2 hours ago'
    },
    { 
      id: 'ORD-002', 
      customer: 'Mike Wilson', 
      product: 'Resistance Bands Set', 
      amount: 45, 
      status: 'shipped',
      date: '5 hours ago'
    },
    { 
      id: 'ORD-003', 
      customer: 'Lisa Chen', 
      product: 'Yoga Mat Pro', 
      amount: 65, 
      status: 'processing',
      date: '1 day ago'
    }
  ]);

  const [topProducts] = useState([
    { 
      id: '1', 
      name: 'Whey Protein Premium', 
      sales: 156, 
      revenue: 13260, 
      rating: 4.8,
      stock: 45
    },
    { 
      id: '2', 
      name: 'Resistance Bands Set', 
      sales: 89, 
      revenue: 4005, 
      rating: 4.6,
      stock: 23
    },
    { 
      id: '3', 
      name: 'Yoga Mat Pro', 
      sales: 67, 
      revenue: 4355, 
      rating: 4.9,
      stock: 12
    }
  ]);

  const brandStats = {
    totalProducts: 24,
    totalOrders: 312,
    monthlyRevenue: 21620,
    avgRating: 4.7,
    pendingOrders: 8,
    lowStockItems: 3
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="brand">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-purple-100">Manage your brand and track your sales performance</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              <span className="text-sm">{brandStats.totalProducts} products</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span className="text-sm">{brandStats.avgRating}/5 rating</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => navigate('/brand/product-management')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center gap-1"
          >
            <Package className="w-5 h-5" />
            <span className="text-sm">Products</span>
          </Button>
          <Button 
            onClick={() => navigate('/brand/orders')}
            className="h-16 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-1"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm">Orders</span>
            {brandStats.pendingOrders > 0 && (
              <Badge variant="destructive" className="text-xs">
                {brandStats.pendingOrders}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={() => navigate('/brand/analytics')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center gap-1"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button 
            onClick={() => navigate('/brand/promotions')}
            className="h-16 bg-orange-600 hover:bg-orange-700 flex flex-col items-center justify-center gap-1"
          >
            <Star className="w-5 h-5" />
            <span className="text-sm">Promotions</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {brandStats.lowStockItems > 0 && (
                  <span className="text-red-600">{brandStats.lowStockItems} low stock</span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+23 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.monthlyRevenue.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.avgRating}/5</div>
              <p className="text-xs text-muted-foreground">From 89 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/brand/orders')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{order.id}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>{order.customer} • {order.product}</div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{order.amount} TND</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Products
                  </CardTitle>
                  <CardDescription>Best performing products this month</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/brand/product-management')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{product.sales} sold</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{product.rating}</span>
                        </div>
                        <span>•</span>
                        <span className={product.stock < 20 ? 'text-red-600' : 'text-green-600'}>
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{product.revenue.toLocaleString()} TND</div>
                    <div className="text-xs text-gray-500">revenue</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Performance overview for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-600">Units Sold</div>
                <div className="text-xs text-green-600">+12% vs last month</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
                <div className="text-xs text-green-600">+3% improvement</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm text-gray-600">New Customers</div>
                <div className="text-xs text-green-600">+8% growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BrandDashboard;
