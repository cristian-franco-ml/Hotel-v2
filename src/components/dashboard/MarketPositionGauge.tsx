import React from 'react';
import { Gauge, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const MarketPositionGauge = () => {
  const {
    t
  } = useLanguage();
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Gauge size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('market_position')}
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      {/* Gauge chart placeholder */}
      <div className="h-48 relative">
        {/* Skeleton loading for gauge */}
        <div className="animate-pulse flex flex-col h-full">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t('loading_position')}
          </p>
        </div>
      </div>
      {/* Gauge legend */}
      <div className="flex justify-between px-4 mt-2">
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('low')}
          </span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('medium')}
          </span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('high')}
          </span>
        </div>
      </div>
      {/* Current position */}
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-gray-800 dark:text-white">
          {t('premium_position')}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('premium_position_desc')}
        </p>
      </div>
    </div>;
};
export default MarketPositionGauge;