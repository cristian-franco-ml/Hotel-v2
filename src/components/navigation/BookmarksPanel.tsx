import React, { useState } from 'react';
import { Search, Bookmark, Pin } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
const BookmarksPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return <div className="p-4">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
        <input type="text" placeholder="Buscar en guardados..." className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>
      <div>
        <div className="py-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Fijados
        </div>
        <div className="space-y-3 mb-6">
          {[1, 2].map(id => <div key={id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Skeleton height="h-10" width="w-full" />
            </div>)}
        </div>
      </div>
      <div>
        <div className="py-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Todos los guardados
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(id => <div key={id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Skeleton height="h-10" width="w-full" />
            </div>)}
        </div>
      </div>
    </div>;
};
export default BookmarksPanel;