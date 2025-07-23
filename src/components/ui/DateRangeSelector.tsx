import React from 'react';
import { Calendar } from 'lucide-react';
import { useDateRange } from '../../contexts/DateRangeContext';
const DateRangeSelector: React.FC = () => {
  const {
    dateRange,
    setDateRange
  } = useDateRange();
  return <div className="flex space-x-2">
      <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '1d' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`} onClick={() => setDateRange('1d')}>
        Hoy
      </button>
      <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`} onClick={() => setDateRange('7d')}>
        Últimos 7 días
      </button>
      <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`} onClick={() => setDateRange('30d')}>
        Últimos 30 días
      </button>
      <button className={`px-3 py-1 text-sm rounded-md flex items-center ${dateRange === 'custom' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`} onClick={() => setDateRange('custom')}>
        <Calendar size={14} className="mr-1" />
        Personalizado
      </button>
    </div>;
};
export default DateRangeSelector;