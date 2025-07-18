import React, { useState } from 'react';
import Navigation from './Navigation';
import MetricCard from './strategies/MetricCard';
import SafetyLimits from './strategies/SafetyLimits';
import PrioritySystem from './strategies/PrioritySystem';
import RulesList from './strategies/RulesList';
import Toast from './ui/Toast';
import { DollarSign, CheckSquare, FileEdit, Plus, Info, AlertTriangle } from 'lucide-react';
const StrategiesPage = () => {
  const [showError, setShowError] = useState(true);
  const [showTooltip, setShowTooltip] = useState(null);
  const dismissError = () => {
    setShowError(false);
  };
  const toggleTooltip = id => {
    setShowTooltip(showTooltip === id ? null : id);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <Navigation />
      {/* Error Toast */}
      {showError && <Toast message="NetworkError when attempting to fetch resource" type="error" onDismiss={dismissError} />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            🎯 Estrategias de Optimización
          </h1>
          <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors">
            <Plus size={18} className="mr-2" />
            Crear Nueva Regla
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Revenue Potential - Primary Metric */}
          <div className="md:col-span-1">
            <MetricCard icon={<DollarSign size={24} />} iconColor="text-green-500" bgColor="bg-green-50" borderColor="border-green-400" title="Potencial de Ingresos" value="+$15,240" subtitle="basado en reglas activas" tooltipId="revenue" tooltipContent="Estimación de ingresos adicionales basada en las reglas de optimización actualmente activas" showTooltip={showTooltip === 'revenue'} onTooltipToggle={() => toggleTooltip('revenue')} isPrimary={true} />
          </div>
          {/* Active Rules */}
          <div className="md:col-span-1">
            <MetricCard icon={<CheckSquare size={22} />} iconColor="text-blue-500" bgColor="bg-blue-50" borderColor="border-blue-300" title="Reglas Activas" value="7" subtitle="optimizando precios" tooltipId="active" tooltipContent="Número de reglas actualmente aplicadas para optimizar precios" showTooltip={showTooltip === 'active'} onTooltipToggle={() => toggleTooltip('active')} />
          </div>
          {/* Draft Rules */}
          <div className="md:col-span-1">
            <MetricCard icon={<FileEdit size={22} />} iconColor="text-amber-500" bgColor="bg-amber-50" borderColor="border-amber-300" title="Reglas en Borrador" value="1" subtitle="pendientes de activar" tooltipId="draft" tooltipContent="Reglas creadas pero aún no activadas en el sistema" showTooltip={showTooltip === 'draft'} onTooltipToggle={() => toggleTooltip('draft')} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column with rules list */}
          <div className="lg:col-span-2">
            <RulesList />
          </div>
          {/* Right column with Safety Limits and Priority System */}
          <div className="lg:col-span-1 space-y-6">
            <SafetyLimits minPrice={1200} maxPrice={6000} />
            <PrioritySystem />
          </div>
        </div>
      </main>
    </div>;
};
export default StrategiesPage;