import React from 'react';
import Navigation from './Navigation';
import DateRangeSelector from './ui/DateRangeSelector';
import PriceAdjustmentsList from './precios/PriceAdjustmentsList';
import { TrendLine } from './ui/ChartPlaceholder';
import { useLanguage } from '../contexts/LanguageContext';
const PreciosPage = () => {
  const {
    t
  } = useLanguage();
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('real_time_prices')}
          </h1>
          <DateRangeSelector />
        </div>
        {/* Tendencia de precios: nosotros vs competidores (TrendLine) - ahora hasta arriba */}
        <div className="mb-6">
          <TrendLine placeholder title={t('price_trend')} />
        </div>
        {/* Price Adjustments List */}
        <div className="mb-6">
          <PriceAdjustmentsList />
        </div>
      </main>
    </div>;
};
export default PreciosPage;