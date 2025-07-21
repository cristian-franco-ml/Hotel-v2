import React from 'react';
import { Calendar, Star, HelpCircle } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
interface EventCalendarProps {
  placeholder?: boolean;
}
const EventCalendar: React.FC<EventCalendarProps> = ({
  placeholder = false
}) => {
  // Placeholder events with impact levels
  const events = [{
    id: 1,
    name: 'Concierto Shakira',
    date: '2024-07-15',
    impact: 'alto'
  }, {
    id: 2,
    name: 'Feria Comercial',
    date: '2024-07-18',
    impact: 'medio'
  }, {
    id: 3,
    name: 'Congreso Médico',
    date: '2024-07-22',
    impact: 'alto'
  }, {
    id: 4,
    name: 'Festival Gastronómico',
    date: '2024-07-25',
    impact: 'bajo'
  }];
  const getImpactColor = impact => {
    switch (impact) {
      case 'alto':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      case 'medio':
        return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300';
      case 'bajo':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            Eventos con Impacto en Demanda
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} title="Eventos que afectan la demanda hotelera en la zona" />
          </button>
        </div>
      </div>
      {placeholder ? <div className="space-y-3">
          <Skeleton height="h-16" className="rounded-lg" />
          <Skeleton height="h-16" className="rounded-lg" />
          <Skeleton height="h-16" className="rounded-lg" />
          <Skeleton height="h-16" className="rounded-lg" />
        </div> : <div className="space-y-3">
          {events.map(event => <div key={event.id} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {event.date.split('-')[2]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Jul
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800 dark:text-white">
                  {event.name}
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(event.impact)}`}>
                    Impacto {event.impact}
                  </span>
                  <div className="flex ml-2">
                    {Array(event.impact === 'alto' ? 3 : event.impact === 'medio' ? 2 : 1).fill(0).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>)}
        </div>}
      <button className="w-full mt-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
        Ver todos los eventos
      </button>
    </div>;
};
export default EventCalendar;