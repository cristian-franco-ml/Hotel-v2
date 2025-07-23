import React, { useEffect, useState } from 'react';
import { BarChart2, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../supabaseClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useUser } from '../../contexts/UserContext';

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
  const { userId, createdBy } = useUser();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Get today and 30 days ago
      const today = new Date();
      const start = new Date();
      start.setDate(today.getDate() - 29);
      const yyyy = (d: Date) => d.getFullYear();
      const mm = (d: Date) => String(d.getMonth() + 1).padStart(2, '0');
      const dd = (d: Date) => String(d.getDate()).padStart(2, '0');
      // Build all dates in range
      const days: string[] = [];
      for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        days.push(`${yyyy(d)}-${mm(d)}-${dd(d)}`);
      }
      // Fetch all bookings in range
      const { data: prices, error } = await supabase
        .from('hotel_usuario')
        .select('checkin_date, price')
        .gte('checkin_date', days[0])
        .lte('checkin_date', days[days.length - 1])
        .eq('user_id', userId);
      if (error) {
        setLoading(false);
        return;
      }
      // Agrupar por fecha y sumar ingresos
      const revenueByDate: Record<string, number> = {};
      for (const row of prices || []) {
        const date = row.checkin_date;
        const price = parsePrice(row.price);
        if (!revenueByDate[date]) revenueByDate[date] = 0;
        revenueByDate[date] += price;
      }
      // Formatear para recharts, asegurando 0 si no hay datos
      const chartData = days.map(date => ({
        date,
        Ganancias: revenueByDate[date] || 0
      }));
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
              <Line type="monotone" dataKey="Ganancias" stroke="#3b82f6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>;
};
export default RevenueTrendChart;