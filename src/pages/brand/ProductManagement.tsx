
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, Star, TrendingUp } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types/marketplace';

const BrandProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Supplements' as 'Supplements' | 'Equipment',
    image: '',
    features: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Supplements',
      image: '',
      features: ''
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: formData.name,
      brand: 'Your Brand',
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
      rating: 0,
      reviews: 0,
      category: formData.category,
      description: formData.description,
      inStock: true,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    setProducts(prev => [...prev, newProduct]);
    resetForm();
    setIsAddDialogOpen(false);

    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your catalog.`
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.name || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      description: formData.description,
      image: formData.image || editingProduct.image,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
    resetForm();
    setEditingProduct(null);
    setIsEditDialogOpen(false);

    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated.`
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Product Deleted",
        description: `${product.name} has been removed from your catalog.`,
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      image: product.image,
      features: product.features.join(', ')
    });
    setIsEditDialogOpen(true);
  };

  const supplementsCount = products.filter(p => p.category === 'Supplements').length;
  const equipmentCount = products.filter(p => p.category === 'Equipment').length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.reviews), 0);

  return (
    <DashboardLayout role="brand">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-gray-600">Manage your fitness products and inventory</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to your catalog</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value: 'Supplements' | 'Equipment') => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supplements">Supplements</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (TND) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (TND)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Product description"
                  />
                </div>
                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="High quality, Fast delivery, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="bg-orange-600 hover:bg-orange-700">
                  Add Product
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
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supplements</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplementsCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{equipmentCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(0)} TND</div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className="absolute top-2 left-2"
                  variant={product.category === 'Supplements' ? 'default' : 'secondary'}
                >
                  {product.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
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

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-orange-600">{product.price} TND</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice} TND</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(product)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={formData.category} onValueChange={(value: 'Supplements' | 'Equipment') => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price (TND) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-originalPrice">Original Price (TND)</Label>
                  <Input
                    id="edit-originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Product description"
                />
              </div>
              <div>
                <Label htmlFor="edit-features">Features (comma-separated)</Label>
                <Input
                  id="edit-features"
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="High quality, Fast delivery, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="bg-orange-600 hover:bg-orange-700">
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BrandProductManagement;
