import type { Hotel, SearchResponse } from '@/api/hotels';

/**
 * Mock hotel data for testing
 */
export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Hotel Barcelona',
    location: 'Las Ramblas',
    city: 'Barcelona',
    country: 'Spain',
    price: 120,
    rating: 4.5,
    image: 'https://example.com/hotel1.jpg',
    description: 'Luxury hotel in the heart of Barcelona with stunning city views.',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
    available: true,
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Beachfront',
    city: 'Valencia',
    country: 'Spain',
    price: 95,
    rating: 4.2,
    image: 'https://example.com/hotel2.jpg',
    description: 'Beautiful beachfront resort with direct access to the Mediterranean.',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Gym'],
    available: true,
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    location: 'Sierra Nevada',
    city: 'Granada',
    country: 'Spain',
    price: 75,
    rating: 4.0,
    image: 'https://example.com/hotel3.jpg',
    description: 'Cozy lodge with breathtaking mountain views and hiking trails.',
    amenities: ['WiFi', 'Restaurant', 'Parking', 'Hiking Trails'],
    available: true,
  },
];

/**
 * Mock search response
 */
export const mockSearchResponse: SearchResponse = {
  hotels: mockHotels,
  total: mockHotels.length,
  page: 1,
  limit: 10,
};

/**
 * Helper to create a mock hotel with overrides
 */
export function createMockHotel(overrides?: Partial<Hotel>): Hotel {
  return {
    ...mockHotels[0],
    ...overrides,
  };
}

/**
 * Helper to create a mock search response
 */
export function createMockSearchResponse(
  hotels: Hotel[] = mockHotels
): SearchResponse {
  return {
    hotels,
    total: hotels.length,
    page: 1,
    limit: 10,
  };
}
