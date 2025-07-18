import React, { useState } from 'react';
import Navigation from './Navigation';
import HotelFilters from './hotels/HotelFilters';
import HotelList from './hotels/HotelList';
import EmptyState from './hotels/EmptyState';
import AddHotelButton from './hotels/AddHotelButton';
import { Hotel } from '../types/hotel';
const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredHotels(hotels);
      return;
    }
    const filtered = hotels.filter(hotel => hotel.name.toLowerCase().includes(query.toLowerCase()) || hotel.location.toLowerCase().includes(query.toLowerCase()));
    setFilteredHotels(filtered);
  };
  const handleAddHotel = (hotel: Hotel) => {
    const updatedHotels = [...hotels, hotel];
    setHotels(updatedHotels);
    setFilteredHotels(updatedHotels);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Gestión de Hoteles
            </h1>
            <p className="text-gray-600 mt-1">
              Administra y visualiza información detallada de todos los hoteles
            </p>
          </div>
          <AddHotelButton onAddHotel={handleAddHotel} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <HotelFilters onSearch={handleSearch} />
        </div>
        {filteredHotels.length > 0 ? <HotelList hotels={filteredHotels} /> : <EmptyState />}
      </main>
    </div>;
};
export default HotelsPage;