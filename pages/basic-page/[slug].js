import BasicPageContent from 'components/pages/BasicPageContent';
import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import { basicPagesQuery } from 'requests/graphql-queries';

/** Fetch page data from WP GRAPHQL API */
const getBasicPageContent = async (slug) => {
  const data = await fetchAPI(basicPagesQuery, {
    variables: { slug },
  });

  if (data?.pageBy?.status !== 'publish') {
    return null;
  }

  return data?.pageBy;
};

export async function getStaticPaths() {
  const pages = [
    'awards',
    'terms-of-use',
    'privacy-policy',
    'disclaimer',
    'work-life-integration',
  ];
  const paths = pages.map((url) => `/basic-page/${url}`);

  return {
    paths,
    fallback: 'blocking',
  };
}

/** Set data from API response to page props */
export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const request = await getBasicPageContent(slug);

  if (!request) {
    return {
      notFound: true,
    };
  }

  const {
    title, seo, featuredImage, pagesFields,
  } = request;

  const canonicalUrl = `${PRODUCTION_URL}/${params.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: title },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo.title,
    description: seo.metaDesc,
    pageType: slug === 'awards' ? 'AboutPage' : 'WebPage',
  };

  return {
    props: {
      title,
      seo,
      subHeaderImage: featuredImage?.node.sourceUrl,
      description: pagesFields?.description,
      sections: pagesFields?.sections,
      canonicalUrl,
      breadcrumbs,
      webPageData,
    },
    revalidate: 600,
  };
};

/** Basic page component - Awards, Privacy Policy, Work Life Integration etc. */
const BasicPage = ({
  seo,
  title,
  subHeaderImage,
  canonicalUrl,
  description,
  sections,
  breadcrumbs,
  webPageData,
}) => {
  const basicPageProps = {
    sections,
    canonicalUrl,
    seo,
    title,
    description,
    subHeaderImage,
    breadcrumbs,
    webPageData,
  };

  return <BasicPageContent {...basicPageProps} />;
};

export default BasicPage;
