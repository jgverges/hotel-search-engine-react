import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { HotelDetailsPage } from "./pages/HotelDetailsPage";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
