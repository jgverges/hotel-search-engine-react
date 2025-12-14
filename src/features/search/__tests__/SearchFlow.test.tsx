import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderWithProviders } from '@/test/helpers/render';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../components/SearchBar';
import { SearchResultsPage } from '@/pages/SearchResultsPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { hotelsApi } from '@/api/hotels';

vi.mock('@/api/hotels', () => ({
  hotelsApi: {
    getAllCities: vi.fn(),
    search: vi.fn(),
  },
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('Search Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows cities dropdown when user types 3+ characters', async () => {
    const cities = ['Barcelona', 'Madrid', 'Valencia'];
    vi.mocked(hotelsApi.getAllCities).mockReturnValue(cities);

    const user = userEvent.setup();
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar ciudad/i);
    await user.type(input, 'Bar');

    await waitFor(() => {
      expect(screen.getByText('Barcelona')).toBeInTheDocument();
    });
  });

  it('navigates and shows hotels when city is selected', async () => {
    const cities = ['Barcelona', 'Madrid'];
    const mockHotels = [
      { id: '1', name: 'Hotel 1', city: 'Barcelona', price: 100, image: 'img1.jpg', description: 'Desc 1' },
      { id: '2', name: 'Hotel 2', city: 'Barcelona', price: 150, image: 'img2.jpg', description: 'Desc 2' },
    ];

    vi.mocked(hotelsApi.getAllCities).mockReturnValue(cities);
    vi.mocked(hotelsApi.search).mockResolvedValue({
      hotels: mockHotels,
      total: 2,
      page: 1,
      limit: 10,
    });

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <SearchBar />,
        },
        {
          path: '/search',
          element: <SearchResultsPage />,
        },
      ],
      { initialEntries: ['/'] }
    );

    const user = userEvent.setup();
    renderWithQueryClient(<RouterProvider router={router} />);

    const input = screen.getByPlaceholderText(/buscar ciudad/i);
    await user.type(input, 'Bar');

    await waitFor(() => {
      expect(screen.getByText('Barcelona')).toBeInTheDocument();
    });

    const barcelonaOption = screen.getByText('Barcelona');
    await user.click(barcelonaOption);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/search');
      expect(router.state.location.search).toContain('destination=Barcelona');
    });

    await waitFor(() => {
      expect(screen.getByText('Hotel 1')).toBeInTheDocument();
      expect(screen.getByText('Hotel 2')).toBeInTheDocument();
    });
  });

  it('shows hotels list after search submission with 3+ characters', async () => {
    const cities = ['Barcelona'];
    const mockHotels = [
      { id: '1', name: 'Hotel Test', city: 'Barcelona', price: 100, image: 'img1.jpg', description: 'Desc' },
    ];

    vi.mocked(hotelsApi.getAllCities).mockReturnValue(cities);
    vi.mocked(hotelsApi.search).mockResolvedValue({
      hotels: mockHotels,
      total: 1,
      page: 1,
      limit: 10,
    });

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <SearchBar />,
        },
        {
          path: '/search',
          element: <SearchResultsPage />,
        },
      ],
      { initialEntries: ['/'] }
    );

    const user = userEvent.setup();
    renderWithQueryClient(<RouterProvider router={router} />);

    const input = screen.getByPlaceholderText(/buscar ciudad/i);
    await user.type(input, 'Barcelona');
    
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/search');
    });

    await waitFor(() => {
      expect(screen.getByText('Hotel Test')).toBeInTheDocument();
    });
  });

  it('navigates to hotel details when hotel card is clicked', async () => {
    const mockHotels = [
      { id: 'hotel-123', name: 'Test Hotel', city: 'Barcelona', price: 100, image: 'img.jpg', description: 'Test desc' },
    ];

    vi.mocked(hotelsApi.search).mockResolvedValue({
      hotels: mockHotels,
      total: 1,
      page: 1,
      limit: 10,
    });

    const router = createMemoryRouter(
      [
        {
          path: '/search',
          element: <SearchResultsPage />,
        },
        {
          path: '/hotels/:id',
          element: <div>Hotel Details Page</div>,
        },
      ],
      { initialEntries: ['/search?destination=Barcelona'] }
    );

    const user = userEvent.setup();
    renderWithQueryClient(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Test Hotel')).toBeInTheDocument();
    });

    const hotelCard = screen.getByText('Test Hotel').closest('a');
    expect(hotelCard).toHaveAttribute('href', '/hotels/hotel-123');

    if (hotelCard) {
      await user.click(hotelCard);
      
      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/hotels/hotel-123');
      });
    }
  });
});
