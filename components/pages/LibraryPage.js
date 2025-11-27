import RandomPostCard from 'components/molecules/common/RandomPostCard';
import LibraryCategory from 'components/organisms/library/LibraryCategory';
import LibraryFilters from 'components/organisms/library/LibraryFilters';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import dynamic from 'next/dynamic';
import React from 'react';

const RandomCardsSlider = dynamic(() => import('components/organisms/common/RandomCardsSlider'));
const LibraryCategories = dynamic(() => import('components/organisms/library/LibraryCategories'));
const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));
const LibraryQuestionBanner = dynamic(() => import('components/organisms/library/LibraryQuestionBanner'));

const LibraryPage = ({
  seo,
  title,
  description,
  canonicalUrl,
  posts,
  filters,
  categoriesData,
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

    <LibraryCategory
      title={categoriesData?.map?.clientAlert?.title}
      link={categoriesData?.map?.clientAlert?.uri}
      posts={categoriesData?.map?.clientAlert?.posts}
    />

    <LibraryQuestionBanner />

    <LibraryCategory
      title={categoriesData?.map?.firmEvents?.title}
      link={categoriesData?.map?.firmEvents.uri}
      posts={categoriesData?.map?.firmEvents?.posts}
    />

    <RandomCardsSlider
      title="Stay Updated!"
      subtitle="Insights, Updates, and More — All in One Place."
      navigationLabel="next article"
      CardComponent={RandomPostCard}
      list={posts}
    />

    <LibraryCategories categories={categoriesData?.ordered?.slice(2)} />

    <SubscriptionBanner />
  </>
);
export default LibraryPage;
