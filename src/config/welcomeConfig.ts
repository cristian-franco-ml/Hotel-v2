// Configuración para la pantalla de bienvenida
export const WELCOME_CONFIG = {
  // Tiempo estimado para el scraping (en minutos)
  ESTIMATED_SCRAPING_TIME: 15,
  
  // Endpoint del backend para ejecutar scraping
  SCRAPING_ENDPOINT: '/run-all-scrapings',
  
  // Tiempo de espera antes de redirigir al dashboard (en ms)
  REDIRECT_DELAY: 2000,
  
  // Información de la plataforma
  PLATFORM_INFO: {
    title: '¡Bienvenido a ArkusNexus!',
    subtitle: 'Tu plataforma integral de gestión hotelera y análisis de mercado',
    features: [
      {
        title: 'Gestión de Hoteles',
        description: 'Administra tu hotel, configura precios y monitorea la competencia en tiempo real.',
        icon: 'Hotel',
        color: 'blue'
      },
      {
        title: 'Análisis de Mercado',
        description: 'Obtén insights valiosos sobre tendencias de precios y posicionamiento en el mercado.',
        icon: 'TrendingUp',
        color: 'green'
      },
      {
        title: 'Eventos y Oportunidades',
        description: 'Descubre eventos cercanos que pueden impactar la demanda de tu hotel.',
        icon: 'Calendar',
        color: 'purple'
      },
      {
        title: 'Estrategias Inteligentes',
        description: 'Configura reglas automáticas para optimizar precios y maximizar ingresos.',
        icon: 'Users',
        color: 'orange'
      }
    ]
  },
  
  // Mensajes de estado
  MESSAGES: {
    running: 'Recopilando datos...',
    completed: '¡Configuración completada!',
    error: 'Error en la configuración',
    timeEstimate: 'Este proceso puede tardar hasta 15 minutos',
    timeEstimateSubtitle: 'Estamos recopilando información de hoteles, eventos y análisis de mercado',
    skipButton: 'Saltar configuración e ir al dashboard',
    retryButton: 'Reintentar',
    successMessage: '¡Todo listo! Redirigiendo al dashboard...',
    connectionError: 'Error de conexión al servidor. Verifica que el backend esté funcionando.',
    exploringMessage: 'Mientras tanto, puedes explorar las diferentes secciones de la plataforma'
  }
};

// Colores para los iconos de características
export const FEATURE_COLORS = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    icon: 'text-blue-500',
    darkBg: 'bg-gray-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    icon: 'text-green-500',
    darkBg: 'bg-gray-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    icon: 'text-purple-500',
    darkBg: 'bg-gray-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    icon: 'text-orange-500',
    darkBg: 'bg-gray-700'
  }
}; 