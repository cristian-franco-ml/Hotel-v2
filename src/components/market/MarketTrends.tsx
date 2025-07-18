import React from 'react';
import { Info } from 'lucide-react';
const MarketTrends = () => {
  return <div>
      <div className="flex items-center mb-4">
        <h3 className="font-medium text-gray-800 dark:text-white">
          Tendencias de Mercado
        </h3>
        <button className="ml-1 text-gray-400 dark:text-gray-500">
          <Info size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">
            Precio: Hotel Lucerna vs Competencia
          </h4>
          <div className="mb-2 text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
            PRECIO
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              HOTEL LUCERNA VS COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              $2,550
            </div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
              <span className="mr-1">↑</span>
              +2.5% vs ayer
            </div>
          </div>
          <div className="h-16 mb-4 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 rounded-sm relative">
              <div className="absolute bottom-full left-0 right-0 h-8 border-b border-dashed border-blue-400 dark:border-blue-300"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              PROMEDIO COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              $2,550
            </div>
            <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-1">
              <span className="mr-1">↓</span>
              -1.2% vs ayer
            </div>
          </div>
          <div className="h-16 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400 rounded-sm"></div>
          </div>
        </div>
        {/* Occupancy Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">
            Ocupación: Hotel Lucerna vs Competencia
          </h4>
          <div className="mb-2 text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
            OCUPACIÓN
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              HOTEL LUCERNA VS COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              $1,445
            </div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
              <span className="mr-1">↑</span>
              +1.2% vs ayer
            </div>
          </div>
          <div className="h-16 mb-4 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 rounded-sm relative">
              <div className="absolute bottom-full left-0 right-0 h-8 border-b border-dashed border-blue-400 dark:border-blue-300"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              PROMEDIO COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              $1,445
            </div>
            <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-1">
              <span className="mr-1">↓</span>
              -0.8% vs ayer
            </div>
          </div>
          <div className="h-16 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400 rounded-sm"></div>
          </div>
        </div>
        {/* RevPAR Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">
            RevPAR: Hotel Lucerna vs Competencia
          </h4>
          <div className="mb-2 text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
            REVPAR
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              HOTEL LUCERNA VS COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              $2,040
            </div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
              <span className="mr-1">↑</span>
              +2.5% vs ayer
            </div>
          </div>
          <div className="h-16 mb-4 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 rounded-sm relative">
              <div className="absolute bottom-full left-0 right-0 h-8 border-b border-dashed border-blue-400 dark:border-blue-300"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              PROMEDIO COMPETENCIA
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              $2,040
            </div>
            <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-1">
              <span className="mr-1">↓</span>
              -1.2% vs ayer
            </div>
          </div>
          <div className="h-16 flex items-end">
            <div className="flex-1 h-8 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>;
};
export default MarketTrends;