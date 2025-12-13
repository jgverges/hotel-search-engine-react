// import { axiosClient } from '@/lib/axios'; // Reserved for future API integration

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

export interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export interface SearchResponse {
  hotels: Hotel[];
  total: number;
  page: number;
  limit: number;
}

// Mock data for development
const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Hotel Barcelona",
    location: "Las Ramblas",
    city: "Barcelona",
    country: "Spain",
    price: 120,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    description:
      "Luxury hotel in the heart of Barcelona with stunning city views.",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Parking"],
    available: true,
  },
  {
    id: "2",
    name: "Seaside Resort",
    location: "Beachfront",
    city: "Valencia",
    country: "Spain",
    price: 95,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    description:
      "Beautiful beachfront resort with direct access to the Mediterranean.",
    amenities: ["WiFi", "Pool", "Beach Access", "Restaurant", "Gym"],
    available: true,
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Sierra Nevada",
    city: "Granada",
    country: "Spain",
    price: 75,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    description:
      "Cozy lodge with breathtaking mountain views and hiking trails.",
    amenities: ["WiFi", "Restaurant", "Parking", "Hiking Trails"],
    available: true,
  },
  {
    id: "4",
    name: "City Center Hotel",
    location: "Downtown",
    city: "Madrid",
    country: "Spain",
    price: 110,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    description:
      "Modern hotel in the heart of Madrid, close to all major attractions.",
    amenities: ["WiFi", "Gym", "Restaurant", "Parking", "Business Center"],
    available: true,
  },
  {
    id: "5",
    name: "Historic Palace Hotel",
    location: "Old Town",
    city: "Seville",
    country: "Spain",
    price: 130,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    description: "Elegant historic palace converted into a luxury hotel.",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Historic Tours"],
    available: true,
  },
];

export const hotelsApi = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredHotels = [...mockHotels];

    // Filter by destination
    if (params.destination) {
      const searchTerm = params.destination.toLowerCase();
      filteredHotels = filteredHotels.filter(
        (hotel) =>
          hotel.city.toLowerCase().includes(searchTerm) ||
          hotel.location.toLowerCase().includes(searchTerm) ||
          hotel.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (params.minPrice !== undefined) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.price >= params.minPrice!
      );
    }
    if (params.maxPrice !== undefined) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.price <= params.maxPrice!
      );
    }

    // Filter by rating
    if (params.rating !== undefined) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.rating >= params.rating!
      );
    }

    // Filter by availability
    filteredHotels = filteredHotels.filter((hotel) => hotel.available);

    return {
      hotels: filteredHotels,
      total: filteredHotels.length,
      page: 1,
      limit: 10,
    };
  },

  getById: async (id: string): Promise<Hotel> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const hotel = mockHotels.find((h) => h.id === id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  },
};
