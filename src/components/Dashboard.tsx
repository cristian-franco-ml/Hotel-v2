import React from 'react';
import Navigation from './Navigation';
import ResumenKPIs from './dashboard/ResumenKPIs';
import RevenueTrendChart from './dashboard/RevenueTrendChart';
import { RadarChart } from './ui/ChartPlaceholder';
import EventCalendar from './dashboard/EventCalendar';
import CompetitorPriceComparison from './dashboard/CompetitorPriceComparison';
import { useDateRange } from '../contexts/DateRangeContext';
import DateRangeSelector from './ui/DateRangeSelector';
import { useLanguage } from '../contexts/LanguageContext';
const Dashboard = () => {
  const {
    dateRange
  } = useDateRange();
  const {
    t
  } = useLanguage();
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full transition-colors duration-300">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('executive_pricing_panel')}
            </h1>
          </div>
          <DateRangeSelector />
        </div>
        {/* Estado del sistema */}
        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-6 flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-700 dark:text-green-300">
            {t('pricing_intelligence_system')}{' '}
          </span>
          <span className="ml-1 text-green-700 dark:text-green-300 font-medium">
            {t('active')}
          </span>
          <span className="ml-2 text-green-700 dark:text-green-300 text-sm">
            ({t('last_update')})
          </span>
        </div>
        {/* KPIs principales */}
        <ResumenKPIs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Columna izquierda con gráficos principales */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueTrendChart />
            <CompetitorPriceComparison />
          </div>
          {/* Columna derecha con posición competitiva, eventos y posición de mercado */}
          <div className="lg:col-span-1 space-y-6">
            <RadarChart placeholder />
            <EventCalendar />
          </div>
        </div>
      </main>
    </div>;
};
export default Dashboard;