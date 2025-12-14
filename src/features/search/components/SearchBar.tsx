import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Combobox, type ComboboxOption } from "@/components/Combobox";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { hotelsApi } from "@/api/hotels";

export function SearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

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
              placeholder="Buscar ciudad (mínimo 3 caracteres)"
              required
              label={
                <>
                  <Search className="inline w-4 h-4 mr-1" />
                  Ciudad
                </>
              }
            />
          </div>
          <Button type="submit" size="lg" className="px-8">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </form>
  );
}
