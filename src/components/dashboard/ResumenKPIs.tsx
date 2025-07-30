import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Percent, Award, Calendar, GitCompare } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
import { supabase } from '../../supabaseClient';
import { useUser } from '../../contexts/UserContext';

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const num = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(num) || 0;
};
const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
const ResumenKPIs = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    rpi: '—',
    marketShare: '—',
    tdp: '—',
    revpar: '—',
    ocupacion: '—',
    priceRank: '—',
    eventImpact: '—',
    brechaCompetitiva: '—',
  });
  const { userId, createdBy, user } = useUser();
  // Obtener ciudad del usuario (insensible a mayúsculas/minúsculas)
  const userCity = user?.user_metadata?.cityName?.toLowerCase() || null;
  useEffect(() => {
    async function fetchKPIs() {
      setLoading(true);
      const today = getToday();
      console.log('[DEBUG] Fetching KPIs for date:', today, 'user_id:', userId);
      
      // Filtrar por user_id
      const { data: allOwnPrices, error: allOwnError } = await supabase
        .from('hotel_usuario')
        .select('*')
        .eq('user_id', userId)
        .limit(5);
      
      if (allOwnError) {
        console.error('[DEBUG] Error fetching all own prices:', allOwnError);
      }
      console.log('[DEBUG] allOwnPrices sample', allOwnPrices);
      
      // Fetch own hotel prices for today (usar checkin_date)
      const { data: ownPrices, error: ownError } = await supabase
        .from('hotel_usuario')
        .select('*')
        .eq('checkin_date', today)
        .eq('user_id', userId);
      
      if (ownError) {
        console.error('[DEBUG] Error fetching own prices for today:', ownError);
      }
      console.log('[DEBUG] ownPrices for today', ownPrices);
      
      // If no data for today, try to get recent data
      let ownPricesToUse = ownPrices;
      if (!ownPrices || ownPrices.length === 0) {
        console.log('[DEBUG] No data for today, fetching recent data');
        const { data: recentPrices, error: recentError } = await supabase
          .from('hotel_usuario')
          .select('*')
          .eq('user_id', userId)
          .order('checkin_date', { ascending: false })
          .limit(10);
        
        if (recentError) {
          console.error('[DEBUG] Error fetching recent prices:', recentError);
        }
        console.log('[DEBUG] recentPrices', recentPrices);
        ownPricesToUse = recentPrices;
      }
      
      // Fetch competitor hotels
      const { data: competitorsRaw, error: competitorsError } = await supabase.from('hoteles_parallel').select('*');
      
      if (competitorsError) {
        console.error('[DEBUG] Error fetching competitors:', competitorsError);
      }
      
      // Filtrar por ciudad si está definida en el usuario
      let competitors = competitorsRaw || [];
      if (userCity) {
        competitors = competitors.filter((hotel: any) =>
          hotel.ciudad && hotel.ciudad.toLowerCase() === userCity
        );
        console.log('[DEBUG] Filtered competitors for city:', userCity, 'count:', competitors.length);
      }
      
      // --- Tarifa Promedio (TDP) ---
      let tdp = 'N/A';
      if (ownPricesToUse && ownPricesToUse.length > 0) {
        const prices = ownPricesToUse.map(row => parsePrice(row.price));
        console.log('[DEBUG] parsed prices', prices);
        const validPrices = prices.filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
        if (validPrices.length > 0) {
          tdp = (validPrices.reduce((a, b) => a + b, 0) / validPrices.length).toFixed(0);
        }
      }
      
      // --- RevPAR (simplificado: promedio de precios, puedes ajustar si tienes ocupación) ---
      let revpar = tdp;
      
      // --- RPI (RevPAR propio / competencia * 100) ---
      let rpi = 'N/A';
      let avgCompetencia = null;
      if (competitors && competitors.length > 0) {
        const competitorAverages = competitors.map(hotel => {
          if (!hotel.rooms_jsonb) return 0;
          let rooms;
          try {
            rooms = typeof hotel.rooms_jsonb === 'string' ? JSON.parse(hotel.rooms_jsonb) : hotel.rooms_jsonb;
          } catch {
            return 0;
          }
          const todayRooms = rooms[today];
          if (!Array.isArray(todayRooms) || todayRooms.length === 0) return 0;
          const prices = todayRooms.map(r => parsePrice(r.price)).filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
          if (prices.length === 0) return 0;
          return prices.reduce((a, b) => a + b, 0) / prices.length;
        }).filter(avg => avg > 0);
        avgCompetencia = competitorAverages.length > 0 ? (competitorAverages.reduce((a, b) => a + b, 0) / competitorAverages.length) : null;
        if (tdp !== 'N/A' && avgCompetencia) {
          rpi = ((parseFloat(revpar) / avgCompetencia) * 100).toFixed(0);
        }
      }
      
      // --- Cuota de Mercado (dummy, requiere ingresos totales mercado) ---
      let marketShare = 'N/A';
      
      // --- Tasa de Ocupación (dummy, requiere datos reales) ---
      let ocupacion = 'N/A';
      
      // --- Posición de Precios (ranking) ---
      let priceRank = 'N/A';
      if (tdp !== 'N/A' && avgCompetencia) {
        priceRank = parseFloat(tdp) > avgCompetencia ? 'Arriba Prom.' : 'Abajo Prom.';
      }
      
      // --- Impacto de Eventos y Brecha Competitiva (dummy) ---
      setKpis({
        rpi,
        marketShare,
        tdp,
        revpar,
        ocupacion,
        priceRank,
        eventImpact: 'N/A',
        brechaCompetitiva: avgCompetencia && tdp !== 'N/A' ? (parseFloat(tdp) - avgCompetencia).toFixed(0) : 'N/A',
      });
      setLoading(false);
    }
    fetchKPIs();
  }, [userId, userCity]);
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard title="Índice de Rendimiento" bindKey="rpi" unidad="%" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="RPI = (RevPAR propio / RevPAR competencia) × 100" value={kpis.rpi} loading={loading} />
      <KpiCard title="Cuota de Mercado" bindKey="marketShare" unidad="%" icon={<Percent size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Cuota = (Ingresos propios / Ingresos totales mercado) × 100" value={kpis.marketShare} loading={loading} />
      <KpiCard title="Tarifa Promedio" bindKey="tdp" unidad="" icon={<DollarSign size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="TDP = Ingresos totales por habitaciones / Número de habitaciones ocupadas" value={kpis.tdp} loading={loading} />
      <KpiCard title="RevPAR" bindKey="revpar" unidad="" icon={<DollarSign size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="RevPAR = Ingresos totales por habitaciones / Número total de habitaciones disponibles" value={kpis.revpar} loading={loading} />
      <KpiCard title="Tasa de Ocupación" bindKey="ocupacion" unidad="%" icon={<Users size={24} />} iconColor="text-indigo-500 dark:text-indigo-400" bgColor="bg-indigo-50 dark:bg-indigo-900/30" borderColor="border-indigo-500" formula="Ocupación = (Habitaciones ocupadas / Habitaciones disponibles) × 100" value={kpis.ocupacion} loading={loading} />
      <KpiCard title="Posición de Precios" bindKey="priceRank" unidad="" icon={<Award size={24} />} iconColor="text-red-500 dark:text-red-400" bgColor="bg-red-50 dark:bg-red-900/30" borderColor="border-red-500" formula="Ranking de precios entre competidores en el mismo segmento" value={kpis.priceRank} loading={loading} />
      <KpiCard title="Impacto de Eventos" bindKey="eventImpact" unidad="" icon={<Calendar size={24} />} iconColor="text-teal-500 dark:text-teal-400" bgColor="bg-teal-50 dark:bg-teal-900/30" borderColor="border-teal-500" formula="Puntuación ponderada de eventos próximos según asistencia esperada e impacto histórico" value={kpis.eventImpact} loading={loading} />
      <KpiCard title="Brecha Competitiva" bindKey="brechaCompetitiva" unidad="" icon={<GitCompare size={24} />} iconColor="text-pink-500 dark:text-pink-400" bgColor="bg-pink-50 dark:bg-pink-900/30" borderColor="border-pink-500" formula="Diferencia promedio de precio entre tu hotel y los 3 competidores principales" value={kpis.brechaCompetitiva} loading={loading} />
    </div>;
};
export default ResumenKPIs;