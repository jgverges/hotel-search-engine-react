import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/features/search/components/SearchBar";
import { useHotelSearch } from "@/features/search/hooks/useHotelSearch";
import { HotelList } from "@/features/hotels/components/HotelList";

export function HomePage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';

  // If there's a destination in URL, show results
  const { data, isLoading } = useHotelSearch({
    destination,
  });

  const hasSearchResults = destination && destination.length >= 3;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find your perfect hotel
          </h1>
          <p className="text-xl text-gray-600">
            Discover the best hotel deals from around the world
          </p>
        </div>
        <SearchBar />

        {hasSearchResults && (
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Hotels in {destination}
              </h2>
              {data && (
                <>
                  <p className="text-gray-600 mt-1">
                    {data.total} {data.total === 1 ? 'hotel found' : 'hotels found'}
                  </p>
                  {data.total > 0 && (
                    <p className="text-sm text-gray-500">
                      Showing {Math.min(data.hotels.length, data.limit)} of {data.total} results
                    </p>
                  )}
                </>
              )}
            </div>
            <HotelList hotels={data?.hotels || []} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
