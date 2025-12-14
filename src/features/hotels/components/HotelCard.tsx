import { Link } from 'react-router-dom';
import { type Hotel } from '@/api/hotels';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link
      to={`/hotels/${hotel.id}`}
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
          <p className="text-xs text-gray-500">por noche</p>
        </div>
      </div>
    </Link>
  );
}
