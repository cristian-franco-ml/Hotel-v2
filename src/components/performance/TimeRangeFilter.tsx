import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
const TimeRangeFilter = ({
  selectedRange,
  onChange
}) => {
  const {
    t
  } = useLanguage();
  const ranges = [{
    id: '7d',
    label: t('last_week')
  }, {
    id: '14d',
    label: t('two_weeks')
  }, {
    id: '30d',
    label: t('last_month')
  }, {
    id: 'custom',
    label: t('custom')
  }];
  return <div className="flex space-x-2">
      {ranges.map(range => <button key={range.id} className={`px-3 py-2 text-sm rounded-md transition-colors duration-300 ${selectedRange === range.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`} onClick={() => onChange(range.id)}>
          {range.label}
        </button>)}
    </div>;
};
export default TimeRangeFilter;