import LibraryFilters from 'components/organisms/library/LibraryFilters';
import LibrarySubscriptions from 'components/organisms/library/LibrarySubscriptions';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import dynamic from 'next/dynamic';
import React from 'react';

const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));

const LibrarySubscriptionsPage = ({
  seo,
  title,
  description,
  canonicalUrl,
  filters,
  subHeaderSlides,
  subscriptions,
  breadcrumbs,
  webPageData,
}) => (
  <>
    <BasicSiteHead
      title={seo?.title}
      metaDescription={seo?.metaDesc}
      canonicalUrl={canonicalUrl}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
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

    <LibrarySubscriptions
      categories={subscriptions?.categories}
      practices={subscriptions?.practices}
      industries={subscriptions?.industries}
    />

    <SubscriptionBanner />
  </>
);
export default LibrarySubscriptionsPage;
