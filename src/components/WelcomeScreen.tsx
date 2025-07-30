import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle, AlertCircle, Loader2, Hotel, TrendingUp, Calendar, MapPin, Users, AlertTriangle } from 'lucide-react';
import { WELCOME_CONFIG, FEATURE_COLORS } from '../config/welcomeConfig';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const { user } = useUser();
  const { darkMode } = useTheme();
  const [scrapingStatus, setScrapingStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Iniciar el scraping automáticamente cuando se monta el componente
    startScraping();
  }, []);

  const startScraping = async () => {
    if (!user?.id) return;

    setScrapingStatus('running');
    setProgress(0);
    setErrorMessage('');

    try {
      // Simular progreso más lento durante los primeros 80% (40 segundos)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 80) {
            return prev + 1; // Más lento: 1% cada 2 segundos
          }
          return prev;
        });
      }, 2000);

      // Intentar ejecutar el scraping
      const response = await fetch(WELCOME_CONFIG.SCRAPING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      clearInterval(progressInterval);

      if (response.ok) {
        // Simular progreso hasta 100% después de completar (más lento)
        const finalProgressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev < 100) {
              return prev + 1; // Más lento: 1% cada 100ms
            }
            clearInterval(finalProgressInterval);
            return 100;
          });
        }, 100);

        setTimeout(() => {
          setScrapingStatus('completed');
          setTimeout(() => {
            onComplete();
          }, WELCOME_CONFIG.REDIRECT_DELAY);
        }, 3000); // Más tiempo para mostrar el 100%
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error al ejecutar el scraping');
        setScrapingStatus('error');
      }
    } catch (error) {
      console.error('Error during scraping:', error);
      setErrorMessage(WELCOME_CONFIG.MESSAGES.connectionError);
      setScrapingStatus('error');
    }
  };

  const getProgressColor = () => {
    switch (scrapingStatus) {
      case 'running':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusIcon = () => {
    switch (scrapingStatus) {
      case 'running':
        return <Loader2 className="animate-spin" />;
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'error':
        return <AlertCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-4xl w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-xl p-8`}>
        
        {/* Header de bienvenida */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {WELCOME_CONFIG.PLATFORM_INFO.title}
          </h1>
          <p className="text-lg opacity-80">
            {WELCOME_CONFIG.PLATFORM_INFO.subtitle}
          </p>
        </div>

        {/* Mensaje importante - NO SALIR DE LA PÁGINA */}
        <div className={`mb-6 p-4 rounded-lg border-2 border-amber-500 ${darkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-semibold text-amber-700 dark:text-amber-300">
              ⚠️ IMPORTANTE: No salgas de esta página durante la configuración
            </span>
          </div>
          <p className="text-sm text-center mt-2 opacity-80">
            El proceso puede tardar varios minutos. Cerrar la página puede interrumpir la configuración.
          </p>
        </div>

        {/* Información básica de la página */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border-l-4 border-blue-500`}>
            <div className="flex items-center mb-3">
              <Hotel className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="font-semibold">Gestión de Hoteles</h3>
            </div>
            <p className="text-sm opacity-80">
              Administra tu hotel, configura precios y monitorea la competencia en tiempo real.
            </p>
          </div>

          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'} border-l-4 border-green-500`}>
            <div className="flex items-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="font-semibold">Análisis de Mercado</h3>
            </div>
            <p className="text-sm opacity-80">
              Obtén insights valiosos sobre tendencias de precios y posicionamiento en el mercado.
            </p>
          </div>

          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} border-l-4 border-purple-500`}>
            <div className="flex items-center mb-3">
              <Calendar className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="font-semibold">Eventos y Oportunidades</h3>
            </div>
            <p className="text-sm opacity-80">
              Descubre eventos cercanos que pueden impactar la demanda de tu hotel.
            </p>
          </div>

          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} border-l-4 border-orange-500`}>
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="font-semibold">Estrategias Inteligentes</h3>
            </div>
            <p className="text-sm opacity-80">
              Configura reglas automáticas para optimizar precios y maximizar ingresos.
            </p>
          </div>
        </div>

        {/* Sección de scraping */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-2 border-dashed border-gray-300`}>
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Configurando tu experiencia
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Estamos preparando toda la información necesaria para que puedas comenzar a usar la plataforma.
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {scrapingStatus === 'running' && WELCOME_CONFIG.MESSAGES.running}
                {scrapingStatus === 'completed' && WELCOME_CONFIG.MESSAGES.completed}
                {scrapingStatus === 'error' && WELCOME_CONFIG.MESSAGES.error}
              </span>
              <div className="flex items-center">
                {getStatusIcon()}
                <span className="ml-2 text-sm">{progress}%</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Mensaje de tiempo estimado */}
          {scrapingStatus === 'running' && (
            <div className="text-center">
              <p className="text-sm opacity-70">
                ⏱️ {WELCOME_CONFIG.MESSAGES.timeEstimate}
              </p>
              <p className="text-xs opacity-50 mt-1">
                {WELCOME_CONFIG.MESSAGES.timeEstimateSubtitle}
              </p>
            </div>
          )}

          {/* Mensaje de error */}
          {scrapingStatus === 'error' && (
            <div className="text-center">
              <p className="text-sm text-red-500 mb-3">
                {errorMessage}
              </p>
              <button
                onClick={startScraping}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {WELCOME_CONFIG.MESSAGES.retryButton}
              </button>
            </div>
          )}

          {/* Mensaje de éxito */}
          {scrapingStatus === 'completed' && (
            <div className="text-center">
              <p className="text-sm text-green-500 mb-3">
                {WELCOME_CONFIG.MESSAGES.successMessage}
              </p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-xs opacity-50 mb-4">
            {WELCOME_CONFIG.MESSAGES.exploringMessage}
          </p>
          
          {/* Botón para saltar */}
          {scrapingStatus === 'running' && (
            <button
              onClick={() => {
                setScrapingStatus('completed');
                setProgress(100);
                setTimeout(() => {
                  onComplete();
                }, 1000);
              }}
              className="text-sm text-blue-500 hover:text-blue-600 underline"
            >
              {WELCOME_CONFIG.MESSAGES.skipButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 