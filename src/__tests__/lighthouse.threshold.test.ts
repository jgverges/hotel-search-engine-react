import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

// Import lighthouse config - using require for JS config file
// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('../../lighthouse.config.js').default;

// Performance Budget 
const PERFORMANCE_THRESHOLDS = {
  // Category scores (0-100)
  performance: 90,        // Minimum Performance score
  accessibility: 95,      // Minimum Accessibility score
  'best-practices': 90,   // Minimum Best Practices score
  seo: 90,                // Minimum SEO score

  // Core Web Vitals 
  metrics: {
    firstContentfulPaint: 2000,      // FCP < 2s 
    largestContentfulPaint: 2500,    // LCP < 2.5s
    totalBlockingTime: 300,          // TBT < 300ms
    cumulativeLayoutShift: 0.1,      // CLS < 0.1
    speedIndex: 3000,                // Speed Index < 3s
  },
} as const;

const LIGHTHOUSE_URL = 'http://localhost:4173';
const TIMEOUT = 60000; // 60 seconds

describe('Lighthouse Performance Budget', () => {
  let chrome: chromeLauncher.LaunchedChrome | null = null;

  beforeAll(async () => {
    // Launch Chrome for Lighthouse
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless=new', '--disable-gpu', '--disable-dev-shm-usage'],
      logLevel: 'error',
    });
  }, TIMEOUT);

  afterAll(async () => {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (error) {
        // On some Windows environments, Chrome may already be closed and throw EPERM.
        // We ignore this cleanup error so the test doesn't fail if metrics already passed.
        console.warn('Warning: failed to kill Chrome instance, ignoring cleanup error:', error);
      }
    }
  });

  it('should meet performance budget thresholds', async () => {
    if (!chrome) {
      throw new Error('Chrome instance not available');
    }

    const options = {
      port: chrome.port,
      output: 'json' as const,
      logLevel: 'error' as const,
    };

    const result = await lighthouse(LIGHTHOUSE_URL, options, config);
    
    if (!result) {
      throw new Error('Lighthouse result is null');
    }

    const { lhr } = result;
    const categories = lhr.categories;

    // Verify category scores
    expect(categories.performance?.score, 'Performance score below threshold').toBeGreaterThanOrEqual(
      PERFORMANCE_THRESHOLDS.performance / 100
    );

    expect(categories.accessibility?.score, 'Accessibility score below threshold').toBeGreaterThanOrEqual(
      PERFORMANCE_THRESHOLDS.accessibility / 100
    );

    expect(categories['best-practices']?.score, 'Best Practices score below threshold').toBeGreaterThanOrEqual(
      PERFORMANCE_THRESHOLDS['best-practices'] / 100
    );

    expect(categories.seo?.score, 'SEO score below threshold').toBeGreaterThanOrEqual(
      PERFORMANCE_THRESHOLDS.seo / 100
    );

    // Verify Core Web Vitals
    const metrics = lhr.audits;

    const fcp = metrics['first-contentful-paint']?.numericValue;
    if (fcp !== undefined) {
      expect(fcp, `FCP (${fcp}ms) exceeds threshold of ${PERFORMANCE_THRESHOLDS.metrics.firstContentfulPaint}ms`).toBeLessThanOrEqual(
        PERFORMANCE_THRESHOLDS.metrics.firstContentfulPaint
      );
    }

    const lcp = metrics['largest-contentful-paint']?.numericValue;
    if (lcp !== undefined) {
      expect(lcp, `LCP (${lcp}ms) exceeds threshold of ${PERFORMANCE_THRESHOLDS.metrics.largestContentfulPaint}ms`).toBeLessThanOrEqual(
        PERFORMANCE_THRESHOLDS.metrics.largestContentfulPaint
      );
    }

    const tbt = metrics['total-blocking-time']?.numericValue;
    if (tbt !== undefined) {
      expect(tbt, `TBT (${tbt}ms) exceeds threshold of ${PERFORMANCE_THRESHOLDS.metrics.totalBlockingTime}ms`).toBeLessThanOrEqual(
        PERFORMANCE_THRESHOLDS.metrics.totalBlockingTime
      );
    }

    const cls = metrics['cumulative-layout-shift']?.numericValue;
    if (cls !== undefined) {
      expect(cls, `CLS (${cls}) exceeds threshold of ${PERFORMANCE_THRESHOLDS.metrics.cumulativeLayoutShift}`).toBeLessThanOrEqual(
        PERFORMANCE_THRESHOLDS.metrics.cumulativeLayoutShift
      );
    }

    const speedIndex = metrics['speed-index']?.numericValue;
    if (speedIndex !== undefined) {
      expect(speedIndex, `Speed Index (${speedIndex}ms) exceeds threshold of ${PERFORMANCE_THRESHOLDS.metrics.speedIndex}ms`).toBeLessThanOrEqual(
        PERFORMANCE_THRESHOLDS.metrics.speedIndex
      );
    }
  }, TIMEOUT);

  it('should have all required categories passing', async () => {
    if (!chrome) {
      throw new Error('Chrome instance not available');
    }

    const options = {
      port: chrome.port,
      output: 'json' as const,
      logLevel: 'error' as const,
    };

    const result = await lighthouse(LIGHTHOUSE_URL, options, config);
    
    if (!result) {
      throw new Error('Lighthouse result is null');
    }

    const { lhr } = result;
    const categories = lhr.categories;

    // Verify all categories are present and passing
    expect(categories.performance, 'Performance category missing').toBeDefined();
    expect(categories.accessibility, 'Accessibility category missing').toBeDefined();
    expect(categories['best-practices'], 'Best Practices category missing').toBeDefined();
    expect(categories.seo, 'SEO category missing').toBeDefined();

    // All scores should be >= 0.9 (90/100)
    const allScores = [
      categories.performance?.score,
      categories.accessibility?.score,
      categories['best-practices']?.score,
      categories.seo?.score,
    ].filter((score): score is number => typeof score === 'number' && Number.isFinite(score));

    allScores.forEach((score) => {
      expect(score, `Category score ${score} is below 0.9 (90/100)`).toBeGreaterThanOrEqual(0.9);
    });
  }, TIMEOUT);
});
