import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
} from "lucide-react";
import { useHotel } from "@/features/hotels/hooks/useHotel";
import Button from "@/components/Button";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  Restaurant: <Utensils className="w-5 h-5" />,
  Gym: <Dumbbell className="w-5 h-5" />,
};

export function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading } = useHotel(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando hotel...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Hotel no encontrado</p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/search"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a resultados
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {hotel.location}, {hotel.city}, {hotel.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold">{hotel.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-blue-600">
                  €{hotel.price}
                </p>
                <p className="text-gray-500">por noche</p>
              </div>
            </div>

            <div className="border-t border-b py-6 my-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Descripción
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {hotel.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Servicios
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    {amenityIcons[amenity] || <Wifi className="w-5 h-5" />}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Reservar ahora
              </Button>
              <Button variant="outline" size="lg">
                Contactar hotel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
