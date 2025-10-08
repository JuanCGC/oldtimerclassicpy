import { useState } from 'react';
import { ChevronLeft, MessageCircle, X } from 'lucide-react';
import { Vehiculo } from '../lib/supabase';
import { formatPriceGuaranies, generateWhatsAppLink } from '../utils/format';

interface VehicleDetailProps {
  vehiculo: Vehiculo;
  onBack: () => void;
}

export default function VehicleDetail({ vehiculo, onBack }: VehicleDetailProps) {
  const [selectedImage, setSelectedImage] = useState(vehiculo.imagen_principal);
  const [showLightbox, setShowLightbox] = useState(false);

  const allImages = [vehiculo.imagen_principal, ...(vehiculo.galeria || [])];

  const whatsappMessage = vehiculo.whatsapp_mensaje.replace('{{modelo}}', vehiculo.modelo);
  const whatsappLink = generateWhatsAppLink(vehiculo.whatsapp_numero, whatsappMessage);

  const specs = [
    { label: 'Kilometraje', value: vehiculo.kilometraje_km ? `${vehiculo.kilometraje_km.toLocaleString('es-PY')} km` : null },
    { label: 'Transmisión', value: vehiculo.transmision },
    { label: 'Combustible', value: vehiculo.combustible },
    { label: 'Tracción', value: vehiculo.traccion },
    { label: 'Color', value: vehiculo.color },
    { label: 'Puertas', value: vehiculo.puertas },
    { label: 'VIN', value: vehiculo.vin },
  ].filter(spec => spec.value);

  return (
    <div className="min-h-screen bg-[#0B0D0E]">
      <div className="bg-[#151719] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#A8A8A8] hover:text-[#D4AF37] transition-colors duration-200 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Volver</span>
          </button>
          <nav className="text-sm text-[#A8A8A8]">
            <span className="hover:text-[#D4AF37] cursor-pointer" onClick={onBack}>Inicio</span>
            <span className="mx-2">&gt;</span>
            <span>Vehículos</span>
            <span className="mx-2">&gt;</span>
            <span className="text-[#EAEAEA]">{vehiculo.modelo}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div
              className="aspect-video w-full rounded-xl overflow-hidden cursor-zoom-in bg-[#151719]"
              onClick={() => setShowLightbox(true)}
            >
              <img
                src={selectedImage}
                alt={vehiculo.modelo}
                className="w-full h-full object-cover"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      selectedImage === img
                        ? 'border-[#D4AF37] scale-95'
                        : 'border-white/10 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${vehiculo.modelo} - imagen ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#EAEAEA] mb-2">
                {vehiculo.modelo}
              </h1>
              {(vehiculo.marca || vehiculo.anio) && (
                <p className="text-[#A8A8A8] text-lg">
                  {[vehiculo.marca, vehiculo.anio].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>

            <div className="text-[#D4AF37] text-4xl md:text-5xl font-bold">
              {formatPriceGuaranies(vehiculo.precio_gs)}
            </div>

            {vehiculo.descripcion && (
              <div className="text-[#EAEAEA] leading-relaxed whitespace-pre-wrap">
                {vehiculo.descripcion}
              </div>
            )}

            {specs.length > 0 && (
              <div className="bg-[#151719] rounded-xl p-6 border border-white/5">
                <h2 className="text-xl font-semibold text-[#EAEAEA] mb-4">
                  Especificaciones
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[#A8A8A8] text-sm">{spec.label}</span>
                      <span className="text-[#EAEAEA] font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center gap-3 w-full bg-[#D4AF37] text-[#0B0D0E] font-bold text-lg py-4 px-6 rounded-xl hover:bg-[#C19B2F] transition-all duration-200 shadow-lg hover:shadow-[#D4AF37]/30"
            >
              <MessageCircle size={24} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#151719] border-t border-white/10 p-4 shadow-2xl z-50">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#D4AF37] text-[#0B0D0E] font-bold text-lg py-4 px-6 rounded-xl active:scale-95 transition-all duration-200"
        >
          <MessageCircle size={24} />
          Escribir por WhatsApp
        </a>
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setShowLightbox(false)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt={vehiculo.modelo}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
