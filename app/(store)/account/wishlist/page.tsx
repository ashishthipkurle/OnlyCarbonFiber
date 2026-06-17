"use client";

import React from "react";
import { SEO } from '@/components/common/SEO';
import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/UI';

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <div className="pt-[100px] md:pt-[140px] bg-white min-h-screen pb-24">
      <SEO title="My Wishlist" />
      
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-8">My Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#F9F9F9] border border-[#E8E8E8]">
            <h2 className="font-['Jost'] text-xl mb-4">Your wishlist is empty</h2>
            <p className="font-['Jost'] text-[#6B6B6B] mb-8">Save items you love here and review them anytime.</p>
            <Button href="/shop">Explore Collection</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
