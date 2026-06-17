"use client";

import React from "react";
import { SEO } from '@/components/common/SEO';
import { SectionReveal } from '@/components/ui/GSAPWrappers';
import { LazyImage } from '@/components/common/LazyImage';

export default function About() {
  return (
    <div className="pt-[100px] bg-white min-h-screen">
      <SEO title="Our Philosophy" />
      
      {/* Header */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 mb-20 text-center">
        <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl mb-6">Our Philosophy</h1>
        <p className="font-['Jost'] text-[#6B6B6B] max-w-2xl mx-auto text-lg">
          We don't just use carbon fiber; we engineer it. From the weave selection to the final curing process, every step is calculated for perfection.
        </p>
      </div>

      {/* Image Parallax */}
      <SectionReveal className="h-[60vh] md:h-[80vh] w-full relative mb-24 overflow-hidden">
        <LazyImage 
          src="https://images.unsplash.com/photo-1637004732258-4b792ce8f474?auto=format&fit=crop&q=80&w=2000" 
          alt="Carbon Fiber Production" 
          className="w-full h-full object-cover scale-110" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-['Cormorant_Garamond'] text-4xl md:text-6xl text-center px-4 max-w-4xl">
            Precision isn't an accident. It's an obsession.
          </h2>
        </div>
      </SectionReveal>

      {/* Process Section */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div className="aspect-[3/4] bg-[#F9F9F9]">
              <LazyImage 
                src="https://images.unsplash.com/photo-1598453303642-1e96a233513d?auto=format&fit=crop&q=80&w=800" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover" 
              />
            </div>
          </SectionReveal>
          
          <SectionReveal delay={0.2}>
            <div className="font-['IBM_Plex_Mono'] text-[#A8A8A8] text-sm uppercase tracking-widest mb-4">01 / The Material</div>
            <h3 className="font-['Cormorant_Garamond'] text-4xl mb-6">Aerospace Grade.</h3>
            <p className="font-['Jost'] text-[#6B6B6B] leading-relaxed mb-6">
              Not all carbon fiber is created equal. We exclusively source aerospace-grade pre-preg carbon fiber, ensuring maximum tensile strength and the lowest possible weight.
            </p>
            <p className="font-['Jost'] text-[#6B6B6B] leading-relaxed">
              This is the same material used in modern Formula 1 cars and hypercars. It requires specialized cold storage and autoclave curing, but the result is uncompromising quality.
            </p>
          </SectionReveal>
        </div>
      </div>
      
      {/* Forged Section */}
      <div className="bg-[#1A1A1A] text-white py-24 mb-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SectionReveal className="order-2 md:order-1">
              <div className="font-['IBM_Plex_Mono'] text-[#A8A8A8] text-sm uppercase tracking-widest mb-4">02 / The Innovation</div>
              <h3 className="font-['Cormorant_Garamond'] text-4xl mb-6">Forged Composite.</h3>
              <p className="font-['Jost'] text-[#A8A8A8] leading-relaxed mb-6">
                Pioneered by Lamborghini and Callaway, forged composite involves compressing chopped carbon fibers under immense pressure.
              </p>
              <p className="font-['Jost'] text-[#A8A8A8] leading-relaxed">
                The result is a unique, marbled aesthetic where no two pieces are exactly alike, offering multidirectional strength that traditional weaves cannot match.
              </p>
            </SectionReveal>
            
            <SectionReveal delay={0.2} className="order-1 md:order-2">
              <div className="aspect-[3/4] bg-[#222]">
                <LazyImage 
                  src="https://images.unsplash.com/photo-1590740051939-2ceee281179a?auto=format&fit=crop&q=80&w=800" 
                  alt="Forged Carbon" 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80" 
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

    </div>
  );
}
