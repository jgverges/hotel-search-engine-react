import { useQuery } from '@tanstack/react-query';
import { hotelsApi, type Hotel } from '@/api/hotels';

export function useHotel(id: string) {
  return useQuery<Hotel>({
    queryKey: ['hotels', id],
    queryFn: () => hotelsApi.getById(id),
    enabled: Boolean(id),
  });
}

