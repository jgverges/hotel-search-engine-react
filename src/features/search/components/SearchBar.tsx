import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Combobox, type ComboboxOption } from "@/components/Combobox";
import Button from "@/components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { hotelsApi } from "@/api/hotels";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState("");

  // Initialize destination from URL params
  useEffect(() => {
    const urlDestination = searchParams.get('destination') || '';
    if (urlDestination) {
      setDestination(urlDestination);
    }
  }, [searchParams]);

  const destinationOptions: ComboboxOption[] = useMemo(() => {
    const cities = hotelsApi.getAllCities();
    return cities.map((city, index) => ({
      id: `city-${index}`,
      label: city,
      value: city,
    }));
  }, []);

  const handleDestinationSelect = (option: ComboboxOption) => {
    setDestination(option.value);
    const params = new URLSearchParams({
      destination: option.value.trim(),
    });
    navigate(`/search?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || destination.trim().length < 3) return;

    const params = new URLSearchParams({
      destination: destination.trim(),
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Combobox
              options={destinationOptions}
              value={destination}
              onChange={setDestination}
              onSelect={handleDestinationSelect}
              placeholder="Search city (min. 3 characters)"
              required
              label={
                <>
                  <Search className="inline w-4 h-4 mr-1" />
                  City
                </>
              }
            />
            <p className="mt-2 text-xs text-gray-500">
              Demo cities: Barcelona · Madrid · Valencia · Granada · Seville · Bilbao · Málaga · Palma
            </p>
          </div>
          <Button type="submit" size="lg" className="px-8">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
