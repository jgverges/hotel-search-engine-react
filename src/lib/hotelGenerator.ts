import { faker } from "@faker-js/faker";
import type { Hotel } from "@/api/hotels";

/**
 * Configuración del generador de hoteles
 */
export interface HotelGeneratorConfig {
  /**
   * Lista de ciudades donde se generarán los hoteles
   * Si no se proporciona, se usa DEFAULT_CITIES
   */
  cities?: Array<{ city: string; country: string }>;

  /**
   * Rango de precios para los hoteles
   */
  priceRange?: { min: number; max: number };

  /**
   * Distribución de ratings (opcional, se usa distribución por defecto si no se proporciona)
   */
  ratingDistribution?: Record<number, number>;

  /**
   * Número total de hoteles a generar (solo para referencia, no se usa directamente en generateHotel)
   */
  totalHotels?: number;
}

/**
 * Lista de ciudades reales para generar hoteles
 */
const DEFAULT_CITIES = [
  // España
  { city: "Barcelona", country: "Spain" },
  { city: "Madrid", country: "Spain" },
  { city: "Valencia", country: "Spain" },
  { city: "Seville", country: "Spain" },
  { city: "Granada", country: "Spain" },
  { city: "Bilbao", country: "Spain" },
  { city: "Málaga", country: "Spain" },
  { city: "Palma", country: "Spain" },
  // Europa
  { city: "Paris", country: "France" },
  { city: "London", country: "United Kingdom" },
  { city: "Rome", country: "Italy" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Berlin", country: "Germany" },
  { city: "Vienna", country: "Austria" },
  { city: "Prague", country: "Czech Republic" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Athens", country: "Greece" },
  { city: "Dublin", country: "Ireland" },
  // América
  { city: "New York", country: "United States" },
  { city: "Los Angeles", country: "United States" },
  { city: "Miami", country: "United States" },
  { city: "Las Vegas", country: "United States" },
  { city: "Mexico City", country: "Mexico" },
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Rio de Janeiro", country: "Brazil" },
  { city: "Lima", country: "Peru" },
  // Asia
  { city: "Tokyo", country: "Japan" },
  { city: "Bangkok", country: "Thailand" },
  { city: "Singapore", country: "Singapore" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Hong Kong", country: "China" },
  { city: "Bali", country: "Indonesia" },
  // Otros
  { city: "Sydney", country: "Australia" },
  { city: "Cairo", country: "Egypt" },
  { city: "Istanbul", country: "Turkey" },
];

/**
 * Pool de amenities disponibles
 */
const AMENITIES_POOL = [
  "Wi-Fi",
  "Pool",
  "Spa",
  "Restaurant",
  "Parking",
  "Gym",
  "Beach Access",
  "Business Center",
  "Air Conditioning",
  "Room Service",
  "Bar",
  "Concierge",
  "Laundry",
  "Pet Friendly",
  "Airport Shuttle",
  "Hot Tub",
  "Tennis Court",
  "Golf Course",
  "Kids Club",
  "Casino",
  "Historic Tours",
  "Hiking Trails",
  "Skiing",
  "Diving",
  "Water Sports",
];

/**
 * Tipos de hoteles para nombres más realistas
 */
const HOTEL_TYPES = [
  "Grand Hotel",
  "Resort",
  "Lodge",
  "Palace",
  "Plaza",
  "Inn",
  "Suites",
  "Boutique Hotel",
  "Spa Resort",
  "Beach Resort",
  "Mountain Lodge",
  "City Hotel",
  "Historic Hotel",
  "Luxury Hotel",
  "Business Hotel",
  "Airport Hotel",
  "Casino Resort",
  "Golf Resort",
];

/**
 * Ubicaciones dentro de ciudades
 */
const LOCATION_TYPES = [
  "Downtown",
  "City Center",
  "Old Town",
  "Beachfront",
  "Waterfront",
  "Airport",
  "Historic District",
  "Business District",
  "Shopping District",
  "Entertainment District",
  "Residential Area",
  "Mountain View",
  "Harbor View",
  "Riverside",
];

/**
 * Genera un hotel único con datos realistas
 */
export function generateHotel(
  id: string | number,
  config: HotelGeneratorConfig = {}
): Hotel {
  const {
    cities = DEFAULT_CITIES,
    priceRange = { min: 30, max: 500 },
  } = config;

  // Seleccionar ciudad aleatoria
  const location = faker.helpers.arrayElement(cities) as {
    city: string;
    country: string;
  };

  // Generar nombre realista
  const hotelType = faker.helpers.arrayElement(HOTEL_TYPES);
  const hotelName = faker.helpers.arrayElement([
    `${hotelType} ${location.city}`,
    `${faker.person.lastName()}'s ${hotelType}`,
    `The ${location.city} ${hotelType}`,
    `${location.city} ${hotelType}`,
    `${faker.location.street()} ${hotelType}`,
  ]);

  // Generar rating con distribución realista
  const random = Math.random();
  let rating: number;
  if (random < 0.1) {
    rating = faker.number.float({ min: 4.5, max: 5.0, fractionDigits: 1 });
  } else if (random < 0.3) {
    rating = faker.number.float({ min: 4.0, max: 4.5, fractionDigits: 1 });
  } else if (random < 0.5) {
    rating = faker.number.float({ min: 3.5, max: 4.0, fractionDigits: 1 });
  } else if (random < 0.8) {
    rating = faker.number.float({ min: 3.0, max: 3.5, fractionDigits: 1 });
  } else {
    rating = faker.number.float({ min: 2.5, max: 3.0, fractionDigits: 1 });
  }

  // Generar precio correlacionado con rating y ubicación
  const basePrice =
    priceRange.min + (priceRange.max - priceRange.min) * (rating / 5);
  const priceVariation = faker.number.float({ min: 0.7, max: 1.3 });
  const price = Math.round(
    Math.max(
      priceRange.min,
      Math.min(priceRange.max, basePrice * priceVariation)
    )
  );

  // Generar amenities (3-8 amenities por hotel)
  const numAmenities = faker.number.int({ min: 3, max: 8 });
  const amenities = faker.helpers.arrayElements(AMENITIES_POOL, numAmenities);

  // Generar ubicación específica
  const locationType = faker.helpers.arrayElement(LOCATION_TYPES);
  const specificLocation = faker.helpers.arrayElement([
    locationType,
    faker.location.street(),
    `${locationType} - ${faker.location.street()}`,
  ]);

  // Generar descripción
  const descriptions = [
    `Beautiful ${hotelType.toLowerCase()} in the heart of ${location.city}.`,
    `Luxury accommodations with stunning views of ${location.city}.`,
    `Modern ${hotelType.toLowerCase()} offering exceptional service in ${
      location.city
    }.`,
    `Elegant ${hotelType.toLowerCase()} located in the ${locationType.toLowerCase()} of ${
      location.city
    }.`,
    `Experience ${location.city} at this charming ${hotelType.toLowerCase()}.`,
    `Premium ${hotelType.toLowerCase()} with world-class amenities in ${
      location.city
    }.`,
  ];
  const description = faker.helpers.arrayElement(descriptions);

  // Generar imagen (usando Unsplash con diferentes IDs)
  const imageId = faker.number.int({ min: 1000000, max: 9999999 });
  const image = `https://images.unsplash.com/photo-${imageId}?w=800`;

  // Disponibilidad (90% disponible)
  const available = faker.datatype.boolean({ probability: 0.9 });

  return {
    id: String(id),
    name: hotelName,
    location: specificLocation,
    city: location.city,
    country: location.country,
    price,
    rating: Number(rating.toFixed(1)),
    image,
    description,
    amenities,
    available,
  };
}

/**
 * Genera múltiples hoteles de forma eficiente
 */
export function generateHotels(
  count: number,
  config: HotelGeneratorConfig = {}
): Hotel[] {
  const hotels: Hotel[] = [];

  for (let i = 0; i < count; i++) {
    hotels.push(generateHotel(i + 1, config));
  }

  return hotels;
}

/**
 * Generador lazy que crea hoteles bajo demanda
 * Útil para grandes volúmenes sin cargar todo en memoria
 */
export class LazyHotelGenerator {
  private config: HotelGeneratorConfig;
  private totalHotels: number;

  constructor(totalHotels: number, config: HotelGeneratorConfig = {}) {
    this.totalHotels = totalHotels;
    this.config = config;
  }

  /**
   * Genera un hotel en una posición específica
   * Usa el índice como seed para reproducibilidad
   */
  getHotel(index: number): Hotel {
    if (index < 0 || index >= this.totalHotels) {
      throw new Error(`Index ${index} out of range [0, ${this.totalHotels})`);
    }

    // Usar el índice como seed para reproducibilidad
    faker.seed(index);
    return generateHotel(index + 1, this.config);
  }

  /**
   * Genera un rango de hoteles
   */
  getHotels(startIndex: number, count: number): Hotel[] {
    const hotels: Hotel[] = [];
    const endIndex = Math.min(startIndex + count, this.totalHotels);

    for (let i = startIndex; i < endIndex; i++) {
      hotels.push(this.getHotel(i));
    }

    return hotels;
  }

  /**
   * Obtiene el total de hoteles disponibles
   */
  getTotal(): number {
    return this.totalHotels;
  }
}

/**
 * Crea un generador pre-configurado con 1 millón de hoteles
 */
export function createDefaultGenerator(
  totalHotels: number = 1_000_000
): LazyHotelGenerator {
  return new LazyHotelGenerator(totalHotels, {
    cities: DEFAULT_CITIES,
    priceRange: { min: 30, max: 500 },
  });
}
