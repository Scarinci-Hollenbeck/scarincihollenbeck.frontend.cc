import Memorials from 'components/organisms/memorials/Memorials';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderMenu from 'layouts/SubHeader/SubHeaderMenu';
import React from 'react';
import { FIRM_PAGES } from 'utils/constants';

const MemorialsPage = ({
  seo,
  title,
  description,
  image,
  memorials,
  canonicalUrl,
  itemListData,
  itemListMeta,
  breadcrumbs,
  webPageData,
}) => (
  <>
    <BasicSiteHead
      title={seo?.title}
      metaDescription={seo?.metaDesc}
      canonicalUrl={canonicalUrl}
      itemListData={itemListData}
      itemListMeta={itemListMeta}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
    />
    <SubHeaderDefault
      backgroundImage={image}
      title={title}
      subtitle={description}
      RightContentComponent={SubHeaderMenu}
      rightContentProps={{ menu: FIRM_PAGES }}
    />

    <Memorials memorials={memorials} />
  </>
);

export default MemorialsPage;
