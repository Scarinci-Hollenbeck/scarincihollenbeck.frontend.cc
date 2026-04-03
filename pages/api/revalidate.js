/**
 * On-demand ISR revalidation endpoint.
 *
 * WordPress calls this webhook after content changes (publish, update, delete)
 * so the affected pages are regenerated immediately — no full rebuild needed.
 *
 * POST /api/revalidate
 * Headers:  x-revalidation-secret: <REVALIDATION_SECRET>
 * Body:     { "paths": ["/attorneys/john-doe", "/attorneys"], "post_type": "attorneys", "action": "updated" }
 *
 * Required env var: REVALIDATION_SECRET
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secret = req.headers['x-revalidation-secret'];

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  const { paths } = req.body;

  if (!Array.isArray(paths) || paths.length === 0) {
    return res.status(400).json({ message: 'Missing or empty paths array' });
  }

  const settled = await Promise.allSettled(
    paths.map((path) => res.revalidate(path).then(() => path)),
  );

  const results = settled.map((result, i) => (result.status === 'fulfilled'
    ? { path: paths[i], revalidated: true }
    : { path: paths[i], revalidated: false, error: result.reason?.message }));

  // Also clear in-memory caches so /api/revalidate-* routes fetch fresh data
  if (global.cache) {
    const postType = req.body.post_type;
    const cacheMap = {
      attorneys: 'attorneys',
      attorneyProfile: 'attorneys',
      practices: 'practices',
      officeLocation: 'locations',
      location: 'locations',
      industry: 'industries',
    };

    const cacheKey = cacheMap[postType];
    if (cacheKey && global.cache[cacheKey]) {
      global.cache[cacheKey].lastFetchTime = 0;
    }
  }

  const failed = results.filter((r) => !r.revalidated);

  return res.status(failed.length > 0 ? 207 : 200).json({
    revalidated: failed.length === 0,
    results,
  });
}
