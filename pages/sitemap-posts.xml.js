import fetch from 'node-fetch';
import { changePostLink } from 'utils/helpers';
import { BASE_API_URL, headers, PRODUCTION_URL } from '../utils/constants';
import { convertUnixTimestampToISO } from '../utils/helpers';

const getPageSitemap = async (slug) => {
  let respToJson;
  try {
    const res = await fetch(`${BASE_API_URL}/${slug}`, { headers });
    respToJson = await res.json();
  } catch (error) {
    console.error(error);
  }
  return respToJson;
};
const Sitemap = () => null;
export const getServerSideProps = async ({ res }) => {
  const posts = await getPageSitemap(
    'wp-json/sitemap-next/v1/all-published-posts/',
  );
  const postsDateConverted = posts?.links.map(({ link, modify_date }) => ({
    link,
    modify_date: convertUnixTimestampToISO(modify_date),
  })) || [];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${postsDateConverted
    .map(
      (url) => `
      <url>
        <loc>${`${PRODUCTION_URL}${changePostLink(url.link)}`}</loc>
        <lastmod>${url.modify_date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    `,
    )
    .join('')}}
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
