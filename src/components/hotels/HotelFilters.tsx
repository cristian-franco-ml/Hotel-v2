import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Wifi, Dumbbell, Waves, UtensilsCrossed, Car, PawPrint, Briefcase, Coffee, Martini, X, BoxIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Hotel } from '../../types/hotel';
interface HotelFiltersProps {
  hotels: Hotel[];
  setFilteredHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
}
const HotelFilters: React.FC<HotelFiltersProps> = ({ hotels, setFilteredHotels }) => {
  const {
    t
  } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    id: string;
    label: string;
    value: string;
  }[]>([]);
  // Filtrado general
  const applyFilters = (query = searchQuery, price = priceFilter, rating = ratingFilter) => {
    let filtered = hotels;
    if (query) {
      filtered = filtered.filter(hotel =>
        (hotel.name?.toLowerCase().includes(query.toLowerCase()) || hotel.location?.toLowerCase().includes(query.toLowerCase()))
      );
    }
    if (price) {
      if (price === '$1,000 - $2,000') filtered = filtered.filter(hotel => hotel.averageRate >= 1000 && hotel.averageRate < 2000);
      if (price === '$2,000 - $3,000') filtered = filtered.filter(hotel => hotel.averageRate >= 2000 && hotel.averageRate < 3000);
      if (price === '$3,000 - $4,000') filtered = filtered.filter(hotel => hotel.averageRate >= 3000 && hotel.averageRate < 4000);
      if (price === '$4,000+') filtered = filtered.filter(hotel => hotel.averageRate >= 4000);
    }
    if (rating) {
      filtered = filtered.filter(hotel => hotel.stars === Number(rating));
    }
    setFilteredHotels(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, priceFilter, ratingFilter);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceFilter(value);
    applyFilters(searchQuery, value, ratingFilter);
    if (value) {
      const updatedFilters = activeFilters.filter(f => f.id !== 'price');
      setActiveFilters([...updatedFilters, { id: 'price', label: t('price'), value }]);
    } else {
      setActiveFilters(activeFilters.filter(f => f.id !== 'price'));
    }
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRatingFilter(value);
    applyFilters(searchQuery, priceFilter, value);
    if (value) {
      const updatedFilters = activeFilters.filter(f => f.id !== 'rating');
      setActiveFilters([...updatedFilters, { id: 'rating', label: t('stars'), value }]);
    } else {
      setActiveFilters(activeFilters.filter(f => f.id !== 'rating'));
    }
  };
  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    // Reset the corresponding filter
    if (filterId === 'price') {
      setPriceFilter('');
      applyFilters(searchQuery, '', ratingFilter);
    } else if (filterId === 'rating') {
      setRatingFilter('');
      applyFilters(searchQuery, priceFilter, '');
    }
  };
  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceFilter('');
    setRatingFilter('');
    setSearchQuery('');
    setFilteredHotels(hotels);
  };
  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return t('wifi');
      case 'gym':
        return t('gym');
      case 'pool':
        return t('pool');
      case 'restaurant':
        return t('restaurant');
      case 'parking':
        return t('parking');
      case 'pets':
        return t('pets');
      case 'business':
        return t('business_center');
      case 'roomservice':
        return t('room_service');
      case 'spa':
        return t('spa');
      case 'bar':
        return t('bar');
      default:
        return amenity;
    }
  };
  return <div className="space-y-4">
      <div className="flex items-center">
        <Filter size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
          {t('filters_and_search')}
        </h3>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t('active_filters')}:
          </span>
          {activeFilters.map(filter => <div key={filter.id} className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              <span>
                {filter.label}: {filter.value}
              </span>
              <button onClick={() => removeFilter(filter.id)} className="ml-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-200">
                <X size={12} />
              </button>
            </div>)}
          <button onClick={clearAllFilters} className="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-2">
            {t('clear_all')}
          </button>
        </div>}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <input type="text" placeholder={t('search_competitor_hotels')} className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300" value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <select className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors duration-300" value={priceFilter} onChange={handlePriceChange}>
              <option value="">{t('price_range')}</option>
              <option value="$1,000 - $2,000">$1,000 - $2,000</option>
              <option value="$2,000 - $3,000">$2,000 - $3,000</option>
              <option value="$3,000 - $4,000">$3,000 - $4,000</option>
              <option value="$4,000+">{t('above')} $4,000</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors duration-300" value={ratingFilter} onChange={handleRatingChange}>
              <option value="">{t('stars')}</option>
              <option value="5">5 {t('stars')}</option>
              <option value="4">4 {t('stars')}</option>
              <option value="3">3 {t('stars')}</option>
              <option value="2">2 {t('stars')}</option>
              <option value="1">1 {t('stars')}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Amenities filter */}
    </div>;
};
export default HotelFilters;