const puppeteer = require('puppeteer');

const analyzePerformance = async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const performanceMetrics = {
          lcp: 0,
          tti: 0,
          cls: 0
        };

        let cumulativeLayoutShift = 0;

        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              performanceMetrics.lcp = entry.startTime;
            }
            if (entry.entryType === 'longtask') {
              const blockingTime = entry.duration - 50;
              if (blockingTime > 0) {
                performanceMetrics.tti += blockingTime;
              }
            }
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              cumulativeLayoutShift += entry.value;
            }
          });
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        observer.observe({ type: 'longtask', buffered: true });
        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          performanceMetrics.cls = cumulativeLayoutShift;
          resolve(performanceMetrics);
        }, 10000); 
      });
    });

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    const performanceEntries = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.getEntries()))
    );

    const pageLoadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    const totalRequestSize = performanceEntries
      .filter(entry => entry.entryType === 'resource')
      .reduce((acc, resource) => acc + resource.transferSize, 0);
    const numberOfRequests = performanceEntries.filter(entry => entry.entryType === 'resource').length;

    const fcpEntry = performanceEntries.find(entry => entry.name === 'first-contentful-paint');
    const fcp = fcpEntry ? fcpEntry.startTime : null;

    await browser.close();

    const performanceData = {
      pageLoadTime: Number(pageLoadTime.toFixed(3)),
      totalRequestSize: Number(totalRequestSize.toFixed(3)),
      numberOfRequests: Number(numberOfRequests.toFixed(3)),
      fcp: fcp !== null ? Number(fcp.toFixed(3)) : null,
      lcp: Number(metrics.lcp.toFixed(3)),
      cls: Number(metrics.cls.toFixed(3)),
      tti: Number(metrics.tti.toFixed(3)),
      tbt: Number(metrics.tti.toFixed(3)) 
    };

    res.json(performanceData);
  } catch (error) {
    console.error('Error analyzing performance:', error);
    res.status(500).json({ error: 'Error analyzing performance' });
  }
};

module.exports = { analyzePerformance };
