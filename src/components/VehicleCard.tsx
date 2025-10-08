import { Vehiculo } from '../lib/supabase';
import { formatPriceGuaranies } from '../utils/format';

interface VehicleCardProps {
  vehiculo: Vehiculo;
  onClick: () => void;
}

export default function VehicleCard({ vehiculo, onClick }: VehicleCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#151719] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/10 border border-white/5"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={vehiculo.imagen_principal}
          alt={vehiculo.modelo}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-[#EAEAEA] text-xl font-semibold tracking-wide">
          {vehiculo.modelo}
        </h3>
        <p className="text-[#D4AF37] text-2xl font-bold">
          {formatPriceGuaranies(vehiculo.precio_gs)}
        </p>
      </div>
    </div>
  );
}
