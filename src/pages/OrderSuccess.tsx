import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../components/ui/UI";
import { useSearchParams } from "react-router";

export function OrderSuccess() {
  const checkCircleRef = useRef<SVGCircleElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || "OCF-8492-X9";
  
  // Calculate delivery date (10 days from now)
  const [deliveryDate, setDeliveryDate] = useState("");
  
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    setDeliveryDate(date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  useGSAP(() => {
    if (!checkCircleRef.current || !checkPathRef.current || !containerRef.current) return;

    // Reset styles
    gsap.set([checkCircleRef.current, checkPathRef.current], { 
      strokeDasharray: 200, 
      strokeDashoffset: 200,
      opacity: 1
    });

    const tl = gsap.timeline();

    // Fade up container elements slightly later
    gsap.from(containerRef.current.children, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out"
    });

    // Draw Circle
    tl.to(checkCircleRef.current, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Draw Checkmark
    .to(checkPathRef.current, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")
    // Fill circle with color
    .to(checkCircleRef.current, {
      fill: "#2D7A4F",
      stroke: "#2D7A4F",
      duration: 0.3
    })
    .to(checkPathRef.current, {
      stroke: "#FFFFFF",
      duration: 0.1
    }, "<");

  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center pt-[100px] pb-24 bg-white px-6">
      
      <div className="mb-8">
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
          <circle 
            ref={checkCircleRef}
            cx="50" cy="50" r="30" 
            stroke="#1A1A1A" 
            strokeWidth="4" 
            fill="none" 
          />
          <path 
            ref={checkPathRef}
            d="M38 52 L46 60 L64 40" 
            stroke="#1A1A1A" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="rotate-90 origin-center"
          />
        </svg>
      </div>

      <div ref={containerRef} className="text-center max-w-md">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-4">Order Confirmed.</h1>
        <p className="font-['Jost'] text-[#6B6B6B] mb-8">
          Your allocation has been secured. We will notify you when the forging process is complete and your item is ready for dispatch.
        </p>

        <div className="bg-[#F9F9F9] border border-[#E8E8E8] p-6 mb-8 flex flex-col items-center gap-4">
          <div>
            <span className="font-['Jost'] text-xs text-[#6B6B6B] uppercase tracking-widest block mb-1">Order Identifier</span>
            <span className="font-['IBM_Plex_Mono'] text-xl text-[#1A1A1A] font-semibold">{orderId}</span>
          </div>
          <div className="w-full border-t border-[#E8E8E8]"></div>
          <div>
            <span className="font-['Jost'] text-xs text-[#6B6B6B] uppercase tracking-widest block mb-1">Est. Delivery</span>
            <span className="font-['Jost'] text-base text-[#1A1A1A]">{deliveryDate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/orders" variant="outline" className="w-full sm:w-auto">Track Order</Button>
          <Button href="/shop" className="w-full sm:w-auto">Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}
