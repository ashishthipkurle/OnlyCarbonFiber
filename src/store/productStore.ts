import { create } from 'zustand';
import { FilterState, SortOption } from '../types';

interface ProductStoreState {
  filters: FilterState;
  sortBy: SortOption;
  viewMode: 'grid' | 'list';
  searchQuery: string;
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
  filters: defaultFilters,
  sortBy: 'newest',
  viewMode: 'grid',
  searchQuery: '',
  
  setFilter: (key, value) => 
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
    
  clearFilters: () => set({ filters: defaultFilters, searchQuery: '' }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
