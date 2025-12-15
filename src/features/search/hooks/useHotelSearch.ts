import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  hotelsApi,
  type SearchParams,
  type SearchResponse,
} from "@/api/hotels";

export function useHotelSearch(params: SearchParams) {
  // Debounce user input to avoid firing a request on every keystroke
  const destination = params.destination ?? "";
  const [debouncedDestination, setDebouncedDestination] = useState(destination);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedDestination(destination.trim());
    }, 300);
    return () => clearTimeout(handle);
  }, [destination]);

  const enabled = Boolean(debouncedDestination && debouncedDestination.length >= 3);

  return useQuery<SearchResponse>({
    queryKey: ["hotels", "search", debouncedDestination],
    queryFn: () => hotelsApi.search({ destination: debouncedDestination }),
    enabled,
    placeholderData: (prev) => prev, // keeps previous data during fast typing
    staleTime: 3 * 60 * 1000, // cache valid for 3 minutes
    gcTime: 10 * 60 * 1000, // keep cache a bit longer to reuse results
    refetchOnWindowFocus: false, // avoid surprise refetches while typing
  });
}
