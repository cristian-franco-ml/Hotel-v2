import React, { useState, Component } from 'react';
import Navigation from './Navigation';
import PerformanceSummary from './performance/PerformanceSummary';
import PerformanceTabs from './performance/PerformanceTabs';
import DateRangeSelector from './ui/DateRangeSelector';
import { FileDown, FileText } from 'lucide-react';
import ChartPlaceholder, { WaterfallChart } from './ui/ChartPlaceholder';
import KpiCard from './ui/KpiCard';
import { TrendingUp, DollarSign, Award, BarChart2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
const PerformancePage = () => {
  const {
    t
  } = useLanguage();
  const [activeTab, setActiveTab] = useState('precision');
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {t('performance_analysis')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('detailed_metrics')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <DateRangeSelector />
            <div className="flex gap-2">
              <button className="flex items-center px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <FileDown size={16} className="mr-1" />
                Excel
              </button>
              <button className="flex items-center px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <FileText size={16} className="mr-1" />
                PDF
              </button>
            </div>
          </div>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard title={t('revenue_growth_mom')} bindKey="ingresosMoM" unidad="%" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Porcentaje de cambio en ingresos vs mes anterior" trend={8.2} />
          <KpiCard title={t('adr_performance')} bindKey="adrPerf" unidad="%" icon={<DollarSign size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Tarifa Diaria Promedio vs objetivo" trend={5.5} />
          <KpiCard title={t('revpar_trend')} bindKey="revparTrend" unidad="%" icon={<BarChart2 size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Tendencia de Ingresos por Habitación Disponible" trend={6.7} />
          <KpiCard title={t('market_share_evolution')} bindKey="marketShareTrend" unidad="%" icon={<Award size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Cambio en participación de mercado" trend={1.8} />
        </div>
        {/* Competitive Index and Optimization Score chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full flex items-center">
            <span className="font-medium mr-1">{t('competitive_index')}</span>
            <span data-bind="indiceCompetitivo">—</span>
          </div>
          <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full flex items-center">
            <span className="font-medium mr-1">{t('optimization_score')}</span>
            <span data-bind="puntuacionOptimizacion">—</span>
          </div>
        </div>
        {/* Summary section */}
        <PerformanceSummary />
        {/* Tabs section - sticky on scroll */}
        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 py-2">
          <PerformanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'precision' && <div className="space-y-6">
              <PrecisionAnalysisSection />
            </div>}
          {activeTab === 'roi' && <div className="space-y-6">
              <WaterfallChart placeholder title="Análisis de ROI por Componente" />
            </div>}
          {activeTab === 'confianza' && <div className="space-y-6">
              <ChartPlaceholder title="Niveles de Confianza por Segmento" height="h-80" />
            </div>}
          {activeTab === 'forecasts' && <div className="space-y-6">
              <ChartPlaceholder title="Pronósticos Futuros" height="h-80" />
            </div>}
        </div>
      </main>
    </div>;
};
// Precision Analysis Section with Accordion
const PrecisionAnalysisSection = () => {
  const {
    t
  } = useLanguage();
  const [expandedSection, setExpandedSection] = useState('week');
  const toggleSection = section => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 ${expandedSection === 'week' ? 'border-blue-500' : 'border-transparent'}`} onClick={() => toggleSection('week')}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800 dark:text-white">
              {t('last_week')}
            </span>
            <div className="ml-3 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
              <span data-bind="precisionSemana">—</span>% {t('precision')}
            </div>
          </div>
          <div className="text-gray-400 dark:text-gray-500">
            {expandedSection === 'week' ? '▼' : '▶'}
          </div>
        </div>
        {expandedSection === 'week' && <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    {t('predicted')}{' '}
                    <span data-bind="valorPredichoSemana">—</span>%
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {t('actual')} <span data-bind="valorRealSemana">—</span>%
                  </span>
                  <span className="flex items-center text-red-500 dark:text-red-400">
                    <span className="mr-1">▼</span> {t('variation')}{' '}
                    <span data-bind="variacionSemana">—</span>%
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('analysis_factors')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <FactorChip text="Evento Mana predicho correctamente" type="success" />
                    <FactorChip text="Demanda baseline acertada" type="success" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('performance_metrics')}
                </h4>
                <div className="space-y-4">
                  <MetricBar label={t('prediction_accuracy')} bindKey="precisionPrediccionSemana" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {t('confidence_level')}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm rounded">
                      <span data-bind="nivelConfianzaSemana">—</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {t('absolute_error')}
                    </span>
                    <span className="text-red-500 dark:text-red-400 font-medium" data-bind="errorAbsolutoSemana">
                      —
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 ${expandedSection === 'twoweeks' ? 'border-blue-500' : 'border-transparent'}`} onClick={() => toggleSection('twoweeks')}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800 dark:text-white">
              {t('last_two_weeks')}
            </span>
            <div className="ml-3 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
              <span data-bind="precisionDosSemanas">—</span>% {t('precision')}
            </div>
          </div>
          <div className="text-gray-400 dark:text-gray-500">
            {expandedSection === 'twoweeks' ? '▼' : '▶'}
          </div>
        </div>
        {expandedSection === 'twoweeks' && <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <p className="mt-4">{t('loading_analysis_data')}</p>
            </div>
          </div>}
      </div>
    </div>;
};
// Factor Chip Component
const FactorChip = ({
  text,
  type
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };
  return <div className={`px-3 py-1 rounded-full text-xs border ${getTypeStyles()}`}>
      {text}
    </div>;
};
// Metric Bar Component
const MetricBar = ({
  label,
  value,
  bindKey
}) => {
  const getBarColor = () => {
    if (value >= 95) return 'bg-green-500';
    if (value >= 90) return 'bg-blue-500';
    if (value >= 80) return 'bg-amber-500';
    return 'bg-red-500';
  };
  return <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-medium text-gray-800 dark:text-white" data-bind={bindKey}>
          {value ? `${value}%` : '—'}
        </span>
      </div>
      {value ? <>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div className={`${getBarColor()} h-2 rounded-full`} style={{
          width: `${value}%`
        }}></div>
          </div>
          <div className="flex items-center justify-end gap-0.5 h-3 mt-1">
            {[92, 94, 91, 95, 97, 96, 97.9].map((val, i) => <div key={i} className={`w-1 ${val >= 95 ? 'bg-green-400' : 'bg-blue-400'}`} style={{
          height: `${val / 100 * 12}px`
        }}></div>)}
          </div>
        </> : <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-500 h-2 rounded-full w-3/4"></div>
        </div>}
    </div>;
};
export default PerformancePage;