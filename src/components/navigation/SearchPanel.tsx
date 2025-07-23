import React, { useState } from 'react';
import { Search, Clock } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // TODO: Fetch from Supabase or user context
  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)]);
      }
      // Here you would trigger the actual search
      console.log(`Searching for: ${searchQuery}`);
    }
  };
  const handleRecentSearchClick = search => {
    setSearchQuery(search);
    // Optionally trigger search immediately
  };
  return <div className="p-4">
      <form onSubmit={handleSearch}>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <input type="text" placeholder="Buscar hoteles, métricas o ayuda…" className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </form>
      <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
          Búsquedas recientes
        </h4>
        <div className="space-y-2">
          {recentSearches.map((search, index) => <div key={index} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => handleRecentSearchClick(search)}>
              <Clock size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">{search}</span>
            </div>)}
        </div>
      </div>
    </div>;
};
export default SearchPanel;