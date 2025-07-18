import React from 'react';
import { Tag, Calendar, DollarSign, BarChart2, AlertTriangle } from 'lucide-react';
const RulesList = () => {
  // Sample rules data
  const rules = [{
    id: 1,
    name: 'Incremento Fin de Semana',
    status: 'active',
    impact: '+$4,320',
    type: 'temporal',
    description: 'Incrementa precios 15% durante fines de semana',
    lastApplied: '2 horas atrás'
  }, {
    id: 2,
    name: 'Evento Gastronómico',
    status: 'active',
    impact: '+$7,850',
    type: 'evento',
    description: 'Ajuste por festival gastronómico local (15-20 Mayo)',
    lastApplied: '5 horas atrás'
  }, {
    id: 3,
    name: 'Descuento Mid-Week',
    status: 'active',
    impact: '+$3,070',
    type: 'temporal',
    description: 'Reducción de precios entre martes y jueves',
    lastApplied: '1 día atrás'
  }, {
    id: 4,
    name: 'Regla Experimental',
    status: 'draft',
    impact: '~$2,500',
    type: 'demanda',
    description: 'Ajuste basado en patrones de demanda históricos',
    lastApplied: 'Nunca aplicada'
  }];
  // Empty state if no rules
  if (rules.length === 0) {
    return <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <Tag size={24} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          No hay reglas configuradas
        </h3>
        <p className="text-gray-500 mb-4">
          Crea tu primera regla de optimización para empezar a aumentar tus
          ingresos
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center">
          <Plus size={16} className="mr-2" />
          Crear Primera Regla
        </button>
      </div>;
  }
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-800">Reglas de Optimización</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {rules.map(rule => <div key={rule.id} className="p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800">{rule.name}</h4>
                  <div className={`ml-2 px-2 py-0.5 rounded-full text-xs ${rule.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {rule.status === 'active' ? 'Activa' : 'Borrador'}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {rule.type === 'temporal' && <Calendar size={14} className="text-blue-500 mr-1" />}
                  {rule.type === 'evento' && <Tag size={14} className="text-purple-500 mr-1" />}
                  {rule.type === 'demanda' && <BarChart2 size={14} className="text-amber-500 mr-1" />}
                  <span className="text-sm text-gray-500">
                    {rule.description}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-green-600">
                  {rule.impact}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Última aplicación: {rule.lastApplied}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3 space-x-2">
              <button className="px-3 py-1 text-xs bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">
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