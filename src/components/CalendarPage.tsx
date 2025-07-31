import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from './Navigation';
import { Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface HotelPrice {
  id: string;
  checkin_date: string;
  room_type: string;
  price: number;
  scrape_date: string;
}

interface Event {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion?: string;
}

interface CalendarDay {
  date: Date;
  prices: HotelPrice[];
  averagePrice: number;
  colorIntensity: number;
  hasEvent: boolean;
  event?: Event;
}

const CalendarPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [averagePrice, setAveragePrice] = useState(0);

  // Generar los próximos 3 meses
  const generateCalendarMonths = () => {
    const months: Date[] = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 3; i++) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push(month);
    }
    
    return months;
  };

  // Obtener datos de precios del hotel
  const fetchHotelPrices = async () => {
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
      
      months.forEach(month => {
        const year = month.getFullYear();
        const monthIndex = month.getMonth();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, monthIndex, day);
          const dateString = date.toISOString().split('T')[0];
          const dayPrices = pricesByDate[dateString] || [];
          
          const dayAveragePrice = dayPrices.length > 0 
            ? dayPrices.reduce((sum: number, p: any) => sum + p.price, 0) / dayPrices.length 
            : 0;

          // Calcular intensidad de color basada en la diferencia del promedio
          let colorIntensity = 0;
          if (avgPrice > 0) {
            const priceDiff = ((dayAveragePrice - avgPrice) / avgPrice) * 100;
            colorIntensity = Math.max(-1, Math.min(1, priceDiff / 50)); // Normalizar entre -1 y 1
          }

          // Verificar si hay eventos en esta fecha
          const dayEvent = events.find(event => event.fecha === dateString);

          calendarDays.push({
            date,
            prices: dayPrices,
            averagePrice: dayAveragePrice,
            colorIntensity,
            hasEvent: !!dayEvent,
            event: dayEvent
          });
        }
      });

      setCalendarData(calendarDays);
    } catch (error) {
      console.error('Error fetching hotel prices:', error);
    }
  };

  // Obtener eventos
  const fetchEvents = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/events?user_id=${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching events:', data.error);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchHotelPrices(), fetchEvents()]);
      setLoading(false);
    };

    loadData();
  }, [user?.id]);

  const getColorForIntensity = (intensity: number) => {
    if (intensity > 0.5) return 'bg-red-500'; // Precios muy altos
    if (intensity > 0.2) return 'bg-red-300';
    if (intensity > 0) return 'bg-orange-200';
    if (intensity > -0.2) return 'bg-blue-200';
    if (intensity > -0.5) return 'bg-blue-400';
    return 'bg-blue-600'; // Precios muy bajos
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPriceRecommendation = (day: CalendarDay) => {
    if (!day.hasEvent || !day.event) return null;

    const currentPrice = day.averagePrice;
    const baseRecommendation = currentPrice * 1.15; // 15% de incremento base por evento
    
    return {
      currentPrice,
      recommendedPrice: Math.round(baseRecommendation),
      increase: Math.round(((baseRecommendation - currentPrice) / currentPrice) * 100)
    };
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
                      
                      const hasEvent = calendarDay?.hasEvent;
                      const colorClass = calendarDay ? getColorForIntensity(calendarDay.colorIntensity) : 'bg-gray-100 dark:bg-gray-700';
                      
                      days.push(
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`
                            h-8 w-8 rounded text-xs font-medium transition-all
                            ${isSelected 
                              ? 'ring-2 ring-blue-500 bg-blue-500 text-white' 
                              : `${colorClass} text-gray-900 dark:text-white hover:ring-2 hover:ring-blue-300`
                            }
                            ${hasEvent ? 'ring-2 ring-orange-400' : ''}
                          `}
                          title={calendarDay ? `Precio promedio: $${calendarDay.averagePrice}` : 'Sin datos'}
                        >
                          {day}
                          {hasEvent && (
                            <div className="w-1 h-1 bg-orange-400 rounded-full mx-auto mt-0.5"></div>
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
                      </div>
                    );
                  }

                  const recommendation = getPriceRecommendation(selectedDay);

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
                                ${Math.round(selectedDay.averagePrice)}
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

                      {/* Detalles por tipo de habitación */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Precios por Tipo de Habitación
                        </h3>
                        <div className="space-y-3">
                          {selectedDay.prices.map((price, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {price.room_type}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Última actualización: {new Date(price.scrape_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                  ${price.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recomendación por evento */}
                      {recommendation && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                                Evento Detectado: {selectedDay.event?.nombre}
                              </h4>
                              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                                {selectedDay.event?.descripcion || `Evento en ${selectedDay.event?.lugar}`}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm text-orange-600 dark:text-orange-400">Precio Actual</p>
                                  <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                                    ${recommendation.currentPrice}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-orange-600 dark:text-orange-400">Precio Recomendado</p>
                                  <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                                    ${recommendation.recommendedPrice}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-orange-600 dark:text-orange-400">Incremento Sugerido</p>
                                  <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                                    +{recommendation.increase}%
                                  </p>
                                </div>
                              </div>
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