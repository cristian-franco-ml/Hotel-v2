import React from 'react';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
const CompetitiveMetrics = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Precio Promedio Competencia */}
      <KpiCard title="Precio Promedio Competencia" bindKey="precioPromedioCompetencia" unidad="" icon={<DollarSign size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Promedio de tarifas de todos los competidores en el radio seleccionado" trend={1.8} />
      {/* Nuestro Diferencial */}
      <KpiCard title="Nuestro Diferencial" bindKey="nuestroDiferencial" unidad="" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Diferencia entre nuestra tarifa y el promedio de competidores" trend={7.5} />
      {/* Ocupación Estimada */}
      <KpiCard title="Ocupación Estimada" bindKey="ocupacionEstimada" unidad="%" icon={<Users size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Estimación basada en datos históricos y estacionalidad" trend={-3.2} />
      {/* Tiempo de Respuesta */}
      <KpiCard title="Tiempo de Respuesta" bindKey="tiempoRespuesta" unidad="h" icon={<Clock size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Tiempo promedio que tardan los competidores en ajustar precios" trend={-16.7} />
    </div>;
};
export default CompetitiveMetrics;