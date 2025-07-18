import React, { useState } from 'react';
import { Lock, Edit2 } from 'lucide-react';
const SafetyLimits = ({
  minPrice,
  maxPrice
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // Calculate percentage for visual indicator
  const range = maxPrice - minPrice;
  const minPercent = 0;
  const maxPercent = 100;
  return <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Lock size={18} className="text-blue-500 mr-2" />
          <h3 className="font-medium text-gray-800">Límites de Seguridad</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 flex items-center text-sm" onClick={() => setIsEditing(!isEditing)}>
          <Edit2 size={14} className="mr-1" />
          Editar Límites Globales
        </button>
      </div>
      <div className="space-y-4">
        {/* Price range visual indicator */}
        <div className="relative h-2 bg-gray-200 rounded-full mt-6 mb-8">
          <div className="absolute h-4 w-4 rounded-full bg-green-500 border-2 border-white top-1/2 transform -translate-y-1/2 shadow" style={{
          left: `${minPercent}%`
        }}></div>
          <div className="absolute h-4 w-4 rounded-full bg-red-500 border-2 border-white top-1/2 transform -translate-y-1/2 shadow" style={{
          left: `${maxPercent}%`
        }}></div>
          <div className="absolute h-2 bg-blue-400 rounded-full" style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`
        }}></div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              Precio Mínimo Permitido:
            </div>
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-800">
                ${minPrice.toLocaleString()}
              </span>
              <div className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Seguro
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">
              Precio Máximo Permitido:
            </div>
            <div className="flex items-center justify-end">
              <span className="text-lg font-medium text-gray-800">
                ${maxPrice.toLocaleString()}
              </span>
              <div className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                Límite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SafetyLimits;