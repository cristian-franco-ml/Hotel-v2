import React, { useEffect, useState } from 'react';
import { GitCompare, HelpCircle } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const MAX_COMPETITORS = 12;

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
const CompetitorPriceComparison = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const today = getToday();
      // DEBUG: fetch all records to inspect checkin_date
      const { data: allOwnPrices } = await supabase
        .from('hotel_usuario')
        .select('*')
        .limit(5);
      // Fetch our hotel prices for today (usar checkin_date)
      const { data: ownPrices } = await supabase
        .from('hotel_usuario')
        .select('hotel_name, price')
        .eq('checkin_date', today);
      // Fetch competitors
      const { data: competitors } = await supabase.from('hoteles_parallel').select('*');
      // Calculate our average price
      let ourAvg = null;
      if (ownPrices && ownPrices.length > 0) {
        const prices = ownPrices.map(row => parsePrice(row.price));
        const validPrices = prices.filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
        if (validPrices.length > 0) {
          ourAvg = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
        }
      }
      // Prepare competitor rows
      const competitorRows = (competitors || []).map(hotel => {
        let avgPrice = null;
        if (hotel.rooms_jsonb) {
          try {
            const rooms = typeof hotel.rooms_jsonb === 'string' ? JSON.parse(hotel.rooms_jsonb) : hotel.rooms_jsonb;
            const todayRooms = rooms[today];
            if (Array.isArray(todayRooms) && todayRooms.length > 0) {
              const prices = todayRooms.map(r => parsePrice(r.price)).filter(p => typeof p === 'number' && !isNaN(p) && p > 0);
              if (prices.length > 0) {
                avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
              }
            }
          } catch {}
        }
        return {
          id: hotel.id,
          name: hotel.nombre,
          price: avgPrice,
          isUs: false,
        };
      });
      // Add our hotel as the first row
      setRows([
        {
          id: 'us',
          name: ownPrices && ownPrices.length > 0 ? ownPrices[0].hotel_name : 'Nuestro Hotel',
          price: ourAvg,
          isUs: true,
        },
        ...competitorRows
      ]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const hasMore = rows.length > (MAX_COMPETITORS + 1); // +1 for 'us' row
  const visibleRows = showAll ? rows : rows.slice(0, MAX_COMPETITORS + 1); // +1 for 'us' row

  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <GitCompare size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            Comparativa de Precios
          </h3>
          <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tarifa Actual
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Diferencia vs Nosotros
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? <tr><td colSpan={3} className="text-center py-6 text-gray-500">Cargando...</td></tr> : visibleRows.map((row, idx) => (
              <tr key={row.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${row.isUs ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`text-sm font-medium ${row.isUs ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                      {row.name}
                    </div>
                    {row.isUs && <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">NOSOTROS</span>}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`text-sm ${row.isUs ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {row.price !== null && row.price !== undefined ? `$${row.price.toFixed(0)}` : 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {!row.isUs && rows[0].price !== null && row.price !== null && row.price !== undefined ? (
                    <div className={`text-sm ${row.price < rows[0].price ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {row.price < rows[0].price ? `-$${(rows[0].price - row.price).toFixed(0)}` : `+$${(row.price - rows[0].price).toFixed(0)}`}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          className="w-full mt-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Ver menos competidores' : 'Ver más competidores'}
        </button>
      )}
    </div>;
};
export default CompetitorPriceComparison;