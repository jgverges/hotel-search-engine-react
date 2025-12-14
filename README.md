# Hotel Search Engine 

Modern web application for hotel search developed with React 18, TypeScript, and Tailwind CSS.

## Features

- Hotel search with autocomplete (Combobox pattern)
- Hotel results displayed with cards
- Responsive design
- Optimized with React Query for server state management

##  Installation

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

## Project Structure

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

##  Architecture

The project follows the **Feature-Sliced Design** pattern for scalable and maintainable code organization.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Usage

1. Start the app with `npm run dev`
2. Open your browser at [http://localhost:5173](http://localhost:5173)
3. Search hotels by typing at least 3 characters
5. Click "Search Hotels" to view results
6. Click a hotel to see details


