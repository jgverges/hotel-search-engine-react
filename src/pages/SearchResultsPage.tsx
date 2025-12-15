import { useSearchParams } from 'react-router-dom';
import { useHotelSearch } from '@/features/search/hooks/useHotelSearch';
import { HotelList } from '@/features/hotels/components/HotelList';
import { SearchBar } from '@/features/search/components/SearchBar';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';

  const { data, isLoading } = useHotelSearch({
    destination,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {destination 
              ? `Hotels in ${destination}` 
              : 'Search results'}
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
    </div>
  );
}
