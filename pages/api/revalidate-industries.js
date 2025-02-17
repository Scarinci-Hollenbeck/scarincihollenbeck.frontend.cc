import { getIndustries } from 'requests/getIndustries';

export default async function handler(req, res) {
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  res.setHeader('CDN-Cache-Control', 'max-age=60');
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=8600, stale-while-revalidate=120',
  );

  try {
    const industries = await getIndustries();
    return res.status(200).json({ data: industries });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data and no cached data available; ${err}`,
    });
  }
}
