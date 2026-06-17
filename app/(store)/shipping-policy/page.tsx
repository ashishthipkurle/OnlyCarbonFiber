"use client";

import React from "react";
import { SEO } from '@/components/common/SEO';
import { SectionReveal } from '@/components/ui/GSAPWrappers';

export default function ShippingPolicy() {
  return (
    <div className="pt-[100px] md:pt-[140px] bg-white min-h-screen pb-24">
      <SEO title="Shipping & Returns" />
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl mb-12 text-center">Shipping & Returns</h1>
        
        <div className="space-y-12 font-['Jost'] text-[#6B6B6B] leading-relaxed">
          <SectionReveal>
            <h2 className="font-['Jost'] text-xl text-[#1A1A1A] font-medium mb-4">1. Order Processing</h2>
            <p className="mb-4">
              All our carbon fiber products undergo a strict quality control process before dispatch. In-stock items are typically processed within 1-2 business days.
            </p>
            <p>
              Custom orders, forged carbon items, and specific automotive parts may require additional manufacturing time. You will be notified of the estimated timeline at checkout.
            </p>
          </SectionReveal>

          <SectionReveal>
            <h2 className="font-['Jost'] text-xl text-[#1A1A1A] font-medium mb-4">2. Domestic Shipping (India)</h2>
            <p className="mb-4">
              We offer express shipping across India via premium courier partners (BlueDart, Delhivery). Delivery typically takes 2-5 business days depending on your location.
            </p>
            <p>
              Orders above ₹10,000 qualify for free express shipping. A flat rate of ₹500 applies to orders below this threshold.
            </p>
          </SectionReveal>

          <SectionReveal>
            <h2 className="font-['Jost'] text-xl text-[#1A1A1A] font-medium mb-4">3. Returns & Exchanges</h2>
            <p className="mb-4">
              We stand by the quality of our craftsmanship. If you are not entirely satisfied with your purchase, we accept returns within 14 days of delivery for a full refund (excluding shipping costs).
            </p>
            <p>
              Items must be unused, in their original condition, and with all packaging intact. Automotive parts that have been mounted or installed cannot be returned.
            </p>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
