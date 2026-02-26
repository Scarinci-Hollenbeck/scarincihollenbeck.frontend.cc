import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import { FIRM_PAGES } from 'utils/constants';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderMenu from 'layouts/SubHeader/SubHeaderMenu';

const FirmContent = dynamic(() => import('components/organisms/firm/FirmContent'));
const LatestPostsSection = dynamic(() => import('components/organisms/home/LatestPostsSection'));

export default function FirmPage({ page }) {
  const {
    seo,
    sections,
    attorneysRecommendedPosts,
    title,
    description,
    image,
    canonicalLink,
    breadcrumbs,
    webPageData,
  } = page;

  const titlesMap = {
    Diversity: 'Latest Diversity News',
  };

  return (
    <>
      <BasicSiteHead
        title={seo.title}
        metaDescription={seo.metaDesc}
        canonicalUrl={canonicalLink}
        breadcrumbs={breadcrumbs}
        webPageData={webPageData}
      />
      <SubHeaderDefault
        title={title}
        subtitle={description}
        backgroundImage={image}
        RightContentComponent={SubHeaderMenu}
        rightContentProps={{ menu: FIRM_PAGES }}
      />

      <FirmContent sections={sections} />

      <LatestPostsSection
        title={titlesMap[title] || 'Latest from the firm'}
        posts={attorneysRecommendedPosts}
      />
    </>
  );
}
