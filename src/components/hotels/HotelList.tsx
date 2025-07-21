import React from 'react';
import { Star, ChevronRight, Edit, Bookmark, Clock, Eye, Wifi, Dumbbell, Waves, UtensilsCrossed, Car, PawPrint, Briefcase, Coffee } from 'lucide-react';
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
}
// Sample data for competitors
const competidores: HotelCompetitorProps[] = [{
  id: '1',
  nombre: 'Hotel Lucerna (Nosotros)',
  categoria: 5,
  distancia: 0,
  tarifaActual: 2450,
  cambioTarifa24h: 5.2,
  cambioTarifa7d: 8.5,
  nivelOcupacion: 'Alto',
  puntuacionReseñas: 9.2,
  elasticidadPrecios: 0.8,
  ultimaActualizacion: new Date(),
  servicios: {
    wifi: true,
    piscina: true,
    gimnasio: true,
    restaurante: true,
    estacionamiento: true,
    mascotas: true,
    centroNegocios: true,
    servicioHabitaciones: true
  }
}, {
  id: '2',
  nombre: 'Hotel Competidor A',
  categoria: 4,
  distancia: 0.8,
  tarifaActual: 2320,
  cambioTarifa24h: 2.1,
  cambioTarifa7d: -1.5,
  nivelOcupacion: 'Alto',
  puntuacionReseñas: 8.7,
  elasticidadPrecios: 0.7,
  ultimaActualizacion: new Date(),
  servicios: {
    wifi: true,
    piscina: true,
    gimnasio: true,
    restaurante: true,
    estacionamiento: true,
    mascotas: false,
    centroNegocios: false,
    servicioHabitaciones: true
  }
}, {
  id: '3',
  nombre: 'Hotel Competidor B',
  categoria: 5,
  distancia: 1.2,
  tarifaActual: 2650,
  cambioTarifa24h: -1.8,
  cambioTarifa7d: 3.2,
  nivelOcupacion: 'Medio',
  puntuacionReseñas: 9.0,
  elasticidadPrecios: 0.9,
  ultimaActualizacion: new Date(),
  servicios: {
    wifi: true,
    piscina: true,
    gimnasio: true,
    restaurante: true,
    estacionamiento: true,
    mascotas: true,
    centroNegocios: true,
    servicioHabitaciones: false
  }
}, {
  id: '4',
  nombre: 'Hotel Competidor C',
  categoria: 3,
  distancia: 2.5,
  tarifaActual: 1850,
  cambioTarifa24h: 0,
  cambioTarifa7d: 1.5,
  nivelOcupacion: 'Bajo',
  puntuacionReseñas: 7.8,
  elasticidadPrecios: 0.5,
  ultimaActualizacion: new Date(),
  servicios: {
    wifi: true,
    piscina: false,
    gimnasio: true,
    restaurante: false,
    estacionamiento: true,
    mascotas: false,
    centroNegocios: false,
    servicioHabitaciones: false
  }
}];
const CompetitorList = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
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
        {competidores.map(hotel => <div key={hotel.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${hotel.id === '1' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className={`font-medium ${hotel.id === '1' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>
                    {hotel.nombre}
                  </h4>
                  {hotel.id === '1' && <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                      NOSOTROS
                    </span>}
                </div>
                <div className="flex flex-wrap items-center mt-2 gap-4">
                  <div className="flex items-center text-sm">
                    <div className="flex text-yellow-400">
                      {Array(hotel.categoria).fill(0).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{hotel.distancia}</span>
                    <span className="ml-1">km</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${hotel.nivelOcupacion === 'Alto' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : hotel.nivelOcupacion === 'Medio' ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'}`}>
                      Ocupación {hotel.nivelOcupacion}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                      {hotel.puntuacionReseñas.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <div className="flex flex-col items-end">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ${hotel.tarifaActual}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs ${hotel.cambioTarifa24h > 0 ? 'text-green-600 dark:text-green-400' : hotel.cambioTarifa24h < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {hotel.cambioTarifa24h > 0 ? '+' : ''}
                      {hotel.cambioTarifa24h}% (24h)
                    </span>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className={`text-xs ${hotel.cambioTarifa7d > 0 ? 'text-green-600 dark:text-green-400' : hotel.cambioTarifa7d < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {hotel.cambioTarifa7d > 0 ? '+' : ''}
                      {hotel.cambioTarifa7d}% (7d)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Amenities grid */}
            <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2">
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.wifi ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <Wifi size={16} />
                <span className="text-xs mt-1">WiFi</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.piscina ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <Waves size={16} />
                <span className="text-xs mt-1">Piscina</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.gimnasio ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <Dumbbell size={16} />
                <span className="text-xs mt-1">Gimnasio</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.restaurante ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <UtensilsCrossed size={16} />
                <span className="text-xs mt-1">Restaurante</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.estacionamiento ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <Car size={16} />
                <span className="text-xs mt-1">Estacionamiento</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.mascotas ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <PawPrint size={16} />
                <span className="text-xs mt-1">Mascotas</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.centroNegocios ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                <Briefcase size={16} />
                <span className="text-xs mt-1">Negocios</span>
              </div>
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${hotel.servicios.servicioHabitaciones ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
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
          </div>)}
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
    </div>;
};
export default CompetitorList;