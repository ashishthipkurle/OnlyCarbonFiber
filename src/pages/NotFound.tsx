import React from "react";
import { SEO } from "../components/common/SEO";
import { Button } from "../components/ui/UI";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] text-white px-6 relative overflow-hidden">
      <SEO title="Page Not Found" />
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}></div>

      <div className="relative z-10 text-center max-w-lg">
        <h1 className="font-['Cormorant_Garamond'] text-8xl md:text-9xl mb-4 font-bold tracking-tighter">404</h1>
        <h2 className="font-['Jost'] text-2xl md:text-3xl mb-6 font-medium tracking-wide">Signal Lost</h2>
        <p className="font-['Jost'] text-[#A8A8A8] mb-10 leading-relaxed">
          The page you are looking for has been moved, deleted, or never existed in this dimension. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" className="bg-white text-[#1A1A1A] hover:bg-[#E8E8E8]">Return Home</Button>
          <Button href="/shop" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1A1A1A]">Browse Shop</Button>
        </div>
      </div>
    </div>
  );
}
