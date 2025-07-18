import React from 'react';
import { Star } from 'lucide-react';
const CompetitorTable = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ranking
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Establecimiento
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ocupa
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Satisfacción
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                RevPAR
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Market Share
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ajuste
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Hotel Lucerna Row */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                #1
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Hotel Lucerna
                  </div>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                    NUESTRO
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  $150
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '85%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    85%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current opacity-50" />
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                $120
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '25%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    25%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                +5%
              </td>
            </tr>
            {/* Competitor B Row */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #2
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Hotel Competidor B
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  $160
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '80%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    80%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current opacity-50" />
                  <Star size={16} className="fill-current opacity-50" />
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                $120
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '20%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    20%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                +5%
              </td>
            </tr>
            {/* Competitor C Row */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #3
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Hotel Competidor C
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  $140
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '90%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    90%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current opacity-50" />
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                $120
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                    width: '30%'
                  }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    30%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                +5%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Time Range Filter */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-center space-x-2">
        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md">
          Últimos 7 días
        </button>
        <button className="px-3 py-1 text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-md">
          Últimos 30 días
        </button>
        <button className="px-3 py-1 text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-md">
          Personalizado
        </button>
      </div>
    </div>;
};
export default CompetitorTable;