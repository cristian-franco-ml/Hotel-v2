import React from 'react';
import { FileText } from 'lucide-react';
interface EmptyStateProps {
  mensaje: string;
  icon?: React.ReactNode;
  cta?: {
    label: string;
    onClick: () => void;
  };
}
const EmptyState: React.FC<EmptyStateProps> = ({
  mensaje,
  icon = <FileText size={40} className="text-gray-400 dark:text-gray-500" />,
  cta
}) => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-10 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2 transition-colors duration-300">
        {mensaje}
      </h3>
      {cta && <button onClick={cta.onClick} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
          {cta.label}
        </button>}
    </div>;
};
export default EmptyState;