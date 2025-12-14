/** @type {import('lighthouse').Config} */
export default {
  extends: 'lighthouse:default',
  settings: {
    // Only run these categories
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    
    // Emulated device settings
    emulatedFormFactor: 'mobile',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    
    // Screen emulation
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 732,
      deviceScaleFactor: 2.625,
    },
    
    // Skip some audits for faster runs
    skipAudits: [
      'uses-http2',
      'uses-long-cache-ttl',
    ],
  },
};
