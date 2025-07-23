import React, { useState } from 'react';
import { Lock, Edit2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const SafetyLimits = ({
  minPrice,
  maxPrice
}) => {
  const {
    t
  } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  // Calculate percentage for visual indicator
  const range = maxPrice - minPrice;
  const minPercent = 0;
  const maxPercent = 100;
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Lock size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('safety_limits')}
          </h3>
        </div>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center text-sm" onClick={() => setIsEditing(!isEditing)}>
          <Edit2 size={14} className="mr-1" />
          {t('edit_global_limits')}
        </button>
      </div>
      <div className="space-y-4">
        {/* Price range visual indicator */}
        <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-6 mb-8">
          <div className="absolute h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 top-1/2 transform -translate-y-1/2 shadow" style={{
          left: `${minPercent}%`
        }}></div>
          <div className="absolute h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 top-1/2 transform -translate-y-1/2 shadow" style={{
          left: `${maxPercent}%`
        }}></div>
          <div className="absolute h-2 bg-blue-400 rounded-full" style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`
        }}></div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t('minimum_allowed_price')}
            </div>
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-800 dark:text-white">
                ${minPrice.toLocaleString()}
              </span>
              <div className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                {t('safe')}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t('maximum_allowed_price')}
            </div>
            <div className="flex items-center justify-end">
              <span className="text-lg font-medium text-gray-800 dark:text-white">
                ${maxPrice.toLocaleString()}
              </span>
              <div className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded-full">
                {t('limit')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SafetyLimits;