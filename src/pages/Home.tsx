import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionReveal, AnimatedText, Marquee, CounterNumber } from "../components/ui/GSAPWrappers";
import { Button } from "../components/ui/UI";
import { ProductCard } from "../components/ui/ProductCard";
import { PRODUCTS } from "../utils/mockData";
import { Link } from "react-router";
import { ArrowDown, Star, Instagram } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { LazyImage } from "../components/common/LazyImage";

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  // Hero staggered entrance
  useGSAP(() => {
    if (!heroRef.current) return;

    // Eyebrow -> Subtext -> CTAs (Headline handled by AnimatedText)
    gsap.from(".hero-stagger", {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    // Image reveal
    gsap.from(".hero-img", {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, { scope: heroRef });

  // Process timeline stagger
  useGSAP(() => {
    if (!processRef.current) return;

    gsap.from(".process-step", {
      opacity: 0,
      y: 40,
      stagger: 0.3,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 70%",
      }
    });
  }, { scope: processRef });

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="OnlyCarbonFiber — Premium Carbon Fiber Products"
        description="Experience the pinnacle of composite engineering with our premium carbon fiber lifestyle accessories and automotive components."
      />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative flex items-start pt-[140px] pb-[80px] overflow-hidden bg-[#1A1A1A] text-white">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="https://images.unsplash.com/photo-1637004732258-4b792ce8f474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhcmJvbiUyMGZpYmVyJTIwdGV4dHVyZXxlbnwxfHx8fDE3ODA2ODE0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Carbon Fiber Texture"
            className="hero-img w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="max-w-[1320px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="flex flex-col justify-center max-w-2xl">
            <span className="hero-stagger font-['IBM_Plex_Mono'] text-sm tracking-[0.2em] text-[#A8A8A8] uppercase mb-6 block">
              Engineered for the Elite
            </span>

            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-[88px] leading-[0.9] font-semibold tracking-[-0.02em] mb-8">
              <AnimatedText text="Strength in" delay={0.2} /><br />
              <AnimatedText text="Stillness." delay={0.6} />
            </h1>

            <p className="hero-stagger font-['Jost'] text-lg md:text-xl text-[#F4F4F4] font-light max-w-md mb-10 leading-relaxed">
              Quiet luxury meets aerospace precision. Uncompromising carbon fiber lifestyle accessories and automotive components.
            </p>

            <div className="hero-stagger flex flex-wrap gap-4">
              <Button href="/shop" variant="secondary" size="lg">Explore Collection</Button>
              <Button href="/about" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1A1A1A]">Our Process</Button>
            </div>
          </div>
        </div>

        <div className="hero-stagger absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A8A8A8]">
          <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee>
        <div className="flex items-center gap-12 px-6 font-['IBM_Plex_Mono'] text-sm text-[#A8A8A8] uppercase tracking-widest">
          <span>100% Genuine Carbon Fiber</span>
          <span className="text-[#333]">•</span>
          <span>Aerospace Grade</span>
          <span className="text-[#333]">•</span>
          <span>Precision Engineered</span>
          <span className="text-[#333]">•</span>
          <span>Lifetime Warranty</span>
          <span className="text-[#333]">•</span>
        </div>
      </Marquee>

      {/* STATS BAR */}
      <SectionReveal className="border-b border-[#E8E8E8] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[#E8E8E8]">
          {[
            { label: "Tensile Strength", val: 500, suffix: " MPa" },
            { label: "Weave Patterns", val: 4, suffix: "" },
            { label: "Weight Reduction", val: 40, suffix: "%" },
            { label: "Precision Tolerance", val: 0.1, suffix: " mm" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <div className="text-3xl md:text-4xl text-[#1A1A1A] mb-2">
                <CounterNumber endValue={stat.val} suffix={stat.suffix} />
              </div>
              <div className="font-['Jost'] text-xs text-[#6B6B6B] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* CATEGORY SHOWCASE */}
      <SectionReveal>
        <div className="w-full flex flex-col md:flex-row h-auto md:h-[560px]">
          <div className="relative flex-1 overflow-hidden h-[400px] md:h-full bg-[#f0efed] group">
            <LazyImage 
              src="https://storage.googleapis.com/banani-generated-images/generated-images/f677a05d-fa58-4b5a-b9c6-3db30aea262e.jpg" 
              alt="Lifestyle & Ornaments"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(240, 239, 237, 0.96) 0%, rgba(240, 239, 237, 0.6) 60%, transparent 100%)' }}></div>
            <div className="absolute bottom-0 left-0 p-10">
              <div className="font-['Jost'] text-[#6B6B6B] uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '2px' }}>
                LIFESTYLE & ORNAMENTS
              </div>
              <div className="font-['Cormorant_Garamond'] text-[#1A1A1A]" style={{ fontSize: '28px', fontWeight: 500, marginTop: '8px' }}>
                Starting ₹499
              </div>
              <Link to="/shop?category=lifestyle" className="font-['Jost'] text-[#1A1A1A] flex items-center gap-2 mt-4 hover:opacity-70 transition-opacity" style={{ fontSize: '14px', fontWeight: 500 }}>
                EXPLORE<span style={{ marginLeft: '4px' }}>→</span>
              </Link>
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden h-[400px] md:h-full bg-[#ebebea] group">
            <LazyImage 
              src="https://storage.googleapis.com/banani-generated-images/generated-images/2ffbe29a-1281-4e57-8767-727bb22229cb.jpg" 
              alt="Automotive Parts"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(235, 235, 234, 0.96) 0%, rgba(235, 235, 234, 0.6) 60%, transparent 100%)' }}></div>
            <div className="absolute bottom-0 left-0 p-10">
              <div className="font-['Jost'] text-[#6B6B6B] uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '2px' }}>
                AUTOMOTIVE PARTS
              </div>
              <div className="font-['Cormorant_Garamond'] text-[#1A1A1A]" style={{ fontSize: '28px', fontWeight: 500, marginTop: '8px' }}>
                Starting ₹1,499
              </div>
              <Link to="/shop?category=auto" className="font-['Jost'] text-[#1A1A1A] flex items-center gap-2 mt-4 hover:opacity-70 transition-opacity" style={{ fontSize: '14px', fontWeight: 500 }}>
                EXPLORE<span style={{ marginLeft: '4px' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* FEATURED PRODUCTS */}
      <SectionReveal className="py-[120px] bg-[#F9F9F9] border-y border-[#E8E8E8]">
        <div className="w-full px-6 md:px-[48px]">
          <div className="text-center mb-16">
            <span className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B] uppercase tracking-widest mb-4 block">Signature Collection</span>
            <h2 className="font-['Cormorant_Garamond'] text-[44px] leading-none">Featured Objects</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/shop" variant="outline">Shop The Collection</Button>
          </div>
        </div>
      </SectionReveal>

      {/* 4-STEP PROCESS */}
      <SectionReveal className="py-[120px] bg-white">
        <div className="w-full px-6 md:px-[48px]" ref={processRef}>
          <div className="max-w-2xl mb-20">
            <h2 className="font-['Cormorant_Garamond'] text-[44px] leading-none mb-6">The Forging Process</h2>
            <p className="font-['Jost'] text-[#6B6B6B] text-lg">We don't just wrap parts in carbon. We engineer them from the ground up using pre-preg aerospace methods.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[1px] bg-[#E8E8E8] z-0"></div>

            {[
              { num: "01", title: "Design & CAD", desc: "Digital precision down to the micron. Every curve is calculated for aerodynamics and aesthetics." },
              { num: "02", title: "Molding", desc: "Billet aluminum molds are CNC machined to ensure perfect fitment and dimensional accuracy." },
              { num: "03", title: "Layup & Autoclave", desc: "Pre-preg carbon is hand-laid, vacuum-bagged, and baked under high pressure for structural integrity." },
              { num: "04", title: "Hand Finishing", desc: "Multiple coats of UV-resistant clear coat, followed by exhaustive hand polishing." }
            ].map((step, i) => (
              <div key={i} className="process-step relative z-10 flex flex-col items-start bg-white pt-2">
                <div className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center font-['IBM_Plex_Mono'] text-sm mb-6 shadow-[0_0_0_8px_white]">
                  {step.num}
                </div>
                <h3 className="font-['Jost'] font-medium text-xl mb-3">{step.title}</h3>
                <p className="font-['Jost'] text-[#6B6B6B] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* TESTIMONIALS */}
      <SectionReveal className="py-[120px] bg-[#F9F9F9] border-t border-[#E8E8E8]">
        <div className="w-full px-6 md:px-[48px]">
          <div className="text-center mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-[44px] leading-none mb-4">Client Chronicles</h2>
            <p className="font-['Jost'] text-[#6B6B6B] text-lg">Don't just take our word for it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arjun S.", role: "Automotive Enthusiast", text: "The weave on the M3 spoiler is flawless. I've bought carbon parts from other brands before, but the clarity of the clear coat and the alignment here is on another level.", rating: 5 },
              { name: "Vikram R.", role: "CEO, Tech Corp", text: "My forged carbon watch box gets more compliments than the timepieces inside it. A truly premium product that feels substantial.", rating: 5 },
              { name: "Neha K.", role: "Architect", text: "The minimalist cardholder is perfectly engineered. It's incredibly light but feels indestructible. The matte finish is exactly what I was looking for.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 border border-[#E8E8E8] flex flex-col">
                <div className="flex gap-1 mb-6 text-[#B8934A]">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="font-['Jost'] text-[#1A1A1A] leading-relaxed mb-8 flex-1">"{review.text}"</p>
                <div>
                  <div className="font-['Jost'] font-medium text-sm">{review.name}</div>
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B] mt-1">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* NEWSLETTER */}
      <SectionReveal className="py-[120px] bg-[#1A1A1A] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-['Cormorant_Garamond'] text-[44px] leading-none mb-6">Join The Inner Circle</h2>
          <p className="font-['Jost'] text-[#A8A8A8] text-lg mb-10">
            Subscribe for early access to limited drops, exclusive editorial pieces, and invitations to private events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-[#333] px-6 py-4 font-['Jost'] outline-none focus:border-white transition-colors"
            />
            <Button type="submit" className="bg-white text-[#1A1A1A] hover:bg-[#E8E8E8] shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </SectionReveal>

      {/* INSTAGRAM */}
      <section className="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1616928231359-fc8b7e244c3b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1669882571612-4a9c7822cd4c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1590740051939-2ceee281179a?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=600"
          ].map((img, i) => (
            <div key={i} className="aspect-square relative group overflow-hidden bg-[#F9F9F9]">
              <LazyImage src={img} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
