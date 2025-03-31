import React from 'react';
import { fetchAPI } from 'requests/api';
import empty from 'is-empty';
import IndustryPage from 'components/pages/IndustryPage';
import { PRODUCTION_URL } from 'utils/constants';
import { getIndustryContent } from 'requests/industries/industry-default';
import ApolloWrapper from 'layouts/ApolloWrapper';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { formateAwards } from 'utils/helpers';

const industriesSlugsQuery = `
query industriesSlugs {
  industries(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

const sanitizePosts = (posts) => {
  if (empty(posts)) return [];

  return posts?.map((post) => ({
    databaseId: post?.databaseId,
    title: post?.title,
    uri: post?.uri,
    featuredImage: post?.featuredImage,
    excerpt: post?.excerpt,
  }));
};

const getDescriptionFromTab = (content) => {
  if (!content) return null;

  return content?.map((item) => {
    if (!empty(item?.description)) return item.description;
    if (!empty(item?.columns)) {
      return item.columns.find((column) => !empty(column.description))
        ?.description;
    }

    return null;
  })[0];
};

const sanitizeSlides = (slides) => {
  if (!slides) return null;

  return slides?.map((slide) => ({
    title: slide?.openerTitle,
    description: getDescriptionFromTab(slide?.tabContent),
    image: slide?.image?.sourceUrl || '/images/whyChooseUs1.webp',
  }));
};

export const getStaticPaths = async () => {
  const listId = await fetchAPI(industriesSlugsQuery);
  const paths = [];

  listId?.industries?.nodes?.forEach((node) => {
    paths.push(`/industries/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const { industry, includeAttorney, industryChief } = await getIndustryContent(
    params.slug,
  );

  if (empty(industry)) {
    return {
      notFound: true,
    };
  }

  const { postsData } = await getFilteredLibraryData({
    industries: industry?.databaseId,
    limit: '6',
  });

  const content = {
    title: industry?.title,
    description: industry?.industryContent?.description,
    featuredImage: industry?.featuredImage?.node?.sourceUrl || null,
    contentSection: industry?.industryContent?.contentSection,
    contentTabs: industry?.contentTabs?.tabs,
    slides: sanitizeSlides(industry?.contentTabs?.tabs),
    faq: industry?.industryContent?.faq,
    whyChooseUs: industry?.industryContent?.whyChooseUs,
    chairIndustry: industryChief
      ? industryChief.map((item) => ({ ...item, isChair: true }))
      : [],
    attorneyListIndustry: includeAttorney || [],
    clients: industry?.industryContent?.clients,
    relatedPosts: sanitizePosts(postsData?.posts),
    awards: formateAwards(industry?.awards?.awardsItems),
    spotlight: industry?.industryContent?.spotlight,
  };

  return {
    props: {
      content,
      seo: industry?.seo,
      canonicalLink: `${PRODUCTION_URL}/industries/${params?.slug}`,
    },
    revalidate: 8600,
  };
};

const Industry = ({ content, seo, canonicalLink }) => {
  const industryProps = {
    content,
    seo,
    canonicalLink,
  };
  return (
    <ApolloWrapper>
      <IndustryPage {...industryProps} />
    </ApolloWrapper>
  );
};

export default Industry;
