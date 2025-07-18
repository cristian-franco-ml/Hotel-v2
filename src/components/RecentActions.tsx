import React from 'react';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';
const RecentActions = () => {
  return <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex items-center mb-4">
        <Zap size={18} className="text-amber-500 mr-2" />
        <h3 className="font-medium text-gray-800">
          Acciones Automáticas Recientes
        </h3>
      </div>
      <div className="space-y-4">
        <div className="border-l-2 border-green-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">2024-07-03</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
              Ajuste
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={14} className="text-green-500 mr-2" />
            <p className="text-sm text-gray-700">
              Ajuste automático de tarifa en Hotel Lucerna
            </p>
          </div>
        </div>
        <div className="border-l-2 border-yellow-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">2024-07-02</span>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
              Alerta
            </span>
          </div>
          <div className="flex items-center">
            <AlertCircle size={14} className="text-yellow-500 mr-2" />
            <p className="text-sm text-gray-700">
              Nueva alerta de demanda alta
            </p>
          </div>
        </div>
        {/* Additional recent actions for better visual */}
        <div className="border-l-2 border-blue-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">2024-07-01</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              Integración
            </span>
          </div>
          <div className="flex items-center">
            <AlertCircle size={14} className="text-blue-500 mr-2" />
            <p className="text-sm text-gray-700">
              Sincronización completada con PMS
            </p>
          </div>
        </div>
        <div className="border-l-2 border-green-500 pl-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">2024-06-30</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
              Ajuste
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={14} className="text-green-500 mr-2" />
            <p className="text-sm text-gray-700">
              Optimización de precios para fin de semana
            </p>
          </div>
        </div>
      </div>
      <button className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
        Ver todas las acciones
      </button>
    </div>;
};
export default RecentActions;