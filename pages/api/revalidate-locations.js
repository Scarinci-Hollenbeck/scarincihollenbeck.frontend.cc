import { fetchRestAPI } from 'requests/api';

export default async function handler(req, res) {
  try {
    const { locations } = await fetchRestAPI('locations');
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    );
    return res.status(200).json({ data: locations });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data and no cached data available; ${err}`,
    });
  }
}
