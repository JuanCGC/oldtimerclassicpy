import { useState, useEffect } from 'react';
import { Vehiculo } from './lib/supabase';
import Home from './pages/Home';
import VehicleDetail from './pages/VehicleDetail';

type View = 'home' | 'detail';

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo | null>(null);

  useEffect(() => {
    const path = window.location.pathname;

    if (path.startsWith('/vehiculos/')) {
      const slug = path.replace('/vehiculos/', '');
      if (slug) {
        fetchVehicleBySlug(slug);
      }
    } else {
      setView('home');
      setSelectedVehiculo(null);
    }
  }, []);

  async function fetchVehicleBySlug(slug: string) {
    const { supabase } = await import('./lib/supabase');
    const { data, error } = await supabase
      .from('vehiculos')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching vehicle:', error);
      setView('home');
    } else if (data) {
      setSelectedVehiculo(data);
      setView('detail');
    } else {
      setView('home');
    }
  }

  function handleVehicleClick(vehiculo: Vehiculo) {
    setSelectedVehiculo(vehiculo);
    setView('detail');
    window.history.pushState({}, '', `/vehiculos/${vehiculo.slug}`);
    window.scrollTo(0, 0);
  }

  function handleBackToHome() {
    setView('home');
    setSelectedVehiculo(null);
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        handleBackToHome();
      } else if (path.startsWith('/vehiculos/')) {
        const slug = path.replace('/vehiculos/', '');
        fetchVehicleBySlug(slug);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {view === 'home' && <Home onVehicleClick={handleVehicleClick} />}
      {view === 'detail' && selectedVehiculo && (
        <VehicleDetail vehiculo={selectedVehiculo} onBack={handleBackToHome} />
      )}
    </>
  );
}

export default App;
