"use client";

import React, { useState } from "react";
import { SEO } from '@/components/common/SEO';
import { Button } from '@/components/ui/UI';
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-[100px] md:pt-[140px] bg-[#F9F9F9] min-h-screen">
      <SEO title="Contact Us" />
      
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 pb-24">
        <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl mb-4 text-center">Get in Touch</h1>
        <p className="font-['Jost'] text-[#6B6B6B] text-center max-w-2xl mx-auto mb-16">
          Whether you have a question about our products, need assistance with fitment, or want to inquire about custom pieces, our team is ready to assist you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-[#E8E8E8] shrink-0">
                  <Mail size={20} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-['Jost'] font-medium text-lg mb-2">Email Us</h3>
                  <p className="font-['Jost'] text-[#6B6B6B] mb-1">General Inquiries: hello@onlycarbonfiber.com</p>
                  <p className="font-['Jost'] text-[#6B6B6B]">Support: support@onlycarbonfiber.com</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-[#E8E8E8] shrink-0">
                  <Phone size={20} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-['Jost'] font-medium text-lg mb-2">Call Us</h3>
                  <p className="font-['Jost'] text-[#6B6B6B] mb-1">+91 98765 43210</p>
                  <p className="font-['Jost'] text-sm text-[#A8A8A8]">Mon - Fri, 10:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-[#E8E8E8] shrink-0">
                  <MapPin size={20} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="font-['Jost'] font-medium text-lg mb-2">Studio & Workshop</h3>
                  <p className="font-['Jost'] text-[#6B6B6B] leading-relaxed">
                    Level 4, Peninsula Business Park,<br />
                    Lower Parel, Mumbai<br />
                    Maharashtra 400013, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 border border-[#E8E8E8] shadow-sm">
            <h2 className="font-['Cormorant_Garamond'] text-3xl mb-6">Send a Message</h2>
            
            {isSuccess ? (
              <div className="bg-[#E8F3EB] border border-[#2D7A4F]/20 p-6 text-center">
                <h3 className="font-['Jost'] font-medium text-[#2D7A4F] mb-2">Message Sent Successfully</h3>
                <p className="font-['Jost'] text-sm text-[#2D7A4F]/80 mb-6">We'll get back to you within 24 hours.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Name</label>
                    <input required type="text" className="w-full border border-[#E8E8E8] p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost']" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Email</label>
                    <input required type="email" className="w-full border border-[#E8E8E8] p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost']" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Subject</label>
                  <select className="w-full border border-[#E8E8E8] p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost'] bg-transparent">
                    <option>Product Inquiry</option>
                    <option>Order Status</option>
                    <option>Returns & Exchanges</option>
                    <option>Custom Build Request</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="space-y-1 pb-4">
                  <label className="text-xs text-[#6B6B6B] uppercase tracking-wider font-['Jost']">Message</label>
                  <textarea required rows={5} className="w-full border border-[#E8E8E8] p-3 text-sm focus:border-[#1A1A1A] outline-none font-['Jost'] resize-none"></textarea>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
