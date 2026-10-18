import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface MenuItem {
  id: string;
  category: 'brunch' | 'mains' | 'coffee' | 'desserts' | 'drinks';
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_signature: boolean;
  sort_order: number;
}

export interface ReservationInput {
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  guests: number;
  occasion: string;
  notes: string;
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('category')
    .order('sort_order');
  if (error) throw error;
  return (data ?? []) as MenuItem[];
}

export async function submitReservation(input: ReservationInput): Promise<void> {
  const { error } = await supabase.from('reservations').insert(input);
  if (error) throw error;
}
