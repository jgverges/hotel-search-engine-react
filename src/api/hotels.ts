import { simpleHotels } from '@/lib/simpleHotelData';

export interface Hotel {
  id: string;
  name: string;
  city: string;
  price: number;
  image: string;
  description: string;
}

export interface SearchParams {
  destination?: string;
}

export interface SearchResponse {
  hotels: Hotel[];
  total: number;
  page: number;
  limit: number;
}

const cityIndex = new Map<string, Hotel[]>();

function buildCityIndex(hotels: Hotel[]) {
  cityIndex.clear();
  hotels.forEach(hotel => {
    const city = hotel.city.toLowerCase().trim();
    if (!cityIndex.has(city)) {
      cityIndex.set(city, []);
    }
    cityIndex.get(city)!.push(hotel);
  });
}

function searchByCity(term: string): Hotel[] {
  const normalized = term.toLowerCase().trim();
  if (normalized.length < 3) return [];
  
  const results: Hotel[] = [];
  for (const [city, hotels] of cityIndex.entries()) {
    if (city.includes(normalized)) {
      results.push(...hotels);
    }
  }
  return results;
}

buildCityIndex(simpleHotels);

export const hotelsApi = {
  getAllCities: (): string[] => {
    const cities = new Set<string>();
    simpleHotels.forEach(hotel => cities.add(hotel.city));
    return Array.from(cities).sort();
  },
  
  search: async (params: SearchParams): Promise<SearchResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    if (!params.destination || params.destination.length < 3) {
      return { hotels: [], total: 0, page: 1, limit: 10 };
    }
    
    const hotels = searchByCity(params.destination);
    return {
      hotels: hotels.slice(0, 10),
      total: hotels.length,
      page: 1,
      limit: 10,
    };
  },
  
  getById: async (id: string): Promise<Hotel> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    const allHotels = Array.from(cityIndex.values()).flat();
    const hotel = allHotels.find((h) => h.id === id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  },
};
