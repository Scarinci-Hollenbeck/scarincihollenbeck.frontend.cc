import { fetchRestAPI } from 'requests/api';

export default async function handler(req, res) {
  try {
    const { categories } = await fetchRestAPI('subscriptions');
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    );
    return res.status(200).json({ data: categories });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data; ${err}`,
    });
  }
}
