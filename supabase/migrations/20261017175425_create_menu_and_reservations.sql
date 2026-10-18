/*
# Kipling Cafe: menu + reservations

1. New Tables
- `menu_items`: dishes and drinks shown on the website menu.
  - `id` (uuid, primary key)
  - `category` (text: 'brunch' | 'mains' | 'coffee' | 'desserts' | 'drinks')
  - `name` (text, dish name)
  - `description` (text, short description)
  - `price` (numeric, in rupees)
  - `image_url` (text, photo of the dish)
  - `is_signature` (boolean, highlights chef's signature dishes)
  - `sort_order` (integer, display ordering)
  - `created_at` (timestamp)
- `reservations`: table booking requests submitted by visitors.
  - `id` (uuid, primary key)
  - `name`, `email`, `phone` (guest contact details)
  - `date` (date), `time_slot` (text), `guests` (integer)
  - `occasion` (text, optional), `notes` (text, optional)
  - `status` (text, default 'pending' — managed by the cafe)
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables.
- `menu_items`: public read (anon + authenticated); writes are staff-only (no public write policy).
- `reservations`: public insert only (anon + authenticated can submit a booking); no public read/update/delete so guest data stays private.

3. Notes
- Single-tenant site with no sign-in, so policies are scoped TO anon, authenticated.
- Menu content is managed directly in the database by the cafe.
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('brunch', 'mains', 'coffee', 'desserts', 'drinks')),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(8,2) NOT NULL,
  image_url text NOT NULL DEFAULT '',
  is_signature boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time_slot text NOT NULL,
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 20),
  occasion text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items (category, sort_order);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_menu" ON menu_items;
CREATE POLICY "public_read_menu" ON menu_items
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_reservations" ON reservations;
CREATE POLICY "public_insert_reservations" ON reservations
FOR INSERT TO anon, authenticated WITH CHECK (true);
