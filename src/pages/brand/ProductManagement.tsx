
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, Star, TrendingUp, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Supplements' | 'Equipment';
  image: string;
  rating: number;
  sales: number;
  stock: number;
  features: string[];
  brand: string;
  status: 'active' | 'inactive' | 'out_of_stock';
}

const BrandProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Whey Protein Pro',
      description: 'Premium whey protein powder for muscle building and recovery.',
      price: 89.99,
      originalPrice: 109.99,
      category: 'Supplements',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
      rating: 4.8,
      sales: 145,
      stock: 50,
      features: ['25g Protein', 'Fast Absorption', 'Multiple Flavors'],
      brand: 'FitNutrition',
      status: 'active'
    },
    {
      id: '2',
      name: 'Resistance Bands Set',
      description: 'Complete set of resistance bands for strength training at home.',
      price: 49.99,
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      rating: 4.6,
      sales: 89,
      stock: 25,
      features: ['5 Resistance Levels', 'Portable', 'Door Anchor Included'],
      brand: 'HomeFit',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pre-Workout Energy',
      description: 'High-performance pre-workout supplement for maximum energy.',
      price: 69.99,
      originalPrice: 79.99,
      category: 'Supplements',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
      rating: 4.5,
      sales: 67,
      stock: 0,
      features: ['200mg Caffeine', 'Beta-Alanine', 'Citrulline Malate'],
      brand: 'EnergyBoost',
      status: 'out_of_stock'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: 'Supplements' as const,
    features: '',
    brand: '',
    stock: 0,
    image: ''
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: editingProduct?.id || Date.now().toString(),
      ...newProduct,
      rating: editingProduct?.rating || 0,
      sales: editingProduct?.sales || 0,
      features: newProduct.features.split(',').map(f => f.trim()).filter(f => f),
      status: newProduct.stock > 0 ? 'active' : 'out_of_stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? product : p));
      toast({
        title: "Product Updated",
        description: `${newProduct.name} has been updated successfully.`
      });
    } else {
      setProducts(prev => [...prev, product]);
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added to your catalog.`
      });
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      features: product.features.join(', '),
      brand: product.brand,
      stock: product.stock,
      image: product.image
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from your catalog."
    });
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: 'Supplements',
      features: '',
      brand: '',
      stock: 0,
      image: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Supplements': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalProducts = products.length;
  const supplementsCount = products.filter(p => p.category === 'Supplements').length;
  const equipmentCount = products.filter(p => p.category === 'Equipment').length;

  return (
    <DashboardLayout role="brand">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-gray-600">Manage your fitness products and inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  setEditingProduct(null);
                  resetForm();
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct 
                    ? 'Update your existing product details.' 
                    : 'Add a new product to your catalog.'
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Whey Protein Pro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="e.g., FitNutrition"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed product description"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price (TND)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (TND)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supplements">Supplements</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/product-image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={newProduct.features}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="e.g., 25g Protein, Fast Absorption, Multiple Flavors"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="bg-orange-600 hover:bg-orange-700">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supplements</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplementsCount}</div>
              <p className="text-xs text-muted-foreground">Supplement products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{equipmentCount}</div>
              <p className="text-xs text-muted-foreground">Equipment products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} TND</div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Products ({totalProducts})
              </Button>
              <Button
                variant={selectedCategory === 'Supplements' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Supplements')}
                size="sm"
              >
                Supplements ({supplementsCount})
              </Button>
              <Button
                variant={selectedCategory === 'Equipment' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Equipment')}
                size="sm"
              >
                Equipment ({equipmentCount})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="mt-1">{product.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">{product.price} TND</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice} TND</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getCategoryColor(product.category)}>
                    {product.category}
                  </Badge>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status === 'out_of_stock' ? 'Out of Stock' : product.status}
                  </Badge>
                  <Badge variant="outline">{product.brand}</Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t">
                  <span>{product.sales} sold</span>
                  <span>Stock: {product.stock}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? 'Create your first product to start selling' 
                  : `No ${selectedCategory.toLowerCase()} products found`
                }
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BrandProductManagement;
