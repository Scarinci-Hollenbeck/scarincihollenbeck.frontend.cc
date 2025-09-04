import {
  CURRENT_DOMAIN,
  BASE_API_URL,
  headers,
  NEXT_PUBLIC_WP_REST_KEY,
} from 'utils/constants';
import fetch from 'node-fetch';
import empty from 'is-empty';

const reformatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString();
};

const getCurrentPublishedPages = async () => {
  const exception1 = '/order-confirmation';
  const exception2 = '/order-failed';
  const exception3 = '/front-page';

  try {
    const response = await (
      await fetch(
        `${BASE_API_URL}/wp-json/wcra/v1/sitemap/?secret_key=${NEXT_PUBLIC_WP_REST_KEY}`,
        headers,
      )
    ).json();
    let siteMapArr;
    if (!empty(response?.data)) {
      siteMapArr = Array.from(
        Object.entries(response?.data),
        ([key, value]) => {
          value = value.map((page) => {
            if (page.date_modified.length === 0) {
              page.date_modified = new Date().toISOString();
            } else {
              page.date_modified = reformatDate(page.date_modified);
            }
            return page;
          });
          if (key === 'categories') {
            value.map((category) => {
              category.slug = `/library/category/${category.slug}`;
              return category;
            });
            value = [
              ...value,
              {
                id: value.length,
                title: 'Categories',
                date_modified: new Date().toISOString(),
                slug: '/library/category/firm-news',
              },
            ];
          }
          if (key === 'attorneys') {
            value = [
              ...value,
              {
                id: value.length,
                title: 'Attorneys',
                date_modified: new Date().toISOString(),
                slug: '/attorneys',
              },
            ];
          }
          if (key === 'administration') {
            value = [
              ...value,
              {
                id: value.length,
                title: 'Administration',
                date_modified: new Date().toISOString(),
                slug: '/administration',
              },
            ];
          }
          if (key === 'careers') {
            value = [
              ...value,
              {
                id: value.length,
                title: 'Careers',
                date_modified: new Date().toISOString(),
                slug: '/careers',
              },
            ];
          }
          if (key === 'authors') {
            value = value.map((author) => {
              author.slug = `/library${author.slug}`;
              return author;
            });
          }
          return value;
        },
      );
    }

    return siteMapArr
      .flat()
      .filter(
        ({ slug }) => slug !== exception1 && slug !== exception2 && slug !== exception3,
      );
  } catch (error) {
    console.error(error.message);
  }
};
const Sitemap = () => null;
export const getServerSideProps = async ({ res }) => {
  const baseUrl = CURRENT_DOMAIN;
  const sitemapArr = await getCurrentPublishedPages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${
  !empty(sitemapArr)
          && sitemapArr
            .map(
              (page) => `
              <url>
                <loc>${baseUrl}${page.slug}</loc>
                <lastmod>${page.date_modified}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.9</priority>
              </url>      
                `,
            )
            .join('')
} 
    </urlset>
  `;
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=600, stale-while-revalidate',
  );
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
