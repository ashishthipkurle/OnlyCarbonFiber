import React, { useState, useRef } from "react";
import { useParams } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRODUCTS } from "../utils/mockData";
import { Button } from "../components/ui/UI";
import { SectionReveal } from "../components/ui/GSAPWrappers";
import { Star, ChevronRight, CheckCircle2, AlertCircle, Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { SEO } from "../components/common/SEO";
import { LazyImage } from "../components/common/LazyImage";

export function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItemToCart = useCartStore(state => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const galleryImageRef = useRef<HTMLImageElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [isCompatChecked, setIsCompatChecked] = useState<boolean | null>(null);

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1579014134953-1580d7f123f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjB3YWxsZXR8ZW58MXx8fHwxNzgwNjgxNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1637004732258-4b792ce8f474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhcmJvbiUyMGZpYmVyJTIwdGV4dHVyZXxlbnwxfHx8fDE3ODA2ODE0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const changeImage = (index: number) => {
    if (index === activeImage || !galleryImageRef.current) return;
    
    gsap.to(galleryImageRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setActiveImage(index);
        gsap.to(galleryImageRef.current, { opacity: 1, duration: 0.3 });
      }
    });
  };

  useGSAP(() => {
    if (!starsRef.current) return;
    const stars = starsRef.current.querySelectorAll('.review-star');
    
    gsap.fromTo(stars, 
      { color: "#E8E8E8", scale: 0.8 },
      { 
        color: "#B8934A", 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: starsRef.current,
          start: "top 90%"
        }
      }
    );
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItemToCart(product, quantity);
    window.dispatchEvent(new Event("cart-add"));
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="pt-[80px] md:pt-[120px] pb-24 bg-white relative">
      <SEO title={product.name} description={product.description} />
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-['IBM_Plex_Mono'] text-[#6B6B6B] uppercase tracking-wider mb-8">
          <span>Home</span> <ChevronRight size={12} />
          <span>{product.category}</span> <ChevronRight size={12} />
          <span className="text-[#1A1A1A] truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#F9F9F9] aspect-square flex items-center justify-center p-8 border border-[#E8E8E8]">
              <img 
                ref={galleryImageRef}
                src={images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => changeImage(i)}
                  className={`w-20 h-20 flex-shrink-0 bg-[#F9F9F9] border transition-colors ${activeImage === i ? 'border-[#1A1A1A]' : 'border-[#E8E8E8]'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-[44px] leading-tight mb-4">{product.name}</h1>
            <div className="font-['IBM_Plex_Mono'] text-2xl text-[#1A1A1A] mb-6">₹{product.price.toLocaleString('en-IN')}</div>
            
            <p className="font-['Jost'] text-[#6B6B6B] text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {product.category === "Auto" && (
              <div className="bg-[#F9F9F9] border border-[#E8E8E8] p-6 mb-8">
                <h4 className="font-['Jost'] font-medium text-[#1A1A1A] mb-4">Check Fitment</h4>
                <div className="flex gap-2">
                  <select className="flex-1 bg-white border border-[#E8E8E8] px-4 py-2 font-['Jost'] text-sm outline-none focus:border-[#1A1A1A]">
                    <option>Select Make</option>
                    <option>BMW</option>
                  </select>
                  <select className="flex-1 bg-white border border-[#E8E8E8] px-4 py-2 font-['Jost'] text-sm outline-none focus:border-[#1A1A1A]">
                    <option>Select Model</option>
                    <option>M3 G80</option>
                  </select>
                  <Button variant="outline" className="shrink-0" onClick={() => setIsCompatChecked(true)}>Verify</Button>
                </div>
                {isCompatChecked !== null && (
                  <div className={`mt-4 flex items-center gap-2 text-sm font-['Jost'] ${isCompatChecked ? 'text-[#2D7A4F]' : 'text-[#C0392B]'}`}>
                    {isCompatChecked ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {isCompatChecked ? "Confirmed Fit: 2021-2024 BMW M3 (G80)" : "Does not fit selected vehicle"}
                  </div>
                )}
              </div>
            )}

            <div className="font-['IBM_Plex_Mono'] text-sm text-[#2D7A4F] flex items-center gap-2 mb-8">
                <CheckCircle2 size={16} /> In Stock. Ready to ship.
            </div>

            <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-[#E8E8E8] bg-[#F9F9F9] h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-12 h-full flex items-center justify-center font-['IBM_Plex_Mono']">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  className="flex-1 h-12 text-sm tracking-wider uppercase" 
                  isAnimatedAdd={isAdding}
                  onClick={handleAddToCart}
                >
                  {isAdding ? "Added!" : "Add to Cart"}
                </Button>
              </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.specs.slice(0,4).map((spec, i) => {
                const [key, val] = spec.split(': ');
                return (
                  <div key={i} className="border-t border-[#E8E8E8] pt-2">
                    <div className="font-['IBM_Plex_Mono'] text-[10px] text-[#A8A8A8] uppercase">{key}</div>
                    <div className="font-['Jost'] text-sm text-[#1A1A1A]">{val}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <SectionReveal className="mt-24 border-t border-[#E8E8E8] pt-12">
          <div className="flex gap-8 mb-8 border-b border-[#E8E8E8]">
            {["Description", "Specifications", "Reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 font-['Jost'] text-lg transition-colors relative ${activeTab === tab.toLowerCase() ? 'text-[#1A1A1A]' : 'text-[#A8A8A8] hover:text-[#1A1A1A]'}`}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1A1A1A]" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === "description" && (
              <div className="max-w-3xl font-['Jost'] text-[#6B6B6B] leading-relaxed">
                <p className="mb-4">Forged in the same autoclaves used for hypercar monocoques, this piece represents the pinnacle of composite engineering. We utilize Torayca T300 carbon fiber, renowned for its optimal balance of strength and flexibility.</p>
                <p>Every piece is hand-laid by master technicians, ensuring the weave is perfectly aligned without distortion. The result is a mesmerizing depth that catches light unlike any imitation.</p>
              </div>
            )}
            
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl">
                {product.specs.map((spec, i) => {
                  const [key, val] = spec.split(': ');
                  return (
                    <div key={i} className="flex justify-between py-3 border-b border-[#E8E8E8] font-['Jost']">
                      <span className="text-[#6B6B6B]">{key}</span>
                      <span className="text-[#1A1A1A] font-medium">{val}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-['Cormorant_Garamond']">4.9</div>
                  <div>
                    <div ref={starsRef} className="flex gap-1 mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="review-star text-[#E8E8E8]" />)}
                    </div>
                    <div className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B]">Based on 42 reviews</div>
                  </div>
                </div>
                <div className="border-t border-[#E8E8E8] py-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-medium font-['Jost'] text-[#1A1A1A]">Arjun S.</div>
                      <div className="text-[#2D7A4F] text-xs font-['Jost'] flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> Verified Buyer</div>
                    </div>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#A8A8A8]">12 May 2026</span>
                  </div>
                  <p className="font-['Jost'] text-[#6B6B6B] text-sm leading-relaxed">
                    The weave on this is flawless. I've bought carbon parts from other brands before, but the clarity of the clear coat and the alignment here is on another level. Worth every rupee.
                  </p>
                </div>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#E8E8E8] p-4 pb-safe z-40 flex items-center gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex-1">
          <div className="font-['Jost'] font-medium text-sm truncate">{product.name}</div>
          <div className="font-['IBM_Plex_Mono'] text-xs">₹{product.price.toLocaleString('en-IN')}</div>
        </div>
        <Button size="sm" isAnimatedAdd onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
