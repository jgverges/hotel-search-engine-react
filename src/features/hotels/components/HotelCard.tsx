import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
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
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{hotel.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}, {hotel.city}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">€{hotel.price}</p>
            <p className="text-xs text-gray-500">por noche</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

