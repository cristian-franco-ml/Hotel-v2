import React from 'react';
import { BarChart2, DollarSign, ShieldCheck, Calendar } from 'lucide-react';
const PerformanceTabs = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [{
    id: 'precision',
    label: 'Precisión Forecasts',
    icon: <BarChart2 size={18} />
  }, {
    id: 'roi',
    label: 'ROI & Performance',
    icon: <DollarSign size={18} />
  }, {
    id: 'confianza',
    label: 'Confianza & Validación',
    icon: <ShieldCheck size={18} />
  }, {
    id: 'forecasts',
    label: 'Forecasts Futuros',
    icon: <Calendar size={18} />
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 flex overflow-x-auto border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      {tabs.map(tab => <button key={tab.id} className={`flex items-center px-4 py-3 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-300 ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => setActiveTab(tab.id)}>
          <span className={`mr-2 ${activeTab === tab.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {tab.icon}
          </span>
          {tab.label}
        </button>)}
    </div>;
};
export default PerformanceTabs;