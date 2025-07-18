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
  return <div className="bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto">
      {tabs.map(tab => <button key={tab.id} className={`flex items-center px-4 py-3 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab(tab.id)}>
          <span className={`mr-2 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`}>
            {tab.icon}
          </span>
          {tab.label}
        </button>)}
    </div>;
};
export default PerformanceTabs;