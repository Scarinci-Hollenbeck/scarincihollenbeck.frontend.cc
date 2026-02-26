import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import CareersResults from 'components/organisms/careers/CareersResults';
import SubHeaderSubscription from 'layouts/SubHeader/SubHeaderSubscription';

const CareersInfo = dynamic(() => import('components/organisms/careers/CareersInfo'));

const CareersPage = ({
  careers,
  seo,
  site,
  canonicalUrl,
  breadcrumbs,
  webPageData,
  itemListData,
  itemListMeta,
}) => (
  <>
    <BasicSiteHead
      title={seo.title}
      metaDescription={seo.metaDesc}
      canonicalUrl={canonicalUrl}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
      itemListData={itemListData}
      itemListMeta={itemListMeta}
    />
    <SubHeaderDefault
      title={site.title}
      subtitle={site.description}
      backgroundImage={site.image}
      RightContentComponent={SubHeaderSubscription}
      isSubscription
    />

    <CareersResults positions={careers} />
    <CareersInfo
      title="Scarinci Hollenbeck is an Equal Opportunity Employer."
      subtitle="Equal Employment Opportunity"
      description={site.bodyContent}
      focusedCards={site?.focusedCards}
    />
  </>
);

export default CareersPage;
