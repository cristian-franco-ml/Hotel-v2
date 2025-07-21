import React from 'react';
import { TrendingUp, Users, DollarSign, Percent, Award, Calendar, GitCompare } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
const ResumenKPIs = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Índice de Rendimiento de Ingresos (RPI) */}
      <KpiCard title="Índice de Rendimiento" bindKey="rpi" unidad="%" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="RPI = (RevPAR propio / RevPAR competencia) × 100" trend={3.5} />
      {/* Cuota de Mercado */}
      <KpiCard title="Cuota de Mercado" bindKey="marketShare" unidad="%" icon={<Percent size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Cuota = (Ingresos propios / Ingresos totales mercado) × 100" trend={1.2} />
      {/* Tarifa Diaria Promedio (TDP) */}
      <KpiCard title="Tarifa Promedio" bindKey="tdp" unidad="" icon={<DollarSign size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="TDP = Ingresos totales por habitaciones / Número de habitaciones ocupadas" trend={4.9} />
      {/* Ingresos por Habitación Disponible (RevPAR) */}
      <KpiCard title="RevPAR" bindKey="revpar" unidad="" icon={<DollarSign size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="RevPAR = Ingresos totales por habitaciones / Número total de habitaciones disponibles" trend={11.0} />
      {/* Tasa de Ocupación */}
      <KpiCard title="Tasa de Ocupación" bindKey="ocupacion" unidad="%" icon={<Users size={24} />} iconColor="text-indigo-500 dark:text-indigo-400" bgColor="bg-indigo-50 dark:bg-indigo-900/30" borderColor="border-indigo-500" formula="Ocupación = (Habitaciones ocupadas / Habitaciones disponibles) × 100" trend={7.0} />
      {/* Posición de Precios */}
      <KpiCard title="Posición de Precios" bindKey="priceRank" unidad="" icon={<Award size={24} />} iconColor="text-red-500 dark:text-red-400" bgColor="bg-red-50 dark:bg-red-900/30" borderColor="border-red-500" formula="Ranking de precios entre competidores en el mismo segmento" />
      {/* Puntuación de Impacto de Eventos */}
      <KpiCard title="Impacto de Eventos" bindKey="eventImpact" unidad="" icon={<Calendar size={24} />} iconColor="text-teal-500 dark:text-teal-400" bgColor="bg-teal-50 dark:bg-teal-900/30" borderColor="border-teal-500" formula="Puntuación ponderada de eventos próximos según asistencia esperada e impacto histórico" trend={12} />
      {/* Brecha Competitiva */}
      <KpiCard title="Brecha Competitiva" bindKey="brechaCompetitiva" unidad="" icon={<GitCompare size={24} />} iconColor="text-pink-500 dark:text-pink-400" bgColor="bg-pink-50 dark:bg-pink-900/30" borderColor="border-pink-500" formula="Diferencia promedio de precio entre tu hotel y los 3 competidores principales" trend={13.9} />
    </div>;
};
export default ResumenKPIs;