import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShoppingBag, User, Menu, Search, X, Home, Grid, Heart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const cartCount = useCartStore(state => state.getItemCount());
  const wishlistCount = useWishlistStore(state => state.items.length);
  const cartBadgeRef = useRef<HTMLSpanElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // GSAP Navbar scroll effect
  useGSAP(() => {
    if (!navRef.current) return;

    // Only apply scroll effect if it's home, otherwise solid background
    if (isHome) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottomColor: "rgba(232, 232, 232, 1)",
        color: "#1A1A1A",
        paddingTop: "16px",
        paddingBottom: "16px",
        scrollTrigger: {
          trigger: "body",
          start: "top -50",
          end: "top -100",
          scrub: true,
        },
      });
    } else {
      gsap.set(navRef.current, {
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottomColor: "rgba(232, 232, 232, 1)",
        color: "#1A1A1A",
        paddingTop: "16px",
        paddingBottom: "16px",
      });
    }
  }, [isHome]);

  useEffect(() => {
    if (cartCount > 0 && cartBadgeRef.current) {
      gsap.fromTo(cartBadgeRef.current,
        { scale: 1 },
        { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  }, [cartCount]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300 border-b ${isHome ? 'border-transparent text-white' : 'border-[#E8E8E8] text-[#1A1A1A]'}`}
      >
        {/* Desktop Left Nav */}
        <nav className="hidden md:flex items-center gap-8 font-['Jost'] text-sm tracking-wide uppercase">
          <Link to="/shop" className="hover:opacity-60 transition-opacity">Shop</Link>
          <Link to="/shop?category=auto" className="hover:opacity-60 transition-opacity">Auto</Link>
          <Link to="/about" className="hover:opacity-60 transition-opacity">Philosophy</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-['Cormorant_Garamond'] text-2xl md:text-3xl tracking-wide uppercase font-semibold">
          OnlyCarbonFiber
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:opacity-60 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/account/wishlist" className="hidden md:block relative hover:opacity-60 transition-opacity">
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[9px] w-[14px] h-[14px] flex items-center justify-center rounded-full font-['IBM_Plex_Mono']" style={{ backgroundColor: isHome ? '#B8934A' : '#1A1A1A' }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/auth" className="hidden md:block hover:opacity-60 transition-opacity">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="relative hover:opacity-60 transition-opacity">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                ref={cartBadgeRef}
                className="absolute -top-2 -right-2 bg-[#1A1A1A] text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-['IBM_Plex_Mono']"
                style={{ backgroundColor: isHome ? '#B8934A' : '#1A1A1A' }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#E8E8E8] z-50 flex justify-around items-center py-3 pb-safe">
        {[
          { icon: Home, label: "Home", path: "/" },
          { icon: Grid, label: "Shop", path: "/shop" },
          { icon: Heart, label: "Wishlist", path: "/account/wishlist" },
          { icon: ShoppingBag, label: "Cart", path: "/cart" },
          { icon: User, label: "Profile", path: "/auth" },
        ].map((item, idx) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <MobileNavItem
              key={idx}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-white z-[60] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-[#E8E8E8]">
          <span className="font-['Cormorant_Garamond'] text-2xl tracking-wide uppercase font-semibold">OnlyCarbonFiber</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 font-['Cormorant_Garamond'] text-4xl gap-8">
          <Link to="/shop" className="hover:text-[#6B6B6B]" onClick={() => setIsMobileMenuOpen(false)}>All Collections</Link>
          <Link to="/shop?category=lifestyle" className="hover:text-[#6B6B6B]" onClick={() => setIsMobileMenuOpen(false)}>Lifestyle & Gifts</Link>
          <Link to="/shop?category=auto" className="hover:text-[#6B6B6B]" onClick={() => setIsMobileMenuOpen(false)}>Automotive Parts</Link>
          <Link to="/about" className="hover:text-[#6B6B6B]" onClick={() => setIsMobileMenuOpen(false)}>Our Philosophy</Link>
        </div>
      </div>
    </>
  );
}

function MobileNavItem({ icon: Icon, label, path, isActive }: { icon: any, label: string, path: string, isActive: boolean }) {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    if (iconRef.current) {
      gsap.fromTo(iconRef.current,
        { scale: 0.8, y: 2 },
        { scale: 1, y: 0, duration: 0.4, ease: "back.out(2)" }
      );
    }
  };

  return (
    <Link
      to={path}
      onClick={handleTap}
      className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#1A1A1A]' : 'text-[#A8A8A8]'}`}
    >
      <div ref={iconRef}>
        <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
      </div>
      <span className="text-[10px] font-['Jost']">{label}</span>
    </Link>
  );
}
