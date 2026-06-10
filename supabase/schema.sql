-- Supabase Schema for OnlyCarbonFiber

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  price numeric not null,
  image text not null,
  description text not null,
  specs text[] not null,
  stock_quantity integer not null default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  user_id uuid references auth.users(id),
  status text not null default 'processing', -- processing, shipped, delivered, cancelled
  total_amount numeric not null,
  shipping_address jsonb not null,
  contact_info jsonb not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table
create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null,
  price_at_purchase numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishlist Table (Optional, if using DB for wishlist instead of local storage)
create table public.wishlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Row Level Security (RLS) setup
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;

-- Policies

-- Products: Anyone can read products. Only admins (need a role/flag, but for now nobody) can modify.
create policy "Products are viewable by everyone" 
on public.products for select 
to public 
using (true);

-- Orders: Users can only see and insert their own orders.
create policy "Users can view their own orders" 
on public.orders for select 
to authenticated 
using (auth.uid() = user_id);

create policy "Users can insert their own orders" 
on public.orders for insert 
to authenticated 
with check (auth.uid() = user_id);

-- Order Items: Users can view their own order items
create policy "Users can view their own order items" 
on public.order_items for select 
to authenticated 
using (
  order_id in (select id from public.orders where user_id = auth.uid())
);

create policy "Users can insert order items for their own orders" 
on public.order_items for insert 
to authenticated 
with check (
  order_id in (select id from public.orders where user_id = auth.uid())
);

-- Seed Data (Matches MockData)
insert into public.products (name, category, price, image, description, specs) values
('Minimalist Cardholder', 'Accessories', 4999, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800', 'Forged carbon fiber cardholder that blocks RFID and holds up to 8 cards with an ultra-slim profile. Aerospace-grade durability meets minimalist design.', ARRAY['Weight: 14g', 'Capacity: 8 Cards', 'Material: Forged Carbon', 'Feature: RFID Blocking']),
('iPhone 15 Pro Case', 'Tech', 3499, 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800', 'Precision engineered 3K twill carbon fiber case. MagSafe compatible with raised bezels for maximum protection and zero signal interference.', ARRAY['Weight: 12g', 'Thickness: 0.6mm', 'Material: 3K Twill Carbon', 'Feature: MagSafe Compatible']),
('BMW M3 G80 Rear Spoiler', 'Auto', 45000, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800', 'Aerodynamically optimized, autoclave-cured prepreg carbon fiber rear spoiler. Generates 45lbs of downforce at 120mph.', ARRAY['Weight: 1.2kg', 'Downforce: 45lbs @ 120mph', 'Material: Prepreg Carbon', 'Finish: Gloss UV Clearcoat']),
('MacBook Pro 16" Shell', 'Tech', 8999, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', 'Ultra-thin, snap-on carbon fiber shell providing extreme rigidity and scratch resistance without adding bulk.', ARRAY['Weight: 98g', 'Thickness: 0.8mm', 'Material: Forged Carbon', 'Feature: Vented Design']),
('Key Organizer', 'Accessories', 2499, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=800', 'Silent, compact key organizer made from matte finish carbon fiber. Eliminates key jingle and pocket bulk.', ARRAY['Weight: 18g', 'Capacity: 2-7 Keys', 'Material: Matte Carbon', 'Feature: Anti-Loosening Washers']);
