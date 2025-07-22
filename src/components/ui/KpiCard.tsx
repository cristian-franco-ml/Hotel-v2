import React from 'react';
import Skeleton from './Skeleton';
import { HelpCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Tooltip from './Tooltip';
interface KpiCardProps {
  title: string;
  value?: string | number;
  bindKey: string;
  unidad?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  showTrend?: boolean;
  trend?: number;
  formula?: string;
  loading?: boolean;
}
const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  bindKey,
  unidad = '',
  icon,
  iconColor = 'text-blue-500 dark:text-blue-400',
  bgColor = 'bg-blue-50 dark:bg-blue-900/30',
  borderColor = 'border-blue-500',
  showTrend = true,
  trend,
  formula,
  loading = !value
}) => {
  return <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border-l-4 ${borderColor} transform transition hover:shadow-md relative`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium text-sm mb-1">
            <span>{title}</span>
            {formula && <div className="ml-1">
                <Tooltip content={formula} position="top">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
                    <HelpCircle size={14} />
                  </button>
                </Tooltip>
              </div>}
          </div>
          {loading ? <div className="mt-1">
              <Skeleton height="h-8" width="w-24" className="mb-2" />
              <Skeleton height="h-4" width="w-32" />
            </div> : <>
              <div className="text-3xl font-bold text-gray-900 dark:text-white" data-bind={bindKey}>
                {value ? value : '—'}
                {unidad && <span className="text-lg ml-1">{unidad}</span>}
              </div>
              {showTrend && trend !== undefined && <div className={`flex items-center text-xs ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1`}>
                  {trend >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  <span>
                    {trend >= 0 ? '+' : ''}
                    {trend}%
                  </span>
                </div>}
            </>}
        </div>
        {icon && <div className={`${bgColor} p-3 rounded-full ${iconColor}`}>
            {icon}
          </div>}
      </div>
    </div>;
};
export default KpiCard;