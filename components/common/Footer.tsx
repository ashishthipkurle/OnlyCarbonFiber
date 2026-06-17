import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-[120px] pb-[80px] px-6 md:px-12 md:pb-12 mt-auto">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
        
        <div className="md:col-span-1">
          <h2 className="font-['Cormorant_Garamond'] text-3xl mb-6">OnlyCarbonFiber</h2>
          <p className="font-['Jost'] text-[#A8A8A8] text-sm leading-relaxed">
            Quiet luxury. Engineered precision. We create premium lifestyle accessories and automotive components from 100% genuine aerospace-grade carbon fiber.
          </p>
        </div>

        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B] uppercase tracking-widest mb-6">Explore</h4>
          <ul className="flex flex-col gap-4 font-['Jost'] text-sm text-[#F4F4F4]">
            <li><Link to="/shop" className="hover:text-white transition-colors">Marketplace</Link></li>
            <li><Link to="/shop?category=lifestyle" className="hover:text-white transition-colors">Lifestyle Accessories</Link></li>
            <li><Link to="/shop?category=auto" className="hover:text-white transition-colors">Performance Parts</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B] uppercase tracking-widest mb-6">Support</h4>
          <ul className="flex flex-col gap-4 font-['Jost'] text-sm text-[#F4F4F4]">
            <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Care Guide</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs text-[#6B6B6B] uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="font-['Jost'] text-[#A8A8A8] text-sm mb-4">
            Join the inner circle for exclusive releases and editorial pieces.
          </p>
          <div className="flex border-b border-[#333] pb-2 focus-within:border-white transition-colors">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent w-full text-sm font-['Jost'] outline-none text-white placeholder-[#6B6B6B]"
            />
            <button className="text-[#A8A8A8] hover:text-white transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-[1320px] mx-auto border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-['IBM_Plex_Mono'] text-[#6B6B6B]">
        <p>&copy; {new Date().getFullYear()} ONLYCARBONFIBER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
          <Link to="/terms" className="hover:text-white transition-colors">TERMS</Link>
        </div>
      </div>
    </footer>
  );
}
