
import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Search, Filter, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Marketplace = () => {
  const { 
    products, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    getCartTotal, 
    getCartItemCount,
    checkout 
  } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartDialogOpen, setCartDialogOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory && product.inStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleCheckout = async () => {
    const success = await checkout('Flouci.tn');
    if (success) {
      setCartDialogOpen(false);
    }
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Marketplace</h1>
              <p className="text-green-100">Shop premium fitness products and supplements</p>
            </div>
            <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getCartItemCount()})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Shopping Cart</DialogTitle>
                  <DialogDescription>
                    Review your items before checkout
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-6">
                      <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-gray-600 text-xs">{item.product.price} TND each</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold text-lg">{getCartTotal().toFixed(2)} TND</span>
                        </div>
                        <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                          Checkout with Flouci.tn
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const cartQuantity = getCartItemQuantity(product.id);
            
            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      by {product.brand}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                    {product.features.length > 2 && (
                      <p className="text-xs text-gray-500">+{product.features.length - 2} more features</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">{product.price} TND</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice} TND</span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  {cartQuantity > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-medium w-12 text-center">{cartQuantity}</span>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
