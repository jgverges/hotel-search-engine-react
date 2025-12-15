import { Link, useLocation } from 'react-router-dom';
import { type Hotel } from '@/api/hotels';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('destination') || '';

  return (
    <Link
      to={`/hotels/${hotel.id}`}
      state={{ destination }}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{hotel.city}</p>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">€{hotel.price}</p>
          <p className="text-xs text-gray-500">per night</p>
        </div>
      </div>
    </Link>
  );
}
