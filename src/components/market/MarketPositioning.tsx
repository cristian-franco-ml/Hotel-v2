import React from 'react';
import { Info } from 'lucide-react';
const MarketPositioning = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 dark:text-white">
          Nuestro Posicionamiento Actual
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Position Ranking */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Posición Competitiva
            </span>
            <button className="ml-1 text-gray-400 dark:text-gray-500">
              <Info size={14} />
            </button>
          </div>
          <div className="text-4xl font-bold text-blue-500 dark:text-blue-400 mb-1">
            #1
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Líder en el mercado
          </div>
        </div>
        {/* Market Share */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Market Share
            </span>
            <button className="ml-1 text-gray-400 dark:text-gray-500">
              <Info size={14} />
            </button>
          </div>
          <div className="relative w-24 h-24 mb-1">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="2" className="dark:stroke-gray-600" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="25, 100" strokeLinecap="round" className="dark:stroke-blue-400" />
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3b82f6" className="dark:fill-blue-400 font-bold">
                25
              </text>
            </svg>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              Market Share
            </span>
            <span className="text-blue-500 dark:text-blue-400 ml-1">+</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs. Prom. Comp. 23%
          </div>
        </div>
        {/* ADR */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ADR
            </span>
            <button className="ml-1 text-gray-400 dark:text-gray-500">
              <Info size={14} />
            </button>
          </div>
          <div className="relative w-24 h-24 mb-1">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="2" className="dark:stroke-gray-600" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="42, 100" strokeLinecap="round" className="dark:stroke-blue-400" />
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3b82f6" className="dark:fill-blue-400 font-bold">
                150
              </text>
            </svg>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              ADR
            </span>
            <span className="text-blue-500 dark:text-blue-400 ml-1">+</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs. Prom. Comp. $150
          </div>
        </div>
        {/* Ocupación */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Ocupación
            </span>
            <button className="ml-1 text-gray-400 dark:text-gray-500">
              <Info size={14} />
            </button>
          </div>
          <div className="relative w-24 h-24 mb-1">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="2" className="dark:stroke-gray-600" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="85, 100" strokeLinecap="round" className="dark:stroke-blue-400" />
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3b82f6" className="dark:fill-blue-400 font-bold">
                85
              </text>
            </svg>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              Ocupación
            </span>
            <span className="text-blue-500 dark:text-blue-400 ml-1">+</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs. Prom. Comp. 65%
          </div>
        </div>
        {/* RevPAR */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              RevPAR
            </span>
            <button className="ml-1 text-gray-400 dark:text-gray-500">
              <Info size={14} />
            </button>
          </div>
          <div className="relative w-24 h-24 mb-1">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="2" className="dark:stroke-gray-600" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="33, 100" strokeLinecap="round" className="dark:stroke-blue-400" />
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#3b82f6" className="dark:fill-blue-400 font-bold">
                120
              </text>
            </svg>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              RevPAR
            </span>
            <span className="text-blue-500 dark:text-blue-400 ml-1">+</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs. Prom. Comp. $120
          </div>
        </div>
      </div>
    </div>;
};
export default MarketPositioning;