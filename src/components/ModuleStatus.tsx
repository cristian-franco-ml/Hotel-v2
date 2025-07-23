import React from 'react';
import { Activity, AlertCircle, Link } from 'lucide-react';
const ModuleStatus = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Activity size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white">
          Estado de Módulos del Sistema
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pricing Engine
            </span>
          </div>
          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
            Activo
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Alertas
            </span>
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full">
            No hay alertas
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Integraciones
            </span>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
            Sincronizado
          </span>
        </div>
      </div>
    </div>;
};
export default ModuleStatus;