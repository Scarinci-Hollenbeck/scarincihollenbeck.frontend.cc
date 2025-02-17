import { fetchRestAPI } from 'requests/api';

export default async function handler(req, res) {
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=8600');
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=8600, stale-while-revalidate=120',
  );

  try {
    const { locations } = await fetchRestAPI('locations');
    return res.status(200).json({ data: locations });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data and no cached data available; ${err}`,
    });
  }
}
