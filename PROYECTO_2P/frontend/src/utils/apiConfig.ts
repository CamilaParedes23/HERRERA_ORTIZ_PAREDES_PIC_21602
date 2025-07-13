// Configuración de la API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    PRODUCTS: '/products',
    ORDERS: '/orders',
    ORDER_DETAILS: '/order-details',
    HEALTH: '/health'
  },
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Utility para construir URLs
export const buildApiUrl = (endpoint: string, id?: number | string): string => {
  const baseUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  return id ? `${baseUrl}/${id}` : baseUrl;
};

// Utility para manejar errores de fetch
export const handleFetchError = async (response: Response): Promise<never> => {
  const contentType = response.headers.get('content-type');
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  
  if (contentType && contentType.includes('application/json')) {
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Si no se puede parsear el JSON, usar el mensaje por defecto
    }
  }
  
  throw new Error(errorMessage);
};
