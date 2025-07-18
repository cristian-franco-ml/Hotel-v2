import React from 'react';
import { FileText } from 'lucide-react';
const EmptyState = () => {
  return <div className="bg-white rounded-lg shadow-sm p-10 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-100 rounded-full">
          <FileText size={40} className="text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        No se encontraron hoteles
      </h3>
      <p className="text-gray-500 mb-6">
        Intenta ajustar los filtros de búsqueda
      </p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Agregar Nuevo Hotel
      </button>
    </div>;
};
export default EmptyState;