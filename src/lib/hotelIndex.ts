import type { Hotel, SearchParams } from '@/api/hotels';
import { LazyHotelGenerator } from './hotelGenerator';

/**
 * Índice invertido para búsquedas rápidas
 * Permite buscar sin generar todos los hoteles
 */
export class HotelIndex {
  private generator: LazyHotelGenerator;
  private totalHotels: number;
  
  // Índices para búsqueda rápida
  private cityIndex: Map<string, number[]> = new Map();
  private countryIndex: Map<string, number[]> = new Map();
  private priceIndex: Map<number, number[]> = new Map();
  private ratingIndex: Map<number, number[]> = new Map();

  constructor(generator: LazyHotelGenerator) {
    this.generator = generator;
    this.totalHotels = generator.getTotal();
    this.buildIndexes();
  }

  /**
   * Construye índices para búsqueda rápida
   * Solo indexa una muestra representativa para no cargar todo en memoria
   */
  private buildIndexes() {
    // Indexar una muestra de hoteles (ej: cada 1000)
    const sampleSize = Math.min(10000, this.totalHotels); // Máximo 10k en índice
    const step = Math.max(1, Math.floor(this.totalHotels / sampleSize));

    for (let i = 0; i < this.totalHotels; i += step) {
      const hotel = this.generator.getHotel(i);
      
      // Índice por ciudad
      const cityKey = hotel.city.toLowerCase();
      if (!this.cityIndex.has(cityKey)) {
        this.cityIndex.set(cityKey, []);
      }
      this.cityIndex.get(cityKey)!.push(i);

      // Índice por país
      const countryKey = hotel.country.toLowerCase();
      if (!this.countryIndex.has(countryKey)) {
        this.countryIndex.set(countryKey, []);
      }
      this.countryIndex.get(countryKey)!.push(i);

      // Índice por precio (rangos)
      const priceRange = Math.floor(hotel.price / 50) * 50; // Agrupa por rangos de 50
      if (!this.priceIndex.has(priceRange)) {
        this.priceIndex.set(priceRange, []);
      }
      this.priceIndex.get(priceRange)!.push(i);

      // Índice por rating (redondeado)
      const ratingKey = Math.floor(hotel.rating);
      if (!this.ratingIndex.has(ratingKey)) {
        this.ratingIndex.set(ratingKey, []);
      }
      this.ratingIndex.get(ratingKey)!.push(i);
    }
  }

  /**
   * Busca hoteles que coincidan con los parámetros
   * Retorna índices de hoteles que cumplen los criterios
   */
  searchIndices(params: SearchParams): number[] {
    let candidateIndices: Set<number> | null = null;

    // Filtrar por destino
    if (params.destination) {
      const searchTerm = params.destination.toLowerCase();
      const matchingIndices = new Set<number>();

      // Buscar en ciudades
      for (const [city, indices] of this.cityIndex.entries()) {
        if (city.includes(searchTerm)) {
          indices.forEach(idx => matchingIndices.add(idx));
        }
      }

      // Buscar en países
      for (const [country, indices] of this.countryIndex.entries()) {
        if (country.includes(searchTerm)) {
          indices.forEach(idx => matchingIndices.add(idx));
        }
      }

      // Si no hay coincidencias exactas, buscar en todo el rango
      if (matchingIndices.size === 0) {
        // Buscar en una muestra más amplia
        const sampleSize = Math.min(100000, this.totalHotels);
        const step = Math.max(1, Math.floor(this.totalHotels / sampleSize));
        for (let i = 0; i < this.totalHotels; i += step) {
          const hotel = this.generator.getHotel(i);
          if (
            hotel.city.toLowerCase().includes(searchTerm) ||
            hotel.country.toLowerCase().includes(searchTerm) ||
            hotel.name.toLowerCase().includes(searchTerm) ||
            hotel.location.toLowerCase().includes(searchTerm)
          ) {
            // Expandir búsqueda alrededor de este índice
            for (let j = Math.max(0, i - step); j < Math.min(this.totalHotels, i + step); j++) {
              matchingIndices.add(j);
            }
          }
        }
      }

      candidateIndices = matchingIndices;
    } else {
      // Sin filtro de destino, considerar todos
      candidateIndices = new Set(
        Array.from({ length: Math.min(100000, this.totalHotels) }, (_, i) => i)
      );
    }

    // Aplicar filtros adicionales
    const filteredIndices: number[] = [];
    const maxToCheck = 10000; // Limitar verificación para rendimiento
    let checked = 0;

    for (const idx of candidateIndices) {
      if (checked++ >= maxToCheck) break;

      const hotel = this.generator.getHotel(idx);

      // Filtrar por precio
      if (params.minPrice !== undefined && hotel.price < params.minPrice) continue;
      if (params.maxPrice !== undefined && hotel.price > params.maxPrice) continue;

      // Filtrar por rating
      if (params.rating !== undefined && hotel.rating < params.rating) continue;

      // Filtrar por disponibilidad
      if (!hotel.available) continue;

      filteredIndices.push(idx);
    }

    return filteredIndices;
  }

  /**
   * Obtiene hoteles por sus índices con paginación
   */
  getHotelsByIndices(indices: number[], page: number = 1, limit: number = 10): Hotel[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageIndices = indices.slice(start, end);
    
    return pageIndices.map(idx => this.generator.getHotel(idx));
  }

  /**
   * Obtiene el total de hoteles disponibles
   */
  getTotal(): number {
    return this.totalHotels;
  }
}

