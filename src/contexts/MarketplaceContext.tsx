
import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, Order } from '@/types/marketplace';
import { mockProducts } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface MarketplaceContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (paymentMethod: string) => Promise<boolean>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { product, quantity }];
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async (paymentMethod: string): Promise<boolean> => {
    try {
      if (cart.length === 0) {
        toast({
          title: "Empty Cart",
          description: "Your cart is empty.",
          variant: "destructive",
        });
        return false;
      }

      const total = getCartTotal();
      const newOrder: Order = {
        id: Date.now().toString(),
        items: [...cart],
        total,
        status: 'pending',
        orderDate: new Date().toISOString(),
        paymentMethod
      };

      setOrders(prev => [...prev, newOrder]);
      clearCart();

      toast({
        title: "Order Placed!",
        description: `Your order of ${total.toFixed(2)} TND has been placed successfully.`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "Unable to process your order. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      checkout,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
