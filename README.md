


# Hotel Search Engine

Single-page hotel search application built with **React 18**, **TypeScript**, and **Tailwind CSS**, used as a sandbox to explore **Core Web Vitals**, filter-based search, and automated testing (unit, integration, and Lighthouse performance budgets).

---

## 1. Problem Statement

**Use case:** fast hotel search by city with a smooth experience on both desktop and mobile.

**Focus:** prioritize *perceived performance* (FCP, LCP, TBT, CLS) over real-world domain complexity (authentication, payments, bookings).

**Goal of the exercise:** demonstrate frontend architectural decision-making, realistic fake API modeling, and automated performance regression control.

---

## 2. Architecture & Key Decisions

### Feature-Sliced Design

* Domain-oriented structure with `features/search`, `features/hotels`, shared `components`, and `lib` utilities.
* **Decision:** isolate domain logic from reusable UI and data access to support future filter growth (city → dates, guests, price).

### Server State with React Query

* Centralized `QueryProvider` manages request caching, invalidation, and rehydration across navigation.
* **Decision:** avoid prop drilling and handle loading/error/latency states consistently.

### Routing & Code-Splitting

* React Router with lazy-loaded routes (`Home`, `SearchResults`, `HotelDetails`).
* **Decision:** reduce initial JavaScript payload and improve LCP without adding architectural complexity.

---

## 3. Fake API & Data Model

### Implementation

* `src/api/hotels.ts` exposes `search({ destination })` and `getById(id)`.
* `src/lib/simpleHotelData.ts` contains a static dataset of Spanish cities
  (Barcelona, Madrid, Valencia, Granada, Seville, Bilbao, Málaga, Palma).
* Simulated latency: **200–600ms** to approximate real network conditions.

### Rationale

* API shape is intentionally realistic to allow replacement with a real backend without touching UI code.
* In-memory, case-insensitive search index (minimum 3 characters), designed to scale with additional filters without breaking contracts or flows.

---

## 4. Search Flow & UX

### SearchBar + Combobox

* Autocomplete with a 3-character threshold.
* Suggestions list and navigation to `/search?destination=…`.

### Results

* `HotelList` + `HotelCard` with responsive layout and CTA to details (`/hotels/:id`).

### UX Decisions

* Perceived loading handled via skeletons/spinners and explicit “no results” states.
* Query string kept in the URL to support deep linking and browser back/forward navigation.

---

## 5. Testing Strategy

### Unit Tests

* Fake API logic (`src/api/hotels.test.ts`).

### Integration Tests

* End-to-end search flow
  (type → autocomplete → submit → results) in
  `features/search/__tests__/SearchFlow.test.tsx`.

### Performance Budget Tests (Lighthouse)

* `src/__tests__/lighthouse.threshold.test.ts` runs Lighthouse against the preview build and fails if thresholds regress.

**Current thresholds (can be tightened):**

* **Scores**

  * Performance ≥ 90
  * Accessibility ≥ 95
  * Best Practices ≥ 90
  * SEO ≥ 90

**Note:** These tests require the preview server to be running (`npm run preview`).


**Decision:** treat Lighthouse as an automated performance regression test, not a manual report.

---

## 6. Performance & Lighthouse Setup

* `lighthouse.config.js`: mobile emulation, CWV-oriented throttling, categories enabled (performance, accessibility, best-practices, SEO).
* HTML/JSON reports generated under `reports/lighthouse/` (gitignored except for a single passing example).
* `npm run test:lighthouse` executes performance budget tests against `npm run preview`.

**Motivation:** ensure future iterations (new filters, more UI complexity) do not silently degrade baseline performance.

---

## 7. Getting Started (Minimal)

```bash
npm install
npm run dev   # http://localhost:5173
```

---

