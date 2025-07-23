import React from 'react';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';
const RecentActions = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <Zap size={18} className="text-amber-500 dark:text-amber-400 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white">
          Acciones Automáticas Recientes
        </h3>
      </div>
      <div className="space-y-4">
        <div className="border-l-2 border-green-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2024-07-03
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
              Ajuste
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={14} className="text-green-500 dark:text-green-400 mr-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Ajuste automático de tarifa en Hotel Lucerna
            </p>
          </div>
        </div>
        <div className="border-l-2 border-yellow-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2024-07-02
            </span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs px-2 py-0.5 rounded-full">
              Alerta
            </span>
          </div>
          <div className="flex items-center">
            <AlertCircle size={14} className="text-yellow-500 dark:text-yellow-400 mr-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Nueva alerta de demanda alta
            </p>
          </div>
        </div>
        {/* Additional recent actions for better visual */}
        <div className="border-l-2 border-blue-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2024-07-01
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
              Integración
            </span>
          </div>
          <div className="flex items-center">
            <AlertCircle size={14} className="text-blue-500 dark:text-blue-400 mr-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Sincronización completada con PMS
            </p>
          </div>
        </div>
        <div className="border-l-2 border-green-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2024-06-30
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
              Ajuste
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={14} className="text-green-500 dark:text-green-400 mr-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Optimización de precios para fin de semana
            </p>
          </div>
        </div>
      </div>
      <button className="mt-4 w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
        Ver todas las acciones
      </button>
    </div>;
};
export default RecentActions;