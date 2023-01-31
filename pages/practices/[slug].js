import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  PRODUCTION_URL, CORE_PRACTICES, BASE_API_URL, headers,
} from 'utils/constants';
import PracticePage from 'components/pages/PracticePage';
import ApolloWrapper from 'layouts/ApolloWrapper';

const SiteLoader = dynamic(() => import('components/shared/SiteLoader'));

/** Fetch single practice data WP REST API  */
const getPracticeContent = async (slug) => {
  try {
    const res = await fetch(`${BASE_API_URL}/wp-json/individual-practices/practice/${slug}`, {
      headers,
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

/** Set single practice data to page props */
export const getServerSideProps = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate');

  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const request = await getPracticeContent(params.slug);

  if (Object.keys(request).includes('status') && request.status === 404) {
    return {
      notFound: true,
    };
  }

  if (Object.keys(request).includes('data') && request.data.status === 404) {
    return {
      notFound: true,
    };
  }

  request?.chair.map((chair) => {
    chair.link = chair?.link.substr(chair.link.lastIndexOf('/') + 1);
    return chair;
  });

  request?.attorneyList.map((attorney) => {
    attorney.link = attorney?.link.substr(attorney.link.lastIndexOf('/') + 1);
    return attorney;
  });

  const attorneysSchemaChair = request?.chair.map((attorney) => ({
    '@type': 'Person',
    name: attorney.name,
    image: attorney.image,
    url: attorney.link,
    telephone: attorney.contact,
    jobTitle: 'Attorney',
  }));

  const attorneysSchemaAttorneyList = request?.attorneyList.map((attorney) => ({
    '@type': 'Person',
    name: attorney.name,
    image: attorney.image,
    url: attorney.link,
    telephone: attorney.contact,
    jobTitle: 'Attorney',
  }));

  const attorneysSchemaAttorney = [...attorneysSchemaChair, ...attorneysSchemaAttorneyList];

  return {
    props: {
      practice: request,
      attorneysSchemaData: attorneysSchemaAttorney,
      practiceChildren: request.children || [],
      slug: params.slug,
    },
  };
};

/** Single practice page component */
const SinglePractice = ({
  practice, practiceChildren, slug, attorneysSchemaData,
}) => {
  const [corePractices] = useState(CORE_PRACTICES);
  const router = useRouter();
  const practiceUrl = router.asPath.replace('/practices/', '').replace('/practice/', '');
  const canonicalUrl = `${PRODUCTION_URL}/practices/${practice.slug}`;

  if (router.isFallback) {
    return <SiteLoader />;
  }

  const siteTabs = practice.content.map((tab, index) => ({
    ...tab,
    id: index,
  }));

  const fullTabs = [
    ...siteTabs,
    {
      id: 99,
      title: 'Related Articles',
      content: '<h4>Related Articles</h4>',
    },
  ];

  const practiceProps = {
    corePractices,
    practice,
    practiceChildren,
    attorneysSchemaData,
    practiceUrl,
    canonicalUrl,
    tabs: fullTabs,
    slug,
  };
  return (
    <ApolloWrapper>
      <PracticePage {...practiceProps} />
    </ApolloWrapper>
  );
};

export default SinglePractice;
