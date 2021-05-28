import { NextSeo } from 'next-seo';
import PagesBody from 'components/pages/body';
import PagesSidebar from 'components/pages/sidebar';
import SingleSubHeader from 'layouts/single-sub-header';
import LargeSidebar from 'layouts/large-sidebar';
import { headers } from 'utils/helpers';

export default function PassingAttorneyHarveyRPoe({
  title,
  content,
  posts,
  seo,
}) {
  const extractSubTitle = content.match(/<h2(.*?)>(.*?)<\/h2>/g);
  const subTitle = extractSubTitle !== null ? extractSubTitle[0].replace(/<[^>]*>?/gm, '') : '';
  const bodyContent = content.replace(subTitle, '');

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.metaDescription}
        canonical="http://scarincihollenbeck.com/passing-attorney-harvey-r-poe"
      />
      <SingleSubHeader
        title={title}
        subtitle={subTitle}
        span={8}
        offset={2}
      />
      <LargeSidebar
        body={<PagesBody content={bodyContent} />}
        sidebar={<PagesSidebar posts={posts} covidPage={false} />}
      />
    </>
  );
}

export async function getStaticProps() {
  const [aJson, postJson] = await Promise.all([
    fetch(
      'https://wp.scarincihollenbeck.com/wp-json/single-page/page/passing-attorney-harvey-r-poe',
      { headers },
    ).then((data) => data.json()),
    fetch(
      'https://wp.scarincihollenbeck.com/wp-json/single/post/develop-in-a-jersey-city-inclusionary-zone/law-firm-insights',
      { headers },
    ).then((data) => data.json()),
  ]);

  const { posts } = postJson;
  const { title, content, seo } = aJson;

  return {
    props: {
      title,
      content,
      posts,
      seo,
    },
    revalidate: 1,
  };
}
