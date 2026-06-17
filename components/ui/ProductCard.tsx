"use client";

import React, { useRef } from "react";
import Link from 'next/link';
;
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./UI";
import { ArrowRight, Heart } from "lucide-react";
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { PRODUCTS } from '@/utils/mockData';
import { LazyImage } from "../common/LazyImage";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isCategoryCard?: boolean;
}

export function ProductCard({ id, name, category, price, image, isCategoryCard = false }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  const addItemToCart = useCartStore(state => state.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const product = PRODUCTS.find(p => p.id === id);
    if (product) addItemToCart(product, 1);
  };
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  useGSAP(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // Hover animation setup
    const hoverTl = gsap.timeline({ paused: true });
    
    if (isCategoryCard) {
      if (arrowRef.current && imageRef.current) {
        hoverTl
          .to(card, { y: -4, duration: 0.3, ease: "power2.out" })
          .to(arrowRef.current, { x: 6, duration: 0.3, ease: "power2.out" }, 0)
          .to(imageRef.current, { filter: "brightness(1.1)", duration: 0.3 }, 0);
      }
    } else {
      if (imageRef.current && pillRef.current) {
        hoverTl
          .to(imageRef.current, { scale: 1.04, duration: 0.4, ease: "power2.out" })
          .to(pillRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0)
          .to(card, { boxShadow: "0 2px 8px rgba(0,0,0,0.06)", duration: 0.3 }, 0);
      }
    }

    const handleEnter = () => hoverTl.play();
    const handleLeave = () => hoverTl.reverse();

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [isCategoryCard]);

  if (isCategoryCard) {
    return (
      <Link href={`/shop?category=${category.toLowerCase()}`}>
        <div ref={cardRef} className="bg-[#F9F9F9] rounded-sm overflow-hidden group cursor-pointer border border-[#E8E8E8]">
          <div className="aspect-[4/5] w-full overflow-hidden relative">
            <img 
              ref={imageRef} 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white font-['Cormorant_Garamond'] text-3xl mb-2">{name}</h3>
              <div className="flex items-center text-white/80 font-['Jost'] text-sm uppercase tracking-widest gap-2">
                Explore <div ref={arrowRef}><ArrowRight size={16} /></div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div ref={cardRef} className="group relative bg-white border border-transparent transition-colors p-4 rounded-sm flex flex-col">
      <Link href={`/product/${id}`} className="relative aspect-[4/5] w-full mb-6 bg-[#F9F9F9] overflow-hidden rounded-sm flex items-center justify-center">
        <LazyImage 
          src={image} 
          alt={name} 
          className="w-[80%] h-[80%] object-cover origin-center"
        />
        
        <button 
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
        >
          <Heart size={16} fill={isWishlisted ? "#d4183d" : "none"} color={isWishlisted ? "#d4183d" : "#1A1A1A"} />
        </button>
        <div 
          ref={pillRef} 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 pointer-events-none"
        >
          <div className="bg-[#1A1A1A] text-white text-xs font-['Jost'] px-4 py-2 rounded-full uppercase tracking-wider whitespace-nowrap">
            Quick View
          </div>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-[#6B6B6B] font-['IBM_Plex_Mono'] uppercase tracking-wider mb-2">
          {category}
        </div>
        <Link href={`/product/${id}`}>
          <h3 className="font-['Jost'] font-medium text-[18px] text-[#1A1A1A] mb-2 hover:text-[#333333] transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-['IBM_Plex_Mono'] text-[#1A1A1A]">₹{price.toLocaleString('en-IN')}</span>
          <Button variant="ghost" size="sm" isAnimatedAdd onClick={handleAddToCart} className="!p-0 h-auto w-auto text-sm underline underline-offset-4 decoration-[#E8E8E8] hover:decoration-[#1A1A1A]">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
