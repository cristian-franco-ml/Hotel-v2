import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface RegisterFormProps {
  noMargin?: boolean;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ noMargin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    hotel: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hotels, setHotels] = useState<{ name: string }[]>([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [hotelMetadata, setHotelMetadata] = useState<any>(null);
  const [hotelQuery, setHotelQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Solicita ubicación al cargar
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoError('Tu navegador no soporta geolocalización.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoError(null);
      },
      (err) => {
        setGeoError('No se pudo obtener tu ubicación. Puedes buscar manualmente tu hotel.');
        setCoords(null);
      }
    );
  }, []);

  // Fetch hoteles de Amadeus al obtener coordenadas (sugerencias iniciales)
  useEffect(() => {
    const fetchInitialHotels = async () => {
      if (!coords) return;
      setHotelsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/amadeus-hotels`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: coords.lat,
            lng: coords.lon,
            radius: 15
          })
        });
        const data = await res.json();
        setHotels(data.hotels || []);
      } catch (err) {
        setHotels([]);
      }
      setHotelsLoading(false);
    };
    fetchInitialHotels();
  }, [coords]);

  // Filtrado local de hoteles según lo que escribe el usuario
  const filteredHotels = hotelQuery.length < 3
    ? hotels
    : hotels.filter(h => h.name.toLowerCase().includes(hotelQuery.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Autocompletado: actualiza query y muestra sugerencias
  const handleHotelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelQuery(e.target.value);
    setForm({ ...form, hotel: e.target.value });
    setShowSuggestions(true);
  };

  // Selecciona hotel de sugerencias y guarda metadata
  const handleSelectHotel = (hotelName: string) => {
    const selected = hotels.find(h => h.name === hotelName);
    setForm({ ...form, hotel: hotelName });
    setHotelQuery(hotelName);
    setHotelMetadata(selected || null);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  // Enviar metadata al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    // Si no hay hotelMetadata, usar el nombre escrito por el usuario
    const hotelNameToSend = hotelMetadata ? hotelMetadata.name : form.hotel;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hotel: hotelNameToSend, hotel_metadata: hotelMetadata })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('¡Registro exitoso!');
        // Si hay sesión, guárdala y redirige
        if (data.session && data.session.access_token) {
          localStorage.setItem('session', JSON.stringify(data.session));
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        }
      } else setError(data.error || 'Error en el registro');
    } catch (err) {
      setError('Error de red o servidor');
    }
    setLoading(false);
  };

  // Cierra sugerencias al hacer click fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in">
      <form onSubmit={handleSubmit} className={`max-w-sm mx-auto ${noMargin ? '' : 'mt-8'} p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl flex flex-col items-center space-y-5`}>
        <img src="/arkusnexus-logo.png" alt="Logo" className="h-12 w-12 mb-2" />
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800 dark:text-white">¡Bienvenido!</h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-4 text-base">Crea tu cuenta para comenzar a optimizar tu hotel.</p>
      
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg" />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg" />
        <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg" />
        <div className="relative w-full">
          <input
            name="hotel"
            placeholder={hotelsLoading ? 'Buscando hoteles cercanos...' : 'Escribe el nombre de tu hotel'}
            value={hotelQuery}
            onChange={handleHotelInput}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm focus:shadow-lg"
            autoComplete="off"
            ref={inputRef}
            disabled={hotelsLoading}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && filteredHotels.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full max-h-48 overflow-y-auto rounded shadow mt-1">
              {filteredHotels.map((h, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                  onMouseDown={() => handleSelectHotel(h.name)}
                >
                  {h.name}
                </li>
              ))}
            </ul>
          )}
          {showSuggestions && !hotelsLoading && filteredHotels.length === 0 && (
            <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full rounded shadow mt-1 px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
              No se encontraron hoteles cercanos para tu búsqueda.
            </div>
          )}
        </div>
        {geoError && <div className="text-yellow-600 dark:text-yellow-400 text-xs">{geoError}</div>}
        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 dark:text-green-400 text-sm text-center">{success}</div>}
      </form>
      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <Link to="/auth" className="text-blue-600 dark:text-blue-400 hover:underline text-base mt-2">¿Ya tienes cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
};

export default RegisterForm; 