import React, { useEffect, useState } from "react";
import { SEO } from "../components/common/SEO";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/UI";
import { LogOut, Package, MapPin, Settings, Heart } from "lucide-react";
import { supabase } from "../services/supabase";

export function Account() {
  const { user, profile, isAuthenticated, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/');
  };

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen pt-32 flex justify-center">Loading...</div>;
  }

  return (
    <div className="pt-[100px] md:pt-[140px] bg-[#F9F9F9] min-h-screen pb-24">
      <SEO title="My Account" />
      
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex justify-between items-end mb-10 pb-6 border-b border-[#E8E8E8]">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-4xl mb-2">Welcome, {profile?.full_name || user?.email?.split('@')[0]}</h1>
            <p className="font-['Jost'] text-[#6B6B6B]">{user?.email}</p>
          </div>
          <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center gap-2 text-sm font-['Jost'] text-[#6B6B6B] hover:text-[#1A1A1A]">
            <LogOut size={16} /> {isLoggingOut ? "Logging out..." : "Sign Out"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/orders" className="bg-white p-8 border border-[#E8E8E8] hover:border-[#1A1A1A] hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-full mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <Package size={20} />
            </div>
            <h3 className="font-['Jost'] font-medium text-lg mb-2">My Orders</h3>
            <p className="font-['Jost'] text-sm text-[#6B6B6B]">Track, return, or buy things again.</p>
          </Link>

          <Link to="/account/addresses" className="bg-white p-8 border border-[#E8E8E8] hover:border-[#1A1A1A] hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-full mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <MapPin size={20} />
            </div>
            <h3 className="font-['Jost'] font-medium text-lg mb-2">Addresses</h3>
            <p className="font-['Jost'] text-sm text-[#6B6B6B]">Edit addresses for orders and gifts.</p>
          </Link>

          <Link to="/account/wishlist" className="bg-white p-8 border border-[#E8E8E8] hover:border-[#1A1A1A] hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-full mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <Heart size={20} />
            </div>
            <h3 className="font-['Jost'] font-medium text-lg mb-2">Wishlist</h3>
            <p className="font-['Jost'] text-sm text-[#6B6B6B]">View your saved favorite items.</p>
          </Link>

          <div className="bg-white p-8 border border-[#E8E8E8] hover:border-[#1A1A1A] hover:shadow-md transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-[#F9F9F9] flex items-center justify-center rounded-full mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <Settings size={20} />
            </div>
            <h3 className="font-['Jost'] font-medium text-lg mb-2">Account Details</h3>
            <p className="font-['Jost'] text-sm text-[#6B6B6B]">Edit password, email, and personal info.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
