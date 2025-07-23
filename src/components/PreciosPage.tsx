import React from 'react';
import Navigation from './Navigation';
import DateRangeSelector from './ui/DateRangeSelector';
import PriceAdjustmentsList from './precios/PriceAdjustmentsList';
import KpiCard from './ui/KpiCard';
import ChartPlaceholder, { TrendLine, HeatMap } from './ui/ChartPlaceholder';
import { DollarSign, Percent, BarChart2, TrendingUp, Calendar, Users } from 'lucide-react';
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
        {/* Primera fila de KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard title={t('base_rate')} bindKey="tarifaBase" unidad="" icon={<DollarSign size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Precio base antes de ajustes dinámicos" />
          <KpiCard title={t('event_premium')} bindKey="primaEventos" unidad="%" icon={<Percent size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Incremento de precio debido a eventos locales" />
          <KpiCard title={t('competitor_avg_price')} bindKey="precioCompetencia" unidad="" icon={<DollarSign size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Promedio de precios de competidores similares" />
          <KpiCard title={t('price_variance')} bindKey="varianzaPrecios" unidad="%" icon={<BarChart2 size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Desviación estándar de precios en el mercado" />
        </div>
        {/* Segunda fila de KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard title={t('demand_forecast_7d')} bindKey="pronosticoDemanda7d" unidad="%" icon={<Users size={24} />} iconColor="text-indigo-500 dark:text-indigo-400" bgColor="bg-indigo-50 dark:bg-indigo-900/30" borderColor="border-indigo-500" formula="Ocupación prevista para los próximos 7 días" />
          <KpiCard title={t('demand_forecast_30d')} bindKey="pronosticoDemanda30d" unidad="%" icon={<Calendar size={24} />} iconColor="text-teal-500 dark:text-teal-400" bgColor="bg-teal-50 dark:bg-teal-900/30" borderColor="border-teal-500" formula="Ocupación prevista para los próximos 30 días" />
          <KpiCard title={t('price_demand_elasticity')} bindKey="elasticidadPrecioDemanda" unidad="" icon={<TrendingUp size={24} />} iconColor="text-red-500 dark:text-red-400" bgColor="bg-red-50 dark:bg-red-900/30" borderColor="border-red-500" formula="Cambio porcentual en demanda / Cambio porcentual en precio" />
          <KpiCard title={t('revenue_impact_metric')} bindKey="impactoIngresos" unidad="" icon={<DollarSign size={24} />} iconColor="text-pink-500 dark:text-pink-400" bgColor="bg-pink-50 dark:bg-pink-900/30" borderColor="border-pink-500" formula="Estimación del impacto en ingresos de los ajustes actuales" />
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrendLine placeholder title={t('price_trend')} />
          </div>
          <div className="lg:col-span-1">
            <HeatMap placeholder title={t('events_calendar_impact')} />
          </div>
        </div>
        <div className="mb-6">
          <ChartPlaceholder title={t('market_price_distribution')} height="h-80" />
        </div>
        {/* Price Adjustments List */}
        <div className="mb-6">
          <PriceAdjustmentsList />
        </div>
      </main>
    </div>;
};
export default PreciosPage;