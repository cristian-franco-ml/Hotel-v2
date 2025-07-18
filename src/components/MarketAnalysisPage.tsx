import React, { useState } from 'react';
import Navigation from './Navigation';
import MarketPositioning from './market/MarketPositioning';
import CompetitorTable from './market/CompetitorTable';
import MarketTrends from './market/MarketTrends';
import KeyInsights from './market/KeyInsights';
import { Calendar, Download, Filter } from 'lucide-react';
const MarketAnalysisPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            📊 Mercado & Análisis
          </h1>
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                Hoy
              </button>
              <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white">
                Últimos 7 días
              </button>
              <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                Este Mes
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-md flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                <Calendar size={14} className="mr-1" />
                Personalizar
              </button>
              <button className="px-3 py-1 text-sm rounded-md flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                <Filter size={14} className="mr-1" />
                Filtros
              </button>
              <button className="px-3 py-1 text-sm rounded-md flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                <Download size={14} className="mr-1" />
                Exportar
              </button>
            </div>
          </div>
        </div>
        {/* Market Positioning Section */}
        <div className="mb-6">
          <MarketPositioning />
        </div>
        {/* Competitor Table */}
        <div className="mb-6">
          <CompetitorTable />
        </div>
        {/* Market Trends */}
        <div className="mb-6">
          <MarketTrends />
        </div>
        {/* Key Insights */}
        <div>
          <KeyInsights />
        </div>
      </main>
    </div>;
};
export default MarketAnalysisPage;