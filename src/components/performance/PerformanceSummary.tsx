import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
const PerformanceSummary = ({
  timeRange
}) => {
  // Different summary data based on selected time range
  const getSummaryData = () => {
    switch (timeRange) {
      case '7d':
        return {
          precision: 97.9,
          trend: 2.1,
          trendDirection: 'up',
          correctPredictions: 87,
          totalPredictions: 89
        };
      case '14d':
        return {
          precision: 94.8,
          trend: 1.3,
          trendDirection: 'up',
          correctPredictions: 164,
          totalPredictions: 173
        };
      case '30d':
        return {
          precision: 93.2,
          trend: 0.8,
          trendDirection: 'up',
          correctPredictions: 335,
          totalPredictions: 359
        };
      default:
        return {
          precision: 97.9,
          trend: 2.1,
          trendDirection: 'up',
          correctPredictions: 87,
          totalPredictions: 89
        };
    }
  };
  const data = getSummaryData();
  return <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-800">
            Resumen de Rendimiento
          </h2>
          <p className="text-sm text-gray-500">
            {timeRange === '7d' && 'Última semana'}
            {timeRange === '14d' && 'Últimas 2 semanas'}
            {timeRange === '30d' && 'Último mes'}
          </p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <Clock size={16} className="text-blue-500 mr-1" />
          <span className="text-sm text-gray-500">
            Actualizado hace 2 horas
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Precision KPI */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Precisión Promedio
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {data.precision}%
              </div>
            </div>
            <div className={`flex items-center ${data.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {data.trendDirection === 'up' ? <>
                  <TrendingUp size={16} className="mr-1" />
                  <span>+{data.trend}%</span>
                </> : <>
                  <TrendingUp size={16} className="mr-1 transform rotate-180" />
                  <span>-{data.trend}%</span>
                </>}
            </div>
          </div>
          {/* Mini sparkline */}
          <div className="flex items-end justify-between gap-0.5 h-6 mt-3">
            {[92, 94, 91, 95, 97, 96, data.precision].map((val, i) => <div key={i} className={`w-full ${val >= 95 ? 'bg-green-400' : val >= 90 ? 'bg-blue-400' : 'bg-amber-400'}`} style={{
            height: `${val / 100 * 24}px`
          }}></div>)}
          </div>
        </div>
        {/* Predictions KPI */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">
            Predicciones Correctas
          </div>
          <div className="flex items-end">
            <div className="text-2xl font-bold text-green-600">
              {data.correctPredictions}
            </div>
            <div className="text-sm text-gray-500 ml-1 mb-1">
              / {data.totalPredictions}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{
            width: `${data.correctPredictions / data.totalPredictions * 100}%`
          }}></div>
          </div>
        </div>
        {/* Status KPI */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">Estado del Sistema</div>
          <div className="flex items-center mt-1">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span className="font-medium text-gray-800">
              Funcionando Correctamente
            </span>
          </div>
          <div className="flex items-center mt-3">
            <CheckCircle size={16} className="text-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              Última validación: hace 2h
            </span>
          </div>
        </div>
        {/* Alert KPI */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">Alertas Activas</div>
          <div className="flex items-center mt-1">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="font-medium text-gray-800">1 Alerta Menor</span>
          </div>
          <div className="flex items-center mt-3">
            <AlertTriangle size={16} className="text-amber-500 mr-2" />
            <span className="text-sm text-gray-600">
              Verificar evento gastronómico
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-700">
          <strong>Resumen:</strong> En{' '}
          {timeRange === '7d' ? 'la última semana' : timeRange === '14d' ? 'las últimas 2 semanas' : 'el último mes'}
          , la precisión promedio fue <strong>{data.precision}%</strong> con una
          mejora del <strong>{data.trend}%</strong>. El sistema predijo
          correctamente <strong>{data.correctPredictions}</strong> de{' '}
          <strong>{data.totalPredictions}</strong> eventos.
        </div>
      </div>
    </div>;
};
export default PerformanceSummary;