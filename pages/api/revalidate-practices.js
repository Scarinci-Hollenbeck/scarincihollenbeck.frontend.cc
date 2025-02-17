import { getPractices } from 'requests/getPractices';

export default async function handler(req, res) {
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=8600');
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=8600, stale-while-revalidate=120',
  );

  try {
    const practices = await getPractices();
    return res.status(200).json({ data: practices });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data; ${err}`,
    });
  }
}
