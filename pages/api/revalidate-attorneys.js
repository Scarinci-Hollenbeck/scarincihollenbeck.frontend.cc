import { getAttorneysFromRestApi } from 'requests/getAttorneys';

export default async function handler(req, res) {
  try {
    const attorneys = await getAttorneysFromRestApi();
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    );
    return res.status(200).json({ data: attorneys });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data ${err}`,
    });
  }
}
