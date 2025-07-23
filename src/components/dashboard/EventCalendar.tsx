import React, { useEffect, useState } from 'react';
import { Calendar, Star, HelpCircle, ExternalLink } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import { supabase } from '../../supabaseClient';
import { useUser } from '../../contexts/UserContext';

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
  distancia?: number;
  categoria?: string;
  asistenciaEsperada?: number;
}

// Lógica automática de impacto
function calcularImpactoEvento(evento: CalendarEvent): number {
  // Solo depende del día de la semana
  if (!evento.fecha) return 0;
  const dia = new Date(evento.fecha).getDay();
  // 0: Domingo, 5: Viernes, 6: Sábado
  if (dia === 5 || dia === 6) return 100; // Viernes o sábado: máximo impacto
  if (dia === 0) return 80; // Domingo: alto impacto
  if (dia === 4) return 60; // Jueves: medio-alto
  if (dia === 3) return 40; // Miércoles: medio
  return 20; // Lunes o martes: bajo
}

const MAX_EVENTS = 7;

const EventCalendar: React.FC<EventCalendarProps> = ({
  placeholder = false
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { userId, createdBy } = useUser();

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, nombre, fecha, lugar, enlace')
        .eq('created_by', createdBy)
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
            <div key={event.id} className="flex items-center p-2 bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
              {/* Fecha */}
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900 rounded-md border border-blue-100 dark:border-blue-800">
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-200 leading-none">
                    {event.fecha.split('-')[2]}
                  </span>
                  <span className="text-[10px] text-blue-400 dark:text-blue-300 uppercase tracking-wider">
                    {['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'][parseInt(event.fecha.split('-')[1],10)-1]}
                  </span>
                </div>
              </div>
              {/* Info principal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-sm text-gray-800 dark:text-white truncate">{event.nombre}</span>
                  <a
                    href={event.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    title="Ver evento"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {event.lugar}
                </div>
                <div className="mt-1 flex items-center text-[11px]">
                  <span className={
                    'rounded-full font-semibold mr-1 px-1.5 py-0.5 ' +
                    (calcularImpactoEvento(event) >= 90 ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300' :
                    calcularImpactoEvento(event) >= 60 ? 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-300' :
                    'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300')
                  }>
                    Impacto: {calcularImpactoEvento(event)} / 100
                  </span>
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