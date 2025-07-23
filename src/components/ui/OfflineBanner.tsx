import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine);
    // Add event listeners for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  if (!isOffline) return null;
  return <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-3 flex items-center justify-center">
      <WifiOff size={18} className="mr-2" />
      <span>
        No hay conexión a internet. Los datos pueden no estar actualizados.
      </span>
    </div>;
};
export default OfflineBanner;