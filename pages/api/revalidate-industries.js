import { getIndustries } from 'requests/getIndustries';

export default async function handler(req, res) {
  try {
    const industries = await getIndustries();
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    );
    return res.status(200).json({ data: industries });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data and no cached data available; ${err}`,
    });
  }
}
