import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Wifi, Dumbbell, Waves, UtensilsCrossed, Car, PawPrint, Briefcase, Coffee, Martini, X, BoxIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
interface HotelFiltersProps {
  onSearch: (query: string) => void;
}
const HotelFilters: React.FC<HotelFiltersProps> = ({
  onSearch
}) => {
  const {
    t
  } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    id: string;
    label: string;
    value: string;
  }[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
      setActiveFilters(activeFilters.filter(f => f.id !== `amenity-${amenity}`));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
      setActiveFilters([...activeFilters, {
        id: `amenity-${amenity}`,
        label: t('amenity'),
        value: getAmenityLabel(amenity)
      }]);
    }
  };
  const handleDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDistanceFilter(value);
    if (value) {
      // Remove existing distance filter if any
      const updatedFilters = activeFilters.filter(f => f.id !== 'distance');
      // Add new distance filter
      setActiveFilters([...updatedFilters, {
        id: 'distance',
        label: t('distance'),
        value: `${value} km`
      }]);
    } else {
      // Remove distance filter
      setActiveFilters(activeFilters.filter(f => f.id !== 'distance'));
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceFilter(value);
    if (value) {
      // Remove existing price filter if any
      const updatedFilters = activeFilters.filter(f => f.id !== 'price');
      // Add new price filter
      setActiveFilters([...updatedFilters, {
        id: 'price',
        label: t('price'),
        value
      }]);
    } else {
      // Remove price filter
      setActiveFilters(activeFilters.filter(f => f.id !== 'price'));
    }
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRatingFilter(value);
    if (value) {
      // Remove existing rating filter if any
      const updatedFilters = activeFilters.filter(f => f.id !== 'rating');
      // Add new rating filter
      setActiveFilters([...updatedFilters, {
        id: 'rating',
        label: t('rating'),
        value
      }]);
    } else {
      // Remove rating filter
      setActiveFilters(activeFilters.filter(f => f.id !== 'rating'));
    }
  };
  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    // Reset the corresponding filter
    if (filterId === 'distance') {
      setDistanceFilter('');
    } else if (filterId === 'price') {
      setPriceFilter('');
    } else if (filterId === 'rating') {
      setRatingFilter('');
    } else if (filterId.startsWith('amenity-')) {
      const amenity = filterId.replace('amenity-', '');
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };
  const clearAllFilters = () => {
    setActiveFilters([]);
    setDistanceFilter('');
    setPriceFilter('');
    setRatingFilter('');
    setSelectedAmenities([]);
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
            <select className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200 transition-colors duration-300" value={distanceFilter} onChange={handleDistanceChange}>
              <option value="">{t('distance')}</option>
              <option value="1">0-1 km</option>
              <option value="3">0-3 km</option>
              <option value="5">0-5 km</option>
              <option value="10">0-10 km</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
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
              <option value="">{t('rating')}</option>
              <option value="9+ Excellent">9+ {t('excellent')}</option>
              <option value="8-9 Very Good">8-9 {t('very_good')}</option>
              <option value="7-8 Good">7-8 {t('good')}</option>
              <option value="Less than 7">{t('less_than')} 7</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Amenities filter */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 py-1">
          {t('amenities')}:
        </span>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('wifi') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('wifi')}>
          <Wifi size={14} className="mr-1" />
          {t('wifi')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('gym') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('gym')}>
          <Dumbbell size={14} className="mr-1" />
          {t('gym')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('pool') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('pool')}>
          <Waves size={14} className="mr-1" />
          {t('pool')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('restaurant') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('restaurant')}>
          <UtensilsCrossed size={14} className="mr-1" />
          {t('restaurant')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('parking') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('parking')}>
          <Car size={14} className="mr-1" />
          {t('parking')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('pets') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('pets')}>
          <PawPrint size={14} className="mr-1" />
          {t('pets')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('business') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('business')}>
          <Briefcase size={14} className="mr-1" />
          {t('business_center')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('roomservice') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('roomservice')}>
          <Coffee size={14} className="mr-1" />
          {t('room_service')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('spa') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('spa')}>
          <BoxIcon size={14} className="mr-1" />
          {t('spa')}
        </button>
        <button className={`flex items-center px-3 py-1 rounded-full text-xs ${selectedAmenities.includes('bar') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'} border transition-colors duration-300`} onClick={() => toggleAmenity('bar')}>
          <Martini size={14} className="mr-1" />
          {t('bar')}
        </button>
      </div>
    </div>;
};
export default HotelFilters;