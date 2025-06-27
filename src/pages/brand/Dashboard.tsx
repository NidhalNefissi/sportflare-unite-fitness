
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Package, TrendingUp, Star, Plus, ShoppingCart, Percent, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BrandDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [brandStats] = useState({
    totalProducts: 48,
    monthlyRevenue: 12450,
    totalOrders: 234,
    averageRating: 4.6
  });

  const [topProducts] = useState([
    { 
      id: '1',
      name: 'Whey Protein Pro',
      category: 'Supplements',
      sales: 45,
      revenue: 2250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop'
    },
    { 
      id: '2',
      name: 'Resistance Bands Set',
      category: 'Equipment',
      sales: 32,
      revenue: 1600,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
    },
    { 
      id: '3',
      name: 'Pre-Workout Energy',
      category: 'Supplements',
      sales: 28,
      revenue: 1400,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop'
    }
  ]);

  const [activePromotions] = useState([
    {
      id: '1',
      name: 'Summer Sale',
      discount: 25,
      products: 12,
      endsAt: '2024-07-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Protein Bundle',
      discount: 15,
      products: 3,
      endsAt: '2024-07-30',
      status: 'active'
    }
  ]);

  const [recentOrders] = useState([
    { id: '1', customer: 'Ahmed Ben Ali', product: 'Whey Protein Pro', amount: 50, time: '2 hours ago', status: 'delivered' },
    { id: '2', customer: 'Fatma Trabelsi', product: 'Resistance Bands Set', amount: 45, time: '4 hours ago', status: 'shipped' },
    { id: '3', customer: 'Mohamed Kassem', product: 'Pre-Workout Energy', amount: 35, time: '6 hours ago', status: 'processing' },
  ]);

  return (
    <DashboardLayout role="brand">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-orange-100">SportFlare Brand Partner • Manage your products and sales</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/brand/product-management')}
            className="h-16 bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-3"
          >
            <Package className="w-6 h-6" />
            <span className="text-lg">Products</span>
          </Button>
          <Button 
            onClick={() => navigate('/brand/promotions')}
            className="h-16 bg-red-600 hover:bg-red-700 flex items-center justify-center gap-3"
          >
            <Percent className="w-6 h-6" />
            <span className="text-lg">Promotions</span>
          </Button>
          <Button 
            onClick={() => navigate('/brand/analytics')}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-lg">Analytics</span>
          </Button>
          <Button 
            onClick={() => navigate('/brand/orders')}
            className="h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-lg">Orders</span>
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
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.monthlyRevenue.toLocaleString()} TND</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandStats.averageRating}</div>
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
                    <Star className="w-5 h-5 text-yellow-600" />
                    Top Products
                  </CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => navigate('/brand/product-management')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{product.sales} sales</span>
                      <span className="font-medium text-green-600">{product.revenue} TND</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
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
                    <Percent className="w-5 h-5 text-red-600" />
                    Active Promotions
                  </CardTitle>
                  <CardDescription>Current sales and campaigns</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/brand/promotions')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activePromotions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No active promotions</p>
              ) : (
                activePromotions.map((promotion) => (
                  <div key={promotion.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{promotion.name}</h4>
                      <Badge className="bg-red-100 text-red-800">
                        {promotion.discount}% OFF
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{promotion.products} products included</p>
                      <p>Ends: {new Date(promotion.endsAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product} • {order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{order.amount} TND</span>
                    <Badge 
                      variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      className={
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
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
