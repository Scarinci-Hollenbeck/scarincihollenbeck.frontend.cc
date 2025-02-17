import { fetchAPI } from 'requests/api';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import {
  categoriesQuery,
  libraryPageContentQuery,
} from 'requests/graphql-queries';

export default async function handler(req, res) {
  try {
    const [{ pageBy }, { filters, subHeaderSlides }] = await Promise.all([
      fetchAPI(libraryPageContentQuery),
      getLibraryPageData(categoriesQuery),
    ]);

    res.setHeader(
      'Cache-Control',
      'max-age=0',
      's-maxage=3600, stale-while-revalidate=86400',
    );

    return res.status(200).json({ pageBy, filters, subHeaderSlides });
  } catch (error) {
    console.error('Error fetching library search static data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
