import React, { useEffect, useState } from 'react';
import { Calendar, Star, HelpCircle, ExternalLink } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import { supabase } from '../../supabaseClient';

interface EventCalendarProps {
  placeholder?: boolean;
}
// Define type for event
interface CalendarEvent {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  enlace: string;
}

const MAX_EVENTS = 7;

const EventCalendar: React.FC<EventCalendarProps> = ({
  placeholder = false
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, nombre, fecha, lugar, enlace')
        .order('fecha', { ascending: true });
      if (!error && data) {
        setEvents(data);
      } else {
        setEvents([]);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, MAX_EVENTS);
  const hasMore = events.length > MAX_EVENTS;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            Eventos con Impacto en Demanda
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      {loading || placeholder ? (
        <div className="space-y-3">
          <Skeleton height="h-16" className="rounded-lg" />
          <Skeleton height="h-16" className="rounded-lg" />
          <Skeleton height="h-16" className="rounded-lg" />
        </div>
      ) : (
        <div className="space-y-3">
          {visibleEvents.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 text-sm">No hay eventos próximos.</div>
          )}
          {visibleEvents.map((event) => (
            <div key={event.id} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {event.fecha.split('-')[2]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {event.fecha.split('-')[1]}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800 dark:text-white">
                  {event.nombre}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {event.lugar}
                </div>
                <div className="mt-1">
                  <a
                    href={event.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Ver evento <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {hasMore && (
        <button
          className="w-full mt-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Ver menos eventos' : 'Ver todos los eventos'}
        </button>
      )}
    </div>
  );
};

export default EventCalendar;