import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
const NotificationsPanel = () => {
  return <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto transition-colors duration-300">
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-white">
          Notificaciones
        </h3>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70">
          Marcar todas como leídas
        </button>
      </div>
      <div>
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Nuevas
        </div>
        {[1, 2].map(id => <div key={id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex">
              <div className="mr-3 mt-0.5">
                <AlertTriangle size={16} className="text-amber-500 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <Skeleton height="h-5" width="w-32" />
                  <Skeleton height="h-4" width="w-24" />
                </div>
                <Skeleton height="h-4" width="w-full" className="mt-2" />
              </div>
            </div>
          </div>)}
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-700 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70">
          Ver todas las notificaciones
        </button>
      </div>
    </div>;
};
export default NotificationsPanel;