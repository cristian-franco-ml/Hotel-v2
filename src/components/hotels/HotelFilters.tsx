import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
interface HotelFiltersProps {
  onSearch: (query: string) => void;
}
const HotelFilters: React.FC<HotelFiltersProps> = ({
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  return <div className="space-y-4">
      <div className="flex items-center">
        <Filter size={18} className="text-blue-500 mr-2" />
        <h3 className="font-medium text-gray-800">Filtros y Búsqueda</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input type="text" placeholder="Buscar hoteles por nombre..." className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <select className="appearance-none w-full bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Nombre</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none w-full bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Estrellas</option>
              <option value="5">5 Estrellas</option>
              <option value="4">4 Estrellas</option>
              <option value="3">3 Estrellas</option>
              <option value="2">2 Estrellas</option>
              <option value="1">1 Estrella</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none w-full bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Ubicación</option>
              <option value="mexico">México</option>
              <option value="cancun">Cancún</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="monterrey">Monterrey</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none w-full bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Estado</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <ArrowUpDown size={18} className="text-gray-500" />
        </button>
      </div>
    </div>;
};
export default HotelFilters;