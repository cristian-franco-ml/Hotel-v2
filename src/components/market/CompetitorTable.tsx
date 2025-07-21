import React from 'react';
import { Star, HelpCircle } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import Tooltip from '../ui/Tooltip';
import { useLanguage } from '../../contexts/LanguageContext';
interface CompetitorTableProps {
  loading?: boolean;
}
const CompetitorTable: React.FC<CompetitorTableProps> = ({
  loading = true
}) => {
  const {
    t
  } = useLanguage();
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <h3 className="font-medium text-gray-800 dark:text-white mr-2">
          {t('competitive_ranking')}
        </h3>
        <Tooltip content={t('competitive_ranking_tooltip')}>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </Tooltip>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('ranking')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('establishment')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('pricing')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('occupancy')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('satisfaction')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                RevPAR
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('market_share')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('adjustment')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('suggested_adjustment')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ?
          // Loading state
          Array(3).fill(0).map((_, index) => <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-10" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-32" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-16" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-16" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-16" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton height="h-5" width="w-16" />
                    </td>
                  </tr>) : <>
                {/* Hotel Lucerna Row */}
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                    #1
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Hotel Lucerna
                      </div>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                        {t('our_hotel_label')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white" data-bind="pricingLucerna">
                      —
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '85%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="ocupacionLucerna">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex text-yellow-400">
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current opacity-50" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white" data-bind="revparLucerna">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '25%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="marketShareLucerna">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400" data-bind="ajusteLucerna">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400" data-bind="ajusteRecomendadoLucerna">
                    —
                  </td>
                </tr>
                {/* Competitor B Row */}
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #2
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('competitor_b')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white" data-bind="pricingCompB">
                      —
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '80%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="ocupacionCompB">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex text-yellow-400">
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current opacity-50" />
                      <Star size={16} className="fill-current opacity-50" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white" data-bind="revparCompB">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '20%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="marketShareCompB">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400" data-bind="ajusteCompB">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400" data-bind="ajusteRecomendadoCompB">
                    —
                  </td>
                </tr>
                {/* Competitor C Row */}
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #3
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('competitor_c')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white" data-bind="pricingCompC">
                      —
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '90%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="ocupacionCompC">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex text-yellow-400">
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current" />
                      <Star size={16} className="fill-current opacity-50" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white" data-bind="revparCompC">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" style={{
                      width: '30%'
                    }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300" data-bind="marketShareCompC">
                        —
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400" data-bind="ajusteCompC">
                    —
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400" data-bind="ajusteRecomendadoCompC">
                    —
                  </td>
                </tr>
              </>}
          </tbody>
        </table>
      </div>
      {/* Time Range Filter */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-center space-x-2">
        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md">
          {t('last_7_days')}
        </button>
        <button className="px-3 py-1 text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-md">
          {t('last_30_days')}
        </button>
        <button className="px-3 py-1 text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded-md">
          {t('custom')}
        </button>
      </div>
    </div>;
};
export default CompetitorTable;