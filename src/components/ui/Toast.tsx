import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, X, Info } from 'lucide-react';
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss?: () => void;
}
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onDismiss
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  if (!visible) return null;
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500 dark:text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500 dark:text-red-400" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-500 dark:text-blue-400" />;
    }
  };
  const getToastClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
    }
  };
  return <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`rounded-lg shadow-lg p-4 flex items-start border ${getToastClasses()}`}>
        <div className="flex-shrink-0 mr-3 mt-0.5">{getIcon()}</div>
        <div className="flex-1 mr-2">{message}</div>
        <button onClick={handleDismiss} className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-150">
          <X size={18} />
        </button>
      </div>
    </div>;
};
export default Toast;