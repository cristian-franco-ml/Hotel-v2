import React from 'react';
interface ChartPlaceholderProps {
  height?: string;
  title?: string;
  mensaje?: string;
}
const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  height = 'h-64',
  title,
  mensaje = 'Cargando datos del gráfico...'
}) => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      {title && <div className="mb-4">
          <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
        </div>}
      <div className={`${height} relative`}>
        <div className="animate-pulse flex flex-col h-full">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{mensaje}</p>
        </div>
      </div>
    </div>;
};
export const TrendLine: React.FC<{
  placeholder?: boolean;
  title?: string;
}> = ({
  placeholder = true,
  title = 'Tendencia de Ingresos'
}) => {
  return placeholder ? <ChartPlaceholder title={title} /> : null;
};
export const RadarChart: React.FC<{
  placeholder?: boolean;
  title?: string;
}> = ({
  placeholder = true,
  title = 'Posición Competitiva'
}) => {
  return placeholder ? <ChartPlaceholder title={title} /> : null;
};
export const HeatMap: React.FC<{
  placeholder?: boolean;
  title?: string;
}> = ({
  placeholder = true,
  title = 'Mapa de Calor'
}) => {
  return placeholder ? <ChartPlaceholder title={title} /> : null;
};
export const WaterfallChart: React.FC<{
  placeholder?: boolean;
  title?: string;
}> = ({
  placeholder = true,
  title = 'Análisis de Cascada'
}) => {
  return placeholder ? <ChartPlaceholder title={title} /> : null;
};
export default ChartPlaceholder;