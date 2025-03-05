import LibraryFilters from 'components/organisms/library/LibraryFilters';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import dynamic from 'next/dynamic';
import React from 'react';

const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));
const PodcastsBanner = dynamic(() => import('components/organisms/podcasts/PodcastsBanner'));

const PodcastsPage = ({
  seo,
  title,
  description,
  canonicalUrl,
  filters,
  subHeaderSlides,
}) => (
  <>
    <BasicSiteHead
      title={seo?.title}
      metaDescription={seo?.metaDesc}
      canonicalUrl={canonicalUrl}
    />
    <SubHeaderDefault
      title={title}
      subtitle={description}
      isSocials
      RightContentComponent={SubHeaderCardsSlider}
      rightContentProps={{
        slides: subHeaderSlides,
        slidesLabel: 'Library',
        isContact: false,
      }}
    />

    <LibraryFilters
      practices={filters?.practices}
      offices={filters?.locations}
      categories={filters?.categories}
      authors={filters?.authors}
      industries={filters?.industries}
      years={filters?.years}
    />

    <PodcastsBanner />

    <SubscriptionBanner />
  </>
);
export default PodcastsPage;
