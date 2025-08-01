import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from './Navigation';
import { Calendar, DollarSign, TrendingUp, AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface HotelPrice {
  id: string;
  checkin_date: string;
  room_type: string;
  price: number;
  scrape_date: string;
  ajuste_aplicado?: boolean;
}

interface Event {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion?: string;
  enlace?: string;
}

interface CalendarDay {
  date: Date;
  prices: HotelPrice[];
  averagePrice: number;
  colorIntensity: number;
  hasEvent: boolean;
  event?: Event;
  eventImpact?: number;
  priceRecommendation?: {
    currentPrice: number;
    recommendedPrice: number;
    increase: number;
    impactLevel: string;
  };
}

const CalendarPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [bulkAccepting, setBulkAccepting] = useState<string | null>(null);
  const [adjustedRooms, setAdjustedRooms] = useState<Record<string, Set<string>>>({}); // { [date]: Set<roomId> }

  // Generar los próximos 3 meses
  const generateCalendarMonths = () => {
    const months: Date[] = [];
    
    // Mostrar específicamente los meses donde están los eventos (agosto, septiembre, octubre 2025)
    const eventMonths = [
      new Date(2025, 7, 1),   // Agosto 2025
      new Date(2025, 8, 1),   // Septiembre 2025
      new Date(2025, 9, 1),   // Octubre 2025
    ];
    
    console.log('[DEBUG] Fecha actual:', new Date().toISOString().split('T')[0]);
    console.log('[DEBUG] Meses de eventos generados:', eventMonths.map(m => m.toISOString().split('T')[0]));
    
    return eventMonths;
  };

  // Función para normalizar fechas
  const normalizeDate = (dateString: string) => {
    // Asegurar que la fecha esté en formato YYYY-MM-DD
    console.log(`[DEBUG] Normalizando fecha: "${dateString}"`);
    
    if (!dateString) {
      console.log(`[DEBUG] Fecha vacía, retornando null`);
      return null;
    }
    
    try {
      const date = new Date(dateString);
      const normalized = date.toISOString().split('T')[0];
      console.log(`[DEBUG] Fecha normalizada: "${dateString}" -> "${normalized}"`);
      return normalized;
    } catch (error) {
      console.log(`[DEBUG] Error normalizando fecha "${dateString}":`, error);
      return dateString; // Retornar original si hay error
    }
  };

  // Función para calcular el impacto del evento (similar a PriceAdjustmentsList)
  const getEventImpact = (event: Event | undefined) => {
    if (!event) return 0;
    
    // Lógica por día de la semana
    const dia = new Date(event.fecha).getDay();
    if (dia === 5 || dia === 6) return 100; // Viernes y Sábado
    if (dia === 0) return 80; // Domingo
    if (dia === 4) return 60; // Jueves
    if (dia === 3) return 40; // Miércoles
    return 20; // Otros días
  };

  // Función para obtener recomendación de precio basada en impacto
  const getPriceRecommendation = (impact: number, currentPrice: number) => {
    let recommendationPercent = 0;
    
    if (impact >= 90) recommendationPercent = 0.3; // 30%
    else if (impact >= 60) recommendationPercent = 0.2; // 20%
    else if (impact >= 40) recommendationPercent = 0.1; // 10%
    else if (impact > 0) recommendationPercent = 0.05; // 5%
    
    const increase = Math.round(currentPrice * recommendationPercent);
    const recommendedPrice = currentPrice + increase;
    
    let impactLevel = '';
    if (impact >= 90) impactLevel = 'Alto';
    else if (impact >= 60) impactLevel = 'Medio-Alto';
    else if (impact >= 40) impactLevel = 'Medio';
    else if (impact > 0) impactLevel = 'Bajo';
    
    return {
      currentPrice,
      recommendedPrice,
      increase: Math.round((increase / currentPrice) * 100),
      impactLevel
    };
  };

  // Función para aplicar ajuste individual
  const handleAccept = async (room: HotelPrice, newPrice: number, date: string) => {
    setAccepting(room.id);
    try {
      await supabase
        .from('hotel_usuario')
        .update({ price: newPrice, ajuste_aplicado: true })
        .eq('id', room.id);
      
      // Actualizar el estado local
      setCalendarData(prev => prev.map(day => {
        if (day.date.toISOString().split('T')[0] === date) {
          return {
            ...day,
            prices: day.prices.map(p => 
              p.id === room.id ? { ...p, price: newPrice, ajuste_aplicado: true } : p
            )
          };
        }
        return day;
      }));
      
      setAdjustedRooms(prev => {
        const updated = { ...prev };
        if (!updated[date]) updated[date] = new Set();
        updated[date] = new Set(updated[date]);
        updated[date].add(room.id);
        return updated;
      });
    } catch (error) {
      console.error('Error applying price adjustment:', error);
    } finally {
      setAccepting(null);
    }
  };

  // Función para aplicar ajuste en lote
  const handleBulkAccept = async (date: string, rooms: HotelPrice[], recPct: number) => {
    setBulkAccepting(date);
    try {
      const notAdjusted = rooms.filter(room => !room.ajuste_aplicado);
      const updates = notAdjusted.map(room => {
        const recValue = Math.round(room.price * (recPct / 100));
        const newPrice = room.price + recValue;
        if (room.price === newPrice) return null;
        return supabase
          .from('hotel_usuario')
          .update({ price: newPrice, ajuste_aplicado: true })
          .eq('id', room.id);
      }).filter(Boolean);
      
      await Promise.all(updates);
      
      // Actualizar el estado local
      setCalendarData(prev => prev.map(day => {
        if (day.date.toISOString().split('T')[0] === date) {
          return {
            ...day,
            prices: day.prices.map(room => {
              if (!room.ajuste_aplicado) {
                const recValue = Math.round(room.price * (recPct / 100));
                const newPrice = room.price + recValue;
                return { ...room, price: newPrice, ajuste_aplicado: true };
              }
              return room;
            })
          };
        }
        return day;
      }));
      
      setAdjustedRooms(prev => {
        const updated = { ...prev };
        updated[date] = new Set(rooms.map(r => r.id));
        return updated;
      });
    } catch (error) {
      console.error('Error applying bulk price adjustment:', error);
    } finally {
      setBulkAccepting(null);
    }
  };

  // Obtener eventos (combinar eventos del usuario con eventos locales)
  const fetchEvents = async () => {
    try {
      console.log('[DEBUG] Iniciando carga de eventos...');
      
      // Obtener eventos del usuario
      let userEvents: Event[] = [];
      if (user?.id) {
        console.log('[DEBUG] Cargando eventos del usuario:', user.id);
        const userResponse = await fetch(`/api/events?user_id=${user.id}`);
        const userData = await userResponse.json();
        if (userResponse.ok) {
          userEvents = userData || [];
          console.log('[DEBUG] Eventos del usuario cargados:', userEvents.length);
        } else {
          console.error('[DEBUG] Error cargando eventos del usuario:', userData);
        }
      }

      // Obtener eventos locales
      console.log('[DEBUG] Cargando eventos locales...');
      const localResponse = await fetch('/api/events-local');
      console.log('[DEBUG] Status de eventos locales:', localResponse.status);
      
      const localData = await localResponse.json();
      console.log('[DEBUG] Datos de eventos locales recibidos:', localData);
      
      let localEvents: Event[] = [];
      if (localResponse.ok) {
        const mxEvents = localData.mx || [];
        const usEvents = localData.us || [];
        localEvents = [...mxEvents, ...usEvents];
        console.log('[DEBUG] Eventos locales cargados:', localEvents.length);
        console.log('[DEBUG] Eventos MX:', mxEvents.length, 'Eventos US:', usEvents.length);
        
        // Mostrar algunos eventos de ejemplo
        if (mxEvents.length > 0) {
          console.log('[DEBUG] Ejemplo evento MX:', mxEvents[0]);
        }
        if (usEvents.length > 0) {
          console.log('[DEBUG] Ejemplo evento US:', usEvents[0]);
        }
      } else {
        console.error('[DEBUG] Error cargando eventos locales:', localData);
      }

      // Combinar eventos y eliminar duplicados
      const allEvents = [...userEvents, ...localEvents];
      const uniqueEvents = allEvents.filter((event, index, self) => 
        index === self.findIndex(e => e.fecha === event.fecha && e.nombre === event.nombre)
      );

      console.log('[DEBUG] Total eventos únicos:', uniqueEvents.length);
      console.log('[DEBUG] Muestra de eventos:', uniqueEvents.slice(0, 3));
      
      // Verificar que los eventos tengan las fechas correctas
      uniqueEvents.forEach((event, index) => {
        console.log(`[DEBUG] Evento ${index + 1}:`, {
          nombre: event.nombre,
          fecha: event.fecha,
          fecha_normalizada: normalizeDate(event.fecha),
          lugar: event.lugar
        });
      });
      
      // Verificar eventos específicos de agosto
      const augustEvents = uniqueEvents.filter(e => e.fecha && e.fecha.startsWith('2025-08-'));
      console.log(`[DEBUG] Eventos de agosto encontrados: ${augustEvents.length}`);
      augustEvents.forEach(event => {
        console.log(`[DEBUG] Evento agosto: ${event.fecha} - ${event.nombre}`);
      });
      
      setEvents(uniqueEvents);
      return uniqueEvents; // Retornar eventos para uso inmediato
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  // Obtener datos de precios del hotel
  const fetchHotelPrices = async (eventsData?: Event[]) => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/hotel-prices?user_id=${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching prices:', data.error);
        return;
      }

      const prices = data.prices || [];
      const avgPrice = data.average_price || 0;
      setAveragePrice(avgPrice);
      
      console.log('[DEBUG] Precios recibidos:', prices.length);
      console.log('[DEBUG] Precio promedio:', avgPrice);
      console.log('[DEBUG] Muestra de precios:', prices.slice(0, 3));

      // Usar eventos pasados como parámetro o el estado actual
      const currentEvents = eventsData || events;
      console.log('[DEBUG] Eventos disponibles para procesar:', currentEvents.length);

      // Agrupar precios por fecha
      const pricesByDate = prices.reduce((acc: any, price: any) => {
        const date = price.checkin_date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(price);
        return acc;
      }, {});

      // Generar datos del calendario
      const calendarDays: CalendarDay[] = [];
      const months = generateCalendarMonths();
      
      console.log('[DEBUG] Generando calendario para meses:', months.map(m => m.toISOString().split('T')[0]));
      console.log('[DEBUG] Rango de fechas del calendario:', {
        inicio: months[0].toISOString().split('T')[0],
        fin: new Date(months[months.length - 1].getFullYear(), months[months.length - 1].getMonth() + 1, 0).toISOString().split('T')[0]
      });
      
      months.forEach(month => {
        const year = month.getFullYear();
        const monthIndex = month.getMonth();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        
        console.log(`[DEBUG] Procesando mes ${year}-${monthIndex + 1} con ${daysInMonth} días`);
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, monthIndex, day);
          const dateString = date.toISOString().split('T')[0];
          const dayPrices = pricesByDate[dateString] || [];
          
          const dayAveragePrice = dayPrices.length > 0 
            ? dayPrices.reduce((sum: number, p: any) => {
                let price = p.price;
                
                // Si es string, limpiarlo y convertir
                if (typeof price === 'string') {
                  // Remover prefijos de moneda y caracteres no numéricos
                  price = price.replace(/[^\d.]/g, '');
                  
                  // Asegurar que solo hay un punto decimal
                  if (price.split('.').length > 2) {
                    const parts = price.split('.');
                    price = parts[0] + '.' + parts.slice(1).join('');
                  }
                  
                  price = parseFloat(price);
                }
                
                // Validar que el precio sea válido
                if (isNaN(price) || price <= 0) {
                  console.log(`[DEBUG] Precio inválido en frontend: ${p.price} -> ${price}`);
                  return sum;
                }
                
                return sum + price;
              }, 0) / dayPrices.length 
            : 0;

          // Debug logging para días con precios
          if (dayPrices.length > 0) {
            console.log(`[DEBUG] Día ${dateString}: ${dayPrices.length} precios, promedio: ${dayAveragePrice}`);
          }

          // Calcular intensidad de color basada en la diferencia del promedio
          let colorIntensity = 0;
          if (avgPrice > 0 && dayAveragePrice > 0) {
            const priceDiff = ((dayAveragePrice - avgPrice) / avgPrice) * 100;
            colorIntensity = Math.max(-1, Math.min(1, priceDiff / 50)); // Normalizar entre -1 y 1
          }

          // Verificar si hay eventos en esta fecha
          const dayEvent = currentEvents.find(event => {
            const normalizedEventDate = normalizeDate(event.fecha);
            const normalizedDayDate = normalizeDate(dateString);
            
            // Si alguna fecha no se pudo normalizar, usar comparación directa
            const matches = normalizedEventDate && normalizedDayDate 
              ? normalizedEventDate === normalizedDayDate 
              : event.fecha === dateString;
            
            // Debug específico para agosto 2025
            if (dateString.startsWith('2025-08-') && currentEvents.length > 0) {
              console.log(`[DEBUG] Comparando fecha ${dateString}:`);
              console.log(`  - Eventos disponibles: ${currentEvents.length}`);
              console.log(`  - Eventos para agosto:`, currentEvents.filter(e => e.fecha && e.fecha.startsWith('2025-08-')).map(e => `${e.fecha}: ${e.nombre}`));
              console.log(`  - Event date: ${event.fecha}`);
              console.log(`  - Normalized event date: ${normalizedEventDate}`);
              console.log(`  - Normalized day date: ${normalizedDayDate}`);
              console.log(`  - Match: ${matches}`);
            }
            
            return matches;
          });
          const eventImpact = dayEvent ? getEventImpact(dayEvent) : 0;
          
          // Debug para días con eventos
          if (dayEvent) {
            console.log(`[DEBUG] Evento encontrado para ${dateString}:`, dayEvent.nombre, 'Impacto:', eventImpact);
          }
          
          // Debug para verificar fechas en el rango del calendario
          if (dateString >= '2025-08-01' && dateString <= '2025-10-31') {
            const matchingEvents = currentEvents.filter(event => {
              const normalizedEventDate = normalizeDate(event.fecha);
              const normalizedDayDate = normalizeDate(dateString);
              return normalizedEventDate === normalizedDayDate;
            });
            console.log(`[DEBUG] Procesando fecha ${dateString}, eventos disponibles:`, matchingEvents.length);
            if (matchingEvents.length > 0) {
              console.log(`[DEBUG] Eventos para ${dateString}:`, matchingEvents.map(e => e.nombre));
            }
          }
          
          // Calcular recomendación de precio si hay evento y precios
          let priceRecommendation = undefined;
          if (dayEvent && dayAveragePrice > 0) {
            priceRecommendation = getPriceRecommendation(eventImpact, dayAveragePrice);
          }

          calendarDays.push({
            date,
            prices: dayPrices,
            averagePrice: dayAveragePrice,
            colorIntensity,
            hasEvent: !!dayEvent,
            event: dayEvent,
            eventImpact,
            priceRecommendation
          });
        }
      });

      console.log('[DEBUG] Días del calendario generados:', calendarDays.length);
      console.log('[DEBUG] Días con eventos:', calendarDays.filter(day => day.hasEvent).length);
      console.log('[DEBUG] Muestra de días con eventos:', calendarDays.filter(day => day.hasEvent).slice(0, 3));

      setCalendarData(calendarDays);
    } catch (error) {
      console.error('Error fetching hotel prices:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Cargar eventos primero
        const eventsData = await fetchEvents();
        // Luego cargar precios con los eventos ya disponibles
        await fetchHotelPrices(eventsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
      setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  // Recargar datos del calendario cuando cambien los eventos
  useEffect(() => {
    if (events.length > 0 && calendarData.length > 0) {
      console.log('[DEBUG] Recargando calendario con eventos actualizados:', events.length);
      console.log('[DEBUG] Eventos disponibles para recarga:', events.slice(0, 3));
      fetchHotelPrices(events);
    }
  }, [events]);

  // Debug para verificar cambios en el estado de eventos
  useEffect(() => {
    console.log('[DEBUG] Estado de eventos actualizado:', events.length);
    if (events.length > 0) {
      console.log('[DEBUG] Primeros 3 eventos:', events.slice(0, 3));
    }
  }, [events]);

  const getColorForIntensity = (intensity: number, hasEvent: boolean, eventImpact: number = 0) => {
    // Si hay evento, usar colores más cálidos basados en el impacto
    if (hasEvent) {
      if (eventImpact >= 90) return 'bg-red-500 text-white ring-2 ring-red-600'; // Impacto alto
      if (eventImpact >= 60) return 'bg-orange-500 text-white ring-2 ring-orange-600'; // Impacto medio-alto
      if (eventImpact >= 40) return 'bg-orange-400 text-white ring-2 ring-orange-500'; // Impacto medio
      if (eventImpact > 0) return 'bg-yellow-400 text-gray-900 ring-2 ring-yellow-500'; // Impacto bajo
      return 'bg-yellow-300 text-gray-900 ring-2 ring-yellow-400'; // Con evento pero sin impacto calculado
    }

    // Sin evento, usar colores fríos/cálidos basados en precio
    if (intensity > 0.5) return 'bg-red-500 text-white'; // Precios muy altos
    if (intensity > 0.2) return 'bg-red-300 text-gray-900';
    if (intensity > 0) return 'bg-orange-200 text-gray-900';
    if (intensity > -0.2) return 'bg-blue-200 text-gray-900';
    if (intensity > -0.5) return 'bg-blue-400 text-white';
    return 'bg-blue-600 text-white'; // Precios muy bajos
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 90) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    if (impact >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    if (impact >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Calendario de Precios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualiza los precios de tu hotel por día y obtén recomendaciones basadas en eventos
          </p>
          
          {/* Estadísticas generales */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400">Días con Precios</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {calendarData.filter(day => day.prices.length > 0).length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400">Días con Eventos</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {calendarData.filter(day => day.hasEvent).length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400">Precio Promedio</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${Math.round(averagePrice).toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Eventos</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {events.length}
              </p>
            </div>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Leyenda de Colores</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2 ring-2 ring-red-600"></div>
              <span className="text-gray-700 dark:text-gray-300">Evento Alto Impacto</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded mr-2 ring-2 ring-orange-600"></div>
              <span className="text-gray-700 dark:text-gray-300">Evento Medio-Alto</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-400 rounded mr-2 ring-2 ring-orange-500"></div>
              <span className="text-gray-700 dark:text-gray-300">Evento Medio</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 rounded mr-2 ring-2 ring-yellow-500"></div>
              <span className="text-gray-700 dark:text-gray-300">Evento Bajo</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Precios Bajos</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-300 rounded mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Precios Altos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel izquierdo - Calendarios */}
          <div className="lg:col-span-1 space-y-6">
            {generateCalendarMonths().map((month, monthIndex) => (
              <div key={monthIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {month.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
                
                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                    <div key={day} className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const year = month.getFullYear();
                    const monthIndex = month.getMonth();
                    const firstDay = new Date(year, monthIndex, 1);
                    const lastDay = new Date(year, monthIndex + 1, 0);
                    const startDay = firstDay.getDay() || 7; // Convertir domingo (0) a 7
                    const daysInMonth = lastDay.getDate();
                    
                    const days = [];
                    
                    // Días vacíos al inicio
                    for (let i = 1; i < startDay; i++) {
                      days.push(<div key={`empty-${i}`} className="h-8"></div>);
                    }
                    
                    // Días del mes
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(year, monthIndex, day);
                      const calendarDay = calendarData.find(d => 
                        d.date.getTime() === date.getTime()
                      );
                      
                      const isSelected = selectedDate && 
                        selectedDate.getTime() === date.getTime();
                      
                      const hasEvent = calendarDay?.hasEvent || false;
                      const eventImpact = calendarDay?.eventImpact || 0;
                      const colorClass = calendarDay ? getColorForIntensity(calendarDay.colorIntensity, hasEvent, eventImpact) : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white';
                      
                      days.push(
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`
                            h-8 w-8 rounded text-xs font-medium transition-all relative
                            ${isSelected 
                              ? 'ring-2 ring-blue-500 bg-blue-500 text-white' 
                              : `${colorClass} hover:ring-2 hover:ring-blue-300`
                            }
                          `}
                          title={calendarDay ? 
                            `Precio promedio: $${Math.round(calendarDay.averagePrice).toLocaleString()}${hasEvent ? ` | Evento: ${calendarDay.event?.nombre} (Impacto: ${eventImpact}/100)` : ''}` : 
                            'Sin datos'
                          }
                        >
                          {day}
                          {hasEvent && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                          )}
                        </button>
                      );
                    }
                    
                    return days;
                  })()}
                </div>
              </div>
            ))}
          </div>

          {/* Panel derecho - Detalles del día seleccionado */}
          <div className="lg:col-span-3">
            {selectedDate ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatDate(selectedDate)}
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {(() => {
                  const selectedDay = calendarData.find(d => 
                    d.date.getTime() === selectedDate.getTime()
                  );

                  if (!selectedDay || selectedDay.prices.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Sin datos de precios
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          No hay información de precios disponible para esta fecha
                        </p>
                        {selectedDay?.hasEvent && selectedDay.event && (
                          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                              Evento detectado: {selectedDay.event.nombre}
                            </h4>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                              {selectedDay.event.descripcion || `Evento en ${selectedDay.event.lugar}`}
                            </p>
                            {selectedDay.eventImpact && (
                              <div className="mt-2">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getImpactColor(selectedDay.eventImpact)}`}>
                                  Impacto: {selectedDay.eventImpact}/100
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const dateString = selectedDate.toISOString().split('T')[0];
                  const recPct = selectedDay.priceRecommendation?.increase || 0;

                  return (
                    <div className="space-y-6">
                      {/* Resumen de precios */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <p className="text-sm text-blue-600 dark:text-blue-400">Precio Promedio</p>
                              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                ${Math.round(selectedDay.averagePrice).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="text-sm text-green-600 dark:text-green-400">vs Promedio General</p>
                              <p className={`text-2xl font-bold ${selectedDay.averagePrice > averagePrice ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                                {selectedDay.averagePrice > averagePrice ? '+' : ''}{Math.round(((selectedDay.averagePrice - averagePrice) / averagePrice) * 100)}%
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                            <div>
                              <p className="text-sm text-orange-600 dark:text-orange-400">Tipos de Habitación</p>
                              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                                {selectedDay.prices.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detalles por tipo de habitación con botones de ajuste */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Precios por Tipo de Habitación
                        </h3>
                        <div className="space-y-3">
                          {selectedDay.prices.map((price, index) => {
                            const recValue = Math.round(price.price * (recPct / 100));
                            const newPrice = price.price + recValue;
                            const isAdjusted = price.ajuste_aplicado || adjustedRooms[dateString]?.has(price.id) || price.price === newPrice;
                            
                            return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {price.room_type}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Última actualización: {new Date(price.scrape_date).toLocaleDateString()}
                                </p>
                              </div>
                                <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                  ${(() => {
                                    const priceValue = price.price;
                                    if (typeof priceValue === 'number') {
                                      return priceValue.toLocaleString();
                                    }
                                    // Si es string, intentar limpiarlo
                                    const strValue = String(priceValue);
                                    const cleanPrice = strValue.replace(/[^\d.]/g, '');
                                    const numPrice = parseFloat(cleanPrice);
                                    return isNaN(numPrice) ? strValue : numPrice.toLocaleString();
                                  })()}
                                </p>
                                    {selectedDay.priceRecommendation && recValue > 0 && (
                                      <p className="text-sm text-green-600 dark:text-green-400">
                                        +${recValue.toLocaleString()} ({recPct}%)
                                      </p>
                                    )}
                                  </div>
                                  {selectedDay.priceRecommendation && recValue > 0 && (
                                    <button
                                      className={`px-3 py-1 rounded shadow text-xs font-bold flex items-center gap-1 disabled:opacity-50 ${
                                        isAdjusted 
                                          ? 'bg-green-600 text-white' 
                                          : 'bg-blue-600 text-white hover:bg-blue-700'
                                      }`}
                                      disabled={accepting === price.id || isAdjusted}
                                      onClick={() => handleAccept(price, newPrice, dateString)}
                                    >
                                      {accepting === price.id ? (
                                        <span className="animate-pulse">Guardando...</span>
                                      ) : isAdjusted ? (
                                        <>
                                          <Check size={12} />
                                          <span>Aplicado</span>
                                        </>
                                      ) : (
                                        <>
                                          <span>Aplicar</span>
                                          <ArrowUpRight size={12} />
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recomendación por evento */}
                      {selectedDay.priceRecommendation && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                                Evento Detectado: {selectedDay.event?.nombre}
                              </h4>
                              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                                {selectedDay.event?.descripcion || `Evento en ${selectedDay.event?.lugar}`}
                              </p>
                              
                              {/* Información del evento */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-orange-600 dark:text-orange-400">Impacto del Evento</p>
                                  <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getImpactColor(selectedDay.eventImpact || 0)}`}>
                                    {selectedDay.eventImpact}/100 - {selectedDay.priceRecommendation.impactLevel}
                                  </span>
                                </div>
                                {selectedDay.event?.enlace && (
                                  <div>
                                    <p className="text-sm text-orange-600 dark:text-orange-400">Enlace del Evento</p>
                                    <a 
                                      href={selectedDay.event.enlace} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-orange-700 dark:text-orange-300 hover:underline"
                                    >
                                      Ver detalles →
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* Recomendación de precio */}
                              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                  <ArrowUpRight className="h-4 w-4 mr-2 text-orange-500" />
                                  Recomendación de Precio
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Precio Actual</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                      ${selectedDay.priceRecommendation.currentPrice.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Precio Recomendado</p>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                      ${selectedDay.priceRecommendation.recommendedPrice.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Incremento Sugerido</p>
                                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                      +{selectedDay.priceRecommendation.increase}%
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
                                  <p className="text-sm text-green-700 dark:text-green-300">
                                    💡 <strong>Recomendación:</strong> Considera aumentar el precio en un {selectedDay.priceRecommendation.increase}% 
                                    debido al impacto del evento "{selectedDay.event?.nombre}" en esta fecha.
                                  </p>
                                </div>
                              </div>

                              {/* Botón para aplicar todos los ajustes */}
                              {recPct > 0 && (
                                <div className="mt-4">
                                  <button
                                    className="w-full px-4 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                    disabled={bulkAccepting === dateString || selectedDay.prices.every(room => room.ajuste_aplicado)}
                                    onClick={() => handleBulkAccept(dateString, selectedDay.prices, recPct)}
                                  >
                                    {bulkAccepting === dateString ? (
                                      <span className="animate-pulse">Aplicando...</span>
                                    ) : (
                                      <>
                                        Aplicar a todas las habitaciones <ArrowUpRight size={16} />
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Selecciona una fecha
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Haz clic en cualquier día del calendario para ver los detalles de precios
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage; 