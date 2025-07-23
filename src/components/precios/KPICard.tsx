import React from 'react';
import { ArrowUp, ArrowDown, Clock, DollarSign, Zap, Clock3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
type KPICardProps = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: 'adjustments' | 'revenue' | 'time' | 'next';
  suffix?: string;
};
const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  suffix
}) => {
  const {
    t
  } = useLanguage();
  const getIcon = () => {
    switch (icon) {
      case 'adjustments':
        return <Zap size={20} className="text-amber-500" />;
      case 'revenue':
        return <DollarSign size={20} className="text-green-500" />;
      case 'time':
        return <Clock size={20} className="text-blue-500" />;
      case 'next':
        return <Clock3 size={20} className="text-purple-500" />;
    }
  };
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  const getChangeIcon = () => {
    if (!change) return null;
    return changeType === 'positive' ? <ArrowUp size={14} className="inline" /> : changeType === 'negative' ? <ArrowDown size={14} className="inline" /> : null;
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
            {suffix && <span className="text-lg ml-1">{suffix}</span>}
          </div>
          {change && <div className={`text-sm mt-1 ${getChangeColor()} flex items-center`}>
              {getChangeIcon()}
              <span className="ml-1">{change}</span>
            </div>}
        </div>
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
          {getIcon()}
        </div>
      </div>
    </div>;
};
export default KPICard;