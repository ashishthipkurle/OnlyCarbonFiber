import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SEO } from "../components/common/SEO";
import { Search, ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on customs processing." },
      { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Shipping costs and estimated delivery times are calculated at checkout based on your location." },
      { q: "How can I track my order?", a: "Once your order is dispatched, you will receive an email with a tracking number and a link to trace its journey." }
    ]
  },
  {
    category: "Product & Care",
    items: [
      { q: "Is it real carbon fiber?", a: "Yes, we use 100% genuine aerospace-grade carbon fiber (3K Twill or Forged) in all our products. We do not use vinyl wraps or cheap imitations." },
      { q: "How do I clean my carbon fiber accessories?", a: "Use a soft microfiber cloth and a mild detailing spray or glass cleaner. Avoid abrasive chemicals which can dull the clear coat finish." },
      { q: "Does carbon fiber block signals?", a: "Standard carbon fiber can interfere with RFID and cell signals. For our phone cases, we use specialized Aramid fiber (Kevlar) which offers similar strength and aesthetics but allows 100% signal pass-through." }
    ]
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer a 14-day return window for unused items in their original packaging. Custom orders and installed automotive parts are non-returnable." },
      { q: "My item arrived damaged. What do I do?", a: "Please contact our support team within 48 hours of delivery with photos of the damage and the packaging. We will expedite a replacement." }
    ]
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = FAQ_DATA.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="pt-[100px] md:pt-[140px] bg-white min-h-screen pb-24">
      <SEO title="FAQ" />
      
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl mb-6 text-center">Frequently Asked Questions</h1>
        
        <div className="relative mb-16">
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-[#E8E8E8] p-4 pl-12 font-['Jost'] text-sm focus:border-[#1A1A1A] outline-none bg-[#F9F9F9]"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A8A8]" />
        </div>

        {filteredData.length > 0 ? (
          <div className="space-y-12">
            {filteredData.map((category, idx) => (
              <div key={idx}>
                <h2 className="font-['IBM_Plex_Mono'] text-sm text-[#A8A8A8] uppercase tracking-widest mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <FAQItem key={i} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#6B6B6B] font-['Jost']">
            No results found for "{searchQuery}". Please contact support if you need help.
          </div>
        )}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!contentRef.current || !iconRef.current) return;
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(iconRef.current, { rotation: 180, duration: 0.3 });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <div className="border border-[#E8E8E8] bg-white">
      <button 
        className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-[#F9F9F9] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-['Jost'] font-medium text-[#1A1A1A] pr-4">{question}</span>
        <ChevronDown ref={iconRef} size={20} className="text-[#A8A8A8] shrink-0" />
      </button>
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="p-6 pt-0 text-[#6B6B6B] font-['Jost'] text-sm leading-relaxed border-t border-transparent">
          {answer}
        </div>
      </div>
    </div>
  );
}
