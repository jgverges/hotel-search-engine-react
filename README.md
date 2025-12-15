# Hotel Search Engine 

Modern web application for hotel search developed with React 18, TypeScript, and Tailwind CSS.

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Implementation](#api-implementation)
- [Lighthouse Performance Testing](#lighthouse-performance-testing)
- [Available Scripts](#available-scripts)
- [Usage](#usage)

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

## Project Goals

- **Core Web Vitals testbed:** Sandbox to keep all metrics in the green and compare optimization strategies (Lighthouse, CWV).
- **Scalable filtering:** City search uses an in-memory index (case-insensitive, triggers at 3 chars) designed to expand with more parameters (dates, guests).
- **Critical testing:** Unit tests (API logic), integration tests (search flow), and performance budget tests (Lighthouse thresholds for CWV).

Evidence: Lighthouse first report is kept at `reports/lighthouse/homepage.html`; add the latest screenshot at `docs/lighthouse/homepage.png` if desired.

## API Implementation

This project uses a **Fake API** (`src/api/hotels.ts`) for demonstration purposes, allowing frontend development without a backend dependency. The implementation:

- Simulates network latency with random delays (200-600ms) to mimic real API behavior
- Uses static data stored in memory for hotel information
- Maintains the same interface as a real API would, making future migration straightforward
- Includes real business logic (search, filtering, validation) for realistic testing

This approach enables independent frontend development, realistic testing scenarios, and easy migration to a real API when needed.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Lighthouse Performance Testing

The project includes Lighthouse configuration for performance, accessibility, best practices, and SEO audits.

### Running Lighthouse Tests

#### Prerequisites

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the preview server:**
   ```bash
   npm run preview
   ```
   The app will be available at `http://localhost:4173` (open in incognito mode).

3. **In another terminal, run Lighthouse:**

   **Generate HTML report:**
   ```bash
   npm run lighthouse
   ```

   **Generate JSON report:**
   ```bash
   npm run lighthouse:json
   ```

   **Generate both HTML and JSON:**
   ```bash
   npm run lighthouse:all
   ```

### Browser Conditions for Lighthouse

Tests run with **headless Chrome** (via `chrome-launcher`) using `lighthouse.config.js`:
- Device emulation: **mobile** (`width: 412`, `height: 732`, `deviceScaleFactor: 2.625`)
- Throttling: **RTT 40ms**, **Throughput ~10 Mbps**, **CPU slowdown: 1x**
- Chrome flags: `--headless=new --disable-gpu --disable-dev-shm-usage --incognito` (incognito prevents cache and previous sessions)

### Performance Budget Tests 

The project includes automated **Performance Budget Tests** (also called "Lighthouse Threshold Tests") that verify metrics meet minimum thresholds.

**Run the threshold tests:**
```bash
npm run test:lighthouse
```

**Note:** These tests require the preview server to be running (`npm run preview`).

#### Thresholds (Umbrales) Configured

| Category | Threshold | Description |
|----------|-----------|-------------|
| **Performance** | ≥ 90 | Performance score |
| **Accessibility** | ≥ 95 | Accessibility score |
| **Best Practices** | ≥ 90 | Best Practices score |
| **SEO** | ≥ 90 | SEO score |

**Core Web Vitals:**
- **FCP** (First Contentful Paint): ≤ 2000ms
- **LCP** (Largest Contentful Paint): ≤ 2500ms
- **TBT** (Total Blocking Time): ≤ 300ms
- **CLS** (Cumulative Layout Shift): ≤ 0.1
- **Speed Index**: ≤ 3000ms

#### How to adjust thresholds (Core Web Vitals)

Edit `src/__tests__/lighthouse.threshold.test.ts`:
```ts
const PERFORMANCE_THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  'best-practices': 90,
  seo: 90,
  metrics: {
    firstContentfulPaint: 2000,
    largestContentfulPaint: 2500,
    totalBlockingTime: 300,
    cumulativeLayoutShift: 0.1,
    speedIndex: 3000,
  },
};
```
Raise or lower the numbers above to change the required scores/timings.

### Terminology

- **Performance Budget** / **Lighthouse Thresholds**: Minimum acceptable performance values
- **Metrics**: Scores and values measured by Lighthouse
- **Threshold**: Minimum value that must be met
- **CI/CD Gate**: A deployment control mechanism that blocks deployments if thresholds are not met

### Reports

Although the `reports/lighthouse` directory has been excluded from git tracking, the original first report `reports/lighthouse/homepage.html` has been kept in the repository to demonstrate that all metric values have been achieved in green (passing all audits).

## Usage

1. Start the app with `npm run dev`
2. Open your browser at [http://localhost:5173](http://localhost:5173)
3. Search hotels by typing at least 3 characters
5. Click "Search Hotels" to view results
6. Click a hotel to see details


