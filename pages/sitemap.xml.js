import {
  CURRENT_DOMAIN,
  BASE_API_URL,
  headers,
  WP_REST_KEY,
} from 'utils/constants';
import fetch from 'node-fetch';
import empty from 'is-empty';
import { finalSitemapEntries } from 'utils/sitemap-entries';

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
        `${BASE_API_URL}/wp-json/wcra/v1/sitemap/?secret_key=${WP_REST_KEY}`,
        headers,
      )
    ).json();

    if (empty(response?.data)) return { homeModified: null, pages: [] };

    const siteMapArr = Array.from(
      Object.entries(response?.data),
      ([key, value]) => {
        value = value.map((page) => {
          // No date in WordPress means no <lastmod>: the build time would
          // change on every request and teach crawlers to ignore the field.
          page.date_modified = page.date_modified
            ? reformatDate(page.date_modified)
            : null;
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
              date_modified: null,
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
              date_modified: null,
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
              date_modified: null,
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
              date_modified: null,
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

    // Dated entries first: the hard-coded listings above (/attorneys, /careers,
    // ...) are also WordPress pages with a real date, and the first copy of a
    // URL is the one kept. The sort is stable, so the order is otherwise kept.
    const entries = siteMapArr
      .flat()
      .sort((a, b) => Number(!a.date_modified) - Number(!b.date_modified));
    // The home page is the WordPress page /front-page.
    const homeModified = entries.find(({ slug }) => slug === exception3)?.date_modified || null;

    return {
      homeModified,
      pages: finalSitemapEntries(
        entries.filter(
          ({ slug }) => slug !== exception1 && slug !== exception2 && slug !== exception3,
        ),
      ),
    };
  } catch (error) {
    console.error(error.message);
    return { homeModified: null, pages: [] };
  }
};

const lastmod = (date) => (date
  ? `
                <lastmod>${date}</lastmod>`
  : '');
const Sitemap = () => null;
export const getServerSideProps = async ({ res }) => {
  const baseUrl = CURRENT_DOMAIN;
  const { homeModified, pages: sitemapArr } = await getCurrentPublishedPages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>${lastmod(homeModified)}
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${sitemapArr
    .map(
      (page) => `
              <url>
                <loc>${baseUrl}${page.slug}</loc>${lastmod(page.date_modified)}
                <changefreq>daily</changefreq>
                <priority>0.9</priority>
              </url>      
                `,
    )
    .join('')} 
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
