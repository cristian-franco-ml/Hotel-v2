import React from 'react';
import { Radar, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const CompetitivePositionChart = () => {
  const {
    t
  } = useLanguage();
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Radar size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('competitive_position')}
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      {/* Radar chart placeholder */}
      <div className="h-64 relative">
        {/* Skeleton loading for chart */}
        <div className="animate-pulse flex flex-col h-full">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t('loading_radar')}
          </p>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('our_hotel')}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('competition')}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('target')}
          </span>
        </div>
      </div>
    </div>;
};
export default CompetitivePositionChart;