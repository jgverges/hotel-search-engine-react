import { describe, it, expect } from 'vitest';
import { hotelsApi } from './hotels';

describe('hotelsApi.search', () => {
  it('filters by city with 3+ characters', async () => {
    const result = await hotelsApi.search({ destination: 'Bar' });
    expect(result.hotels.length).toBeGreaterThan(0);
    expect(result.hotels.every(h => 
      h.city.toLowerCase().includes('bar')
    )).toBe(true);
  });
  
  it('returns empty with less than 3 characters', async () => {
    const result = await hotelsApi.search({ destination: 'Ba' });
    expect(result.hotels).toEqual([]);
    expect(result.total).toBe(0);
  });
});

describe('Search Parameters Validation', () => {
  it('validates empty destination returns empty results', async () => {
    const result = await hotelsApi.search({});
    expect(result.hotels).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('validates undefined destination returns empty results', async () => {
    const result = await hotelsApi.search({ destination: undefined });
    expect(result.hotels).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('validates destination with whitespace only returns empty results', async () => {
    const result = await hotelsApi.search({ destination: '   ' });
    expect(result.hotels).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('validates destination with exactly 3 characters works', async () => {
    const result = await hotelsApi.search({ destination: 'Bar' });
    expect(result.hotels.length).toBeGreaterThan(0);
  });

  it('validates destination is case insensitive', async () => {
    const lowerResult = await hotelsApi.search({ destination: 'barcelona' });
    const upperResult = await hotelsApi.search({ destination: 'BARCELONA' });
    const mixedResult = await hotelsApi.search({ destination: 'BaRcElOnA' });
    
    expect(lowerResult.hotels.length).toBeGreaterThan(0);
    expect(upperResult.hotels.length).toBeGreaterThan(0);
    expect(mixedResult.hotels.length).toBeGreaterThan(0);
    expect(lowerResult.total).toBe(upperResult.total);
    expect(lowerResult.total).toBe(mixedResult.total);
  });

  it('validates destination with leading/trailing whitespace is trimmed', async () => {
    const trimmedResult = await hotelsApi.search({ destination: 'Barcelona' });
    const withSpacesResult = await hotelsApi.search({ destination: '  Barcelona  ' });
    
    expect(trimmedResult.total).toBe(withSpacesResult.total);
    expect(trimmedResult.hotels.length).toBe(withSpacesResult.hotels.length);
  });
});
