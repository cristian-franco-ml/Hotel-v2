import React from 'react';
import { GitCompare, HelpCircle } from 'lucide-react';
const CompetitorPriceComparison = () => {
  // Placeholder data for competitor comparison
  const competitors = [{
    id: 1,
    name: 'Hotel Lucerna (Nosotros)',
    price: 2450,
    change: '+5.2%',
    isUs: true
  }, {
    id: 2,
    name: 'Hotel Competidor A',
    price: 2320,
    change: '+2.1%',
    isUs: false
  }, {
    id: 3,
    name: 'Hotel Competidor B',
    price: 2180,
    change: '-1.5%',
    isUs: false
  }, {
    id: 4,
    name: 'Hotel Competidor C',
    price: 2650,
    change: '+3.8%',
    isUs: false
  }, {
    id: 5,
    name: 'Hotel Competidor D',
    price: 2080,
    change: '+0.5%',
    isUs: false
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <GitCompare size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            Comparativa de Precios
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tarifa Actual
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cambio 24h
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Diferencia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {competitors.map(competitor => <tr key={competitor.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${competitor.isUs ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`text-sm font-medium ${competitor.isUs ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                      {competitor.name}
                    </div>
                    {competitor.isUs && <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                        NOSOTROS
                      </span>}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`text-sm ${competitor.isUs ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    ${competitor.price}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`text-sm ${competitor.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {competitor.change}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {!competitor.isUs && <div className={`text-sm ${competitor.price < competitors[0].price ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {competitor.price < competitors[0].price ? `-$${competitors[0].price - competitor.price}` : `+$${competitor.price - competitors[0].price}`}
                    </div>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">
          Resumen de Posicionamiento
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tu hotel está posicionado como el 3º más caro de 15 hoteles en un
          radio de 10km. El precio actual está 5.6% por encima del promedio del
          mercado.
        </p>
      </div>
    </div>;
};
export default CompetitorPriceComparison;