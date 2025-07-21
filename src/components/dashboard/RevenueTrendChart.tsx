import React, { useState } from 'react';
import { BarChart2, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const RevenueTrendChart = () => {
  const {
    t
  } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BarChart2 size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('revenue_performance')}
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <HelpCircle size={14} />
          </button>
          {showTooltip && <div className="absolute z-10 bg-gray-800 text-white text-xs rounded p-2 max-w-xs mt-1 ml-6">
              Evolución de ingresos comparados con la competencia en los últimos
              30 días
            </div>}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {t('our_hotel')}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {t('competition_average')}
            </span>
          </div>
        </div>
      </div>
      {/* Chart placeholder - in a real implementation, this would be a real chart */}
      <div className="h-64 relative">
        {/* Skeleton loading for chart */}
        <div className="animate-pulse flex flex-col h-full">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t('loading_chart_data')}
          </p>
        </div>
      </div>
      {/* Summary stats below chart */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('total_revenue')}
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            $1,458,320
          </div>
          <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
            <ArrowUp size={12} className="mr-1" />
            <span>+8.2% {t('vs_previous_month')}</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('average_daily_rate')}
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            $2,380
          </div>
          <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
            <ArrowUp size={12} className="mr-1" />
            <span>+$120 {t('vs_competition')}</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('average_occupancy')}
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            82.5%
          </div>
          <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-1">
            <ArrowDown size={12} className="mr-1" />
            <span>-1.2% {t('vs_previous_month')}</span>
          </div>
        </div>
      </div>
    </div>;
};
export default RevenueTrendChart;