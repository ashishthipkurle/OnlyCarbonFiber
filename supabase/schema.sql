-- Supabase Schema for OnlyCarbonFiber

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles Table (Extended user data)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to automatically create a profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

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

-- Reviews Table
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) setup
alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;

-- Policies

-- Profiles: Users can read and update their own profile
create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- Reviews: Anyone can read, authenticated can insert
create policy "Reviews are viewable by everyone"
on public.reviews for select
to public
using (true);

create policy "Authenticated users can create reviews"
on public.reviews for insert
to authenticated
with check (auth.uid() = user_id);

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

-- Seed data has been moved to supabase/seed.sql
