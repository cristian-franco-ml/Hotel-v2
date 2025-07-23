import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const EmptyState = ({
  mensaje,
  cta
}) => {
  const {
    t
  } = useLanguage();
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-10 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors duration-300">
          <FileText size={40} className="text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2 transition-colors duration-300">
        {mensaje || t('no_competitors_found')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
        {t('adjust_filters_or_radius')}
      </p>
      {cta && <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300" onClick={cta.onClick}>
          {cta.label || t('update_data')}
        </button>}
    </div>;
};
export default EmptyState;