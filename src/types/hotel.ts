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
export interface HotelCompetitor {
  id: string;
  nombre: string;
  categoria: number; // stars 1-5
  distancia: number;
  tarifaActual: number;
  cambioTarifa24h: number;
  cambioTarifa7d: number;
  nivelOcupacion: 'Alto' | 'Medio' | 'Bajo';
  servicios: Servicio[];
  puntuacionReseñas: number;
  elasticidadPrecios: number;
  ultimaActualizacion: Date;
}
export interface Servicio {
  id: string;
  nombre: string;
  icono: string;
  disponible: boolean;
  categoria: 'Conectividad' | 'Recreación' | 'Servicios' | 'Negocios';
}
export interface EventoLocal {
  id: string;
  nombre: string;
  fecha: Date;
  impacto: number; // 0-100
  distancia: number;
  asistenciaEsperada: number;
  categoria: 'Concierto' | 'Conferencia' | 'Deportivo' | 'Cultural';
}