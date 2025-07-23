import React from 'react';
import { Tag, Calendar, DollarSign, BarChart2, AlertTriangle, Plus } from 'lucide-react';
const RulesList = () => {
  // Sample rules data
  const rules = []; // TODO: Fetch from Supabase if rules are stored there
  // Empty state if no rules
  if (rules.length === 0) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto flex items-center justify-center mb-4">
          <Tag size={24} className="text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          No hay reglas configuradas
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Crea tu primera regla de optimización para empezar a aumentar tus
          ingresos
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center">
          <Plus size={16} className="mr-2" />
          Crear Primera Regla
        </button>
      </div>;
  }
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-medium text-gray-800 dark:text-white">
          Reglas de Optimización
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {rules.map(rule => <div key={rule.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {rule.name}
                  </h4>
                  <div className={`ml-2 px-2 py-0.5 rounded-full text-xs ${rule.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'}`}>
                    {rule.status === 'active' ? 'Activa' : 'Borrador'}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {rule.type === 'temporal' && <Calendar size={14} className="text-blue-500 dark:text-blue-400 mr-1" />}
                  {rule.type === 'evento' && <Tag size={14} className="text-purple-500 dark:text-purple-400 mr-1" />}
                  {rule.type === 'demanda' && <BarChart2 size={14} className="text-amber-500 dark:text-amber-400 mr-1" />}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {rule.description}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-green-600 dark:text-green-400">
                  {rule.impact}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Última aplicación: {rule.lastApplied}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3 space-x-2">
              <button className="px-3 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                Ver Detalles
              </button>
              {rule.status === 'draft' ? <button className="px-3 py-1 text-xs bg-green-600 rounded text-white hover:bg-green-700">
                  Activar
                </button> : <button className="px-3 py-1 text-xs bg-gray-600 rounded text-white hover:bg-gray-700">
                  Pausar
                </button>}
            </div>
          </div>)}
      </div>
    </div>;
};
export default RulesList;