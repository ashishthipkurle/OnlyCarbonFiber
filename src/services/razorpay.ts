import { Order } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

interface RazorpayOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string; // From backend
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export const initializePayment = (
  options: RazorpayOptions,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) => {
  const rzpOptions = {
    key: RAZORPAY_KEY,
    amount: options.amount * 100, // Amount in paise
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.order_id,
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: options.prefill,
    theme: {
      color: options.theme?.color || '#1A1A1A',
    },
  };

  if (window.Razorpay) {
    const rzp = new window.Razorpay(rzpOptions);
    rzp.on('payment.failed', function (response: any) {
      onFailure(response.error);
    });
    rzp.open();
  } else {
    console.error('Razorpay SDK not loaded');
    onFailure({ description: 'Payment gateway unavailable' });
  }
};

// Mock function to create order on backend
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  // In a real app, this would call your Supabase Edge Function
  // return await fetch('/api/create-order', ...).then(r => r.json()).then(data => data.id);
  
  // Returning a fake order ID for now
  return `order_${Math.random().toString(36).substr(2, 9)}`;
};
