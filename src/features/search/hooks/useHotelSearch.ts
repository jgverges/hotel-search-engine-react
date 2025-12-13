import { useQuery } from "@tanstack/react-query";
import {
  hotelsApi,
  type SearchParams,
  type SearchResponse,
} from "@/api/hotels";

export function useHotelSearch(params: SearchParams) {
  return useQuery<SearchResponse>({
    queryKey: ["hotels", "search", params],
    queryFn: () => hotelsApi.search(params),
    enabled: Boolean(params.destination),
  });
}
