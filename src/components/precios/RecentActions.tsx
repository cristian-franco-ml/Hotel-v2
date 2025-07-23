import React from 'react';
import { Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const RecentActions = () => {
  const {
    t
  } = useLanguage();
  const actions = [{
    time: '10:45 a.m.',
    action: 'increase',
    description: 'Aumentó precio Suite Hotel Lucerna',
    impact: '+$765 por noche',
    confidence: 94
  }, {
    time: '09:30 a.m.',
    action: 'increase',
    description: 'Aumentó precio Queen Estándar',
    impact: '+$418 por noche',
    confidence: 89
  }, {
    time: '08:15 a.m.',
    action: 'decrease',
    description: 'Redujo precio Doble Estándar',
    impact: 'Protegió 12 reservas',
    confidence: 85
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <Zap size={18} className="text-amber-500 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white">
          {t('recent_automatic_actions')}
        </h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t('last_auto_adjustments')}
      </p>
      <div className="space-y-4">
        {actions.map((action, index) => <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-start">
              <div className="text-xs text-gray-500 dark:text-gray-400 w-20">
                {action.time}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  {action.action === 'increase' ? <ArrowUp size={14} className="text-green-500 mr-1" /> : <ArrowDown size={14} className="text-red-500 mr-1" />}
                  <span className={`text-sm font-medium ${action.action === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {action.description}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {action.impact}
                </div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${action.confidence >= 90 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : action.confidence >= 80 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'}`}>
              {action.confidence}% conf.
            </div>
          </div>)}
      </div>
      <button className="mt-4 w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
        {t('view_all_actions')}
      </button>
    </div>;
};
export default RecentActions;