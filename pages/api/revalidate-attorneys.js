import { getAttorneysFromRestApi } from 'requests/getAttorneys';

export default async function handler(req, res) {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=8600, stale-while-revalidate=120',
  );

  try {
    const attorneys = await getAttorneysFromRestApi();
    return res.status(200).json({ data: attorneys });
  } catch (err) {
    return res.status(500).json({
      error: `Failed to fetch data ${err}`,
    });
  }
}
