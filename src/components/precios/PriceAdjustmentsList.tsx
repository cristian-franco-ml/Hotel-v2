import React, { useEffect, useState } from 'react';
import { DollarSign, HelpCircle, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import { supabase } from '../../supabaseClient';
import { useUser } from '../../contexts/UserContext';

interface PriceAdjustmentsListProps {
  loading?: boolean;
}

interface RoomPrice {
  id: string;
  hotel_name: string;
  room_type: string;
  checkin_date: string;
  price: number;
  ajuste_aplicado?: boolean;
}

interface Event {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  enlace: string;
  created_by: string;
}

const getImpactoEvento = (event: Event | undefined) => {
  if (!event) return 0;
  // Lógica por día de la semana
  const dia = new Date(event.fecha).getDay();
  if (dia === 5 || dia === 6) return 100;
  if (dia === 0) return 80;
  if (dia === 4) return 60;
  if (dia === 3) return 40;
  return 20;
};

const getRecommendation = (impact: number) => {
  if (impact >= 90) return 0.3;
  if (impact >= 60) return 0.2;
  if (impact >= 40) return 0.1;
  if (impact > 0) return 0.05;
  return 0;
};

const PriceAdjustmentsList: React.FC<PriceAdjustmentsListProps> = ({ loading: loadingProp = false }) => {
  const { userId, createdBy } = useUser();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [roomPrices, setRoomPrices] = useState<RoomPrice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [bulkAccepting, setBulkAccepting] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [adjustedRooms, setAdjustedRooms] = useState<Record<string, Set<string>>>({}); // { [date]: Set<roomId> }

  // Generar los próximos 30 días
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  // Mueve fetchData fuera del useEffect para poder llamarlo después de aplicar ajustes
  const fetchData = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    if (!createdBy) return;
    // Obtener precios base de hotel_usuario
    const { data: prices, error: priceError } = await supabase
      .from('hotel_usuario')
      .select('id, hotel_name, room_type, checkin_date, price, ajuste_aplicado')
      .eq('user_id', createdBy)
      .gte('checkin_date', days[0])
      .lte('checkin_date', days[days.length - 1]);
    setRoomPrices(prices || []);
    // Obtener eventos
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select('id, nombre, fecha, lugar, enlace, created_by')
      .eq('created_by', createdBy)
      .gte('fecha', days[0])
      .lte('fecha', days[days.length - 1]);
    setEvents(eventsData || []);
    if (showLoader) setLoading(false);
  };

  useEffect(() => {
    fetchData(true).then(() => setInitialLoad(false));
    // eslint-disable-next-line
  }, [createdBy]);

  // Agrupar precios por día y tipo de cuarto
  const pricesByDay: Record<string, RoomPrice[]> = {};
  for (const price of roomPrices) {
    // Asegurar que price es número
    let parsedPrice = price.price;
    parsedPrice = parseFloat(String(parsedPrice).replace(/[^\d.]/g, ''));
    if (typeof parsedPrice !== 'number' || isNaN(parsedPrice)) {
      parsedPrice = 0;
    }
    const priceObj = { ...price, price: parsedPrice };
    if (!pricesByDay[price.checkin_date]) pricesByDay[price.checkin_date] = [];
    pricesByDay[price.checkin_date].push(priceObj);
  }
  // Indexar eventos por fecha
  const eventsByDate: Record<string, Event> = {};
  for (const ev of events) {
    eventsByDate[ev.fecha] = ev;
  }

  // Filtrar solo días con evento
  const eventDays = Object.keys(eventsByDate).filter(date => pricesByDay[date] && pricesByDay[date].length > 0);

  const handleAccept = async (room: RoomPrice, newPrice: number, date: string) => {
    setAccepting(room.id);
    await supabase
      .from('hotel_usuario')
      .update({ price: newPrice, ajuste_aplicado: true })
      .eq('id', room.id);
    setRoomPrices((prev) => prev.map(r => r.id === room.id ? { ...r, price: newPrice, ajuste_aplicado: true } : r));
    setAdjustedRooms(prev => {
      const updated = { ...prev };
      if (!updated[date]) updated[date] = new Set();
      updated[date] = new Set(updated[date]);
      updated[date].add(room.id);
      return updated;
    });
    setAccepting(null);
    await fetchData(false); // <-- Refresca los datos sin loader
  };

  // Acción para aplicar todas las recomendaciones de un evento
  const handleBulkAccept = async (date: string, rooms: RoomPrice[], recPct: number) => {
    setBulkAccepting(date);
    const notAdjusted = rooms.filter(room => !room.ajuste_aplicado);
    const updates = notAdjusted.map(room => {
      const recValue = Math.round(room.price * recPct);
      const newPrice = room.price + recValue;
      if (room.price === newPrice) return null;
      return supabase
        .from('hotel_usuario')
        .update({ price: newPrice, ajuste_aplicado: true })
        .eq('id', room.id);
    }).filter(Boolean);
    await Promise.all(updates);
    setRoomPrices(prev => prev.map(room => {
      if (room.checkin_date === date && !room.ajuste_aplicado) {
        const recValue = Math.round(room.price * recPct);
        const newPrice = room.price + recValue;
        return { ...room, price: newPrice, ajuste_aplicado: true };
      }
      return room;
    }));
    setAdjustedRooms(prev => {
      const updated = { ...prev };
      updated[date] = new Set(rooms.map(r => r.id));
      return updated;
    });
    setBulkAccepting(null);
    await fetchData(false); // <-- Refresca los datos sin loader
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center mb-4">
        <CalendarIcon size={20} className="text-blue-500 mr-2" />
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
          Calendario de Precios y Recomendaciones
        </h3>
        <button
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Ajustes automáticos de precios basados en eventos"
          title="Ajustes automáticos de precios basados en eventos"
          type="button"
        >
          <HelpCircle size={16} />
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Solo se muestran los días con eventos programados. Haz clic en “Aplicar ajuste” para actualizar el precio recomendado.
      </p>
      {initialLoad || loading || loadingProp ? (
        <div className="space-y-4">
          {Array(2).fill(0).map((_, idx) => (
            <div key={idx} className="rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex gap-2 mb-2">
                <Skeleton height="h-6" width="w-32" />
                <Skeleton height="h-6" width="w-16" />
              </div>
              <div className="space-y-2">
                {Array(2).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton height="h-5" width="w-24" />
                    <Skeleton height="h-5" width="w-16" />
                    <Skeleton height="h-5" width="w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        eventDays.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">No hay eventos próximos con habitaciones disponibles.</div>
        ) : (
          <div className="grid gap-6">
            {eventDays.map(date => {
              const event = eventsByDate[date];
              const impacto = getImpactoEvento(event);
              const impactColor = impacto >= 90 ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                impacto >= 60 ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
              const rooms = pricesByDay[date];
              const recPct = getRecommendation(impacto);
              const isExpanded = expandedEvent === date;
              return (
                <div key={date} className={`rounded-xl shadow bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-2 transition-all duration-200 ${isExpanded ? 'ring-1 ring-blue-200' : ''}`}>
                  <button
                    className="w-full flex flex-wrap items-center gap-3 p-4 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:ring-offset-0 text-left"
                    onClick={() => setExpandedEvent(isExpanded ? null : date)}
                    aria-expanded={isExpanded}
                  >
                    <span className="font-bold text-lg text-blue-900 dark:text-blue-200 flex items-center gap-2">
                      <CalendarIcon size={16} className="text-blue-400" />
                      {event.nombre}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${impactColor}`}>Impacto: {impacto}/100</span>
                    <span className="text-xs text-gray-500">{date} | {event.lugar}</span>
                    {event.enlace && (
                      <a href={event.enlace} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1 text-xs">
                        Ver evento <span className="ml-1">🔗</span>
                      </a>
                    )}
                    <span className="ml-auto text-xs text-blue-700 dark:text-blue-200 font-semibold">{isExpanded ? 'Ocultar ajustes ▲' : 'Ver ajustes ▼'}</span>
                  </button>
                  {isExpanded && (
                    <div className="overflow-x-auto px-2 pb-4">
                      <table className="min-w-full text-xs table-fixed">
                        <colgroup>
                          <col style={{ width: '40%' }} />
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '20%' }} />
                          <col style={{ width: '20%' }} />
                        </colgroup>
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-3 py-2 text-left font-semibold uppercase tracking-wider w-2/5">Tipo de Cuarto</th>
                            <th className="px-3 py-2 text-left font-semibold uppercase tracking-wider w-1/5">Precio Base</th>
                            <th className="px-3 py-2 text-left font-semibold uppercase tracking-wider w-1/5">Recomendación</th>
                            <th className="px-3 py-2 text-left font-semibold uppercase tracking-wider w-1/5">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {rooms.map((room) => {
                            const recValue = Math.round(room.price * recPct);
                            const newPrice = room.price + recValue;
                            const isAdjusted = room.ajuste_aplicado || adjustedRooms[date]?.has(room.id) || room.price === newPrice;
                            return (
                              <tr key={room.id + date} className="group hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                                <td className="px-3 py-2 text-left text-gray-800 dark:text-gray-200 font-medium">{room.room_type}</td>
                                <td className="px-3 py-2 text-left text-gray-800 dark:text-gray-200 font-mono">{room.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 })}</td>
                                <td className="px-3 py-2 text-left">
                                  <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold">
                                    <ArrowUpRight size={14} />
                                    +{Math.round(recPct * 100)}%
                                    <span className="ml-1 font-mono">({recValue.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 })})</span>
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-left">
                                  {recValue > 0 ? (
                                    <button
                                      className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                                      disabled={accepting === room.id || isAdjusted}
                                      onClick={() => handleAccept(room, newPrice, date)}
                                    >
                                      {accepting === room.id ? <span className="animate-pulse">Guardando...</span> : isAdjusted ? <span className="text-green-300">✔ Actualizado</span> : <><span>Aplicar ajuste</span> <ArrowUpRight size={12} /></>}
                                    </button>
                                  ) : <span className="text-gray-400">—</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="mt-4">
                        <button
                          className="w-full px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                          disabled={bulkAccepting === date || rooms.every(room => room.ajuste_aplicado)}
                          onClick={() => handleBulkAccept(date, rooms, recPct)}
                        >
                          {bulkAccepting === date ? <span className="animate-pulse">Aplicando...</span> : <>Aplicar a todo <ArrowUpRight size={16} /></>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default PriceAdjustmentsList;