import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
const Toast = ({
  message,
  type = 'error',
  duration = 5000,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Allow animation to complete
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900',
          border: 'border-green-400 dark:border-green-700',
          icon: <CheckCircle size={18} className="text-green-500 dark:text-green-400" />
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900',
          border: 'border-blue-400 dark:border-blue-700',
          icon: <Info size={18} className="text-blue-500 dark:text-blue-400" />
        };
      case 'error':
      default:
        return {
          bg: 'bg-red-50 dark:bg-red-900',
          border: 'border-red-400 dark:border-red-700',
          icon: <AlertTriangle size={18} className="text-red-500 dark:text-red-400" />
        };
    }
  };
  const styles = getTypeStyles();
  return <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`${styles.bg} border ${styles.border} rounded-md shadow-md px-4 py-3 flex items-center max-w-md`}>
        <div className="mr-3">{styles.icon}</div>
        <div className="flex-1 text-sm dark:text-white">{message}</div>
        <button onClick={() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }} className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <X size={16} />
        </button>
      </div>
    </div>;
};
export default Toast;