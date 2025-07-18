import React from 'react';
const TimeRangeFilter = ({
  selectedRange,
  onChange
}) => {
  const ranges = [{
    id: '7d',
    label: 'Última semana'
  }, {
    id: '14d',
    label: '2 semanas'
  }, {
    id: '30d',
    label: 'Último mes'
  }, {
    id: 'custom',
    label: 'Personalizado'
  }];
  return <div className="flex space-x-2">
      {ranges.map(range => <button key={range.id} className={`px-3 py-2 text-sm rounded-md ${selectedRange === range.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`} onClick={() => onChange(range.id)}>
          {range.label}
        </button>)}
    </div>;
};
export default TimeRangeFilter;