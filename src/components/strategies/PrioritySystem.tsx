import React from 'react';
import { ArrowUp, Info } from 'lucide-react';
const PrioritySystem = () => {
  const priorityLevels = [{
    level: 'Alta',
    color: 'bg-red-500',
    description: 'Reglas críticas de seguridad'
  }, {
    level: 'Media',
    color: 'bg-amber-500',
    description: 'Optimización de ingresos'
  }, {
    level: 'Baja',
    color: 'bg-blue-500',
    description: 'Ajustes estacionales'
  }];
  return <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ArrowUp size={18} className="text-blue-500 mr-2" />
          <h3 className="font-medium text-gray-800">Sistema de Prioridades</h3>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Info size={14} className="mr-1" />
          Las reglas con mayor prioridad se aplican primero
        </div>
      </div>
      <div className="space-y-3 mt-4">
        {priorityLevels.map((priority, index) => <div key={index} className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${priority.color} mr-3`}></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  {priority.level}
                </span>
                <span className="text-sm text-gray-500">
                  {index === 0 ? 'Se aplica primero' : ''}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {priority.description}
              </div>
            </div>
          </div>)}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          Si hay conflictos entre reglas del mismo nivel, prevalece la más
          reciente.
        </div>
      </div>
    </div>;
};
export default PrioritySystem;