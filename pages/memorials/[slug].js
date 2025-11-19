import React from 'react';
import { fetchAPI } from 'requests/api';
import { memorialPageQuery } from 'requests/graphql-queries';
import { formatSrcToCloudinaryUrl } from 'utils/helpers';
import MemorialPage from 'components/pages/MemorialPage';

export async function memorialBySlug(slug) {
  const data = await fetchAPI(memorialPageQuery, {
    variables: { slug },
  });

  if (data?.memorialBy?.status !== 'publish') {
    return null;
  }

  return data?.memorialBy;
}

const memorialsSlugsQuery = `
query memorialsSlugs {
  memorials(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

export async function getStaticPaths() {
  const listId = await fetchAPI(memorialsSlugsQuery);

  const paths = [];

  listId?.memorials?.nodes?.forEach((node) => {
    paths.push(`/memorials/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const memorialData = await memorialBySlug(slug);

  if (!memorialData) {
    return {
      notFound: true,
    };
  }

  /** SEO meta data */
  const seo = {
    title: memorialData?.seo?.title,
    canonicalLink: `memorials/${params?.slug}`,
    metaDescription: memorialData?.seo?.metaDesc,
    image: formatSrcToCloudinaryUrl(
      memorialData?.memorialFields?.image?.sourceUrl,
    ),
  };

  const pageData = {
    name: memorialData?.memorialFields?.name,
    title: memorialData?.memorialFields?.title,
    description: memorialData?.memorialFields?.description,
    image: formatSrcToCloudinaryUrl(
      memorialData?.memorialFields?.image?.sourceUrl,
    ),
    born: memorialData?.memorialFields?.born,
    death: memorialData?.memorialFields?.death,
    additionalInfo: memorialData?.memorialFields?.additionalInformation,
  };

  return {
    props: {
      seo,
      pageData,
    },
    revalidate: 600,
  };
};

const Memorial = ({ seo, pageData }) => {
  const memorialPageProps = {
    seo,
    pageData,
  };

  return <MemorialPage {...memorialPageProps} />;
};

export default Memorial;
