import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Package, ChevronDown, CheckCircle2, Clock, Download } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../services/supabase";

const MOCK_ORDERS = [
  {
    id: "OCF-8492-X9",
    date: "12 May 2026",
    status: "processing",
    total: 14158,
    items: [
      { name: "Minimalist Cardholder", qty: 1, price: 4999 },
      { name: "iPhone 15 Pro Case", qty: 2, price: 3499 }
    ]
  },
  {
    id: "OCF-7731-M2",
    date: "04 Mar 2026",
    status: "delivered",
    total: 45000,
    items: [
      { name: "BMW M3 G80 Rear Spoiler", qty: 1, price: 45000 }
    ]
  }
];

export function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      if (!isAuthenticated || !user) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, product:products(*))')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          // Format orders to match the UI shape
          const formatted = data.map(o => ({
            id: o.order_number || o.id.substring(0, 8).toUpperCase(),
            date: new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: o.status,
            total: o.total_amount,
            items: o.order_items.map((i: any) => ({
              name: i.product?.name || "Product",
              qty: i.quantity,
              price: i.price_at_purchase
            }))
          }));
          setOrders(formatted);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        // Fallback to mock data already set in state
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, [isAuthenticated, user]);

  return (
    <div className="pt-[100px] md:pt-[140px] pb-24 min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[800px] mx-auto px-6">
        
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-8">My Orders</h1>

        <div className="flex gap-6 mb-8 border-b border-[#E8E8E8]">
          {["All", "Processing", "Delivered"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-3 font-['Jost'] text-sm tracking-wide uppercase transition-colors relative ${activeTab === tab.toLowerCase() ? 'text-[#1A1A1A]' : 'text-[#A8A8A8] hover:text-[#1A1A1A]'}`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1A1A1A]" />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 font-['Jost'] text-[#6B6B6B]">Loading orders...</div>
        ) : (
          <div className="space-y-6">
            {orders.filter(o => activeTab === "all" || o.status === activeTab).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            
            {orders.filter(o => activeTab === "all" || o.status === activeTab).length === 0 && (
              <div className="text-center py-12 bg-white border border-[#E8E8E8] font-['Jost'] text-[#6B6B6B]">
                No orders found in this category.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!contentRef.current || !iconRef.current) return;

    if (isExpanded) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(iconRef.current, { rotation: 180, duration: 0.3 });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
    }
  }, [isExpanded]);

  const isDelivered = order.status === "delivered";

  return (
    <div className="bg-white border border-[#E8E8E8] shadow-sm">
      <div 
        className="p-6 cursor-pointer flex flex-wrap gap-4 justify-between items-center hover:bg-[#F9F9F9] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isDelivered ? 'bg-[#E8F3EB] text-[#2D7A4F]' : 'bg-[#FFF8E6] text-[#B8934A]'}`}>
            {isDelivered ? <CheckCircle2 size={20} /> : <Clock size={20} />}
          </div>
          <div>
            <div className="font-['IBM_Plex_Mono'] text-sm text-[#1A1A1A] mb-1">{order.id}</div>
            <div className="font-['Jost'] text-xs text-[#6B6B6B]">{order.date}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-['IBM_Plex_Mono'] text-base text-[#1A1A1A]">₹{order.total.toLocaleString('en-IN')}</div>
            <div className="font-['Jost'] text-xs text-[#6B6B6B] uppercase">{order.status}</div>
          </div>
          <ChevronDown ref={iconRef} size={20} className="text-[#A8A8A8]" />
        </div>
      </div>

      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="p-6 pt-0 border-t border-[#E8E8E8] mt-2">
          <div className="flex justify-between items-center mt-4 mb-4">
            <h4 className="font-['Jost'] text-sm font-medium text-[#1A1A1A]">Items</h4>
            <button className="text-[#1A1A1A] hover:text-[#6B6B6B] flex items-center gap-1 text-xs font-['Jost'] uppercase tracking-wider">
              <Download size={14} /> Invoice
            </button>
          </div>
          <div className="space-y-3 font-['Jost'] text-sm">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-[#6B6B6B]">{item.name} x{item.qty}</span>
                <span className="font-['IBM_Plex_Mono'] text-[#1A1A1A]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {!isDelivered && (
            <div className="mt-8 pt-6 border-t border-[#E8E8E8]">
              <div className="flex justify-between text-xs font-['IBM_Plex_Mono'] text-[#6B6B6B] mb-2">
                <span>Ordered</span>
                <span>Manufacturing</span>
                <span>Dispatched</span>
              </div>
              <div className="h-1 w-full bg-[#E8E8E8] relative">
                <div className="absolute top-0 left-0 h-full bg-[#B8934A] w-[50%]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
