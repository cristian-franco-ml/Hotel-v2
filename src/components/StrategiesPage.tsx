import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import KpiCard from './ui/KpiCard';
import SafetyLimits from './strategies/SafetyLimits';
import PrioritySystem from './strategies/PrioritySystem';
import RulesList from './strategies/RulesList';
import Toast from './ui/Toast';
import DateRangeSelector from './ui/DateRangeSelector';
import { DollarSign, CheckSquare, FileEdit, Plus, Info, AlertTriangle, Gauge, TrendingUp, BarChart2, Zap } from 'lucide-react';
import ChartPlaceholder from './ui/ChartPlaceholder';
import Skeleton from './ui/Skeleton';
import { useLanguage } from '../contexts/LanguageContext';
const StrategiesPage = () => {
  const {
    t
  } = useLanguage();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(null);
  const [tarifaWhatIf, setTarifaWhatIf] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data loaded successfully
        setIsLoading(false);
      } catch (error) {
        // Only show error if there's an actual network error
        setErrorMessage(error.message || t('loading_error'));
        setShowError(true);
        setIsLoading(false);
      }
    };
    loadData();
  }, [t]);
  const dismissError = () => {
    setShowError(false);
  };
  const toggleTooltip = id => {
    setShowTooltip(showTooltip === id ? null : id);
  };
  // Format numbers to have at most 2 decimal places
  const formatNumber = num => {
    return Number(num.toFixed(2));
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      {/* Error Toast - Only shown when there's an actual error */}
      {showError && <Toast message={errorMessage || t('loading_error')} type="error" onDismiss={dismissError} />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('optimization_strategies')}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <DateRangeSelector />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors">
              <Plus size={18} className="mr-2" />
              {t('create_new_rule')}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Estrategia Actual */}
          <KpiCard title={t('current_strategy')} bindKey="estrategiaActual" icon={<Zap size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Estrategia de optimización actualmente aplicada" />
          {/* Score Elasticidad */}
          <KpiCard title={t('elasticity_score')} bindKey="elasticidadScore" unidad="/100" icon={<Gauge size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Puntuación de sensibilidad al precio en el mercado actual" trend={2.1} />
          {/* ROI Estrategia */}
          <KpiCard title={t('roi_strategy')} bindKey="roiEstrategia" unidad="x" icon={<TrendingUp size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Retorno sobre la inversión de la estrategia actual" trend={8.5} />
          {/* Volatilidad del Mercado */}
          <KpiCard title={t('market_volatility')} bindKey="volatilidad" unidad="%" icon={<BarChart2 size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Desviación estándar de cambios de precio en el mercado" trend={-3.2} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column with rules list */}
          <div className="lg:col-span-2">
            <RulesList />
          </div>
          {/* Right column with Safety Limits and Priority System */}
          <div className="lg:col-span-1 space-y-6">
            {/* What-If Simulator */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <DollarSign size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {t('what_if_simulator')}
                </h3>
                <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Info size={14} title="Simula el impacto de cambios de precio en las métricas clave" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('rate_adjustment')}:{' '}
                  {tarifaWhatIf > 0 ? `+${tarifaWhatIf}%` : tarifaWhatIf < 0 ? `${tarifaWhatIf}%` : '0%'}
                </label>
                <input type="range" min="-20" max="20" step="1" value={tarifaWhatIf} onChange={e => setTarifaWhatIf(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" data-bind="tarifaWhatIf" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>-20%</span>
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('revenue_impact')}:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white" data-bind="impactoIngresos">
                    {tarifaWhatIf === 0 ? '—' : `${tarifaWhatIf > 0 ? '+' : ''}${formatNumber(tarifaWhatIf * 0.8)}%`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('occupancy_change')}:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white" data-bind="cambioOcupacion">
                    {tarifaWhatIf === 0 ? '—' : `${tarifaWhatIf > 0 ? '-' : '+'}${formatNumber(Math.abs(tarifaWhatIf * 0.4))}%`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('new_revpar')}:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white" data-bind="nuevoRevpar">
                    {tarifaWhatIf === 0 ? '—' : `${tarifaWhatIf > 0 ? '+' : ''}${formatNumber(tarifaWhatIf * 0.6)}%`}
                  </span>
                </div>
              </div>
            </div>
            {/* Risk Evaluation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <AlertTriangle size={18} className="text-amber-500 dark:text-amber-400 mr-2" />
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {t('risk_evaluation')}
                </h3>
                <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Info size={14} title="Evaluación del riesgo de la estrategia actual" />
                </button>
              </div>
              <div className="h-48 relative">
                {isLoading ? <>
                    <Skeleton height="h-full" rounded="rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t('loading_risk')}
                      </p>
                    </div>
                  </> : <div className="h-full flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-8 border-amber-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-500">
                          42%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('risk_medium')}
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
              <div className="flex justify-between px-4 mt-4 text-sm">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {t('low_risk')}
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {t('medium_risk')}
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {t('high_risk')}
                  </span>
                </div>
              </div>
            </div>
            <SafetyLimits minPrice={1200} maxPrice={6000} />
            <PrioritySystem />
          </div>
        </div>
      </main>
    </div>;
};
export default StrategiesPage;