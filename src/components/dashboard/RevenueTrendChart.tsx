import React, { useEffect, useState } from 'react';
import { BarChart2, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../supabaseClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const num = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(num) || 0;
};

const RevenueTrendChart = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: prices, error } = await supabase
        .from('hotel_usuario')
        .select('checkin_date, room_type, price');
      if (error) {
        setLoading(false);
        return;
      }
      // Agrupar por fecha y tipo de cuarto
      const grouped: Record<string, Record<string, number>> = {};
      const roomTypeSet = new Set<string>();
      for (const row of prices) {
        const date = row.checkin_date;
        const type = row.room_type;
        const price = parsePrice(row.price);
        roomTypeSet.add(type);
        if (!grouped[date]) grouped[date] = {};
        grouped[date][type] = price;
      }
      // Convertir a formato para recharts
      const chartData = Object.entries(grouped).map(([date, types]) => ({
        date,
        ...types
      })).sort((a, b) => a.date.localeCompare(b.date));
      setRoomTypes(Array.from(roomTypeSet));
      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BarChart2 size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('revenue_performance')}
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      <div className="h-64 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t('loading_chart_data')}
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {roomTypes.map((type, idx) => (
                <Line key={type} type="monotone" dataKey={type} stroke={`hsl(${idx * 60}, 70%, 50%)`} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>;
};
export default RevenueTrendChart;