import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionReveal } from "../components/ui/GSAPWrappers";
import { ProductCard } from "../components/ui/ProductCard";
import { PRODUCTS } from "../utils/mockData";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useProductStore } from "../store/productStore";
import { SEO } from "../components/common/SEO";

const CATEGORIES = ["All", "Lifestyle", "Auto", "Apparel"];

export function Marketplace() {
  const [activeTab, setActiveTab] = useState(0);
  const tabPillRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const mobileFilterRef = useRef<HTMLDivElement>(null);
  
  const { filters, sortBy, setFilter, setSortBy, clearFilters } = useProductStore();

  // GSAP Tab Pill sliding animation
  useGSAP(() => {
    if (!tabPillRef.current || !tabsContainerRef.current) return;
    
    const tabs = tabsContainerRef.current.querySelectorAll('.tab-btn');
    const activeBtn = tabs[activeTab] as HTMLElement;
    
    if (activeBtn) {
      gsap.to(tabPillRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, [activeTab]);

  // GSAP Mobile Filter Drawer
  useGSAP(() => {
    if (!mobileFilterRef.current) return;
    
    if (isMobileFilterOpen) {
      gsap.to(mobileFilterRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    } else {
      gsap.to(mobileFilterRef.current, {
        y: "100%",
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isMobileFilterOpen]);

  // Derive filtered and sorted products
  const displayProducts = React.useMemo(() => {
    let result = [...PRODUCTS];
    
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [filters, sortBy]);

  return (
    <div className="pt-[100px] pb-24 min-h-screen bg-white">
      <SEO title="Shop Collection" />
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Header & Controls */}
        <div className="mb-12">
          <h1 className="font-['Cormorant_Garamond'] text-[44px] mb-8">The Collection</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#E8E8E8] pb-6">
            
            {/* GSAP Animated Tab Toggle */}
            <div className="relative flex items-center bg-[#F4F4F4] p-1 rounded-sm" ref={tabsContainerRef}>
              <div 
                ref={tabPillRef} 
                className="absolute top-1 left-1 bottom-1 bg-white shadow-sm rounded-sm z-0 pointer-events-none"
                style={{ width: '60px' }} // Initial mock width
              />
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  className={`tab-btn relative z-10 px-6 py-2 text-sm font-['Jost'] transition-colors ${activeTab === i ? 'text-[#1A1A1A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
                  onClick={() => {
                    setActiveTab(i);
                    setFilter('category', cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                className="md:hidden flex items-center gap-2 text-sm font-['Jost'] text-[#1A1A1A] border border-[#E8E8E8] px-4 py-2 w-full justify-center"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm font-['Jost'] text-[#6B6B6B]">
                Sort by: 
                <select 
                  className="text-[#1A1A1A] bg-transparent outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebarContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.category !== 'All' && (
                <span className="inline-flex items-center gap-2 bg-[#F9F9F9] border border-[#E8E8E8] px-3 py-1 text-xs font-['Jost'] text-[#1A1A1A]">
                  Category: {filters.category} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => { setFilter('category', 'All'); setActiveTab(0); }} />
                </span>
              )}
            </div>

            {displayProducts.length > 0 ? (
              <SectionReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </SectionReveal>
            ) : (
              <div className="py-20 text-center text-[#6B6B6B] font-['Jost']">
                No products found matching your filters.
                <button className="block mx-auto mt-4 underline text-[#1A1A1A]" onClick={clearFilters}>Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileFilterOpen(false)}
      >
        <div 
          ref={mobileFilterRef}
          className="absolute bottom-0 left-0 w-full bg-white rounded-t-xl p-6 h-[80vh] flex flex-col"
          onClick={e => e.stopPropagation()}
          style={{ transform: "translateY(100%)" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-['Cormorant_Garamond'] text-2xl">Filters</h3>
            <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto pb-20">
            <FilterSidebarContent />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[#E8E8E8] bg-white">
            <button 
              className="w-full bg-[#1A1A1A] text-white py-3 font-['Jost']"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function FilterSidebarContent() {
  return (
    <div className="space-y-8 font-['Jost']">
      <div>
        <h4 className="font-medium text-[#1A1A1A] mb-4 flex justify-between items-center cursor-pointer">
          Category <ChevronDown size={16} />
        </h4>
        <ul className="space-y-3 text-sm text-[#6B6B6B]">
          {["Wallets (12)", "Phone Cases (8)", "Spoilers (4)", "Interior Trim (15)"].map(item => (
            <li key={item} className="flex items-center gap-3">
              <input type="checkbox" className="accent-[#1A1A1A]" /> <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-[#1A1A1A] mb-4 flex justify-between items-center cursor-pointer">
          Weave Type <ChevronDown size={16} />
        </h4>
        <ul className="space-y-3 text-sm text-[#6B6B6B]">
          {["3K Twill", "Forged", "Aramid", "Honeycomb"].map(item => (
            <li key={item} className="flex items-center gap-3">
              <input type="checkbox" className="accent-[#1A1A1A]" /> <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-[#1A1A1A] mb-4 flex justify-between items-center cursor-pointer">
          Price Range <ChevronDown size={16} />
        </h4>
        <div className="pt-2">
          {/* Simple mock slider */}
          <div className="h-1 bg-[#E8E8E8] w-full relative mb-4">
            <div className="absolute left-[20%] right-[30%] h-full bg-[#1A1A1A]"></div>
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#1A1A1A] rounded-full"></div>
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#1A1A1A] rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs text-[#6B6B6B] font-['IBM_Plex_Mono']">
            <span>₹2,000</span>
            <span>₹50,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
