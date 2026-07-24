import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import PageSchemaMarkup from 'components/shared/head/PageSchemaMarkup';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import empty from 'is-empty';
import LocationContent from 'components/organisms/locations/LocationContent';
import { FaqContainer } from 'styles/Faq.style';
import SubHeaderLocations from 'layouts/SubHeader/SubHeaderLocations';
import { DEFAULT_SCHEMA_FAQ } from '../../utils/constants';
import { sortByKey } from '../../utils/helpers';
import SubHeaderDefault from '../../layouts/SubHeader/SubHeaderDefault';
import PracticeAnchors from '../organisms/practices/PracticeAnchors';

const PracticeAttorneys = dynamic(() => import('components/organisms/practices/PracticeAttorneys'));
const WhatWeDoSection = dynamic(() => import('../organisms/home/WhatWeDoSection'));
const WhyChooseUs = dynamic(() => import('../organisms/practices/WhyChooseUs'));
const VerticalTabs = dynamic(() => import('components/organisms/locations/VerticalTabs'));
const FAQ = dynamic(() => import('components/atoms/FAQ'));
const LatestPostsSection = dynamic(() => import('components/organisms/home/LatestPostsSection'));

const anchorLocationsData = {
  map: {
    id: 'map',
    title: 'Map',
  },
  info: {
    id: 'info-section',
    title: 'Information',
  },
  attorneys: {
    id: 'attorneys-section',
    title: 'Attorneys',
  },
  posts: {
    id: 'posts-section',
    title: 'Posts',
  },
  faq: {
    id: 'faq-section',
    title: 'FAQs',
  },
  whatWeDo: {
    id: 'what-we-do',
    title: 'What we do',
  },
  whyChooseUs: {
    id: 'why-choose-us-section',
    title: 'Why choose us',
  },
};

const LocationPage = ({
  seo,
  currentOffice,
  attorneysSchemaData,
  canonicalUrl,
  locations,
  practices,
  posts,
  breadcrumbs,
  webPageData,
  locationSeo,
  pageSchemaJsonLd,
}) => {
  const anchorData = useMemo(() => {
    const copyAnchorLocationsData = { ...anchorLocationsData };

    if (empty(currentOffice.contentTabs)) {
      delete copyAnchorLocationsData.info;
    }

    if (empty(posts)) {
      delete copyAnchorLocationsData.posts;
    }

    return copyAnchorLocationsData;
  }, [currentOffice, posts, anchorLocationsData]);

  const addressInfo = {
    phone: currentOffice.phone,
    fax: currentOffice.fax,
    streetAddress: currentOffice.streetAddress,
    floor: currentOffice.floor,
    addressRegion: currentOffice.addressRegion,
    postCode: currentOffice.postCode,
    addressLocality: currentOffice.addressLocality,
  };

  return (
    <>
      <BasicSiteHead
        title={seo.title}
        metaDescription={seo.metaDesc}
        canonicalUrl={canonicalUrl}
        personDataForSchema={attorneysSchemaData}
        breadcrumbs={breadcrumbs}
        faqData={
          !empty(currentOffice.faq) ? currentOffice.faq : DEFAULT_SCHEMA_FAQ
        }
        webPageData={webPageData}
        locationSeo={locationSeo}
        includeOrganizationSchema
      />
      <PageSchemaMarkup schemaJson={pageSchemaJsonLd} />
      <SubHeaderDefault
        title={currentOffice.title}
        subtitle={seo.metaDesc}
        backgroundImage={currentOffice.featuredImage}
        RightContentComponent={SubHeaderLocations}
        rightContentProps={{
          locations,
          officeInfo: addressInfo,
          title: currentOffice.title,
        }}
      />
      <PracticeAnchors anchorData={anchorData} title={currentOffice.title} />
      <LocationContent
        title={currentOffice.title}
        currentOffice={currentOffice}
        mapAddress={currentOffice?.mapAddress}
        anchorIdMap={anchorData.map.id}
        description={currentOffice?.description}
      />
      <VerticalTabs
        contentTabs={currentOffice.contentTabs}
        anchorId={anchorData?.info?.id}
      />

      {!empty(currentOffice?.attorneys) && (
        <PracticeAttorneys
          anchorId={anchorData.attorneys.id}
          attorneys={sortByKey(currentOffice.attorneys, 'lastName')}
        />
      )}

      <LatestPostsSection
        title="Read more about this location in our library"
        posts={posts}
        anchorId={anchorData?.posts?.id}
      />

      <FaqContainer>
        <FAQ
          anchorId={anchorData.faq.id}
          faqArrContent={currentOffice.faq}
          isTwoColumns
          isSingleOpened
        />
      </FaqContainer>
      <WhatWeDoSection
        practices={practices}
        anchorId={anchorLocationsData.whatWeDo.id}
      />
      <WhyChooseUs anchorId={anchorData.whyChooseUs.id} />
    </>
  );
};

export default LocationPage;
