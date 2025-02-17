import { fetchRestAPI } from 'requests/api';

export default async function handler(req, res) {
  res.setHeader('CDN-Cache-Control', 'max-age=60');
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=8600, stale-while-revalidate=120',
  );

  try {
    const { categories } = await fetchRestAPI('subscriptions');
    return res.status(200).json({ data: categories });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data; ${err}`,
    });
  }
}
