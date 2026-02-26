import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import LibraryResults from 'components/organisms/library/LibraryResults';

const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));

const LibraryAuthorPage = ({
  title,
  description,
  seo,
  subHeaderSlides,
  postsData,
  tags,
  breadcrumbs,
  webPageData,
  authorPersonData,
}) => (
  <>
    <BasicSiteHead
      title={seo?.title}
      metaDescription={seo?.metaDesc}
      canonicalUrl={seo?.canonicalUrl}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
      personDataForSchema={authorPersonData}
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

    <LibraryResults postsData={postsData} tags={tags} />

    <SubscriptionBanner />
  </>
);

export default LibraryAuthorPage;
