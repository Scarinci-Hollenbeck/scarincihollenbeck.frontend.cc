/**
 * Keeps browser e2e runs out of the client's reports: aborts analytics, ads and
 * call-tracking beacons, and keeps the PWA service worker from registering,
 * because requests the worker sends itself never reach page.route.
 * (Playwright's `serviceWorkers: 'block'` removes navigator.serviceWorker, and
 * the PWA register script then throws.)
 * Call it before the first page.goto of every test that opens a page.
 */

const AD_HOSTS = /(^|\.)(google-analytics\.com|doubleclick\.net|googleadservices\.com|googlesyndication\.com|analytics\.google\.com)$/;
// Google Ads also pings google.<country TLD>, e.g. google.com.ua/pagead.
const GOOGLE_HOST = /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/;
const GOOGLE_BEACON_PATH = /^\/(g\/collect|rmkt|pagead|ccm|ads|measurement)\b/;

const isBeacon = ({ hostname, pathname }) => AD_HOSTS.test(hostname)
  || (GOOGLE_HOST.test(hostname) && GOOGLE_BEACON_PATH.test(pathname))
  || (hostname === 'www.googletagmanager.com' && pathname === '/a')
  // CallRail: let the swap script load, block everything it reports.
  || (/(^|\.)callrail\.com$/.test(hostname)
    && !/^\/companies\/.+\.js$/.test(pathname));

export default async function blockAnalytics(page) {
  await page.addInitScript(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register = () => new Promise(() => {});
    }
  });
  await page.route(isBeacon, (route) => route.abort());
}
