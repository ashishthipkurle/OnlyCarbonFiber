import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

async function verifyHmac(orderId: string, paymentId: string, signature: string, secret: string) {
  const data = new TextEncoder().encode(orderId + '|' + paymentId);
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signed = await crypto.subtle.sign('HMAC', key, data);
  const signedHex = Array.from(new Uint8Array(signed)).map(b => b.toString(16).padStart(2, '0')).join('');
  return signedHex === signature;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails
    } = await req.json();

    // Verify signature
    const isValid = await verifyHmac(razorpay_order_id, razorpay_payment_id, razorpay_signature, RAZORPAY_KEY_SECRET);
    
    if (!isValid) {
      throw new Error('Invalid signature');
    }

    // Connect to Supabase using service role to bypass RLS for inserting order securely
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Insert order into database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: `ORD-${Date.now()}`,
        user_id: orderDetails.user_id, // Could be null for guest checkout
        status: 'processing',
        total_amount: orderDetails.total_amount,
        shipping_address: orderDetails.shipping_address,
        contact_info: orderDetails.contact_info,
        razorpay_order_id,
        razorpay_payment_id
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    if (orderDetails.items && orderDetails.items.length > 0) {
      const itemsToInsert = orderDetails.items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;
    }

    return new Response(JSON.stringify({ success: true, order }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})
