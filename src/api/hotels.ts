// import { axiosClient } from '@/lib/axios'; // Reserved for future API integration
import { simpleHotels } from '@/lib/simpleHotelData';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  available: boolean;
}

/**
 * Parámetros de búsqueda simplificados
 * FASE 1: Solo 3 filtros básicos
 * - destination: Ciudad de destino
 * - checkIn: Fecha de entrada
 * - checkOut: Fecha de salida
 * - guests: Número de personas
 */
export interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface SearchResponse {
  hotels: Hotel[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Datos simples de hoteles para aprendizaje
 * 60 hoteles en diferentes ciudades españolas
 * Suficiente para demostrar filtros sin complejidad innecesaria
 */
const hotels = simpleHotels;

/**
 * API simplificada para FASE 1
 * Enfoque en aprendizaje: 3 filtros básicos bien implementados
 */
export const hotelsApi = {
  /**
   * Busca hoteles con los 3 filtros básicos:
   * - destination: Ciudad (búsqueda por nombre de ciudad)
   * - checkIn/checkOut: Fechas (validación básica)
   * - guests: Número de personas (validación básica)
   */
  search: async (params: SearchParams): Promise<SearchResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    let filteredHotels = [...hotels];

    // FILTRO 1: Ciudad (destination)
    // Según ECOMERCE_CARACTERISTICAS.md: filtra solo por ciudad, personas y fechas
    if (params.destination) {
      // Extraer solo la ciudad si viene en formato "ciudad, país"
      // Esto permite que funcione tanto con selección del combobox como con texto libre
      let searchTerm = params.destination.toLowerCase().trim();
      const cityMatch = searchTerm.match(/^([^,]+)/);
      if (cityMatch) {
        searchTerm = cityMatch[1].trim();
      }
      
      filteredHotels = filteredHotels.filter(
        (hotel) => {
          const hotelCity = hotel.city.toLowerCase();
          const hotelLocation = hotel.location.toLowerCase();
          const hotelName = hotel.name.toLowerCase();
          
          // Búsqueda flexible: el término puede estar en la ciudad, ubicación o nombre
          // Y viceversa: la ciudad puede estar en el término (para búsquedas parciales)
          return (
            hotelCity === searchTerm ||
            hotelCity.includes(searchTerm) ||
            searchTerm.includes(hotelCity) ||
            hotelLocation.includes(searchTerm) ||
            hotelName.includes(searchTerm)
          );
        }
      );
    }

    // FILTRO 2: Fechas (checkIn, checkOut)
    // Según ECOMERCE_CARACTERISTICAS.md: fechas son opcionales ("si es posible ahora por fechas")
    // Validación básica: verificar que las fechas sean válidas
    if (params.checkIn && params.checkOut) {
      const checkInDate = new Date(params.checkIn);
      const checkOutDate = new Date(params.checkOut);
      
      // Validar que check-out sea después de check-in
      if (checkOutDate <= checkInDate) {
        // Si las fechas son inválidas, retornar sin hoteles
        return {
          hotels: [],
          total: 0,
          page: 1,
          limit: 10,
        };
      }
      
      // Nota: En una app real, aquí se verificaría disponibilidad real por fechas
      // Por ahora, solo filtramos por disponibilidad general del hotel
      // Si el hotel no está disponible, no se muestra
      filteredHotels = filteredHotels.filter((hotel) => hotel.available);
    }
    // Si no hay fechas, no filtramos por disponibilidad (según especificaciones)

    // FILTRO 3: Número de personas (guests)
    // Según ECOMERCE_CARACTERISTICAS.md: filtra por personas
    // Validación básica: verificar que sea un número válido
    if (params.guests !== undefined && params.guests !== null) {
      // Validar rango razonable de huéspedes
      if (params.guests < 1 || params.guests > 20) {
        // Si el número de huéspedes es inválido, retornar sin hoteles
        return {
          hotels: [],
          total: 0,
          page: 1,
          limit: 10,
        };
      }
      // Nota: En una app real, aquí se verificaría capacidad de habitaciones
      // Por ahora, todos los hoteles aceptan cualquier número de huéspedes válido
      // No filtramos hoteles por número de personas, solo validamos el parámetro
    }

    return {
      hotels: filteredHotels,
      total: filteredHotels.length,
      page: 1,
      limit: 10,
    };
  },

  /**
   * Obtiene un hotel por ID
   */
  getById: async (id: string): Promise<Hotel> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const hotel = hotels.find((h) => h.id === id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  },
};
