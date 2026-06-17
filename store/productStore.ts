import { create } from 'zustand';
import { FilterState, SortOption, Product } from '../types';
import { supabase } from '../services/supabase';

interface ProductStoreState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
  sortBy: SortOption;
  viewMode: 'grid' | 'list';
  searchQuery: string;
  
  fetchProducts: () => Promise<void>;
  setFilter: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
  setSortBy: (sort: SortOption) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchQuery: (query: string) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  priceRange: [0, 100000],
  materials: [],
};

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  filters: defaultFilters,
  sortBy: 'newest',
  viewMode: 'grid',
  searchQuery: '',
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
        
      if (error) throw error;
      
      set({ products: data as Product[], isLoading: false });
    } catch (error: any) {
      console.error('Error fetching products:', error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  setFilter: (key, value) => 
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
    
  clearFilters: () => set({ filters: defaultFilters, searchQuery: '' }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
