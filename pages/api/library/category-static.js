import { fetchAPI } from 'requests/api';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import {
  categoriesQuery,
  categoryPageContentQuery,
} from 'requests/graphql-queries';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: 'Missing slug parameter' });
    }

    const [data, { filters, subHeaderSlides }] = await Promise.all([
      fetchAPI(categoryPageContentQuery, {
        variables: {
          slug,
        },
      }),
      getLibraryPageData(categoriesQuery),
    ]);

    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    );

    return res.status(200).json({ data, filters, subHeaderSlides });
  } catch (error) {
    console.error('Error fetching library category static data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
