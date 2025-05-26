import BasicPageContent from 'components/pages/BasicPageContent';
import { PRODUCTION_URL } from 'utils/constants';
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

  return {
    props: {
      title,
      seo,
      subHeaderImage: featuredImage?.node.sourceUrl,
      description: pagesFields?.description,
      sections: pagesFields?.sections,
      canonicalUrl: `${PRODUCTION_URL}/${params.slug}`,
    },
    revalidate: 86400,
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
}) => {
  const basicPageProps = {
    sections,
    canonicalUrl,
    seo,
    title,
    description,
    subHeaderImage,
  };

  return <BasicPageContent {...basicPageProps} />;
};

export default BasicPage;
