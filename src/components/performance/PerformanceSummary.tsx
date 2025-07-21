import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle, BarChart2 } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
const PerformanceSummary = () => {
  const loading = false; // TODO: Set loading state based on Supabase fetch
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Accuracy Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Precisión Media
            </div>
            <div className="mt-1 flex items-end">
              {loading ? <Skeleton height="h-8" width="w-24" /> : <>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300" data-bind="precisionMedia">
                    —
                  </div>
                  <div className="ml-2 flex items-center text-green-500">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-xs" data-bind="cambioEnPrecision">
                      —
                    </span>
                  </div>
                </>}
            </div>
          </div>
          <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg transition-colors duration-300">
            <CheckCircle size={20} className="text-green-500 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden transition-colors duration-300">
          {loading ? <div className="h-1 bg-gray-300 dark:bg-gray-500 animate-pulse" style={{
          width: '70%'
        }}></div> : <div className="h-1 bg-green-500" style={{
          width: '96.8%'
        }} data-bind="barraProgresoPrecision"></div>}
        </div>
      </div>
      {/* Forecasts Generated Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Forecasts Generados
            </div>
            <div className="mt-1 flex items-end">
              {loading ? <Skeleton height="h-8" width="w-16" /> : <div className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300" data-bind="forecastsGenerados">
                  —
                </div>}
            </div>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-300">
            <BarChart2 size={20} className="text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Último periodo: <span data-bind="forecastsUltimoPeriodo">—</span>
          </div>
          {loading ? <Skeleton height="h-4" width="w-16" /> : <div className="text-xs flex items-center text-green-500">
              <TrendingUp size={14} className="mr-1" />
              <span data-bind="cambioPorcentualForecasts">—</span>
            </div>}
        </div>
      </div>
      {/* Adjustments Applied Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Ajustes Aplicados
            </div>
            <div className="mt-1 flex items-end">
              {loading ? <Skeleton height="h-8" width="w-32" /> : <>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300" data-bind="ajustesAplicados">
                    —
                  </div>
                  <div className="ml-2 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300" data-bind="totalAjustes">
                    de —
                  </div>
                </>}
            </div>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg transition-colors duration-300">
            <CheckCircle size={20} className="text-amber-500 dark:text-amber-400" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden transition-colors duration-300">
          {loading ? <div className="h-1 bg-amber-300 dark:bg-amber-500 animate-pulse" style={{
          width: '60%'
        }}></div> : <div className="h-1 bg-amber-500" data-bind="barraProgresoAjustes" style={{
          width: '57.8%'
        }}></div>}
        </div>
      </div>
      {/* Revenue Impact Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Impacto en Ingresos
            </div>
            <div className="mt-1 flex items-end">
              {loading ? <Skeleton height="h-8" width="w-32" /> : <div className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300" data-bind="impactoIngresos">
                  —
                </div>}
            </div>
          </div>
          <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg transition-colors duration-300">
            <TrendingUp size={20} className="text-green-500 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            ROI estimado
          </div>
          {loading ? <Skeleton height="h-4" width="w-12" /> : <div className="text-xs font-medium text-gray-800 dark:text-white transition-colors duration-300" data-bind="roiEstimado">
              —
            </div>}
        </div>
      </div>
    </div>;
};
export default PerformanceSummary;