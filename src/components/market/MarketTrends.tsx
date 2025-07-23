import React from 'react';
import { Info } from 'lucide-react';
import { TrendLine } from '../ui/ChartPlaceholder';
import Tooltip from '../ui/Tooltip';
import { useLanguage } from '../../contexts/LanguageContext';
const MarketTrends = () => {
  const {
    t
  } = useLanguage();
  return <div>
      <div className="flex items-center mb-4">
        <h3 className="font-medium text-gray-800 dark:text-white">
          {t('market_trends')}
        </h3>
        <div className="ml-1">
          <Tooltip content={t('market_trends_tooltip')}>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <Info size={14} />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Trend */}
        <TrendLine placeholder title={t('price_trend_vs_competition')} />
        {/* Occupancy Trend */}
        <TrendLine placeholder title={t('occupancy_trend_vs_competition')} />
        {/* RevPAR Trend */}
        <TrendLine placeholder title={t('revpar_trend_vs_competition')} />
      </div>
    </div>;
};
export default MarketTrends;