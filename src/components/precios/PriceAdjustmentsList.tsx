import React from 'react';
import { DollarSign, HelpCircle } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
interface PriceAdjustmentsListProps {
  loading?: boolean;
}
const PriceAdjustmentsList: React.FC<PriceAdjustmentsListProps> = ({
  loading = true
}) => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <DollarSign size={18} className="text-blue-500 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white">
          Ajustes de Precios en Tiempo Real
        </h3>
        <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <HelpCircle size={14} title="Ajustes automáticos de precios basados en reglas y condiciones del mercado" />
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Estado actual de todos los tipos de habitación y sus ajustes automáticos
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Habitación
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Precio Base
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ajuste
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Precio Final
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Regla
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ?
          // Loading state
          Array(3).fill(0).map((_, index) => <tr key={index}>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-24" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-32" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-16" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton height="h-5" width="w-28" />
                    </td>
                  </tr>) : <>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Hotel Lucerna
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Suite
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200" data-bind="precioBaseSuite">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400" data-bind="ajusteSuite">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white" data-bind="precioFinalSuite">
                    —
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                      Fin de Semana
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Hotel Lucerna
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Queen Estándar
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200" data-bind="precioBaseQueen">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400" data-bind="ajusteQueen">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white" data-bind="precioFinalQueen">
                    —
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                      Evento Local
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Hotel Lucerna
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                    Doble Estándar
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200" data-bind="precioBaseDoble">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400" data-bind="ajusteDoble">
                    —
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white" data-bind="precioFinalDoble">
                    —
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full">
                      Protección Reservas
                    </span>
                  </td>
                </tr>
              </>}
          </tbody>
        </table>
      </div>
    </div>;
};
export default PriceAdjustmentsList;