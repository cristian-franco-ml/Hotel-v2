import React, { useEffect, useState } from 'react';
import { Star, ChevronRight, Edit, Bookmark, Clock, Eye, Wifi, Dumbbell, Waves, UtensilsCrossed, Car, PawPrint, Briefcase, Coffee } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useUser } from '../../contexts/UserContext';

interface HotelCompetitorProps {
  id: string;
  nombre: string;
  categoria: number;
  distancia: number;
  tarifaActual: number;
  cambioTarifa24h: number;
  cambioTarifa7d: number;
  nivelOcupacion: 'Alto' | 'Medio' | 'Bajo';
  puntuacionReseñas: number;
  elasticidadPrecios: number;
  ultimaActualizacion: Date;
  servicios: {
    wifi: boolean;
    piscina: boolean;
    gimnasio: boolean;
    restaurante: boolean;
    estacionamiento: boolean;
    mascotas: boolean;
    centroNegocios: boolean;
    servicioHabitaciones: boolean;
  };
  rooms_jsonb: string | object; // Accept string or object
}

// Helper to get today's date in YYYY-MM-DD
const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Helper to parse price string like 'MXN 1,689' to number
const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  // Remove currency and commas
  const num = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(num) || 0;
};

const CompetitorList = () => {
  const [competidores, setCompetidores] = useState<HotelCompetitorProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Obtener ciudad del usuario (insensible a mayúsculas/minúsculas)
  const userCity = user?.user_metadata?.cityName?.toLowerCase() || null;

  useEffect(() => {
    async function fetchCompetidores() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('hoteles_parallel').select('*');
      if (error) {
        setError(error.message);
        setCompetidores([]);
      } else {
        // Filtrar por ciudad si está definida en el usuario
        let filtered = data || [];
        if (userCity) {
          filtered = filtered.filter((hotel: any) =>
            hotel.ciudad && hotel.ciudad.toLowerCase() === userCity
          );
        }
        setCompetidores(filtered);
      }
      setLoading(false);
    }
    fetchCompetidores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCity]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
          Hoteles Competidores ({competidores.length})
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={14} className="mr-1" />
          Última actualización: hace 15 minutos
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {loading && <div>Cargando hoteles competidores...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && competidores.map(hotel => {
          // Get today's prices from rooms_jsonb
          let avgPrice = 'N/A';
          if (hotel.rooms_jsonb) {
            try {
              const rooms = typeof hotel.rooms_jsonb === 'string' ? JSON.parse(hotel.rooms_jsonb) : hotel.rooms_jsonb;
              const today = getToday();
              const todayRooms = rooms[today];
              if (Array.isArray(todayRooms) && todayRooms.length > 0) {
                const prices = todayRooms.map(r => parsePrice(r.price)).filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
                if (prices.length > 0) {
                  avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(0);
                }
              }
            } catch (e) {
              // ignore parse errors
            }
          }
          return (
            <div key={hotel.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${hotel.id === '1' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className={`font-medium ${hotel.id === '1' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>
                      {hotel.nombre || 'Sin nombre'}
                    </h4>
                    {hotel.id === '1' && <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                      NOSOTROS
                    </span>}
                  </div>
                  <div className="flex flex-wrap items-center mt-2 gap-4">
                    <div className="flex items-center text-sm">
                      <div className="flex text-yellow-400">
                        {Array(hotel.categoria || 0).fill(0).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{hotel.distancia !== undefined && hotel.distancia !== null ? hotel.distancia : 'N/A'}</span>
                      <span className="ml-1">km</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${hotel.nivelOcupacion === 'Alto' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : hotel.nivelOcupacion === 'Medio' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'}`}>
                        Ocupación {hotel.nivelOcupacion || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                        {hotel.puntuacionReseñas !== undefined && hotel.puntuacionReseñas !== null ? hotel.puntuacionReseñas.toFixed(1) : 'N/A'}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      ${avgPrice}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs ${hotel.cambioTarifa24h > 0 ? 'text-green-600 dark:text-green-400' : hotel.cambioTarifa24h < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {hotel.cambioTarifa24h !== undefined && hotel.cambioTarifa24h !== null ? (hotel.cambioTarifa24h > 0 ? '+' : '') + hotel.cambioTarifa24h + '% (24h)' : 'N/A'}
                      </span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className={`text-xs ${hotel.cambioTarifa7d > 0 ? 'text-green-600 dark:text-green-400' : hotel.cambioTarifa7d < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {hotel.cambioTarifa7d !== undefined && hotel.cambioTarifa7d !== null ? (hotel.cambioTarifa7d > 0 ? '+' : '') + hotel.cambioTarifa7d + '% (7d)' : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Amenities grid */}
              <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2">
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.wifi) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Wifi size={16} />
                  <span className="text-xs mt-1">WiFi</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.piscina) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Waves size={16} />
                  <span className="text-xs mt-1">Piscina</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.gimnasio) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Dumbbell size={16} />
                  <span className="text-xs mt-1">Gimnasio</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.restaurante) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <UtensilsCrossed size={16} />
                  <span className="text-xs mt-1">Restaurante</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.estacionamiento) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Car size={16} />
                  <span className="text-xs mt-1">Estacionamiento</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.mascotas) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <PawPrint size={16} />
                  <span className="text-xs mt-1">Mascotas</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.centroNegocios) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Briefcase size={16} />
                  <span className="text-xs mt-1">Negocios</span>
                </div>
                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${(hotel.servicios && hotel.servicios.servicioHabitaciones) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                  <Coffee size={16} />
                  <span className="text-xs mt-1">Room Service</span>
                </div>
              </div>
              {/* Actions row */}
              <div className="mt-4 flex justify-end space-x-2">
                {hotel.id !== '1' && <button className="px-3 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
                  <Bookmark size={14} className="mr-1" />
                  Guardar
                </button>}
                <button className="px-3 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
                  <Eye size={14} className="mr-1" />
                  Ver Detalles
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
            Anterior
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
              Mostrando <span className="font-medium">1</span> a{' '}
              <span className="font-medium">{competidores.length}</span> de{' '}
              <span className="font-medium">15</span> resultados
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
                <span className="sr-only">Anterior</span>
                <ChevronRight size={16} className="transform rotate-180" />
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
                <span className="sr-only">Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorList;