import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import LibraryFilters from 'components/organisms/library/LibraryFilters';
import LibraryResults from 'components/organisms/library/LibraryResults';

const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));

const LibrarySearchResultsPage = ({
  seo,
  title,
  description,
  filters,
  subHeaderSlides,
  postsData,
  tags,
  breadcrumbs,
  webPageData,
}) => (
  <>
    <BasicSiteHead
      title={seo?.title}
      metaDescription={seo?.metaDesc}
      canonicalUrl={seo?.canonicalUrl}
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
      authors={filters?.authors}
      industries={filters?.industries}
      years={filters?.years}
      categories={filters?.categories}
    />

    <LibraryResults postsData={postsData} tags={tags} />

    <SubscriptionBanner />
  </>
);

export default LibrarySearchResultsPage;
