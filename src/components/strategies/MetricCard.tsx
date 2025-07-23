import React from 'react';
import { HelpCircle } from 'lucide-react';
const MetricCard = ({
  icon,
  iconColor,
  bgColor,
  borderColor,
  title,
  value,
  subtitle,
  tooltipId,
  tooltipContent,
  showTooltip,
  onTooltipToggle,
  isPrimary = false
}) => {
  return <div className={`rounded-lg shadow-sm p-5 border-l-4 ${borderColor} bg-white dark:bg-gray-800 relative h-full`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h3 className={`${isPrimary ? 'text-lg' : 'text-base'} font-medium text-gray-700 dark:text-gray-200 mr-2`}>
              {title}
            </h3>
            <button onClick={onTooltipToggle} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Mostrar información">
              <HelpCircle size={16} />
            </button>
          </div>
          <div className={`${isPrimary ? 'text-3xl' : 'text-2xl'} font-bold mt-2 ${isPrimary ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </div>
        </div>
        <div className={`${bgColor} p-3 rounded-full ${iconColor}`}>{icon}</div>
      </div>
      {/* Tooltip */}
      {showTooltip && <div className="absolute z-10 bg-gray-800 text-white text-sm rounded-md p-3 shadow-lg mt-1 -left-1 w-64">
          {tooltipContent}
          <div className="absolute -top-2 left-5 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800"></div>
        </div>}
    </div>;
};
export default MetricCard;