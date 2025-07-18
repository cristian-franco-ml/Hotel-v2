import React from 'react';
import Navigation from './Navigation';
import KPISection from './KPISection';
import ModuleStatus from './ModuleStatus';
import RecentActions from './RecentActions';
const Dashboard = () => {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              📊 Resumen General del Sistema
            </h1>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              Hoy
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white">
              Últimos 7 días
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              Últimos 30 días
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
              Personalizado
            </button>
          </div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-6 flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-700 dark:text-green-300">
            Sistema de Optimización de Ingresos:{' '}
          </span>
          <span className="ml-1 text-green-700 dark:text-green-300 font-medium">
            Activo
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column with KPIs and Module Status */}
          <div className="lg:col-span-2 space-y-6">
            <KPISection />
            <ModuleStatus />
          </div>
          {/* Right column with Recent Actions */}
          <div className="lg:col-span-1">
            <RecentActions />
          </div>
        </div>
      </main>
    </div>;
};
export default Dashboard;