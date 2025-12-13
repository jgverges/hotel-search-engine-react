import { useSearchParams } from 'react-router-dom';
import { useHotelSearch } from '@/features/search/hooks/useHotelSearch';
import { HotelList } from '@/features/hotels/components/HotelList';
import { SearchBar } from '@/features/search/components/SearchBar';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || undefined;
  const checkOut = searchParams.get('checkOut') || undefined;
  const guests = searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined;

  const { data, isLoading } = useHotelSearch({
    destination,
    checkIn,
    checkOut,
    guests,
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
            {destination ? `Hoteles en ${destination}` : 'Resultados de búsqueda'}
          </h2>
          {data && (
            <p className="text-gray-600 mt-1">
              {data.total} {data.total === 1 ? 'hotel encontrado' : 'hoteles encontrados'}
            </p>
          )}
        </div>

        <HotelList hotels={data?.hotels || []} isLoading={isLoading} />
      </div>
    </div>
  );
}

