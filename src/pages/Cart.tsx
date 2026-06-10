import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/UI";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { LazyImage } from "../components/common/LazyImage";

export function Cart() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "CARBON10") {
      setPromoApplied(true);
    }
  };

  const subtotal = getSubtotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="pt-[140px] pb-24 min-h-[70vh] bg-white flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-[#F9F9F9] rounded-full flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h2 className="font-['Cormorant_Garamond'] text-4xl mb-4">Your Cart is Empty</h2>
        <p className="font-['Jost'] text-[#6B6B6B] mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our collection of premium carbon fiber accessories.</p>
        <Button href="/shop">Explore Collection</Button>
      </div>
    );
  }

  return (
    <div className="pt-[100px] md:pt-[140px] pb-24 bg-white min-h-screen">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-[44px] mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-6 border-b border-[#E8E8E8] pb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F9F9F9] shrink-0">
                  <LazyImage src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-['IBM_Plex_Mono'] text-xs text-[#A8A8A8] uppercase mb-1">
                        {item.product.category}
                      </div>
                      <Link to={`/product/${item.product.id}`} className="font-['Jost'] text-lg md:text-xl text-[#1A1A1A] hover:text-[#6B6B6B] transition-colors">
                        {item.product.name}
                      </Link>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-[#6B6B6B] hover:text-[#C0392B] transition-colors p-1"
                    >
                      <X size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-[#E8E8E8] bg-[#F9F9F9] h-10">
                      <button 
                        className="w-10 h-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus size={14} />
                      </button>
                      <div className="w-10 h-full flex items-center justify-center font-['IBM_Plex_Mono'] text-sm">
                        {item.quantity}
                      </div>
                      <button 
                        className="w-10 h-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="font-['IBM_Plex_Mono'] text-[#1A1A1A]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F9F9] p-8 border border-[#E8E8E8] sticky top-[120px]">
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-6">Order Summary</h3>
              
              <div className="flex flex-col gap-4 font-['Jost'] text-sm mb-6 pb-6 border-b border-[#E8E8E8]">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span className="font-['IBM_Plex_Mono']">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">GST (18%)</span>
                  <span className="font-['IBM_Plex_Mono']">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span className="text-[#1A1A1A] uppercase text-xs tracking-wider">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-['Jost'] font-medium">Total</span>
                <span className="font-['IBM_Plex_Mono'] text-2xl">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="w-full border border-[#E8E8E8] bg-white px-4 py-3 font-['IBM_Plex_Mono'] text-sm outline-none focus:border-[#1A1A1A]"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]">
                  <ArrowRight size={18} />
                </button>
              </div>

              <Button href="/checkout" className="w-full flex justify-between items-center group">
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6B6B6B] font-['Jost']">
                <Tag size={12} /> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
