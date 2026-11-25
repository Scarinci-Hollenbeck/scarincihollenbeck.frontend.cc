import { getIndustries } from 'requests/getIndustries';
import { setResponseHeaders } from 'utils/helpers';
import { INDUSTRIES_CACHE_SECONDS } from 'utils/revalidate-cache';

// Last good answer, served only when WordPress fails. Fresh answers are cached
// by the CDN alone (see INDUSTRIES_CACHE_SECONDS), so a saved industry reaches
// the menu without waiting out a second, in-memory cache.
let lastGood = [];

export default async function handler(req, res) {
  try {
    const industries = await getIndustries();
    lastGood = industries;

    setResponseHeaders(res, INDUSTRIES_CACHE_SECONDS, 'MISS');
    return res.status(200).json({ data: industries });
  } catch (err) {
    if (lastGood.length > 0) {
      setResponseHeaders(res, INDUSTRIES_CACHE_SECONDS, 'STALE');
      return res.status(200).json({ data: lastGood });
    }

    return res.status(500).json({
      error: `Failed to fetch data and no cached data available; ${err}`,
    });
  }
}
