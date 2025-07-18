import React, { useState, Component } from 'react';
import Navigation from './Navigation';
import PerformanceSummary from './performance/PerformanceSummary';
import PerformanceTabs from './performance/PerformanceTabs';
import TimeRangeFilter from './performance/TimeRangeFilter';
import { FileDown, FileText } from 'lucide-react';
const PerformancePage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('precision');
  return <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              📊 Análisis de Rendimiento
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Métricas detalladas sobre precisión y desempeño del sistema
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <TimeRangeFilter selectedRange={timeRange} onChange={setTimeRange} />
            <div className="flex gap-2">
              <button className="flex items-center px-3 py-2 text-sm rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
                <FileDown size={16} className="mr-1" />
                Excel
              </button>
              <button className="flex items-center px-3 py-2 text-sm rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
                <FileText size={16} className="mr-1" />
                PDF
              </button>
            </div>
          </div>
        </div>
        {/* Summary section */}
        <PerformanceSummary timeRange={timeRange} />
        {/* Tabs section - sticky on scroll */}
        <div className="sticky top-0 z-10 bg-gray-50 py-2">
          <PerformanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'precision' && <div className="space-y-6">
              <PrecisionAnalysisSection timeRange={timeRange} />
            </div>}
          {activeTab === 'roi' && <div className="p-8 bg-white rounded-lg shadow-sm text-center text-gray-500">
              Contenido de ROI & Performance
            </div>}
          {activeTab === 'confianza' && <div className="p-8 bg-white rounded-lg shadow-sm text-center text-gray-500">
              Contenido de Confianza & Validación
            </div>}
          {activeTab === 'forecasts' && <div className="p-8 bg-white rounded-lg shadow-sm text-center text-gray-500">
              Contenido de Forecasts Futuros
            </div>}
        </div>
      </main>
    </div>;
};
// Precision Analysis Section with Accordion
const PrecisionAnalysisSection = ({
  timeRange
}) => {
  const [expandedSection, setExpandedSection] = useState('week');
  const toggleSection = section => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${expandedSection === 'week' ? 'border-blue-500' : 'border-transparent'}`} onClick={() => toggleSection('week')}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Última semana</span>
            <div className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              97.9% precisión
            </div>
          </div>
          <div className="text-gray-400">
            {expandedSection === 'week' ? '▼' : '▶'}
          </div>
        </div>
        {expandedSection === 'week' && <div className="p-4 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Predicho: 145%</span>
                  <span className="text-gray-600">Real: 142%</span>
                  <span className="flex items-center text-red-500">
                    <span className="mr-1">▼</span> Variación: -2.1%
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Factores de Análisis
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <FactorChip text="Evento Mana predicho correctamente" type="success" />
                    <FactorChip text="Demanda baseline acertada" type="success" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Métricas de Performance
                </h4>
                <div className="space-y-4">
                  <MetricBar label="Precisión de Predicción" value={97.9} />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nivel de Confianza</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                      Alta
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Error Absoluto</span>
                    <span className="text-red-500 font-medium">2.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${expandedSection === 'twoweeks' ? 'border-blue-500' : 'border-transparent'}`} onClick={() => toggleSection('twoweeks')}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Últimas 2 semanas</span>
            <div className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              94.8% precisión
            </div>
          </div>
          <div className="text-gray-400">
            {expandedSection === 'twoweeks' ? '▼' : '▶'}
          </div>
        </div>
        {expandedSection === 'twoweeks' && <div className="p-4 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Predicho: 128%</span>
                  <span className="text-gray-600">Real: 135%</span>
                  <span className="flex items-center text-green-500">
                    <span className="mr-1">▲</span> Variación: +5.5%
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Factores de Análisis
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <FactorChip text="Evento gastronómico subestimado" type="warning" />
                    <FactorChip text="Turismo fronterizo por encima" type="info" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Métricas de Performance
                </h4>
                <div className="space-y-4">
                  <MetricBar label="Precisión de Predicción" value={94.8} />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nivel de Confianza</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                      Alta
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Error Absoluto</span>
                    <span className="text-amber-500 font-medium">5.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${expandedSection === 'month' ? 'border-blue-500' : 'border-transparent'}`} onClick={() => toggleSection('month')}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">Último mes</span>
            <div className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              93.2% precisión
            </div>
          </div>
          <div className="text-gray-400">
            {expandedSection === 'month' ? '▼' : '▶'}
          </div>
        </div>
        {expandedSection === 'month' && <div className="p-4 border-t border-gray-100">
            <div className="p-8 text-center text-gray-500">
              Contenido detallado del último mes
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
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };
  return <div className={`px-3 py-1 rounded-full text-xs border ${getTypeStyles()}`}>
      {text}
    </div>;
};
// Metric Bar Component
const MetricBar = ({
  label,
  value
}) => {
  const getBarColor = () => {
    if (value >= 95) return 'bg-green-500';
    if (value >= 90) return 'bg-blue-500';
    if (value >= 80) return 'bg-amber-500';
    return 'bg-red-500';
  };
  return <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${getBarColor()} h-2 rounded-full`} style={{
        width: `${value}%`
      }}></div>
      </div>
      {/* Mini sparkline chart (simplified visual representation) */}
      <div className="flex items-center justify-end gap-0.5 h-3 mt-1">
        {[92, 94, 91, 95, 97, 96, 97.9].map((val, i) => <div key={i} className={`w-1 ${val >= 95 ? 'bg-green-400' : 'bg-blue-400'}`} style={{
        height: `${val / 100 * 12}px`
      }}></div>)}
      </div>
    </div>;
};
export default PerformancePage;