import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { Layout } from "./components/Layout";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage").then(m => ({ default: m.SearchResultsPage })));
const HotelDetailsPage = lazy(() => import("./pages/HotelDetailsPage").then(m => ({ default: m.HotelDetailsPage })));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/hotels/:id" element={<HotelDetailsPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
