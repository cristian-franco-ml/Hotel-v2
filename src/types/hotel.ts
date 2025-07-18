export interface Hotel {
  id: string;
  name: string;
  stars: number;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  rooms: number;
  occupancyRate: number;
  averageRate: number;
  revenueLastMonth: number;
}