export default function Hero() {
  return (
    <div className="relative w-full">
      <div className="w-full h-[45vh] md:h-[70vh] overflow-hidden">
        <img
          src="/hero_showroom.jpg"
          alt="Old Timer Garage Showroom"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center py-12 md:py-16">
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-8">
          <div className="absolute inset-0 rounded-full border border-white/15 shadow-2xl">
            <img
              src="/logo_gorila.png"
              alt="Old Timer Garage Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <h1 className="text-[#EAEAEA] text-5xl md:text-7xl font-['Great_Vibes',_'Pacifico',_cursive] mb-8 text-center px-4">
          Old Timer Garage
        </h1>

        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      </div>
    </div>
  );
}
