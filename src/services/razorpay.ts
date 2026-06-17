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

import { supabase } from './supabase';

export const createRazorpayOrder = async (amount: number): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount, currency: 'INR' },
    });

    if (error) throw error;
    return data.id; // Razorpay order ID
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  orderDetails: any
): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('verify-razorpay-payment', {
      body: { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        orderDetails
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};
