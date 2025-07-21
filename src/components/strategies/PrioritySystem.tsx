import React from 'react';
import { ArrowUp, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const PrioritySystem = () => {
  const {
    t
  } = useLanguage();
  const priorityLevels = [{
    level: t('high_priority'),
    color: 'bg-red-500',
    description: t('critical_safety_rules')
  }, {
    level: t('medium_priority'),
    color: 'bg-amber-500',
    description: t('revenue_optimization')
  }, {
    level: t('low_priority'),
    color: 'bg-blue-500',
    description: t('seasonal_adjustments')
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ArrowUp size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('priority_system')}
          </h3>
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Info size={14} className="mr-1" />
          {t('applies_first')}
        </div>
      </div>
      <div className="space-y-3 mt-4">
        {priorityLevels.map((priority, index) => <div key={index} className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${priority.color} mr-3`}></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {priority.level}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {index === 0 ? t('applies_first') : ''}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {priority.description}
              </div>
            </div>
          </div>)}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {t('priority_conflict_rule')}
        </div>
      </div>
    </div>;
};
export default PrioritySystem;