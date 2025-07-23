import React from 'react';
import { AlertCircle, TrendingUp, DollarSign, Lightbulb, ChevronRight } from 'lucide-react';
const KeyInsights = () => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-b border-blue-200 dark:border-blue-800/50">
        <div className="flex items-center">
          <Lightbulb size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-blue-800 dark:text-blue-300 text-lg">
            Insights y Recomendaciones Estratégicas
          </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Opportunity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/30">
              <div className="flex items-center">
                <DollarSign size={16} className="text-amber-600 dark:text-amber-400 mr-2" />
                <h4 className="font-medium text-amber-800 dark:text-amber-300">
                  Oportunidad de Precio
                </h4>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Tu ADR está <span className="font-medium">$10 por debajo</span>{' '}
                del promedio de la competencia para el próximo fin de semana.
                Considera un ajuste para maximizar ingresos.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Impacto estimado:{' '}
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    +8% RevPAR
                  </span>
                </span>
                <button className="text-amber-600 dark:text-amber-400 text-sm font-medium flex items-center hover:underline">
                  Aplicar
                  <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          {/* Occupancy Alert */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center">
                <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 mr-2" />
                <h4 className="font-medium text-blue-800 dark:text-blue-300">
                  Alerta de Ocupación
                </h4>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                La ocupación de un competidor clave subió{' '}
                <span className="font-medium">12%</span> esta semana. Monitorea
                su estrategia y ajusta tus promociones si es necesario.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Prioridad:{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    Media
                  </span>
                </span>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:underline">
                  Investigar
                  <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          {/* RevPAR Strength */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/30">
              <div className="flex items-center">
                <TrendingUp size={16} className="text-green-600 dark:text-green-400 mr-2" />
                <h4 className="font-medium text-green-800 dark:text-green-300">
                  Fortaleza de RevPAR
                </h4>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Tu RevPAR ha superado el promedio del mercado en un{' '}
                <span className="font-medium">8%</span> este mes. Continúa con
                la estrategia actual de precios y promociones.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Tendencia:{' '}
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Positiva
                  </span>
                </span>
                <button className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center hover:underline">
                  Ver detalles
                  <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default KeyInsights;