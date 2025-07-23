import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import HotelFilters from './hotels/HotelFilters';
import HotelList from './hotels/HotelList';
import EmptyState from './ui/EmptyState';
import CompetitiveMetrics from './hotels/CompetitiveMetrics';
import { Hotel } from '../types/hotel';
import DateRangeSelector from './ui/DateRangeSelector';
import { FileDown, Map, List } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Skeleton from './ui/Skeleton';
import { supabase } from '../supabaseClient';
const HotelsPage = () => {
  const {
    t
  } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      // Obtener el user_id del usuario autenticado
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const userId = user?.id;
      console.log('[DEBUG] userId usado para fetch:', userId);
      if (!userId) {
        setHotels([]);
        setFilteredHotels([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hotels?user_id=${userId}`);
      const data = await res.json();
      console.log('[DEBUG] Hoteles recibidos del backend:', data);
      setHotels(data || []);
      setFilteredHotels(data || []);
      setLoading(false);
    }
    fetchHotels();
  }, []);
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
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full transition-colors duration-300">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                {t('competitive_intelligence')}
              </h1>
              <button className="ml-3 px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                {t('create_alert')}
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
              {t('monitoring_competitors')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <DateRangeSelector />
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 flex items-center">
                <FileDown size={14} className="mr-1" />
                {t('export')}
              </button>
              {/* View mode toggle */}
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md flex overflow-hidden">
                <button className={`px-3 py-1 text-sm flex items-center ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`} onClick={() => setViewMode('table')}>
                  <List size={14} className="mr-1" />
                  {t('table')}
                </button>
                <button className={`px-3 py-1 text-sm flex items-center ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`} onClick={() => setViewMode('map')}>
                  <Map size={14} className="mr-1" />
                  {t('map')}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Competitive Metrics */}
        <div className="mb-6">
          <CompetitiveMetrics />
        </div>
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <HotelFilters hotels={hotels} setFilteredHotels={setFilteredHotels} />
        </div>
        {/* Hotels List or Map View */}
        {viewMode === 'table' ? <HotelList /> : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                {t('loading_competitor_map')}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>;
};
export default HotelsPage;