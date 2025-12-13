import { useState, useMemo, useEffect } from "react";
import { Search, Calendar, Users } from "lucide-react";
import { Combobox, type ComboboxOption } from "@/components/Combobox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { hotelsApi, type Hotel } from "@/api/hotels";

export function SearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);

  // Load all hotels for suggestions
  useEffect(() => {
    hotelsApi.search({}).then((response) => {
      setAllHotels(response.hotels);
    });
  }, []);

  // Create combobox options from hotels
  const destinationOptions: ComboboxOption[] = useMemo(() => {
    const uniqueDestinations = new Map<
      string,
      { city: string; country: string }
    >();

    allHotels.forEach((hotel) => {
      const key = `${hotel.city}, ${hotel.country}`;
      if (!uniqueDestinations.has(key)) {
        uniqueDestinations.set(key, {
          city: hotel.city,
          country: hotel.country,
        });
      }
    });

    return Array.from(uniqueDestinations.entries()).map(
      ([key, { city, country }], index) => ({
        id: `dest-${index}`,
        label: city,
        sublabel: country,
        value: key,
      })
    );
  }, [allHotels]);

  const handleDestinationSelect = (option: ComboboxOption) => {
    setDestination(option.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    const params = new URLSearchParams({
      destination: destination.trim(),
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
      ...(guests && { guests: guests.toString() }),
    });

    navigate(`/search?${params.toString()}`);
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Combobox
              options={destinationOptions}
              value={destination}
              onChange={setDestination}
              onSelect={handleDestinationSelect}
              placeholder="¿A dónde viajas?"
              required
              label={
                <>
                  <Search className="inline w-4 h-4 mr-1" />
                  Destino
                </>
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Entrada
            </label>
            <Input
              type="date"
              value={checkIn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheckIn(e.target.value)
              }
              min={today}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Salida
            </label>
            <Input
              type="date"
              value={checkOut}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCheckOut(e.target.value)
              }
              min={checkIn || tomorrow}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Huéspedes:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
            />
          </div>

          <Button type="submit" size="lg" className="px-8">
            <Search className="w-4 h-4 mr-2" />
            Buscar Hoteles
          </Button>
        </div>
      </div>
    </form>
  );
}
