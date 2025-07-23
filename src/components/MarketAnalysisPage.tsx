import React, { useState } from 'react';
import Navigation from './Navigation';
import MarketPositioning from './market/MarketPositioning';
import CompetitorTable from './market/CompetitorTable';
import MarketTrends from './market/MarketTrends';
import KeyInsights from './market/KeyInsights';
import { Download, Filter } from 'lucide-react';
import DateRangeSelector from './ui/DateRangeSelector';
import KpiCard from './ui/KpiCard';
import { Building, TrendingUp, BarChart2, GitMerge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
const MarketAnalysisPage = () => {
  const {
    t
  } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState<number | null>(15); // minutes ago
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('market_analysis')}
            </h1>
            {lastUpdated !== null && <div className={`text-sm mt-1 ${lastUpdated > 60 ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {t('updated_ago')}{' '}
                <span data-bind="ultimaActualizacion">{lastUpdated}</span>{' '}
                {t('min_ago')}
              </div>}
          </div>
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <DateRangeSelector />
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-md flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                <Filter size={14} className="mr-1" />
                {t('filters')}
              </button>
              <button className="px-3 py-1 text-sm rounded-md flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                <Download size={14} className="mr-1" />
                {t('export')}
              </button>
            </div>
          </div>
        </div>
        {/* Key Insights - Moved to the top */}
        <div className="mb-6">
          <KeyInsights />
        </div>
        {/* Market KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard title={t('market_size')} bindKey="tamanoMercado" unidad=" hab." icon={<Building size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Número total de habitaciones disponibles en el mercado analizado" />
          <KpiCard title={t('market_growth')} bindKey="crecimientoMercado" unidad="%" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Cambio porcentual en el tamaño del mercado vs periodo anterior" trend={2.3} />
          <KpiCard title={t('concentration_hhi')} bindKey="hhi" unidad="" icon={<BarChart2 size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Índice Herfindahl-Hirschman, suma de cuadrados de participaciones de mercado" />
          <KpiCard title={t('competitor_movements')} bindKey="movimientosCompetencia" unidad="" icon={<GitMerge size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Entradas y salidas de competidores en los últimos 30 días" />
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
      </main>
    </div>;
};
export default MarketAnalysisPage;