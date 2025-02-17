import { fetchAPI } from 'requests/api';
import { authorContentQuery, categoriesQuery } from 'requests/graphql-queries';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: 'Missing slug parameter' });
    }

    const [authorContent, mainCategories] = await Promise.all([
      fetchAPI(authorContentQuery, {
        variables: { id: slug },
      }),
      fetchAPI(categoriesQuery),
    ]);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=120',
    );

    return res.status(200).json({ authorContent, mainCategories });
  } catch (error) {
    console.error('Error fetching library author static data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
