export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percentage?: number;
  category: 'Lifestyle' | 'Auto' | 'Accessories';
  subcategory?: string;
  image: string;
  images?: string[];
  stock_quantity?: number;
  rating?: number;
  review_count?: number;
  specs: string[];
  created_at?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: Address | any;
  payment_id?: string;
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  items?: OrderItem[];
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful_count: number;
  created_at: string;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  materials: string[];
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';
