import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
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

  // Eliminar el useEffect que hace fetch a Amadeus al escribir (hotelQuery)
  // Solo mantener el useEffect que hace la búsqueda inicial al obtener coords

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
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded shadow space-y-4">
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <div className="relative">
          <input
            name="hotel"
            placeholder={hotelsLoading ? 'Buscando hoteles cercanos...' : 'Escribe el nombre de tu hotel'}
            value={hotelQuery}
            onChange={handleHotelInput}
            required
            className="w-full px-3 py-2 border rounded"
            autoComplete="off"
            ref={inputRef}
            disabled={hotelsLoading}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && hotels.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-800 border w-full max-h-48 overflow-y-auto rounded shadow mt-1">
              {hotels.map((h, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={() => handleSelectHotel(h.name)}
                >
                  {h.name}
                </li>
              ))}
            </ul>
          )}
          {showSuggestions && !hotelsLoading && hotels.length === 0 && (
            <div className="absolute z-10 bg-white dark:bg-gray-800 border w-full rounded shadow mt-1 px-3 py-2 text-gray-500 text-sm">
              No se encontraron hoteles cercanos para tu ubicación.
            </div>
          )}
        </div>
        {geoError && <div className="text-yellow-600 text-xs">{geoError}</div>}
        <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      </form>
      <div className="mt-4 text-center">
        <Link to="/auth" className="text-blue-600 hover:underline text-sm">¿Ya tienes cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
};

export default RegisterForm; 