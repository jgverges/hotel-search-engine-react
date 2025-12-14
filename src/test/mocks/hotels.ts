import type { Hotel, SearchResponse } from '@/api/hotels';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Hotel Barcelona',
    city: 'Barcelona',
    price: 120,
    image: 'https://example.com/hotel1.jpg',
    description: 'Luxury hotel in the heart of Barcelona with stunning city views.',
  },
  {
    id: '2',
    name: 'Seaside Resort',
    city: 'Valencia',
    price: 95,
    image: 'https://example.com/hotel2.jpg',
    description: 'Beautiful beachfront resort with direct access to the Mediterranean.',
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    city: 'Granada',
    price: 75,
    image: 'https://example.com/hotel3.jpg',
    description: 'Cozy lodge with breathtaking mountain views and hiking trails.',
  },
];

export const mockSearchResponse: SearchResponse = {
  hotels: mockHotels,
  total: mockHotels.length,
  page: 1,
  limit: 10,
};

export function createMockHotel(overrides?: Partial<Hotel>): Hotel {
  return {
    ...mockHotels[0],
    ...overrides,
  };
}

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
