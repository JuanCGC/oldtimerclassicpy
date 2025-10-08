import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Vehiculo {
  id: string;
  modelo: string;
  precio_gs: number;
  imagen_principal: string;
  galeria: string[];
  descripcion?: string;
  marca?: string;
  anio?: number;
  kilometraje_km?: number;
  transmision?: string;
  combustible?: string;
  traccion?: string;
  color?: string;
  puertas?: number;
  vin?: string;
  whatsapp_numero: string;
  whatsapp_mensaje: string;
  slug: string;
  created_at: string;
  updated_at: string;
}
