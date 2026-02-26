import { CURRENT_DOMAIN, PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  memorialsPageContentQuery,
  memorialsQuery,
} from 'requests/graphql-queries';
import MemorialsPage from 'components/pages/MemorialsPage';

export async function getStaticProps() {
  const {
    pageBy: {
      title, seo, pagesFields, featuredImage,
    },
  } = await fetchAPI(memorialsPageContentQuery);
  const { memorials } = await fetchAPI(memorialsQuery);

  const itemListData = memorials.nodes.map((attorney) => ({
    name: attorney.title,
    url: `${CURRENT_DOMAIN}${attorney?.uri}`,
  }));

  const canonicalUrl = `${PRODUCTION_URL}/memorials`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Memorials' },
  ];

  const itemListMeta = {
    name: 'Memorials at Scarinci Hollenbeck',
    url: canonicalUrl,
  };

  const webPageData = {
    url: canonicalUrl,
    name: seo?.title,
    description: seo?.metaDesc,
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  };

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      image: featuredImage?.node?.sourceUrl || null,
      memorials: memorials?.nodes,
      canonicalUrl,
      itemListData,
      itemListMeta,
      breadcrumbs,
      webPageData,
    },
    revalidate: 600,
  };
}

const Memorials = ({
  seo,
  title,
  description,
  image,
  memorials,
  canonicalUrl,
  itemListData,
  itemListMeta,
  breadcrumbs,
  webPageData,
}) => {
  const memorialsProps = {
    seo,
    title,
    description,
    image,
    memorials,
    canonicalUrl,
    itemListData,
    itemListMeta,
    breadcrumbs,
    webPageData,
  };
  return <MemorialsPage {...memorialsProps} />;
};

export default Memorials;
