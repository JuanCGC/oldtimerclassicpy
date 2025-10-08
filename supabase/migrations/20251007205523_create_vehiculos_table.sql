/*
  # Create Vehículos Table for Old Timer Garage

  ## Overview
  This migration creates the vehicles (vehículos) collection for the Old Timer Garage dealership website.
  
  ## Tables Created
  1. **vehiculos**
     - `id` (uuid, primary key) - Unique identifier
     - `modelo` (text, required) - Vehicle model name (displayed on cards)
     - `precio_gs` (bigint, required) - Price in Paraguayan Guaraníes
     - `imagen_principal` (text, required) - Main vehicle image URL
     - `galeria` (text[], optional) - Array of additional image URLs
     - `descripcion` (text, optional) - Rich text description
     - `marca` (text, optional) - Vehicle brand/make
     - `anio` (integer, optional) - Year of manufacture
     - `kilometraje_km` (integer, optional) - Odometer reading in kilometers
     - `transmision` (text, optional) - Transmission type (Manual/Automática)
     - `combustible` (text, optional) - Fuel type (Nafta/Diésel/Híbrido/Eléctrico)
     - `traccion` (text, optional) - Drive type
     - `color` (text, optional) - Vehicle color
     - `puertas` (integer, optional) - Number of doors
     - `vin` (text, optional) - Vehicle Identification Number
     - `whatsapp_numero` (text) - WhatsApp contact number (default: 098446666)
     - `whatsapp_mensaje` (text) - Custom WhatsApp message template
     - `slug` (text, unique) - URL-friendly identifier (marca-modelo-anio-id)
     - `created_at` (timestamptz) - Record creation timestamp
     - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on `vehiculos` table
  - Add policy for public read access (all users can view vehicles)
  - Only authenticated users can manage vehicles (handled by Supabase Auth)
  
  ## Notes
  - Default WhatsApp number is set to 098446666
  - Slug is automatically generated for URL routing
  - Gallery images stored as text array
  - Updated_at used for default sorting (most recently updated first)
*/

-- Create vehiculos table
CREATE TABLE IF NOT EXISTS vehiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  modelo text NOT NULL,
  precio_gs bigint NOT NULL,
  imagen_principal text NOT NULL,
  galeria text[] DEFAULT '{}',
  descripcion text,
  marca text,
  anio integer,
  kilometraje_km integer,
  transmision text,
  combustible text,
  traccion text,
  color text,
  puertas integer,
  vin text,
  whatsapp_numero text DEFAULT '098446666',
  whatsapp_mensaje text DEFAULT 'Hola, me interesa el {{modelo}} publicado en su web. ¿Sigue disponible?',
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_vehiculos_slug ON vehiculos(slug);

-- Create index on updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_vehiculos_updated_at ON vehiculos(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE vehiculos ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view vehicles (public read access)
CREATE POLICY "Anyone can view vehicles"
  ON vehiculos
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert vehicles
CREATE POLICY "Authenticated users can insert vehicles"
  ON vehiculos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update vehicles
CREATE POLICY "Authenticated users can update vehicles"
  ON vehiculos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete vehicles
CREATE POLICY "Authenticated users can delete vehicles"
  ON vehiculos
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row changes
DROP TRIGGER IF EXISTS update_vehiculos_updated_at ON vehiculos;
CREATE TRIGGER update_vehiculos_updated_at
  BEFORE UPDATE ON vehiculos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();