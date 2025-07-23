import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import KpiCard from '../ui/KpiCard';
import { supabase } from '../../supabaseClient';

// Helper to get today's date in YYYY-MM-DD
const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const num = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(num) || 0;
};

const CompetitiveMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [precioPromedioCompetencia, setPrecioPromedioCompetencia] = useState<string | number>('—');
  const [nuestroDiferencial, setNuestroDiferencial] = useState<string | number>('—');
  const [ocupacionEstimada, setOcupacionEstimada] = useState<string | number>('—');
  const [tiempoRespuesta, setTiempoRespuesta] = useState<string | number>('—');

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      // 1. Fetch competitor hotels
      const { data: competitors, error: compError } = await supabase.from('hoteles_parallel').select('*');
      // 2. Fetch own hotel prices for today
      const today = getToday();
      const { data: ownPrices, error: ownError } = await supabase
        .from('hotel_usuario')
        .select('*')
        .eq('checkin_date', today);
      if (compError || ownError) {
        setLoading(false);
        return;
      }
      // --- Precio Promedio Competencia ---
      const competitorAverages: number[] = (competitors || []).map(hotel => {
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
      const avgCompetencia = competitorAverages.length > 0 ? (competitorAverages.reduce((a, b) => a + b, 0) / competitorAverages.length) : null;
      setPrecioPromedioCompetencia(avgCompetencia ? avgCompetencia.toFixed(0) : 'N/A');
      // --- Nuestro Diferencial ---
      let ownAvg = null;
      if (ownPrices && ownPrices.length > 0) {
        const prices = ownPrices.map(row => parsePrice(row.price)).filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
        if (prices.length > 0) {
          ownAvg = prices.reduce((a, b) => a + b, 0) / prices.length;
        }
      }
      setNuestroDiferencial((ownAvg !== null && avgCompetencia) ? (ownAvg - avgCompetencia).toFixed(0) : 'N/A');
      // --- Ocupación Estimada ---
      const ocupaciones = (competitors || []).map(h => h.nivelOcupacion).filter(Boolean);
      setOcupacionEstimada(ocupaciones.length > 0 ? '—' : 'N/A'); // TODO: Real logic if you have numeric data
      // --- Tiempo de Respuesta ---
      setTiempoRespuesta('N/A'); // TODO: Real logic if you have this data
      setLoading(false);
    }
    fetchMetrics();
  }, []);

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Precio Promedio Competencia */}
      <KpiCard title="Precio Promedio Competencia" bindKey="precioPromedioCompetencia" unidad="" icon={<DollarSign size={24} />} iconColor="text-blue-500 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-900/30" borderColor="border-blue-500" formula="Promedio de tarifas de todos los competidores en el radio seleccionado" value={precioPromedioCompetencia} loading={loading} />
      {/* Nuestro Diferencial */}
      <KpiCard title="Nuestro Diferencial" bindKey="nuestroDiferencial" unidad="" icon={<TrendingUp size={24} />} iconColor="text-green-500 dark:text-green-400" bgColor="bg-green-50 dark:bg-green-900/30" borderColor="border-green-500" formula="Diferencia entre nuestra tarifa y el promedio de competidores" value={nuestroDiferencial} loading={loading} />
      {/* Ocupación Estimada */}
      <KpiCard title="Ocupación Estimada" bindKey="ocupacionEstimada" unidad="%" icon={<Users size={24} />} iconColor="text-amber-500 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-900/30" borderColor="border-amber-500" formula="Estimación basada en datos históricos y estacionalidad" value={ocupacionEstimada} loading={loading} />
      {/* Tiempo de Respuesta */}
      <KpiCard title="Tiempo de Respuesta" bindKey="tiempoRespuesta" unidad="h" icon={<Clock size={24} />} iconColor="text-purple-500 dark:text-purple-400" bgColor="bg-purple-50 dark:bg-purple-900/30" borderColor="border-purple-500" formula="Tiempo promedio que tardan los competidores en ajustar precios" value={tiempoRespuesta} loading={loading} />
    </div>;
};
export default CompetitiveMetrics;