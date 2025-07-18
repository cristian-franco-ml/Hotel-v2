import React from 'react';
import { AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
const KeyInsights = () => {
  return <div>
      <div className="flex items-center mb-4">
        <div className="text-amber-500 dark:text-amber-400 mr-2">💡</div>
        <h3 className="font-medium text-gray-800 dark:text-white">
          Insights Clave y Recomendaciones
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Opportunity */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-amber-500 dark:text-amber-400">
              <DollarSign size={18} />
            </div>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
                Oportunidad de Precio
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-200 mb-2">
                Tu ADR está $10 por debajo del promedio de la competencia para
                el próximo fin de semana. Considera un ajuste para maximizar
                ingresos.
              </p>
              <div className="text-xs text-amber-600 dark:text-amber-300 font-medium">
                Acción recomendada: Ajustar precios para fin de semana
              </div>
            </div>
          </div>
        </div>
        {/* Occupancy Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-blue-500 dark:text-blue-400">
              <AlertCircle size={18} />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                Alerta de Ocupación
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                La ocupación de un competidor clave subió 12% esta semana.
                Monitorea su estrategia y ajusta tus promociones si es
                necesario.
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-300 font-medium">
                Acción recomendada: Monitorear promociones de competidores
              </div>
            </div>
          </div>
        </div>
        {/* RevPAR Strength */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-start">
            <div className="mr-3 mt-1 text-green-500 dark:text-green-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                Fortaleza de RevPAR
              </h4>
              <p className="text-sm text-green-700 dark:text-green-200 mb-2">
                Tu RevPAR ha superado el promedio del mercado en un 8% este mes.
                ¡Sigue así y mantén la estrategia!
              </p>
              <div className="text-xs text-green-600 dark:text-green-300 font-medium">
                Acción recomendada: Mantener estrategia actual
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default KeyInsights;