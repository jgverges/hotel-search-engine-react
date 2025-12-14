import { SearchBar } from "@/features/search/components/SearchBar";

export function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find your perfect hotel
          </h1>
          <p className="text-xl text-gray-600">
            Discover the best hotel deals from around the world
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
