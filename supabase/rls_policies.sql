-- ============================================
-- RLS Policies & Auth Trigger for Supabase
-- Run this in the Supabase SQL Editor AFTER Prisma schema push
-- ============================================

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- ============================================
-- Auth Trigger: Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it already exists to avoid duplicates
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- Enable Row Level Security on all tables
-- ============================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;
alter table public.reviews enable row level security;

-- ============================================
-- PROFILES policies
-- ============================================
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- ============================================
-- PRODUCTS policies (public read)
-- ============================================
drop policy if exists "Products are viewable by everyone" on public.products;
create policy "Products are viewable by everyone"
  on public.products for select
  to anon, authenticated
  using (true);

-- ============================================
-- ORDERS policies
-- ============================================
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own orders" on public.orders;
create policy "Users can insert their own orders"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ============================================
-- ORDER ITEMS policies
-- ============================================
drop policy if exists "Users can view their own order items" on public.order_items;
create policy "Users can view their own order items"
  on public.order_items for select
  to authenticated
  using (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

drop policy if exists "Users can insert order items for their own orders" on public.order_items;
create policy "Users can insert order items for their own orders"
  on public.order_items for insert
  to authenticated
  with check (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

-- ============================================
-- WISHLISTS policies
-- ============================================
drop policy if exists "Users can manage their own wishlist" on public.wishlists;
create policy "Users can manage their own wishlist"
  on public.wishlists for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================
-- REVIEWS policies
-- ============================================
drop policy if exists "Reviews are viewable by everyone" on public.reviews;
create policy "Reviews are viewable by everyone"
  on public.reviews for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can create reviews" on public.reviews;
create policy "Authenticated users can create reviews"
  on public.reviews for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ============================================
-- Done!
-- ============================================
