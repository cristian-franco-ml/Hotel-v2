import React from 'react';
import { TrendingUp, CheckCircle, Zap } from 'lucide-react';
const KPISection = () => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Revenue KPI - Made larger and more prominent */}
      <div className="md:col-span-3 lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 transform transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm mb-1">
              <TrendingUp size={16} className="mr-1" />
              <span>Más Ingresos</span>
            </div>
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
              +38%
            </h2>
            <div className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
              Más Ingresos
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              vs. Precios Manuales
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-3 rounded-full">
            <TrendingUp size={24} className="text-green-500 dark:text-green-400" />
          </div>
        </div>
      </div>
      {/* Price Precision KPI */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 transform transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">
              <CheckCircle size={16} className="mr-1" />
              <span>Precisión de Precios</span>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              94%
            </h3>
            <div className="text-sm font-medium text-gray-800 dark:text-white mt-1">
              Precisión de Precios
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Excelente
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-full">
            <CheckCircle size={20} className="text-blue-500 dark:text-blue-400" />
          </div>
        </div>
      </div>
      {/* Automatic Adjustments KPI */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-amber-500 transform transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center text-amber-600 dark:text-amber-400 font-medium text-sm mb-1">
              <Zap size={16} className="mr-1" />
              <span>Ajustes Automáticos</span>
            </div>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              87
            </h3>
            <div className="text-sm font-medium text-gray-800 dark:text-white mt-1">
              Ajustes Automáticos
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Hoy
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900 p-3 rounded-full">
            <Zap size={20} className="text-amber-500 dark:text-amber-400" />
          </div>
        </div>
      </div>
    </div>;
};
export default KPISection;