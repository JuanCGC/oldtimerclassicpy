import { useEffect, useState } from 'react';
import { supabase, Vehiculo } from '../lib/supabase';
import Hero from '../components/Hero';
import VehicleCard from '../components/VehicleCard';

interface HomeProps {
  onVehicleClick: (vehiculo: Vehiculo) => void;
}

export default function Home({ onVehicleClick }: HomeProps) {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehiculos() {
      const { data, error } = await supabase
        .from('vehiculos')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
      } else {
        setVehiculos(data || []);
      }
      setLoading(false);
    }

    fetchVehiculos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D0E]">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {loading ? (
          <div className="text-center text-[#A8A8A8] text-lg">
            Cargando vehículos...
          </div>
        ) : vehiculos.length === 0 ? (
          <div className="text-center text-[#A8A8A8] text-lg">
            No hay vehículos disponibles
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {vehiculos.map((vehiculo) => (
              <VehicleCard
                key={vehiculo.id}
                vehiculo={vehiculo}
                onClick={() => onVehicleClick(vehiculo)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
