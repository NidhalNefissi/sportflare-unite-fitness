
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: 'Supplements' | 'Equipment' | 'Apparel' | 'Accessories';
  description: string;
  inStock: boolean;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
  paymentMethod: string;
}
