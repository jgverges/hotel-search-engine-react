import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HotelCard } from './HotelCard';
import type { Hotel } from '@/api/hotels';

const mockHotel: Hotel = {
  id: '1',
  name: 'Grand Hotel Barcelona',
  location: 'Las Ramblas',
  city: 'Barcelona',
  country: 'Spain',
  price: 120,
  rating: 4.5,
  image: 'https://example.com/hotel.jpg',
  description: 'Luxury hotel in the heart of Barcelona with stunning city views.',
  amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
  available: true,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HotelCard', () => {
  describe('Rendering', () => {
    it('renders hotel name', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByText('Grand Hotel Barcelona')).toBeInTheDocument();
    });

    it('renders hotel location', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByText(/Las Ramblas, Barcelona/i)).toBeInTheDocument();
    });

    it('renders hotel description', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(
        screen.getByText(/Luxury hotel in the heart of Barcelona/i)
      ).toBeInTheDocument();
    });

    it('renders hotel price', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByText('€120')).toBeInTheDocument();
      expect(screen.getByText('por noche')).toBeInTheDocument();
    });

    it('renders hotel rating', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('renders hotel image with alt text', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      const image = screen.getByAltText('Grand Hotel Barcelona');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/hotel.jpg');
    });
  });

  describe('Amenities', () => {
    it('renders first 3 amenities', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByText('WiFi')).toBeInTheDocument();
      expect(screen.getByText('Pool')).toBeInTheDocument();
      expect(screen.getByText('Spa')).toBeInTheDocument();
      // Should not render more than 3
      expect(screen.queryByText('Restaurant')).not.toBeInTheDocument();
    });

    it('handles hotel with less than 3 amenities', () => {
      const hotelWithFewAmenities: Hotel = {
        ...mockHotel,
        amenities: ['WiFi', 'Pool'],
      };
      renderWithRouter(<HotelCard hotel={hotelWithFewAmenities} />);
      expect(screen.getByText('WiFi')).toBeInTheDocument();
      expect(screen.getByText('Pool')).toBeInTheDocument();
    });

    it('handles hotel with no amenities', () => {
      const hotelWithoutAmenities: Hotel = {
        ...mockHotel,
        amenities: [],
      };
      renderWithRouter(<HotelCard hotel={hotelWithoutAmenities} />);
      // Should still render other information
      expect(screen.getByText('Grand Hotel Barcelona')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders as a link to hotel details page', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/hotels/1');
    });

    it('has correct link for different hotel id', () => {
      const differentHotel: Hotel = { ...mockHotel, id: '2' };
      renderWithRouter(<HotelCard hotel={differentHotel} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/hotels/2');
    });
  });

  describe('Edge Cases', () => {
    it('handles hotel with very long name', () => {
      const hotelWithLongName: Hotel = {
        ...mockHotel,
        name: 'A'.repeat(100),
      };
      renderWithRouter(<HotelCard hotel={hotelWithLongName} />);
      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument();
    });

    it('handles hotel with very long description', () => {
      const hotelWithLongDescription: Hotel = {
        ...mockHotel,
        description: 'A'.repeat(500),
      };
      renderWithRouter(<HotelCard hotel={hotelWithLongDescription} />);
      // Description should be truncated with line-clamp-2
      expect(screen.getByText(/A+/)).toBeInTheDocument();
    });

    it('handles hotel with zero price', () => {
      const freeHotel: Hotel = { ...mockHotel, price: 0 };
      renderWithRouter(<HotelCard hotel={freeHotel} />);
      expect(screen.getByText('€0')).toBeInTheDocument();
    });

    it('handles hotel with high rating', () => {
      const highRatedHotel: Hotel = { ...mockHotel, rating: 5.0 };
      renderWithRouter(<HotelCard hotel={highRatedHotel} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles missing image gracefully', () => {
      const hotelWithoutImage: Hotel = {
        ...mockHotel,
        image: '',
      };
      renderWithRouter(<HotelCard hotel={hotelWithoutImage} />);
      const image = screen.getByAltText('Grand Hotel Barcelona');
      expect(image).toHaveAttribute('src', '');
    });
  });

  describe('Accessibility', () => {
    it('has proper link role', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('has descriptive alt text for image', () => {
      renderWithRouter(<HotelCard hotel={mockHotel} />);
      const image = screen.getByAltText('Grand Hotel Barcelona');
      expect(image).toBeInTheDocument();
    });

    it('has semantic HTML structure', () => {
      const { container } = renderWithRouter(<HotelCard hotel={mockHotel} />);
      // Should have heading for hotel name
      const heading = container.querySelector('h3');
      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe('Grand Hotel Barcelona');
    });
  });
});
