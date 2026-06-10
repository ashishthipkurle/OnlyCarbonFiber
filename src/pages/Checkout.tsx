import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../components/ui/UI";
import { MapPin, Check, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { initializePayment, createRazorpayOrder } from "../services/razorpay";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Must be a valid 6-digit pincode"),
  phone: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit phone number"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const paymentContainerRef = useRef<HTMLDivElement>(null);

  const subtotal = getSubtotal();
  const gst = subtotal * 0.18;
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + gst + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur"
  });

  useGSAP(() => {
    if (!progressCircleRef.current) return;
    const circumference = 2 * Math.PI * 40;
    const progress = step / 2;
    const offset = circumference - (progress * circumference);
    gsap.to(progressCircleRef.current, {
      strokeDashoffset: offset,
      duration: 1,
      ease: "power2.out"
    });
  }, [step]);

  const handleNextStep = async () => {
    const isStep1Valid = await trigger();
    if (isStep1Valid) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePayment = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      const orderId = await createRazorpayOrder(total);
      const formData = getValues();
      
      initializePayment(
        {
          amount: total,
          currency: "INR",
          name: "OnlyCarbonFiber",
          description: "Premium Carbon Fiber Accessories",
          order_id: orderId,
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
        },
        (response) => {
          clearCart();
          navigate(`/order-success?id=${orderId}&payment_id=${response.razorpay_payment_id}`);
        },
        (error) => {
          console.error("Payment failed:", error);
          alert("Payment failed or was cancelled.");
          setIsProcessing(false);
        }
      );
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-[140px] pb-24 min-h-[70vh] bg-[#F9F9F9] flex flex-col items-center justify-center text-center">
        <h2 className="font-['Cormorant_Garamond'] text-3xl mb-4">Your Cart is Empty</h2>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="pt-[100px] pb-24 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl">Checkout</h1>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#E8E8E8" strokeWidth="4" fill="none" />
              <circle ref={progressCircleRef} cx="50" cy="50" r="40" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeDasharray={251.2} strokeDashoffset={251.2} />
            </svg>
            <span className="absolute font-['IBM_Plex_Mono'] text-xs">{step}/2</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E8E8] shadow-sm relative overflow-hidden" ref={paymentContainerRef}>
          {step === 1 ? (
            <div className="p-8">
              <h2 className="font-['Jost'] text-lg font-medium mb-6 flex items-center gap-2">
                <MapPin size={18} /> Contact & Shipping
              </h2>
              
              <form className="space-y-4 font-['Jost']" onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                <div className="space-y-1 mb-4">
                  <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">Email Address</label>
                  <input {...register('email')} type="email" className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">First Name</label>
                    <input {...register('firstName')} type="text" className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">Last Name</label>
                    <input {...register('lastName')} type="text" className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">Address</label>
                  <input {...register('address')} type="text" className={`w-full border ${errors.address ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                  {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">City</label>
                    <input {...register('city')} type="text" className={`w-full border ${errors.city ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">State</label>
                    <input {...register('state')} type="text" className={`w-full border ${errors.state ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                    {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">Pincode</label>
                    <input {...register('pincode')} type="text" className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                    {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-1 pb-4">
                  <label className="text-xs text-[#6B6B6B] uppercase tracking-wider">Phone</label>
                  <input {...register('phone')} type="tel" className={`w-full border ${errors.phone ? 'border-red-500' : 'border-[#E8E8E8]'} p-3 text-sm focus:border-[#1A1A1A] outline-none`} />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
                
                <div className="pt-6 border-t border-[#E8E8E8] mt-6 flex justify-end">
                  <Button type="submit">Continue to Review <ArrowRight size={16} className="ml-2" /></Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="font-['Jost'] text-lg font-medium mb-6 flex items-center gap-2">
                <Check size={18} /> Order Review & Payment
              </h2>
              
              <div className="bg-[#F9F9F9] p-4 border border-[#E8E8E8] mb-6 text-sm font-['Jost']">
                <div className="font-medium text-[#1A1A1A] mb-1">Shipping To:</div>
                <div className="text-[#6B6B6B]">{getValues('firstName')} {getValues('lastName')}</div>
                <div className="text-[#6B6B6B]">{getValues('address')}, {getValues('city')}, {getValues('state')} {getValues('pincode')}</div>
                <div className="text-[#6B6B6B]">{getValues('phone')} | {getValues('email')}</div>
                <button onClick={() => setStep(1)} className="text-xs underline mt-2 text-[#1A1A1A]">Edit Details</button>
              </div>

              <div className="space-y-4 border-b border-[#E8E8E8] pb-6 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F4F4F4] border border-[#E8E8E8] flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-sm font-['Jost'] text-left">{item.product.name} <span className="text-[#A8A8A8]">x{item.quantity}</span></div>
                    </div>
                    <div className="font-['IBM_Plex_Mono'] text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between font-['IBM_Plex_Mono'] text-sm">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-['IBM_Plex_Mono'] text-sm">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-['IBM_Plex_Mono'] text-sm">
                  <span className="text-[#6B6B6B]">Estimated GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 font-['Jost'] pt-4 border-t border-[#E8E8E8]">
                <div>
                  <div className="text-[#1A1A1A] font-medium text-lg">Total to Pay</div>
                </div>
                <div className="font-['IBM_Plex_Mono'] font-medium text-2xl">₹{total.toLocaleString('en-IN')}</div>
              </div>

              <div className="bg-[#E8F3EB] border border-[#2D7A4F]/20 p-4 flex items-start gap-3 mb-8 text-sm font-['Jost'] text-[#2D7A4F]">
                <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Secured by Razorpay</div>
                  <div className="opacity-80 text-xs mt-1">Your payment information is encrypted and securely processed. Supports UPI, Cards & Netbanking.</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-[#E8E8E8]">
                 <button onClick={() => setStep(1)} className="text-sm font-['Jost'] text-[#6B6B6B] hover:text-[#1A1A1A]" disabled={isProcessing}>Back</button>
                 <Button onClick={handlePayment} disabled={isProcessing} className="bg-[#1A1A1A] text-white flex-1 max-w-[200px] ml-4">
                   {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString('en-IN')}`}
                 </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
