import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
interface Filtro {
  id: string;
  label: string;
  value: string | number | boolean;
}
interface FilterBarProps {
  filtros: Filtro[];
  onChange: (filtros: Filtro[]) => void;
}
const FilterBar: React.FC<FilterBarProps> = ({
  filtros,
  onChange
}) => {
  const {
    t
  } = useLanguage();
  const handleRemoveFiltro = (filtroId: string) => {
    const updatedFiltros = filtros.filter(filtro => filtro.id !== filtroId);
    onChange(updatedFiltros);
  };
  const handleClearAll = () => {
    onChange([]);
  };
  if (filtros.length === 0) return null;
  return <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {t('active_filters')}:
        </span>
        {filtros.map(filtro => <div key={filtro.id} className="flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
            <span>
              {filtro.label}: {filtro.value}
            </span>
            <button onClick={() => handleRemoveFiltro(filtro.id)} className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X size={14} />
            </button>
          </div>)}
        <button onClick={handleClearAll} className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          {t('clear')}
        </button>
      </div>
    </div>;
};
export default FilterBar;