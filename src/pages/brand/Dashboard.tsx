import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Star, TrendingUp, Plus, Package, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrandDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const brandStats = {
    totalProducts: 47,
    monthlyOrders: 234,
    monthlyRevenue: 8750,
    rating: 4.6
  };

  const topProducts = [
    { 
      name: 'Protein Powder Premium', 
      category: 'Supplements',
      sales: 89, 
      revenue: 2670, 
      rating: 4.8,
      stock: 156
    },
    { 
      name: 'Resistance Bands Set', 
      category: 'Equipment',
      sales: 67, 
      revenue: 1340, 
      rating: 4.7,
      stock: 89
    },
    { 
      name: 'Yoga Mat Pro', 
      category: 'Equipment',
      sales: 45, 
      revenue: 1125, 
      rating: 4.9,
      stock: 12
    },
  ];

  const recentOrders = [
    { customer: 'Sarah Wilson', product: 'Protein Powder', amount: 29.99, status: 'shipped', time: '2 hours ago' },
    { customer: 'Mike Jones', product: 'Resistance Bands', amount: 19.99, status: 'processing', time: '4 hours ago' },
    { customer: 'Emma Davis', product: 'Yoga Mat Pro', amount: 24.99, status: 'delivered', time: '6 hours ago' },
  ];

  const promotions = [
    { name: 'New Year Sale', discount: '25%', products: 12, expires: '3 days', active: true },
    { name: 'Protein Bundle', discount: '15%', products: 3, expires: '1 week', active: true },
    { name: 'Equipment Clearance', discount: '40%', products: 8, expires: 'Ended', active: false },
  ];

  return (
    <DashboardLayout role="brand">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-orange-100">Manage your fitness products and reach more customers</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/brand/product-management')}
            className="h-16 bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-3"
          >
            <Package className="w-6 h-6" />
            <span className="text-lg">Manage Products</span>
          </Button>
          <Button 
            className="h-16 bg-red-600 hover:bg-red-700 flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-lg">Sales Analytics</span>
          </Button>
          <Button 
            className="h-16 bg-pink-600 hover:bg-pink-700 flex items-center justify-center gap-3"
          >
            <Star className="w-6 h-6" />
            <span className="text-lg">Promotions</span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.monthlyOrders}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${brandStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Brand Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.rating}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Top Products
                  </CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <Badge 
                        variant={product.stock < 20 ? 'destructive' : 'secondary'}
                      >
                        {product.stock} in stock
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{product.sales} sold</span>
                    <span className="font-medium text-green-700">${product.revenue}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Promotions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Promotions
                  </CardTitle>
                  <CardDescription>Active sales and campaigns</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {promotions.map((promo, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  promo.active 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{promo.name}</h4>
                    <Badge 
                      variant={promo.active ? 'default' : 'secondary'}
                      className={promo.active ? 'bg-green-100 text-green-800' : ''}
                    >
                      {promo.active ? 'Active' : 'Ended'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{promo.discount} off • {promo.products} products</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {promo.expires}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product} • {order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">${order.amount}</span>
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'default' : 
                        order.status === 'shipped' ? 'secondary' : 'outline'
                      }
                      className={
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''
                      }
                    >
                      {order.status}
                    </Badge>
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

export default BrandDashboard;
