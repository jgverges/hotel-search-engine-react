import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useHotel } from "@/features/hotels/hooks/useHotel";
import Button from "@/components/Button";

export function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading } = useHotel(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading hotel...</p>
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
            Back to results
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {hotel.name}
              </h1>
              <p className="text-gray-600 mb-4">{hotel.city}</p>
              <p className="text-4xl font-bold text-blue-600">
                €{hotel.price}
                <span className="text-lg text-gray-500 font-normal"> per night</span>
              </p>
            </div>

            <div className="border-t border-b py-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {hotel.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
