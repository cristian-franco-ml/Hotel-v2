import React from 'react';
import Navigation from './Navigation';
import KPICard from './precios/KPICard';
import PriceAdjustmentsList from './precios/PriceAdjustmentsList';
import RecentActions from './precios/RecentActions';
const PreciosPage = () => {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            💰 Precios en Tiempo Real
          </h1>
          <div className="flex space-x-2 mt-3 md:mt-0">
            <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              Hoy
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white">
              Últimas 24h
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              Esta Semana
            </button>
          </div>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard title="Ajustes Automáticos Hoy" value="23" change="+2%" changeType="positive" icon="adjustments" />
          <KPICard title="Impacto en Ingresos" value="+$85,200" change="+12.5%" changeType="positive" icon="revenue" />
          <KPICard title="Tiempo Promedio Respuesta" value="12" suffix="min" change="-5%" changeType="negative" icon="time" />
          <KPICard title="Próxima Revisión" value="8" suffix="min" icon="next" />
        </div>
        {/* Price Adjustments List */}
        <div className="mb-6">
          <PriceAdjustmentsList />
        </div>
        {/* Recent Actions */}
        <div>
          <RecentActions />
        </div>
      </main>
    </div>;
};
export default PreciosPage;