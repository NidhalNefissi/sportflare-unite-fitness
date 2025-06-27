
export type ProductCategory = 'Supplements' | 'Equipment' | 'Apparel' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  rating: number;
  sales: number;
  stock: number;
  features: string[];
  brand: string;
  status: 'active' | 'inactive' | 'out_of_stock';
}
