# 🏨 Hotel Search Engine - eBooking

Modern web application for hotel search developed with React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🔍 Hotel search with autocomplete (Combobox pattern)
- 📅 Check-in and check-out date selection
- 👥 Guest management
- 🏨 Hotel results displayed with cards
- 📱 Responsive design
- ⚡ Optimized with React Query for server state management

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router DOM** - Routing
- **TanStack Query** - Server state management
- **Lucide React** - Icons
- **Vitest** - Testing framework

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🏗️ Project Structure

```
src/
├── api/              # API client and services
├── components/        # Reusable UI components
├── features/          # Features organized by domain
│   ├── search/       # Search feature
│   └── hotels/       # Hotels feature
├── lib/               # Utilities and helpers
├── pages/            # Application pages
├── providers/         # Context providers
└── test/             # Test configuration
```

## 🎨 Architecture

The project follows the **Feature-Sliced Design** pattern for scalable and maintainable code organization.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linter

## 🌐 Usage

1. Start the application with `npm run dev`
2. Search for hotels by typing at least 3 characters in the destination field
3. Select dates and number of guests
4. Click "Search Hotels" to view results
5. Click on any hotel to see its details

## 📄 License

This project is private.

## 👨‍💻 Author

Developed as a candidate project for eBooking.
